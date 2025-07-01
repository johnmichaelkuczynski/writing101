import { useState } from "react";
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
import type { AIModel, ChatMessage } from "@shared/schema";

interface ChatInterfaceProps {
  selectedModel: AIModel;
}

export default function ChatInterface({ selectedModel }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [contentToEmail, setContentToEmail] = useState("");
  const { toast } = useToast();

  const { data: chatHistory = [], refetch } = useQuery({
    queryKey: ["/api/chat/history"],
    refetchInterval: 5000,
  });

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
    
    chatMutation.mutate({
      message: message.trim(),
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
    <aside className="w-[420px] bg-card border-l border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-muted px-4 py-3 border-b border-border">
          <h3 className="font-inter font-semibold text-sm text-foreground flex items-center">
            <MessageCircle className="text-primary mr-2 w-4 h-4" />
            AI Chat Interface
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Ask questions about the paper</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {(chatHistory as ChatMessage[]).map((chat: ChatMessage) => (
                <div key={chat.id} className="space-y-2">
                  {/* User Message */}
                  <div className="bg-muted rounded-lg p-3 ml-8">
                    <div className="flex items-start space-x-2">
                      <User className="text-muted-foreground mt-1 w-4 h-4" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{chat.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Bot className="text-primary mt-1 w-4 h-4" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground whitespace-pre-wrap">
                          {chat.response}
                        </p>
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
          </ScrollArea>
        </div>

        {/* Chat Input - Much Bigger */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the paper..."
              className="min-h-[120px] text-sm resize-none"
              disabled={chatMutation.isPending}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={!message.trim() || chatMutation.isPending}
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>
                  {chatMutation.isPending ? "Asking..." : "Ask Question"}
                </span>
              </Button>
            </div>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Supports Markdown + KaTeX. All responses preserve mathematical notation.
          </p>
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