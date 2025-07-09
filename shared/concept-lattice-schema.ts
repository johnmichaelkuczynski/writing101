import { z } from "zod";

// Core concept lattice types
export interface ConceptNode {
  id: string;
  type: "main_idea" | "basic_argument" | "example" | "supporting_quote" | "fine_argument";
  content: string;
  parentId?: string;
  position: {
    x: number;
    y: number;
  };
  style: {
    fontSize: "large" | "medium" | "small" | "very_small" | "tiny";
    color?: string;
    isExpandable: boolean;
    isExpanded?: boolean;
  };
  metadata?: {
    sourceText?: string;
    confidence?: number;
    relatedNodes?: string[];
  };
}

export interface ConceptEdge {
  id: string;
  sourceId: string;
  targetId: string;
  type: "supports" | "illustrates" | "quotes" | "argues_for" | "nested_under";
  style: {
    strokeWidth: number;
    color: string;
    animated?: boolean;
  };
}

export interface ConceptLattice {
  id: string;
  title: string;
  sourceText: string;
  nodes: ConceptNode[];
  edges: ConceptEdge[];
  layout: {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
  metadata: {
    createdAt: Date;
    model: string;
    version: string;
  };
}

// Request schemas
export const conceptLatticeGenerateSchema = z.object({
  text: z.string().min(1),
  model: z.enum(["deepseek", "openai", "anthropic", "perplexity"]),
  globalInstructions: z.string().optional(),
});

export const conceptNodeEditSchema = z.object({
  nodeId: z.string(),
  newContent: z.string(),
  instruction: z.string().optional(),
  model: z.enum(["deepseek", "openai", "anthropic", "perplexity"]),
});

export const conceptLatticeRefineSchema = z.object({
  latticeId: z.string(),
  globalInstructions: z.string(),
  model: z.enum(["deepseek", "openai", "anthropic", "perplexity"]),
});

export type ConceptLatticeGenerateRequest = z.infer<typeof conceptLatticeGenerateSchema>;
export type ConceptNodeEditRequest = z.infer<typeof conceptNodeEditSchema>;
export type ConceptLatticeRefineRequest = z.infer<typeof conceptLatticeRefineSchema>;