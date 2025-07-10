import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { renderMathInElement } from "@/lib/math-renderer";
import type { AIModel } from "@shared/schema";

interface PassageDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  selectedModel: AIModel;
  mathMode: boolean;
}

interface DiscussionMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function PassageDiscussionModal({
  isOpen,
  onClose,
  selectedText,
  selectedModel,
  mathMode
}: PassageDiscussionModalProps) {
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [hasGeneratedInitialExplanation, setHasGeneratedInitialExplanation] = useState(false);

  // Generate initial explanation when modal opens
  const initialExplanationMutation = useMutation({
    mutationFn: async (data: { passage: string; model: AIModel }) => {
      const response = await apiRequest("/api/passage-explanation", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      const initialMessage: DiscussionMessage = {
        id: Date.now().toString(),
        content: data.explanation,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      setHasGeneratedInitialExplanation(true);
    }
  });

  // Send user message and get AI response
  const discussionMutation = useMutation({
    mutationFn: async (data: { message: string; passage: string; model: AIModel; conversationHistory: DiscussionMessage[] }) => {
      const response = await apiRequest("/api/passage-discussion", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return response;
    },
    onSuccess: (data) => {
      const aiMessage: DiscussionMessage = {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }
  });

  // Generate initial explanation when modal opens with new text
  useEffect(() => {
    if (isOpen && selectedText && !hasGeneratedInitialExplanation) {
      initialExplanationMutation.mutate({ passage: selectedText, model: selectedModel });
    }
  }, [isOpen, selectedText, selectedModel, hasGeneratedInitialExplanation]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setUserInput("");
      setHasGeneratedInitialExplanation(false);
    }
  }, [isOpen]);

  // Render math after messages update
  useEffect(() => {
    if (mathMode && messages.length > 0) {
      setTimeout(() => {
        renderMathInElement();
      }, 100);
    }
  }, [messages, mathMode]);

  const handleSendMessage = () => {
    if (!userInput.trim() || discussionMutation.isPending) return;

    // Add user message
    const userMessage: DiscussionMessage = {
      id: Date.now().toString(),
      content: userInput,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Send to AI
    discussionMutation.mutate({
      message: userInput,
      passage: selectedText,
      model: selectedModel,
      conversationHistory: [...messages, userMessage]
    });

    setUserInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const processContentForMathMode = (content: string) => {
    if (!content) return "";
    
    if (!mathMode) {
      return content
        .replace(/\$\$([^$]+)\$\$/g, '$1')
        .replace(/\$([^$]+)\$/g, '$1')
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathbb\{([^}]+)\}/g, '$1')
        .replace(/\\forall/g, 'for all')
        .replace(/\\Rightarrow/g, 'implies')
        .replace(/\\ldots/g, '...')
        .replace(/\\times/g, '×');
    }
    return content;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Discuss This Passage</DialogTitle>
        </DialogHeader>

        {/* Selected Passage - Much Larger and Expandable */}
        <div className="bg-muted p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-4 text-lg">Selected Passage:</h4>
          <ScrollArea className="max-h-48">
            <p className="text-base leading-relaxed text-foreground">
              "{selectedText}"
            </p>
          </ScrollArea>
        </div>

        {/* Discussion Messages - Much Larger */}
        <ScrollArea className="flex-1 min-h-[400px] mb-6">
          <div className="space-y-6 pr-4">
            {initialExplanationMutation.isPending && (
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-lg">Generating initial explanation...</span>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-lg ${
                  message.isUser 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  <div 
                    className="text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: processContentForMathMode(message.content)
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/\n/g, '<br>')
                    }}
                  />
                </div>
              </div>
            ))}

            {discussionMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-4 rounded-lg flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-base">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area - Much Larger */}
        <div className="flex space-x-4">
          <Textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question about this passage or share your thoughts..."
            className="flex-1 min-h-[120px] text-base p-4 resize-y"
            disabled={discussionMutation.isPending || initialExplanationMutation.isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!userInput.trim() || discussionMutation.isPending || initialExplanationMutation.isPending}
            size="lg"
            className="px-6 py-3"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}