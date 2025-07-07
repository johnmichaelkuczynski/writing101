import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MessageCircle, Send, Bot, User, Download, Mail, Copy } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadPDF, emailContent } from "@/lib/export-utils";
import { renderMathInElement } from "@/lib/math-renderer";
import type { AIModel, ChatMessage } from "@shared/schema";

interface ChatInterfaceProps {
  selectedModel: AIModel;
  mathMode?: boolean;
  selectedText?: string;
  onSelectedTextUsed?: () => void;
}

export default function ChatInterface({ selectedModel, mathMode = true, selectedText, onSelectedTextUsed }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [contentToEmail, setContentToEmail] = useState("");
  const { toast } = useToast();

  const { data: chatHistory = [], refetch } = useQuery({
    queryKey: ["/api/chat/history"],
    refetchInterval: 5000,
  });

  // Render math after chat history updates
  useEffect(() => {
    if ((chatHistory as ChatMessage[]).length > 0 && mathMode) {
      setTimeout(() => {
        const chatResponses = document.querySelectorAll('.chat-response');
        chatResponses.forEach(element => {
          renderMathInElement(element as HTMLElement);
        });
      }, 200);
    }
  }, [chatHistory, mathMode]);

  // Function to process math content based on mode
  const processContentForMathMode = (content: string) => {
    if (!mathMode) {
      // Remove LaTeX notation when math mode is off
      return content
        .replace(/\$\$([^$]+)\$\$/g, '$1') // Remove display math delimiters
        .replace(/\$([^$]+)\$/g, '$1') // Remove inline math delimiters
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)') // Convert sqrt notation
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)') // Convert fractions
        .replace(/\\text\{([^}]+)\}/g, '$1') // Remove text commands
        .replace(/\\mathbb\{([^}]+)\}/g, '$1') // Remove mathbb
        .replace(/\\forall/g, 'for all') // Convert universal quantifier
        .replace(/\\Rightarrow/g, 'implies') // Convert implication
        .replace(/\\ldots/g, '...') // Convert ellipsis
        .replace(/\\times/g, '×'); // Convert multiplication
    }
    return content;
  };

  // Function to render markdown-style text
  const renderMessageContent = (content: string) => {
    // Process content based on math mode first
    const processedContent = processContentForMathMode(content);
    
    // Convert markdown-style formatting to HTML
    let formattedContent = processedContent
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      // Code blocks (multiline)
      .replace(/```[\s\S]*?```/g, (match) => {
        const codeContent = match.replace(/```/g, '');
        return `<pre class="bg-gray-100 p-2 rounded text-sm my-2 overflow-x-auto"><code>${codeContent}</code></pre>`;
      })
      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      // Line breaks
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');

    return { __html: formattedContent };
  };

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; model: AIModel }) => {
      const response = await apiRequest("POST", "/api/chat", data);
      return response.json();
    },
    onSuccess: () => {
      setMessage("");
      refetch();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    let finalMessage = message.trim();
    
    // If there's selected text, prepend it as context
    if (selectedText) {
      finalMessage = `About this highlighted passage: "${selectedText}"\n\n${finalMessage}`;
      onSelectedTextUsed?.();
    }
    
    chatMutation.mutate({
      message: finalMessage,
      model: selectedModel,
    });
  };

  const handleCopy = async (content: string) => {
    const success = await copyToClipboard(content);
    if (success) {
      toast({ title: "Copied to clipboard" });
    } else {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleDownloadPDF = async (content: string) => {
    try {
      await downloadPDF(content);
      toast({ title: "PDF downloaded successfully" });
    } catch (error) {
      toast({ title: "Failed to download PDF", variant: "destructive" });
    }
  };

  const openEmailDialog = (content: string) => {
    setContentToEmail(content);
    setEmailDialogOpen(true);
  };

  const handleSendEmail = async () => {
    if (!emailAddress) {
      toast({ title: "Please enter an email address", variant: "destructive" });
      return;
    }

    try {
      await emailContent(contentToEmail, emailAddress, "AI Response from Living Book");
      toast({ title: "Email sent successfully" });
      setEmailAddress("");
      setEmailDialogOpen(false);
    } catch (error) {
      toast({ title: "Failed to send email", variant: "destructive" });
    }
  };

  return (
    <aside className="w-[550px] bg-card border-l border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-inter font-semibold text-sm text-foreground flex items-center">
            <MessageCircle className="text-primary mr-2 w-4 h-4" />
            AI Chat Interface
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Ask questions about the paper</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-4 space-y-4">
            {(chatHistory as ChatMessage[]).map((chat: ChatMessage) => (
                <div key={chat.id} className="space-y-2">
                  {/* User Message */}
                  <div className="bg-muted rounded-lg p-3 ml-8">
                    <div className="flex items-start space-x-2">
                      <User className="text-muted-foreground mt-1 w-4 h-4" />
                      <div className="flex-1">
                        <p className="text-base text-foreground">{chat.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Bot className="text-primary mt-1 w-4 h-4" />
                      <div className="flex-1">
                        <div 
                          className={`text-lg text-foreground prose prose-lg max-w-none chat-response ${mathMode ? 'math-enabled' : 'math-disabled'}`}
                          dangerouslySetInnerHTML={renderMessageContent(chat.response)}
                        />
                        {/* Export Controls */}
                        <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-blue-200">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadPDF(chat.response)}
                            className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEmailDialog(chat.response)}
                            className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
                          >
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(chat.response)}
                            className="text-xs text-blue-600 hover:text-blue-800 p-1 h-auto"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Chat Input Form */}
        <div className="p-4 border-t border-border bg-card">
          {selectedText && (
            <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
              <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                Selected text:
              </div>
              <div className="text-xs text-muted-foreground truncate">
                "{selectedText.substring(0, 100)}..."
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSelectedTextUsed}
                className="text-xs text-blue-600 hover:text-blue-800 p-0 h-auto mt-1"
              >
                Clear selection
              </Button>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={selectedText ? "Ask about the selected text..." : "Ask a question about the document..."}
              className="min-h-[80px] resize-none text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={!message.trim() || chatMutation.isPending}
                size="sm"
                className="flex items-center space-x-2"
              >
                {chatMutation.isPending ? (
                  <>
                    <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Email Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email AI Response</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Email Address:</label>
              <Input
                type="email"
                placeholder="your-email@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Content Preview:</label>
              <div className="mt-1 p-3 bg-muted rounded text-xs max-h-32 overflow-y-auto">
                {contentToEmail.substring(0, 200)}...
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendEmail} disabled={!emailAddress}>
                Send Email
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}