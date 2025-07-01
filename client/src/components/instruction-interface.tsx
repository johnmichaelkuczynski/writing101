import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AIModel } from "@shared/schema";

interface InstructionInterfaceProps {
  selectedModel: AIModel;
}

export default function InstructionInterface({ selectedModel }: InstructionInterfaceProps) {
  const [instruction, setInstruction] = useState("");
  const { toast } = useToast();

  const instructionMutation = useMutation({
    mutationFn: async (data: { instruction: string; model: AIModel }) => {
      const response = await apiRequest("POST", "/api/instruction", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Instruction Processed",
        description: "AI response generated successfully",
      });
      setInstruction("");
      // You could display the response in a modal or update state
      console.log("AI Response:", data.response);
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
          <div className="flex justify-end">
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
