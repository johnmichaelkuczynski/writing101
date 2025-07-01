import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [emailAddress, setEmailAddress] = useState("");
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

  const handleEmail = async (content: string) => {
    if (!emailAddress) {
      toast({ title: "Please enter an email address", variant: "destructive" });
      return;
    }

    try {
      await emailContent(content, emailAddress, "AI Response from Living Book");
      toast({ title: "Email sent successfully" });
      setEmailAddress("");
    } catch (error) {
      toast({ title: "Failed to send email", variant: "destructive" });
    }
  };

  return (
    <aside className="w-[800px] bg-card border-l border-border sticky top-16 h-[calc(100vh-280px)]">
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
              {chatHistory.map((chat: ChatMessage) => (
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
                            onClick={() => handleEmail(chat.response)}
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

        {/* Email Input */}
        <div className="border-t border-border p-4">
          <Input
            type="email"
            placeholder="Email address for sending responses"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="mb-2 text-xs"
          />
        </div>

        {/* Chat Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the paper..."
              className="flex-1 text-sm"
              disabled={chatMutation.isPending}
            />
            <Button
              type="submit"
              size="sm"
              disabled={!message.trim() || chatMutation.isPending}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Supports Markdown + KaTeX. All responses preserve mathematical notation.
          </p>
        </div>
      </div>
    </aside>
  );
}
