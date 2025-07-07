import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, FileDown, Mail } from "lucide-react";
import { AIModel } from "@shared/schema";
import { chunkText, getChunkPreview, TextChunk } from "@/lib/text-chunker";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RewriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: AIModel;
  mode: "selection" | "chunks";
  selectedText?: string;
  fullDocumentText: string;
}

interface RewriteResult {
  id: number;
  originalText: string;
  rewrittenText: string;
  instructions: string;
  chunkIndex?: number;
  parentRewriteId?: number;
}

export default function RewriteModal({
  isOpen,
  onClose,
  selectedModel,
  mode,
  selectedText,
  fullDocumentText,
}: RewriteModalProps) {
  const [instructions, setInstructions] = useState("");
  const [selectedChunks, setSelectedChunks] = useState<number[]>([]);
  const [chunks, setChunks] = useState<TextChunk[]>([]);
  const [rewriteResults, setRewriteResults] = useState<RewriteResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (mode === "chunks" && isOpen) {
      const textChunks = chunkText(fullDocumentText, 1000);
      setChunks(textChunks);
    }
  }, [mode, isOpen, fullDocumentText]);

  const rewriteMutation = useMutation({
    mutationFn: async (data: {
      originalText: string;
      instructions: string;
      model: AIModel;
      chunkIndex?: number;
      parentRewriteId?: number;
    }) => {
      try {
        const response = await apiRequest("/api/rewrite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP ${response.status}`);
        }
        
        return response.json();
      } catch (error) {
        console.error("Rewrite API error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      setRewriteResults(prev => [...prev, data.rewrite]);
      setShowResults(true);
      toast({
        title: "Rewrite Complete",
        description: "Your text has been successfully rewritten.",
      });
    },
    onError: (error) => {
      console.error("Rewrite mutation error:", error);
      toast({
        title: "Rewrite Failed",
        description: error?.message || "An unexpected error occurred during rewriting.",
        variant: "destructive",
      });
    },
  });

  const handleRewrite = () => {
    if (!instructions.trim()) {
      toast({
        title: "Instructions Required",
        description: "Please provide rewriting instructions.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "selection" && selectedText) {
      rewriteMutation.mutate({
        originalText: selectedText,
        instructions: instructions.trim(),
        model: selectedModel,
      });
    } else if (mode === "chunks" && selectedChunks.length > 0) {
      selectedChunks.forEach(chunkId => {
        const chunk = chunks.find(c => c.id === chunkId);
        if (chunk) {
          rewriteMutation.mutate({
            originalText: chunk.text,
            instructions: instructions.trim(),
            model: selectedModel,
            chunkIndex: chunkId,
          });
        }
      });
    }
  };

  const handleChunkSelection = (chunkId: number, checked: boolean) => {
    if (checked) {
      setSelectedChunks(prev => [...prev, chunkId]);
    } else {
      setSelectedChunks(prev => prev.filter(id => id !== chunkId));
    }
  };

  const handleRewriteAgain = (rewriteResult: RewriteResult) => {
    if (!instructions.trim()) {
      toast({
        title: "Instructions Required",
        description: "Please provide new rewriting instructions.",
        variant: "destructive",
      });
      return;
    }

    rewriteMutation.mutate({
      originalText: rewriteResult.rewrittenText,
      instructions: instructions.trim(),
      model: selectedModel,
      parentRewriteId: rewriteResult.id,
    });
  };

  const downloadAsText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsPDF = async (content: string, filename: string) => {
    try {
      const response = await apiRequest("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "PDF Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    setInstructions("");
    setSelectedChunks([]);
    setRewriteResults([]);
    setShowResults(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {mode === "selection" ? "Rewrite Selected Text" : "Rewrite Document Chunks"}
          </DialogTitle>
          <DialogDescription>
            {mode === "selection" 
              ? "Provide instructions to rewrite the selected text passage." 
              : "Select document chunks and provide instructions for rewriting them."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {!showResults ? (
            <div className="space-y-4 h-full flex flex-col">
              {/* Instructions */}
              <div>
                <label className="text-sm font-medium">Rewriting Instructions</label>
                <Textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleRewrite();
                    }
                  }}
                  placeholder="Describe how you want the text to be rewritten (e.g., 'Make it more formal', 'Simplify the language', 'Add more examples'). Press Enter to start rewrite, Shift+Enter for new line."
                  className="mt-1 min-h-[80px]"
                />
              </div>

              {/* Mode-specific content */}
              {mode === "selection" && selectedText && (
                <div>
                  <label className="text-sm font-medium">Selected Text</label>
                  <ScrollArea className="h-32 mt-1 border rounded-md p-3 bg-muted/50">
                    <p className="text-sm">{selectedText}</p>
                  </ScrollArea>
                </div>
              )}

              {mode === "chunks" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Select Chunks to Rewrite ({selectedChunks.length} selected)
                    </label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedChunks(chunks.map(c => c.id))}
                    >
                      Select All
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 border rounded-md">
                    <div className="p-4 space-y-3">
                      {chunks.map((chunk) => (
                        <Card key={chunk.id} className="p-3">
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={selectedChunks.includes(chunk.id)}
                              onCheckedChange={(checked) =>
                                handleChunkSelection(chunk.id, checked as boolean)
                              }
                              className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="secondary">
                                  Chunk {chunk.id + 1}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {chunk.wordCount} words
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {getChunkPreview(chunk)}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleRewrite}
                  disabled={
                    rewriteMutation.isPending ||
                    !instructions.trim() ||
                    (mode === "chunks" && selectedChunks.length === 0)
                  }
                >
                  {rewriteMutation.isPending ? "Rewriting..." : "Start Rewrite"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Rewrite Results</h3>
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  New Rewrite
                </Button>
              </div>

              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {rewriteResults.map((result, index) => (
                    <Card key={result.id}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>
                            Rewrite {index + 1}
                            {result.chunkIndex !== undefined && ` (Chunk ${result.chunkIndex + 1})`}
                            {result.parentRewriteId && " (Revision)"}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRewriteAgain(result)}
                              disabled={rewriteMutation.isPending}
                            >
                              Rewrite Again
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadAsText(result.rewrittenText, `rewrite-${index + 1}`)}
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              TXT
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadAsPDF(result.rewrittenText, `rewrite-${index + 1}`)}
                            >
                              <FileDown className="w-4 h-4 mr-1" />
                              PDF
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Instructions:</p>
                            <p className="text-sm bg-muted p-2 rounded">{result.instructions}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rewritten Text:</p>
                            <div className="text-sm bg-background border rounded p-3 max-h-40 overflow-y-auto">
                              {result.rewrittenText}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}