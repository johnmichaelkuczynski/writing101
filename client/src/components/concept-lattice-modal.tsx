import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X, Download, Mail, MessageSquare, Edit3, RotateCcw, FileText } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ConceptLatticeViewer from "./concept-lattice-viewer";
import type { AIModel } from "@shared/schema";
import type { ConceptLattice } from "@shared/concept-lattice-schema";

interface ConceptLatticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: AIModel;
  selectedText?: string;
  onAskQuestion?: (question: string) => void;
  onRewrite?: (text: string) => void;
}

export default function ConceptLatticeModal({
  isOpen,
  onClose,
  selectedModel,
  selectedText,
  onAskQuestion,
  onRewrite
}: ConceptLatticeModalProps) {
  const [currentLattice, setCurrentLattice] = useState<ConceptLattice | null>(null);
  const [globalInstructions, setGlobalInstructions] = useState("");
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [selectedChunks, setSelectedChunks] = useState<string[]>([]);
  const [showChunkSelection, setShowChunkSelection] = useState(false);
  const [textChunks, setTextChunks] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generate initial lattice
  const generateMutation = useMutation({
    mutationFn: async (data: { text: string; model: AIModel; globalInstructions?: string }) => {
      console.log("Making API request with data:", data);
      const response = await apiRequest("/api/concept-lattice/generate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      console.log("API response JSON:", json);
      return json;
    },
    onSuccess: (lattice: ConceptLattice) => {
      console.log("Generate mutation success:", lattice);
      setCurrentLattice(lattice);
      toast({
        title: "Concept lattice generated",
        description: "Your visual analysis is ready for interaction."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate concept lattice",
        variant: "destructive"
      });
    }
  });

  // Refine entire lattice with global instructions
  const refineMutation = useMutation({
    mutationFn: async (data: { latticeId: string; globalInstructions: string; model: AIModel }) => {
      const response = await apiRequest("/api/concept-lattice/refine", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      return await response.json();
    },
    onSuccess: (refined: ConceptLattice) => {
      setCurrentLattice(refined);
      setGlobalInstructions("");
      setShowGlobalChat(false);
      toast({
        title: "Lattice refined",
        description: "Your global changes have been applied."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Refinement failed",
        description: error.message || "Failed to refine concept lattice",
        variant: "destructive"
      });
    }
  });

  // Split text into chunks for selection
  const splitIntoChunks = (text: string): string[] => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const chunks: string[] = [];
    let currentChunk = "";
    
    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > 1000) {
        if (currentChunk) {
          chunks.push(currentChunk.trim() + ".");
          currentChunk = "";
        }
      }
      currentChunk += sentence + ".";
    }
    
    if (currentChunk.trim()) {
      chunks.push(currentChunk.trim());
    }
    
    return chunks;
  };

  // Show chunk selection interface
  const handleShowChunks = () => {
    if (!selectedText) {
      toast({
        title: "No text available",
        description: "Please select some text to visualize.",
        variant: "destructive"
      });
      return;
    }

    const chunks = splitIntoChunks(selectedText);
    setTextChunks(chunks);
    setSelectedChunks([]);
    setShowChunkSelection(true);
  };

  // Generate lattice with selected chunks or full text
  const handleGenerate = () => {
    let textToAnalyze = "";
    
    if (showChunkSelection && selectedChunks.length > 0) {
      textToAnalyze = selectedChunks.join("\n\n");
    } else if (selectedText) {
      textToAnalyze = selectedText;
    } else {
      toast({
        title: "No text selected",
        description: "Please select some text or chunks to visualize.",
        variant: "destructive"
      });
      return;
    }

    generateMutation.mutate({
      text: textToAnalyze,
      model: selectedModel,
      globalInstructions: globalInstructions || undefined
    });
    
    setShowChunkSelection(false);
  };

  // Toggle chunk selection
  const toggleChunk = (chunkIndex: number) => {
    const chunk = textChunks[chunkIndex];
    setSelectedChunks(prev => 
      prev.includes(chunk) 
        ? prev.filter(c => c !== chunk)
        : [...prev, chunk]
    );
  };

  // Apply global refinements
  const handleGlobalRefine = () => {
    if (!currentLattice || !globalInstructions.trim()) {
      toast({
        title: "Instructions required",
        description: "Please enter global instructions for refinement.",
        variant: "destructive"
      });
      return;
    }

    refineMutation.mutate({
      latticeId: currentLattice.id,
      globalInstructions: globalInstructions,
      model: selectedModel
    });
  };

  // Export handlers
  const handleExportPDF = async () => {
    if (!currentLattice) return;
    // Implementation for PDF export using browser's print functionality
    window.print();
  };

  const handleExportImage = async (format: 'png' | 'jpg') => {
    if (!currentLattice) return;
    // Implementation for image export using html2canvas
    const element = document.querySelector('[data-lattice-container]');
    if (element) {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(element as HTMLElement);
      const link = document.createElement('a');
      link.download = `concept-lattice.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    }
  };

  const handleClose = () => {
    setCurrentLattice(null);
    setGlobalInstructions("");
    setShowGlobalChat(false);
    setShowChunkSelection(false);
    setSelectedChunks([]);
    setTextChunks([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-none w-[98vw] h-[95vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Concept Lattice 1.0 {currentLattice && `- ${currentLattice.title}`}
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Interactive visual analysis with main ideas, arguments, examples, and quotes
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              {currentLattice && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowGlobalChat(!showGlobalChat)}
                    className="flex items-center space-x-1"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Global Instructions</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportPDF}
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExportImage('png')}
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>PNG</span>
                  </Button>
                </>
              )}
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            {!currentLattice ? (
              /* Initial generation interface */
              <div className="flex-1 flex items-center justify-center p-8">
                {!showChunkSelection ? (
                  /* Initial selection screen */
                  <div className="max-w-lg w-full space-y-6 text-center">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Generate Concept Lattice</h3>
                      <p className="text-muted-foreground">
                        Create an interactive visual analysis of the selected text with main ideas, 
                        arguments, examples, and supporting quotes.
                      </p>
                    </div>
                    
                    {selectedText && (
                      <div className="text-left">
                        <label className="text-sm font-medium text-muted-foreground">Selected Text Preview:</label>
                        <div className="mt-1 p-3 bg-muted rounded border text-sm max-h-32 overflow-y-auto">
                          {selectedText.substring(0, 300)}
                          {selectedText.length > 300 && "..."}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium">Initial Instructions (Optional)</label>
                      <Textarea
                        value={globalInstructions}
                        onChange={(e) => setGlobalInstructions(e.target.value)}
                        placeholder="e.g., Focus on philosophical arguments, include examples from modern psychology..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="flex space-x-3">
                      <Button 
                        onClick={handleGenerate}
                        disabled={generateMutation.isPending || !selectedText}
                        className="flex-1"
                      >
                        {generateMutation.isPending ? "Generating..." : "Use Full Text"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={handleShowChunks}
                        disabled={!selectedText}
                        className="flex-1 flex items-center space-x-2"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Choose Chunks</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Chunk selection screen */
                  <div className="max-w-4xl w-full h-full flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-lg font-semibold mb-2">Select Text Chunks</h3>
                      <p className="text-muted-foreground">
                        Choose which parts of the text to include in your concept lattice.
                      </p>
                      <div className="mt-2 flex items-center justify-center space-x-4">
                        <Badge variant="secondary">
                          {selectedChunks.length} of {textChunks.length} chunks selected
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedChunks(textChunks)}
                        >
                          Select All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedChunks([])}
                        >
                          Clear All
                        </Button>
                      </div>
                    </div>

                    {/* ACTION BUTTONS AT TOP */}
                    <div className="mb-4 flex space-x-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => setShowChunkSelection(false)}
                      >
                        Back
                      </Button>
                      <Button 
                        onClick={handleGenerate}
                        disabled={generateMutation.isPending || selectedChunks.length === 0}
                        className="px-8"
                      >
                        {generateMutation.isPending ? "Generating..." : `Generate from ${selectedChunks.length} chunks`}
                      </Button>
                    </div>

                    {/* SCROLLABLE CHUNK LIST */}
                    <ScrollArea className="flex-1 pr-4">
                      <div className="space-y-3">
                        {textChunks.map((chunk, index) => (
                          <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedChunks.includes(chunk)
                                ? 'border-blue-300 bg-blue-50 dark:bg-blue-950/30'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => toggleChunk(index)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-1 ${
                                selectedChunks.includes(chunk)
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {selectedChunks.includes(chunk) && (
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Chunk {index + 1} ({chunk.length} characters)
                                </div>
                                <div className="text-sm leading-relaxed">
                                  {chunk.length > 200 ? `${chunk.substring(0, 200)}...` : chunk}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            ) : (
              /* Lattice viewer */
              <div className="flex-1 overflow-hidden" data-lattice-container>
                <ConceptLatticeViewer
                  lattice={currentLattice}
                  selectedModel={selectedModel}
                  onLatticeUpdate={setCurrentLattice}
                  onAskQuestion={onAskQuestion}
                  onRewrite={onRewrite}
                />
              </div>
            )}
          </div>

          {/* Global instructions sidebar */}
          {showGlobalChat && currentLattice && (
            <div className="w-80 border-l bg-muted/30 flex flex-col">
              <div className="p-4 border-b">
                <h4 className="font-semibold">Global Instructions</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Modify the entire lattice structure with global commands.
                </p>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Global Modifications</label>
                    <Textarea
                      value={globalInstructions}
                      onChange={(e) => setGlobalInstructions(e.target.value)}
                      placeholder="e.g., Move arguments from Big Idea #2 to Big Idea #4. Replace quotes with examples from evolutionary psychology..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={handleGlobalRefine}
                    disabled={refineMutation.isPending || !globalInstructions.trim()}
                    className="w-full"
                  >
                    {refineMutation.isPending ? "Applying..." : "Apply Global Changes"}
                  </Button>

                  <div className="text-xs text-muted-foreground space-y-2">
                    <p><strong>Examples:</strong></p>
                    <p>• "Connect arguments to different main ideas"</p>
                    <p>• "Replace quotes with mathematical proofs"</p>
                    <p>• "Add examples from computer science"</p>
                    <p>• "Focus more on counterarguments"</p>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}