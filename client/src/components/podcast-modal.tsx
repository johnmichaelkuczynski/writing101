import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Play, Pause, Download, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { downloadAsText } from "@/lib/export-utils";

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  chunkIndex?: number;
}

interface Podcast {
  id: number;
  script: string;
  audioUrl?: string;
  timestamp: Date;
  hasAudio: boolean;
}

export function PodcastModal({ isOpen, onClose, selectedText, chunkIndex }: PodcastModalProps) {
  const [model, setModel] = useState<"deepseek" | "openai" | "anthropic" | "perplexity">("openai");
  const [mode, setMode] = useState<"default" | "custom">("default");
  const [customInstructions, setCustomInstructions] = useState("");
  const [voice, setVoice] = useState("en-US-JennyNeural");
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const generatePodcastMutation = useMutation({
    mutationFn: async () => {
      const instructions = mode === "custom" ? customInstructions : undefined;
      
      return await apiRequest("/api/generate-podcast", {
        method: "POST",
        body: JSON.stringify({
          sourceText: selectedText,
          instructions,
          model,
          chunkIndex,
          voice
        }),
      });
    },
    onSuccess: (data) => {
      setCurrentPodcast(data.podcast);
      setIsPreview(data.isPreview || false);
      
      if (data.isPreview) {
        toast({
          title: "Preview Generated",
          description: "This is a preview. Register and purchase credits for full podcast with audio.",
        });
      } else {
        toast({
          title: "Podcast Generated",
          description: data.podcast.hasAudio 
            ? "Podcast script and audio ready for playback"
            : "Podcast script generated (audio generation failed)",
        });
      }
      
      queryClient.invalidateQueries({ queryKey: ["/api/podcasts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate podcast",
        variant: "destructive",
      });
    },
  });

  const handleGeneratePodcast = () => {
    if (mode === "custom" && !customInstructions.trim()) {
      toast({
        title: "Custom Instructions Required",
        description: "Please provide instructions for your custom podcast format.",
        variant: "destructive",
      });
      return;
    }
    
    generatePodcastMutation.mutate();
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !currentPodcast?.audioUrl) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownloadScript = () => {
    if (!currentPodcast) return;
    downloadAsText(currentPodcast.script, `podcast_script_${Date.now()}.txt`);
  };

  const handleDownloadAudio = () => {
    if (!currentPodcast?.audioUrl) return;
    const link = document.createElement('a');
    link.href = currentPodcast.audioUrl;
    link.download = `podcast_audio_${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setCurrentPodcast(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setCustomInstructions("");
    setMode("default");
  };

  const voiceOptions = [
    { value: "en-US-JennyNeural", label: "Jenny (Female, US)" },
    { value: "en-US-DavisNeural", label: "Davis (Male, US)" },
    { value: "en-US-AriaNeural", label: "Aria (Female, US)" },
    { value: "en-US-GuyNeural", label: "Guy (Male, US)" },
    { value: "en-GB-SoniaNeural", label: "Sonia (Female, UK)" },
    { value: "en-GB-RyanNeural", label: "Ryan (Male, UK)" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            🎧 Generate Podcast
            {currentPodcast && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="ml-auto"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                New Podcast
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {!currentPodcast ? (
          <div className="space-y-6">
            {/* Selected Text Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Selected Text Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  className="text-sm bg-blue-50 dark:bg-blue-950/20 p-3 rounded border max-h-32 overflow-y-auto"
                >
                  {selectedText.substring(0, 500)}
                  {selectedText.length > 500 && "..."}
                </div>
              </CardContent>
            </Card>

            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* AI Model Selection */}
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select value={model} onValueChange={(value: any) => setModel(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI (GPT-4)</SelectItem>
                    <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                    <SelectItem value="deepseek">DeepSeek</SelectItem>
                    <SelectItem value="perplexity">Perplexity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Voice Selection */}
              <div className="space-y-2">
                <Label>Voice</Label>
                <Select value={voice} onValueChange={setVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select voice" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Mode Selection */}
            <Tabs value={mode} onValueChange={(value: any) => setMode(value)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="default">Default Format</TabsTrigger>
                <TabsTrigger value="custom">Custom Instructions</TabsTrigger>
              </TabsList>

              <TabsContent value="default" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Default Podcast Format</CardTitle>
                    <CardDescription>
                      Professional podcast-style narration with structured analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Brief summary of the content</li>
                      <li>• Analysis of main arguments and themes</li>
                      <li>• Discussion of possible objections and counterobjections</li>
                      <li>• Identification of strengths</li>
                      <li>• Potential challenges for readers</li>
                      <li>• 5 representative quotations with context</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                <div className="space-y-2">
                  <Label>Custom Instructions</Label>
                  <Textarea
                    placeholder="Example: Create a snarky dialogue between two academics debating this text, or rewrite as a radio show interview format..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleGeneratePodcast}
                disabled={generatePodcastMutation.isPending}
                size="lg"
                className="min-w-40"
              >
                {generatePodcastMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    🎧 Generate Podcast
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Audio Player */}
            {currentPodcast.hasAudio && currentPodcast.audioUrl && !isPreview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Audio Player
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <audio
                    ref={audioRef}
                    src={currentPodcast.audioUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    preload="metadata"
                  />
                  
                  {/* Playback Controls */}
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleMuteToggle}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <span className="text-sm text-muted-foreground">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div 
                    className="w-full bg-secondary rounded-full h-2 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Script Display */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Podcast Script</CardTitle>
                {isPreview && (
                  <CardDescription className="text-orange-600 dark:text-orange-400">
                    This is a preview. Register and purchase credits for the full podcast with audio.
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none text-sm bg-muted/50 p-4 rounded-lg max-h-96 overflow-y-auto">
                  <div className="whitespace-pre-wrap">
                    {currentPodcast.script}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Options */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleDownloadScript}
                size="sm"
              >
                <Download className="h-4 w-4 mr-1" />
                Download Script
              </Button>
              
              {currentPodcast.hasAudio && currentPodcast.audioUrl && !isPreview && (
                <Button
                  variant="outline"
                  onClick={handleDownloadAudio}
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Audio
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PodcastModal;