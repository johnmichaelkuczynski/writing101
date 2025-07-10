import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, Loader2, Download, Mail, FileText, Printer } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { renderMathInElement } from "@/lib/math-renderer";
import { copyToClipboard, downloadPDF, emailContent } from "@/lib/export-utils";
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
  const [hasGeneratedInitialExplanation, setHasGeneratedInitialExplanation] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const { toast } = useToast();

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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      try {
        const response = await apiRequest("/api/passage-discussion", {
          method: "POST",
          body: JSON.stringify(data),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
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

  const handleDownloadResponse = (content: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `passage-discussion-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Response downloaded as TXT file"
    });
  };

  const handleEmailResponse = (content: string) => {
    setEmailContent(content);
    setEmailModalOpen(true);
  };

  const sendEmail = async () => {
    if (!emailAddress.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    try {
      await apiRequest("/api/email", {
        method: "POST",
        body: JSON.stringify({
          email: emailAddress,
          subject: "Passage Discussion Response",
          content: emailContent
        })
      });
      
      toast({
        title: "Email Sent",
        description: `Response sent to ${emailAddress}`
      });
      
      setEmailModalOpen(false);
      setEmailAddress("");
      setEmailContent("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadFullConversation = () => {
    const fullConversation = `PASSAGE DISCUSSION
Selected Passage:
"${selectedText}"

CONVERSATION:
${messages.map((msg, idx) => 
  `${msg.isUser ? 'USER' : 'AI'}: ${msg.content}`
).join('\n\n')}

Generated: ${new Date().toLocaleString()}`;

    const blob = new Blob([fullConversation], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `passage-discussion-full-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded",
      description: "Full conversation downloaded as TXT file"
    });
  };

  const handlePrintConversationAsPDF = () => {
    // Create a formatted HTML version for printing
    const htmlContent = `
      <html>
        <head>
          <title>Passage Discussion</title>
          <style>
            body { font-family: 'Times New Roman', serif; margin: 40px; line-height: 1.6; }
            .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .passage { background: #f5f5f5; padding: 15px; margin: 20px 0; border-left: 4px solid #333; }
            .message { margin: 20px 0; padding: 15px; }
            .user { background: #e3f2fd; }
            .ai { background: #f3e5f5; }
            .label { font-weight: bold; margin-bottom: 10px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Passage Discussion</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
          </div>
          
          <div class="passage">
            <div class="label">Selected Passage:</div>
            <p>"${selectedText}"</p>
          </div>
          
          <h2>Discussion:</h2>
          ${messages.map((msg, idx) => 
            `<div class="message ${msg.isUser ? 'user' : 'ai'}">
              <div class="label">${msg.isUser ? 'USER' : 'AI'}:</div>
              <div>${msg.content.replace(/\n/g, '<br>')}</div>
            </div>`
          ).join('')}
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const handleEmailFullConversation = () => {
    const fullConversation = `PASSAGE DISCUSSION\n\nSelected Passage:\n"${selectedText}"\n\nCONVERSATION:\n${messages.map((msg, idx) => 
      `${msg.isUser ? 'USER' : 'AI'}: ${msg.content}`
    ).join('\n\n')}\n\nGenerated: ${new Date().toLocaleString()}`;
    
    setEmailContent(fullConversation);
    setEmailModalOpen(true);
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">Discuss This Passage</DialogTitle>
        </DialogHeader>

        {/* Selected Passage - Fully Scrollable */}
        <div className="bg-muted p-6 rounded-lg mb-6">
          <h4 className="font-semibold mb-4 text-lg">Selected Passage:</h4>
          <ScrollArea className="h-64 w-full border rounded">
            <div className="p-4">
              <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                "{selectedText}"
              </p>
            </div>
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
                  {!message.isUser && (
                    <div className="flex space-x-2 mt-3 pt-3 border-t border-border">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadResponse(message.content)}
                        className="flex items-center space-x-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEmailResponse(message.content)}
                        className="flex items-center space-x-1"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </Button>
                    </div>
                  )}
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

        {/* Conversation Export Buttons */}
        {messages.length > 0 && (
          <div className="flex justify-center space-x-3 mt-4 pt-4 border-t border-border">
            <Button
              onClick={handleDownloadFullConversation}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download Full Conversation</span>
            </Button>
            <Button
              onClick={handlePrintConversationAsPDF}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Printer className="w-4 h-4" />
              <span>Save as PDF</span>
            </Button>
            <Button
              onClick={handleEmailFullConversation}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Email Conversation</span>
            </Button>
          </div>
        )}

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

    {/* Email Modal */}
    <Dialog open={emailModalOpen} onOpenChange={setEmailModalOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Email Response</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <Input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter email address"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Content Preview</label>
            <ScrollArea className="h-32 w-full border rounded mt-1">
              <div className="p-3 text-sm">
                {emailContent.substring(0, 200)}...
              </div>
            </ScrollArea>
          </div>
          <div className="flex space-x-2">
            <Button onClick={sendEmail} disabled={!emailAddress.trim()}>
              Send Email
            </Button>
            <Button variant="outline" onClick={() => setEmailModalOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
}