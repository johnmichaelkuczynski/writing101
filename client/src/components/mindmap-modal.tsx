import { useState, useEffect } from "react";
import { X, Download, Mail, RefreshCw, FileText, Layers, GitBranch, Network, Scale, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import MindMapViewer from "./mindmap-viewer";
import { useMindMap } from "@/hooks/use-mindmap";
import { apiRequest } from "@/lib/queryClient";
import { chunkText } from "@/lib/text-chunker";
import { paperContent } from "@shared/paper-content";
import type { AIModel } from "@shared/schema";
import type { MindMapType } from "@shared/schema";

interface MindMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: AIModel;
  selectedText?: string;
  onAskQuestion?: (question: string) => void;
  onRewrite?: (text: string) => void;
}

export default function MindMapModal({
  isOpen,
  onClose,
  selectedModel,
  selectedText,
  onAskQuestion,
  onRewrite
}: MindMapModalProps) {
  const [mapType, setMapType] = useState<MindMapType>("radial");
  const [sourceText, setSourceText] = useState(selectedText || "");
  const [feedback, setFeedback] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [chunks, setChunks] = useState<any[]>([]);
  const [selectedChunk, setSelectedChunk] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();
  const { data: mindMap, mutate: generateMindMap, isLoading } = useMindMap();

  useEffect(() => {
    if (selectedText) {
      setSourceText(selectedText);
    } else {
      // Generate chunks from full document
      const fullText = paperContent.sections.map(s => s.content).join('\n\n');
      const textChunks = chunkText(fullText, 300);
      setChunks(textChunks);
    }
  }, [selectedText]);

  const handleGenerateMindMap = async () => {
    const textToUse = selectedText || selectedChunk || sourceText;
    
    if (!textToUse.trim()) {
      toast({
        title: "Error",
        description: "Please select text or choose a chunk to generate mind map",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await generateMindMap({
        text: textToUse,
        mapType,
        model: selectedModel,
        feedback: feedback || undefined
      });
      setFeedback("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate mind map",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: 'jpg' | 'png' | 'pdf') => {
    if (!mindMap) return;
    
    try {
      const canvas = document.querySelector('#mindmap-canvas') as HTMLCanvasElement;
      if (!canvas) {
        toast({
          title: "Error", 
          description: "Mind map canvas not found",
          variant: "destructive"
        });
        return;
      }

      if (format === 'pdf') {
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 277, 190);
        pdf.save(`mindmap-${mindMap.type}-${Date.now()}.pdf`);
      } else {
        const link = document.createElement('a');
        link.download = `mindmap-${mindMap.type}-${Date.now()}.${format}`;
        link.href = canvas.toDataURL(`image/${format}`);
        link.click();
      }
      
      toast({
        title: "Success",
        description: `Mind map downloaded as ${format.toUpperCase()}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download mind map",
        variant: "destructive"
      });
    }
  };

  const handleEmailSend = async () => {
    if (!mindMap || !emailAddress) return;
    
    try {
      const canvas = document.querySelector('#mindmap-canvas') as HTMLCanvasElement;
      if (!canvas) {
        toast({
          title: "Error",
          description: "Mind map canvas not found",
          variant: "destructive"
        });
        return;
      }

      const imageData = canvas.toDataURL('image/png');
      
      await apiRequest('/api/email', {
        method: 'POST',
        body: JSON.stringify({
          email: emailAddress,
          subject: `Mind Map: ${mindMap.title}`,
          content: `Please find attached your ${mindMap.type} mind map: ${mindMap.title}\n\nGenerated from: ${sourceText.substring(0, 100)}...`
        })
      });
      
      toast({
        title: "Success",
        description: "Mind map sent via email",
      });
      
      setShowEmailInput(false);
      setEmailAddress("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive"
      });
    }
  };

  const mapTypeIcons = {
    radial: Network,
    tree: GitBranch,
    flowchart: Zap,
    concept: Layers,
    argument: Scale
  };

  const mapTypeDescriptions = {
    radial: "Central concept with ideas branching outward",
    tree: "Hierarchical structure showing organization",
    flowchart: "Sequential flow of processes or steps",
    concept: "Web of related concepts with connections",
    argument: "Claims, premises, objections, and rebuttals"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Network className="w-5 h-5" />
            <span>Mind Map Generator</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(90vh-120px)]">
          {/* Left Panel - Controls */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Map Type Selection */}
              <div className="space-y-2">
                <Label>Mind Map Type</Label>
                <Select value={mapType} onValueChange={(value: MindMapType) => setMapType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(mapTypeIcons).map(([type, Icon]) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4" />
                          <span className="capitalize">{type}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {mapTypeDescriptions[mapType]}
                </p>
              </div>

              {/* Source Text Selection */}
              <div className="space-y-2">
                <Label>Source Text</Label>
                {selectedText ? (
                  <div className="p-3 bg-muted rounded-md">
                    <Badge variant="secondary" className="mb-2">Selected Text</Badge>
                    <p className="text-sm">{selectedText.substring(0, 100)}...</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-xs">Choose from Document Chunks</Label>
                    <Select value={selectedChunk} onValueChange={setSelectedChunk}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a chunk" />
                      </SelectTrigger>
                      <SelectContent>
                        {chunks.map((chunk) => (
                          <SelectItem key={chunk.id} value={chunk.text}>
                            <div className="flex flex-col">
                              <span className="text-sm">{chunk.text.substring(0, 50)}...</span>
                              <span className="text-xs text-muted-foreground">{chunk.wordCount} words</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerateMindMap}
                disabled={isLoading || isGenerating}
                className="w-full"
              >
                {isLoading || isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Mind Map
                  </>
                )}
              </Button>

              {/* Feedback Section */}
              {mindMap && (
                <div className="space-y-2">
                  <Label>Refine Mind Map</Label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback to improve the mind map..."
                    className="min-h-[80px]"
                  />
                  <Button 
                    onClick={handleGenerateMindMap}
                    disabled={!feedback.trim() || isLoading || isGenerating}
                    size="sm"
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate with Feedback
                  </Button>
                </div>
              )}

              {/* Export Options */}
              {mindMap && (
                <div className="space-y-2">
                  <Label>Export Options</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      onClick={() => handleDownload('jpg')}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      JPG
                    </Button>
                    <Button
                      onClick={() => handleDownload('png')}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      PNG
                    </Button>
                    <Button
                      onClick={() => handleDownload('pdf')}
                      size="sm"
                      variant="outline"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  {!showEmailInput ? (
                    <Button
                      onClick={() => setShowEmailInput(true)}
                      size="sm"
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Mind Map
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleEmailSend}
                          size="sm"
                          disabled={!emailAddress}
                          className="flex-1"
                        >
                          Send
                        </Button>
                        <Button
                          onClick={() => setShowEmailInput(false)}
                          size="sm"
                          variant="outline"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Right Panel - Mind Map Display */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Mind Map Visualization</span>
                {mindMap && (
                  <Badge variant="secondary">{mindMap.type.charAt(0).toUpperCase() + mindMap.type.slice(1)}</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {mindMap ? (
                <MindMapViewer
                  mindMap={mindMap}
                  onNodeClick={(node) => {
                    if (onAskQuestion) {
                      onAskQuestion(`Tell me more about: ${node.label}`);
                    }
                  }}
                  onNodeDoubleClick={(node) => {
                    if (onRewrite) {
                      onRewrite(node.label);
                    }
                  }}
                />
              ) : (
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Network className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Generate a mind map to visualize concepts</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}