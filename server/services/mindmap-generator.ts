import type { AIModel } from "@shared/schema";
import { generateAIResponse } from "./ai-models";
import { paperContent } from "@shared/paper-content";

// Helper function to parse JSON from AI responses that may be wrapped in markdown
function parseAIResponse(response: string): any {
  // Remove markdown code blocks if present
  let cleanResponse = response.trim();
  
  // Handle markdown code blocks with language specification
  if (cleanResponse.startsWith('```json') && cleanResponse.endsWith('```')) {
    cleanResponse = cleanResponse.slice(7, -3).trim();
  } else if (cleanResponse.startsWith('```') && cleanResponse.endsWith('```')) {
    cleanResponse = cleanResponse.slice(3, -3).trim();
  }
  
  // Try to find JSON within the response if it's mixed with other text
  const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleanResponse = jsonMatch[0];
  }
  
  return JSON.parse(cleanResponse);
}

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

  const prompt = `Analyze this section of Wittgenstein's Tractatus and create a mind map structure.

Section: ${module.title}
Content: ${module.content}

Create a mind map with:
1. Central claim (main philosophical insight)
2. Supporting points (key propositions)
3. Examples (specific illustrations)
4. Potential objections (philosophical challenges)
5. Implications (consequences for philosophy)

Return ONLY valid JSON (no explanations, no markdown) with this structure:
{
  "centralClaim": "Main insight",
  "nodes": [
    {
      "type": "central|supporting|example|objection|implication",
      "label": "Brief label",
      "content": "Detailed explanation",
      "sourceText": "Relevant quote if any"
    }
  ],
  "relationships": [
    {
      "from": "node_index",
      "to": "node_index", 
      "type": "supports|objects|exemplifies|implies"
    }
  ]
}`;

  const response = await generateAIResponse(model, prompt, true);
  
  try {
    const aiResult = parseAIResponse(response);
    
    // Convert AI response to our MindMapNode format
    const nodes: MindMapNode[] = aiResult.nodes.map((node: any, index: number) => ({
      id: `${moduleId}-node-${index}`,
      type: node.type,
      label: node.label,
      content: node.content,
      position: calculateNodePosition(index, aiResult.nodes.length, node.type),
      metadata: {
        sourceText: node.sourceText,
        sectionId: moduleId
      }
    }));

    // Add central node
    const centralNode: MindMapNode = {
      id: `${moduleId}-central`,
      type: 'central',
      label: module.title,
      content: aiResult.centralClaim,
      position: { x: 0, y: 0 },
      metadata: { sectionId: moduleId }
    };

    const allNodes = [centralNode, ...nodes];

    // Create edges based on relationships
    const edges = aiResult.relationships?.map((rel: any, index: number) => ({
      id: `${moduleId}-edge-${index}`,
      source: rel.from === 'central' ? centralNode.id : allNodes[parseInt(rel.from) + 1]?.id,
      target: rel.to === 'central' ? centralNode.id : allNodes[parseInt(rel.to) + 1]?.id,
      type: rel.type
    })).filter((edge: any) => edge.source && edge.target) || [];

    return {
      id: moduleId,
      sectionId: moduleId,
      title: module.title,
      centralClaim: aiResult.centralClaim,
      nodes: allNodes,
      edges
    };
  } catch (error) {
    console.error('Failed to parse AI response for mind map:', error);
    // Fallback: create simple mind map from section structure
    return createFallbackMindMap(module);
  }
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
  const sectionsOverview = localMaps.map(map => ({
    id: map.id,
    title: map.title,
    centralClaim: map.centralClaim
  }));

  const prompt = `Analyze the overall structure of Wittgenstein's Tractatus based on these sections:

${sectionsOverview.map(s => `${s.id}: ${s.title} - ${s.centralClaim}`).join('\n')}

Create a meta-mind map showing how these sections relate to each other in Wittgenstein's philosophical argument. Consider:
- Logical progression (how each section builds on previous ones)
- Thematic relationships (shared concepts)
- Dialectical structure (tensions and resolutions)

Return ONLY valid JSON (no explanations, no markdown) with:
{
  "nodes": [
    {
      "id": "section_id",
      "label": "Brief section label",
      "summary": "How this fits in overall argument",
      "position": {"x": number, "y": number}
    }
  ],
  "edges": [
    {
      "source": "section_id",
      "target": "section_id",
      "relationship": "builds_on|contradicts|exemplifies|concludes"
    }
  ]
}`;

  const response = await generateAIResponse(model, prompt, true);
  
  try {
    const aiResult = parseAIResponse(response);
    
    return {
      id: 'tractatus-meta',
      title: 'Tractatus Logico-Philosophicus: Overall Structure',
      nodes: aiResult.nodes.map((node: any) => ({
        id: node.id,
        label: node.label,
        sectionId: node.id,
        position: node.position || { x: 0, y: 0 },
        summary: node.summary
      })),
      edges: aiResult.edges.map((edge: any, index: number) => ({
        id: `meta-edge-${index}`,
        source: edge.source,
        target: edge.target,
        relationship: edge.relationship
      }))
    };
  } catch (error) {
    console.error('Failed to parse meta mind map:', error);
    return createFallbackMetaMap(localMaps);
  }
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
  
  // Generate all local mind maps
  const localMaps: LocalMindMap[] = [];
  for (const module of modules) {
    const localMap = await generateLocalMindMap(module.id, model);
    localMaps.push(localMap);
  }
  
  // Generate meta mind map
  const metaMap = await generateMetaMindMap(localMaps, model);
  
  return {
    modules,
    metaMap,
    localMaps
  };
}