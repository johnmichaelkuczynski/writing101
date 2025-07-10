import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Download, Mail } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { renderMathInElement } from "@/lib/math-renderer";
import { useToast } from "@/hooks/use-toast";
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
  const [isInitializing, setIsInitializing] = useState(false);
  const { toast } = useToast();

  // Generate initial explanation when modal opens
  const initialExplanationMutation = useMutation({
    mutationFn: async (data: { passage: string; model: AIModel }) => {
      const response = await fetch("/api/passage-explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      const initialMessage: DiscussionMessage = {
        id: Date.now().toString(),
        content: data.explanation,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      setIsInitializing(false);
    },
    onError: (error) => {
      setIsInitializing(false);
      toast({
        title: "Error",
        description: "Failed to generate initial explanation",
        variant: "destructive"
      });
    }
  });

  // Send user message and get AI response
  const discussionMutation = useMutation({
    mutationFn: async (data: { message: string; passage: string; model: AIModel; conversationHistory: DiscussionMessage[] }) => {
      const response = await fetch("/api/passage-discussion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      const aiMessage: DiscussionMessage = {
        id: Date.now().toString(),
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Generate initial explanation when modal opens with new text
  useEffect(() => {
    if (isOpen && selectedText && messages.length === 0 && !isInitializing) {
      setIsInitializing(true);
      initialExplanationMutation.mutate({ passage: selectedText, model: selectedModel });
    }
  }, [isOpen, selectedText, selectedModel, messages.length, isInitializing]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setUserInput("");
      setIsInitializing(false);
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

        {/* Selected Passage */}
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-4">
          <div className="font-semibold text-sm text-blue-700 mb-2">Selected Passage:</div>
          <ScrollArea className="max-h-32">
            <div className="text-sm">{selectedText}</div>
          </ScrollArea>
        </div>

        {/* Discussion Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea className="flex-1 border rounded-lg p-4">
            {isInitializing || initialExplanationMutation.isPending ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating explanation...
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-3 rounded-lg ${
                      message.isUser
                        ? "bg-blue-100 ml-8"
                        : "bg-gray-100 mr-8"
                    }`}
                  >
                    <div className="font-semibold text-xs text-gray-600 mb-1">
                      {message.isUser ? "YOU" : "AI"}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {processContentForMathMode(message.content)}
                    </div>
                  </div>
                ))}
                {discussionMutation.isPending && (
                  <div className="flex items-center gap-2 text-gray-500 bg-gray-100 p-3 rounded-lg mr-8">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    AI is thinking...
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="mt-4 space-y-3">
            <Textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question about this passage... (Enter to send, Shift+Enter for new line)"
              className="min-h-[80px] resize-none"
              disabled={discussionMutation.isPending || isInitializing}
            />
            
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">
                Press Enter to send • Shift+Enter for new line
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || discussionMutation.isPending || isInitializing}
                className="gap-2"
              >
                {discussionMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}