import type { AIModel } from "@shared/schema";
import { generateAIResponse } from "./ai-models";
import { paperContent } from "@shared/paper-content";

export interface MindMapNode {
  id: string;
  type: 'central' | 'supporting' | 'example' | 'objection' | 'implication';
  label: string;
  content: string;
  position: { x: number; y: number };
  children?: string[];
  parent?: string;
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

async function segmentBookIntoModules(): Promise<BookStructure['modules']> {
  // Use the existing sections from paper-content.ts but enhance with AI analysis
  const modules = paperContent.sections.map((section, index) => ({
    id: section.id,
    title: section.title,
    content: section.content,
    propositions: extractPropositions(section.content),
    centralTheme: extractCentralTheme(section.title, section.content)
  }));

  return modules;
}

function extractPropositions(content: string): string[] {
  // Extract numbered propositions from Wittgenstein's text
  const propositionRegex = /^(\d+(?:\.\d+)*)\s+(.+?)(?=\n\n|\n\d+|\n[A-Z]|$)/gm;
  const propositions: string[] = [];
  let match;

  while ((match = propositionRegex.exec(content)) !== null) {
    propositions.push(`${match[1]} ${match[2].trim()}`);
  }

  return propositions;
}

function extractCentralTheme(title: string, content: string): string {
  // Extract the main philosophical concept from each section
  const themes: { [key: string]: string } = {
    'the-world': 'Reality as totality of facts',
    'atomic-facts': 'Simple objects and atomic facts',
    'pictures-propositions': 'Picture theory of meaning',
    'thought-language': 'Logical structure of language',
    'truth-functions': 'Truth-functional analysis',
    'ethics-mystical': 'Limits of expression',
    'limits-silence': 'What cannot be said'
  };

  return themes[title.toLowerCase().replace(/\s+/g, '-')] || title;
}

export async function generateLocalMindMap(
  moduleId: string, 
  model: AIModel = 'anthropic'
): Promise<LocalMindMap> {
  const module = paperContent.sections.find(s => s.id === moduleId);
  if (!module) throw new Error(`Module ${moduleId} not found`);

  // Use fallback approach for immediate response
  return createFallbackMindMap(module);
}

function calculateNodePosition(index: number, total: number, type: string): { x: number; y: number } {
  const radius = type === 'central' ? 0 : 200;
  const angle = (2 * Math.PI * index) / total;
  
  // Adjust radius based on node type
  const typeRadius = {
    'central': 0,
    'supporting': 200,
    'example': 300,
    'objection': 250,
    'implication': 350
  };

  const finalRadius = typeRadius[type as keyof typeof typeRadius] || radius;
  
  return {
    x: Math.cos(angle) * finalRadius,
    y: Math.sin(angle) * finalRadius
  };
}

function createFallbackMindMap(section: any): LocalMindMap {
  const propositions = extractPropositions(section.content);
  
  const centralNode: MindMapNode = {
    id: `${section.id}-central`,
    type: 'central',
    label: section.title,
    content: extractCentralTheme(section.title, section.content),
    position: { x: 0, y: 0 },
    metadata: { sectionId: section.id }
  };

  const nodes: MindMapNode[] = [centralNode];
  const edges: any[] = [];

  propositions.forEach((prop, index) => {
    const node: MindMapNode = {
      id: `${section.id}-prop-${index}`,
      type: 'supporting',
      label: prop.split(' ').slice(0, 5).join(' ') + '...',
      content: prop,
      position: calculateNodePosition(index, propositions.length, 'supporting'),
      metadata: {
        proposition: prop,
        sectionId: section.id
      }
    };
    
    nodes.push(node);
    edges.push({
      id: `${section.id}-edge-${index}`,
      source: centralNode.id,
      target: node.id,
      type: 'supports'
    });
  });

  return {
    id: section.id,
    sectionId: section.id,
    title: section.title,
    centralClaim: extractCentralTheme(section.title, section.content),
    nodes,
    edges
  };
}

export async function generateMetaMindMap(
  localMaps: LocalMindMap[],
  model: AIModel = 'anthropic'
): Promise<MetaMindMap> {
  // Use fallback approach for immediate response
  // TODO: Implement AI enhancement in background
  return createFallbackMetaMap(localMaps);
}

function createFallbackMetaMap(localMaps: LocalMindMap[]): MetaMindMap {
  const nodes = localMaps.map((map, index) => ({
    id: map.id,
    label: map.title.split(' - ')[1] || map.title,
    sectionId: map.id,
    position: {
      x: (index % 3) * 300 - 300,
      y: Math.floor(index / 3) * 200 - 200
    },
    summary: map.centralClaim
  }));

  const edges = localMaps.slice(0, -1).map((map, index) => ({
    id: `meta-edge-${index}`,
    source: map.id,
    target: localMaps[index + 1].id,
    relationship: 'builds_on' as const
  }));

  return {
    id: 'tractatus-meta',
    title: 'Tractatus Logico-Philosophicus: Overall Structure', 
    nodes,
    edges
  };
}

export async function generateAllMindMaps(model: AIModel = 'anthropic'): Promise<BookStructure> {
  const modules = await segmentBookIntoModules();
  
  // Generate fallback local mind maps immediately (can be enhanced with AI later)
  const localMaps: LocalMindMap[] = modules.map(module => 
    createFallbackMindMap({ id: module.id, title: module.title, content: module.content })
  );
  
  // Generate fallback meta mind map
  const metaMap = createFallbackMetaMap(localMaps);
  
  // TODO: Add AI enhancement in background processing
  
  return {
    modules,
    metaMap,
    localMaps
  };
}