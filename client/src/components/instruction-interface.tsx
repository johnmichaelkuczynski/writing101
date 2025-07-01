import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import VoiceRecorder from "@/components/voice-recorder";
import type { AIModel } from "@shared/schema";

interface InstructionInterfaceProps {
  selectedModel: AIModel;
}

export default function InstructionInterface({ selectedModel }: InstructionInterfaceProps) {
  const [instruction, setInstruction] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const instructionMutation = useMutation({
    mutationFn: async (data: { instruction: string; model: AIModel }) => {
      const response = await apiRequest("POST", "/api/instruction", data);
      return response.json();
    },
    onSuccess: async (data) => {
      // Add the instruction and response to chat history as a fake chat message
      const fakeMessage = {
        id: Date.now(),
        message: instruction,
        response: data.response,
        model: selectedModel,
        timestamp: new Date(),
        context: null
      };
      
      // Add to chat history by calling the backend
      try {
        await apiRequest("POST", "/api/chat", {
          message: instruction,
          model: selectedModel
        });
      } catch (error) {
        // If that fails, at least show a toast
        console.log("AI Response:", data.response);
      }
      
      toast({
        title: "Response Ready",
        description: "Check the chat panel for your answer",
      });
      setInstruction("");
      
      // Force refresh chat history
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!instruction.trim()) return;
    
    instructionMutation.mutate({
      instruction: instruction.trim(),
      model: selectedModel,
    });
  };

  return (
    <div className="bg-card border-t border-border p-6 fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-4xl">
        <h2 className="font-inter font-semibold text-lg text-foreground mb-3">
          AI Instruction Interface
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (instruction.trim() && !instructionMutation.isPending) {
                  handleSubmit(e);
                }
              }
            }}
            className="w-full h-24 resize-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a question, give a command, or modify the content... (Press Enter to send, Shift+Enter for new line)"
            autoFocus
          />
          <div className="flex justify-between items-center">
            <VoiceRecorder 
              onTranscription={(text) => setInstruction(prev => prev + (prev ? ' ' : '') + text)}
              disabled={instructionMutation.isPending}
            />
            <Button
              type="submit"
              disabled={!instruction.trim() || instructionMutation.isPending}
              className="flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>
                {instructionMutation.isPending ? "Processing..." : "Send Instruction"}
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
