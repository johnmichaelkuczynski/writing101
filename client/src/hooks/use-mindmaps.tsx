import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGet } from "@/lib/queryClient";
import type { AIModel } from "@shared/schema";

export interface MindMapNode {
  id: string;
  type: 'central' | 'supporting' | 'example' | 'objection' | 'implication';
  label: string;
  content: string;
  position: { x: number; y: number };
  metadata?: {
    sourceText?: string;
    proposition?: string;
    sectionId?: string;
  };
}

export interface LocalMindMap {
  id: string;
  sectionId: string;
  title: string;
  centralClaim: string;
  nodes: MindMapNode[];
  edges: Array<{
    id: string;
    source: string;
    target: string;
    type: 'supports' | 'objects' | 'exemplifies' | 'implies';
  }>;
}

export interface MetaMindMap {
  id: string;
  title: string;
  nodes: Array<{
    id: string;
    label: string;
    sectionId: string;
    position: { x: number; y: number };
    summary: string;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    relationship: 'builds_on' | 'contradicts' | 'exemplifies' | 'concludes';
  }>;
}

export interface BookStructure {
  modules: Array<{
    id: string;
    title: string;
    content: string;
    propositions: string[];
    centralTheme: string;
  }>;
  metaMap: MetaMindMap;
  localMaps: LocalMindMap[];
}

export function useMindMapStructure(model: AIModel = 'anthropic') {
  return useQuery<BookStructure>({
    queryKey: ['/api/mindmaps/structure', model],
    queryFn: () => apiGet(`/api/mindmaps/structure?model=${model}`),
    staleTime: 30 * 60 * 1000, // 30 minutes - mind maps are relatively static
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useLocalMindMap(sectionId: string, model: AIModel = 'anthropic') {
  return useQuery<LocalMindMap>({
    queryKey: ['/api/mindmaps/local', sectionId, model],
    queryFn: () => apiGet(`/api/mindmaps/local/${sectionId}?model=${model}`),
    enabled: !!sectionId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useMetaMindMap(model: AIModel = 'anthropic') {
  return useQuery<MetaMindMap>({
    queryKey: ['/api/mindmaps/meta', model],
    queryFn: () => apiGet(`/api/mindmaps/meta?model=${model}`),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

export function useMindMaps() {
  const queryClient = useQueryClient();

  const preloadMindMaps = async (model: AIModel = 'anthropic') => {
    // Preload the entire structure
    return queryClient.prefetchQuery({
      queryKey: ['/api/mindmaps/structure', model],
      queryFn: () => apiGet(`/api/mindmaps/structure?model=${model}`),
      staleTime: 30 * 60 * 1000,
    });
  };

  const preloadLocalMindMap = async (sectionId: string, model: AIModel = 'anthropic') => {
    return queryClient.prefetchQuery({
      queryKey: ['/api/mindmaps/local', sectionId, model],
      queryFn: () => apiGet(`/api/mindmaps/local/${sectionId}?model=${model}`),
      staleTime: 30 * 60 * 1000,
    });
  };

  const clearMindMapCache = () => {
    queryClient.removeQueries({ queryKey: ['/api/mindmaps'] });
  };

  return {
    preloadMindMaps,
    preloadLocalMindMap,
    clearMindMapCache,
  };
}