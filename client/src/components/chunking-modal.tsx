import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Edit3, Send } from "lucide-react";

interface ChunkingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onChunkSelected: (chunk: string) => void;
  onChunkDiscussion: (chunk: string) => void;
  onChunkRewrite: (chunk: string) => void;
}

export default function ChunkingModal({
  isOpen,
  onClose,
  selectedText,
  onChunkSelected,
  onChunkDiscussion,
  onChunkRewrite
}: ChunkingModalProps) {
  const [selectedChunks, setSelectedChunks] = useState<number[]>([]);

  // Function to divide text into chunks of approximately 1000 words
  const createChunks = (text: string): string[] => {
    const words = text.split(/\s+/);
    const chunks: string[] = [];
    const chunkSize = 1000;
    
    for (let i = 0; i < words.length; i += chunkSize) {
      const chunk = words.slice(i, i + chunkSize).join(' ');
      chunks.push(chunk);
    }
    
    return chunks;
  };

  const chunks = createChunks(selectedText);

  const toggleChunkSelection = (index: number) => {
    setSelectedChunks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getSelectedText = () => {
    return selectedChunks
      .sort((a, b) => a - b)
      .map(index => chunks[index])
      .join('\n\n');
  };

  const handleSendToChat = () => {
    const combinedText = getSelectedText();
    if (combinedText) {
      onChunkSelected(combinedText);
      onClose();
      setSelectedChunks([]);
    }
  };

  const handleDiscuss = () => {
    const combinedText = getSelectedText();
    if (combinedText) {
      onChunkDiscussion(combinedText);
      onClose();
      setSelectedChunks([]);
    }
  };

  const handleRewrite = () => {
    const combinedText = getSelectedText();
    if (combinedText) {
      onChunkRewrite(combinedText);
      onClose();
      setSelectedChunks([]);
    }
  };

  const totalWords = selectedText.split(/\s+/).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Large Text Selection - Choose Chunks</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Your selection contains {totalWords.toLocaleString()} words. 
            Choose one or more chunks below for specific operations, or use the main chat for whole-document questions.
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {/* Action Buttons */}
          <div className="flex gap-2 items-center justify-between">
            <div className="flex gap-2">
              <Button
                onClick={handleSendToChat}
                disabled={selectedChunks.length === 0}
                size="sm"
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send to Chat ({selectedChunks.length} chunks)
              </Button>
              <Button
                onClick={handleDiscuss}
                disabled={selectedChunks.length === 0}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Discuss
              </Button>
              <Button
                onClick={handleRewrite}
                disabled={selectedChunks.length === 0}
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Rewrite
              </Button>
            </div>
            <Button
              onClick={() => setSelectedChunks(chunks.map((_, i) => i))}
              size="sm"
              variant="ghost"
            >
              Select All Chunks
            </Button>
          </div>

          {/* Chunks List */}
          <ScrollArea className="h-[60vh] w-full border rounded-md p-4">
            <div className="space-y-4">
              {chunks.map((chunk, index) => {
                const isSelected = selectedChunks.includes(index);
                const wordCount = chunk.split(/\s+/).length;
                
                return (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleChunkSelection(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={isSelected ? "default" : "secondary"}>
                          Chunk {index + 1}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {wordCount} words
                        </span>
                      </div>
                      {isSelected && (
                        <Badge variant="default" className="bg-blue-600">
                          Selected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {chunk.substring(0, 200)}...
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          <div className="text-xs text-muted-foreground text-center">
            Select chunks by clicking them. Use main chat interface for questions about the entire document.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}