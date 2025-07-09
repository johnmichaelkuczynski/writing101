import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AIModel } from "@shared/schema";
import type { MindMap, MindMapType } from "@shared/schema";

interface GenerateMindMapParams {
  text: string;
  mapType: MindMapType;
  model: AIModel;
  feedback?: string;
}

export function useMindMap() {
  const [mindMap, setMindMap] = useState<MindMap | null>(null);

  const mutation = useMutation({
    mutationFn: async (params: GenerateMindMapParams) => {
      const response = await fetch('/api/mindmap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data as MindMap;
    },
    onSuccess: (data) => {
      setMindMap(data);
    }
  });

  return {
    data: mindMap,
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error
  };
}