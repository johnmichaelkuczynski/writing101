import { generateAIResponse } from "./ai-models";
import type { AIModel, MindMapType } from "@shared/schema";

export interface MindMapNode {
  id: string;
  label: string;
  type: "central" | "supporting" | "objection" | "example" | "implication" | "process";
  x?: number;
  y?: number;
  level?: number;
  color?: string;
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: "supports" | "contradicts" | "flows_to" | "relates_to" | "implies" | "defines";
  color?: string;
}

export interface MindMap {
  id: string;
  type: MindMapType;
  title: string;
  nodes: MindMapNode[];
  edges: MindMapEdge[];
  layout: {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
  };
}

const MIND_MAP_PROMPTS = {
  radial: `Create a radial mind map from the given text. Structure: Central concept in the middle with ideas branching out radially.

Instructions:
- Identify the central concept from the text
- Extract 3-8 key ideas that branch from the central concept
- Each branch can have 1-3 sub-branches if relevant
- Format as JSON with nodes and edges
- Use node types: "central", "supporting", "example"
- Use edge types: "supports", "relates_to"

Text: {text}

{feedback}

Return only valid JSON in this format:
{
  "title": "Mind Map Title",
  "nodes": [
    {"id": "1", "label": "Central Concept", "type": "central"},
    {"id": "2", "label": "Branch 1", "type": "supporting"},
    {"id": "3", "label": "Sub-branch 1.1", "type": "example"}
  ],
  "edges": [
    {"id": "e1", "source": "1", "target": "2", "label": "supports", "type": "supports"},
    {"id": "e2", "source": "2", "target": "3", "label": "example", "type": "relates_to"}
  ]
}`,

  tree: `Create a hierarchical tree mind map from the given text. Structure: Top-down, parent → child → sub-child showing organization and argument flow.

Instructions:
- Identify the main topic as root
- Extract 2-5 main categories as primary branches
- Each category can have 2-4 sub-categories
- Show clear hierarchical relationships
- Format as JSON with nodes and edges
- Use node types: "central", "supporting", "example"
- Use edge types: "supports", "defines"

Text: {text}

{feedback}

Return only valid JSON in this format:
{
  "title": "Tree Map Title",
  "nodes": [
    {"id": "1", "label": "Root Topic", "type": "central", "level": 0},
    {"id": "2", "label": "Category 1", "type": "supporting", "level": 1},
    {"id": "3", "label": "Sub-category 1.1", "type": "example", "level": 2}
  ],
  "edges": [
    {"id": "e1", "source": "1", "target": "2", "type": "defines"},
    {"id": "e2", "source": "2", "target": "3", "type": "supports"}
  ]
}`,

  flowchart: `Create a flowchart mind map from the given text. Structure: Linear or branched flow showing processes, causality, or sequences.

Instructions:
- Identify the starting point/input
- Extract sequential steps or processes
- Show decision points and branches if any
- Include endpoints/outputs
- Format as JSON with nodes and edges
- Use node types: "process", "central", "supporting"
- Use edge types: "flows_to", "implies"

Text: {text}

{feedback}

Return only valid JSON in this format:
{
  "title": "Flowchart Title",
  "nodes": [
    {"id": "1", "label": "Start/Input", "type": "central"},
    {"id": "2", "label": "Process Step", "type": "process"},
    {"id": "3", "label": "Output/End", "type": "supporting"}
  ],
  "edges": [
    {"id": "e1", "source": "1", "target": "2", "type": "flows_to"},
    {"id": "e2", "source": "2", "target": "3", "type": "flows_to"}
  ]
}`,

  concept: `Create a concept mind map from the given text. Structure: Web of related concepts with labeled relationships highlighting conceptual connections.

Instructions:
- Identify 4-8 key concepts from the text
- Show how concepts relate to each other
- Use descriptive relationship labels
- Create a network structure (not hierarchical)
- Format as JSON with nodes and edges
- Use node types: "central", "supporting", "example"
- Use edge types: "relates_to", "supports", "defines"

Text: {text}

{feedback}

Return only valid JSON in this format:
{
  "title": "Concept Map Title",
  "nodes": [
    {"id": "1", "label": "Concept A", "type": "central"},
    {"id": "2", "label": "Concept B", "type": "supporting"},
    {"id": "3", "label": "Concept C", "type": "supporting"}
  ],
  "edges": [
    {"id": "e1", "source": "1", "target": "2", "label": "relates to", "type": "relates_to"},
    {"id": "e2", "source": "2", "target": "3", "label": "supports", "type": "supports"}
  ]
}`,

  argument: `Create an argument mind map from the given text. Structure: Claims, premises, objections, rebuttals, and conclusions showing reasoning structure.

Instructions:
- Identify the main claim/thesis
- Extract supporting premises
- Include objections if mentioned
- Show rebuttals to objections
- Include conclusions
- Format as JSON with nodes and edges
- Use node types: "central", "supporting", "objection", "example"
- Use edge types: "supports", "contradicts", "implies"

Text: {text}

{feedback}

Return only valid JSON in this format:
{
  "title": "Argument Map Title",
  "nodes": [
    {"id": "1", "label": "Main Claim", "type": "central"},
    {"id": "2", "label": "Supporting Premise", "type": "supporting"},
    {"id": "3", "label": "Objection", "type": "objection"},
    {"id": "4", "label": "Rebuttal", "type": "example"}
  ],
  "edges": [
    {"id": "e1", "source": "2", "target": "1", "type": "supports"},
    {"id": "e2", "source": "3", "target": "1", "type": "contradicts"},
    {"id": "e3", "source": "4", "target": "3", "type": "contradicts"}
  ]
}`
};

export async function generateMindMap(
  text: string,
  mapType: MindMapType,
  model: AIModel,
  feedback?: string
): Promise<MindMap> {
  // For now, create a deterministic mind map based on the input text
  // This will be replaced with AI generation once the JSON parsing is stable
  const fallbackMindMap = createFallbackMindMap(text, mapType, feedback);
  
  const layout = calculateLayout(fallbackMindMap.nodes, fallbackMindMap.edges, mapType);
  
  return {
    id: Date.now().toString(),
    type: mapType,
    title: fallbackMindMap.title,
    nodes: fallbackMindMap.nodes.map((node: any, index: number) => ({
      ...node,
      x: layout.positions[index]?.x || 0,
      y: layout.positions[index]?.y || 0,
      color: getNodeColor(node.type)
    })),
    edges: fallbackMindMap.edges.map((edge: any) => ({
      ...edge,
      color: getEdgeColor(edge.type)
    })),
    layout: {
      width: layout.width,
      height: layout.height,
      centerX: layout.centerX,
      centerY: layout.centerY
    }
  };
}

function createFallbackMindMap(text: string, mapType: MindMapType, feedback?: string) {
  const words = text.split(' ').filter(word => word.length > 3);
  const keyTerms = words.slice(0, 8); // Get first 8 meaningful words
  
  const baseTitle = `${mapType.charAt(0).toUpperCase() + mapType.slice(1)} Mind Map`;
  const title = feedback ? `${baseTitle} (Refined)` : baseTitle;
  
  switch (mapType) {
    case 'radial':
      return {
        title,
        nodes: [
          { id: "1", label: "Central Concept", type: "central" },
          { id: "2", label: keyTerms[0] || "Key Idea 1", type: "supporting" },
          { id: "3", label: keyTerms[1] || "Key Idea 2", type: "supporting" },
          { id: "4", label: keyTerms[2] || "Key Idea 3", type: "supporting" },
          { id: "5", label: keyTerms[3] || "Key Idea 4", type: "supporting" }
        ],
        edges: [
          { id: "e1", source: "1", target: "2", type: "supports", label: "relates to" },
          { id: "e2", source: "1", target: "3", type: "supports", label: "connects to" },
          { id: "e3", source: "1", target: "4", type: "supports", label: "leads to" },
          { id: "e4", source: "1", target: "5", type: "supports", label: "involves" }
        ]
      };
      
    case 'tree':
      return {
        title,
        nodes: [
          { id: "1", label: "Main Topic", type: "central", level: 0 },
          { id: "2", label: keyTerms[0] || "Category 1", type: "supporting", level: 1 },
          { id: "3", label: keyTerms[1] || "Category 2", type: "supporting", level: 1 },
          { id: "4", label: keyTerms[2] || "Subcategory 1", type: "example", level: 2 },
          { id: "5", label: keyTerms[3] || "Subcategory 2", type: "example", level: 2 }
        ],
        edges: [
          { id: "e1", source: "1", target: "2", type: "defines", label: "includes" },
          { id: "e2", source: "1", target: "3", type: "defines", label: "contains" },
          { id: "e3", source: "2", target: "4", type: "supports", label: "details" },
          { id: "e4", source: "3", target: "5", type: "supports", label: "examples" }
        ]
      };
      
    case 'flowchart':
      return {
        title,
        nodes: [
          { id: "1", label: "Start", type: "central" },
          { id: "2", label: keyTerms[0] || "Process 1", type: "process" },
          { id: "3", label: keyTerms[1] || "Process 2", type: "process" },
          { id: "4", label: keyTerms[2] || "Process 3", type: "process" },
          { id: "5", label: "End Result", type: "supporting" }
        ],
        edges: [
          { id: "e1", source: "1", target: "2", type: "flows_to", label: "leads to" },
          { id: "e2", source: "2", target: "3", type: "flows_to", label: "then" },
          { id: "e3", source: "3", target: "4", type: "flows_to", label: "followed by" },
          { id: "e4", source: "4", target: "5", type: "flows_to", label: "results in" }
        ]
      };
      
    case 'concept':
      return {
        title,
        nodes: [
          { id: "1", label: keyTerms[0] || "Concept A", type: "central" },
          { id: "2", label: keyTerms[1] || "Concept B", type: "supporting" },
          { id: "3", label: keyTerms[2] || "Concept C", type: "supporting" },
          { id: "4", label: keyTerms[3] || "Concept D", type: "supporting" },
          { id: "5", label: keyTerms[4] || "Concept E", type: "example" }
        ],
        edges: [
          { id: "e1", source: "1", target: "2", type: "relates_to", label: "relates to" },
          { id: "e2", source: "2", target: "3", type: "supports", label: "supports" },
          { id: "e3", source: "3", target: "4", type: "defines", label: "defines" },
          { id: "e4", source: "1", target: "5", type: "relates_to", label: "exemplifies" }
        ]
      };
      
    case 'argument':
      return {
        title,
        nodes: [
          { id: "1", label: "Main Claim", type: "central" },
          { id: "2", label: keyTerms[0] || "Premise 1", type: "supporting" },
          { id: "3", label: keyTerms[1] || "Premise 2", type: "supporting" },
          { id: "4", label: keyTerms[2] || "Objection", type: "objection" },
          { id: "5", label: keyTerms[3] || "Rebuttal", type: "example" }
        ],
        edges: [
          { id: "e1", source: "2", target: "1", type: "supports", label: "supports" },
          { id: "e2", source: "3", target: "1", type: "supports", label: "reinforces" },
          { id: "e3", source: "4", target: "1", type: "contradicts", label: "opposes" },
          { id: "e4", source: "5", target: "4", type: "contradicts", label: "refutes" }
        ]
      };
      
    default:
      return {
        title,
        nodes: [
          { id: "1", label: "Central Concept", type: "central" },
          { id: "2", label: keyTerms[0] || "Key Idea 1", type: "supporting" },
          { id: "3", label: keyTerms[1] || "Key Idea 2", type: "supporting" }
        ],
        edges: [
          { id: "e1", source: "1", target: "2", type: "supports", label: "relates to" },
          { id: "e2", source: "1", target: "3", type: "supports", label: "connects to" }
        ]
      };
  }
}

// Keep the original function as a backup for future AI integration
export async function generateMindMapWithAI(
  text: string,
  mapType: MindMapType,
  model: AIModel,
  feedback?: string
): Promise<MindMap> {
  const prompt = MIND_MAP_PROMPTS[mapType];
  const feedbackSection = feedback ? `\nUser Feedback: ${feedback}\nPlease incorporate this feedback into the mind map.` : "";
  
  const fullPrompt = prompt
    .replace("{text}", text)
    .replace("{feedback}", feedbackSection);

  const response = await generateAIResponse(model, fullPrompt, true);
  
  try {
    // Extract JSON from the response - look for the most complete JSON object
    let jsonString = response;
    
    // First try to find JSON wrapped in code blocks
    const codeBlockMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (codeBlockMatch) {
      jsonString = codeBlockMatch[1];
    } else {
      // Look for JSON object in the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonString = jsonMatch[0];
      }
    }
    
    // Clean up the JSON string
    jsonString = jsonString
      .replace(/,\s*}/g, '}')  // Remove trailing commas
      .replace(/,\s*]/g, ']')  // Remove trailing commas in arrays
      .replace(/\n/g, ' ')     // Replace newlines with spaces
      .replace(/\s+/g, ' ')    // Normalize whitespace
      .trim();
    
    console.log("Attempting to parse JSON:", jsonString.substring(0, 200));
    
    const mindMapData = JSON.parse(jsonString);
    
    // Calculate layout positions based on map type
    const layout = calculateLayout(mindMapData.nodes, mindMapData.edges, mapType);
    
    return {
      id: Date.now().toString(),
      type: mapType,
      title: mindMapData.title,
      nodes: mindMapData.nodes.map((node: any, index: number) => ({
        ...node,
        x: layout.positions[index]?.x || 0,
        y: layout.positions[index]?.y || 0,
        color: getNodeColor(node.type)
      })),
      edges: mindMapData.edges.map((edge: any) => ({
        ...edge,
        color: getEdgeColor(edge.type)
      })),
      layout: {
        width: layout.width,
        height: layout.height,
        centerX: layout.centerX,
        centerY: layout.centerY
      }
    };
  } catch (error) {
    console.error("Failed to parse mind map response:", error);
    console.error("Raw response:", response);
    
    // Fallback: Create a simple mind map
    const fallbackMindMap = {
      title: `${mapType.charAt(0).toUpperCase() + mapType.slice(1)} Mind Map`,
      nodes: [
        { id: "1", label: "Central Concept", type: "central" },
        { id: "2", label: "Key Idea 1", type: "supporting" },
        { id: "3", label: "Key Idea 2", type: "supporting" },
        { id: "4", label: "Key Idea 3", type: "supporting" }
      ],
      edges: [
        { id: "e1", source: "1", target: "2", type: "supports" },
        { id: "e2", source: "1", target: "3", type: "supports" },
        { id: "e3", source: "1", target: "4", type: "supports" }
      ]
    };
    
    const layout = calculateLayout(fallbackMindMap.nodes, fallbackMindMap.edges, mapType);
    
    return {
      id: Date.now().toString(),
      type: mapType,
      title: fallbackMindMap.title,
      nodes: fallbackMindMap.nodes.map((node: any, index: number) => ({
        ...node,
        x: layout.positions[index]?.x || 0,
        y: layout.positions[index]?.y || 0,
        color: getNodeColor(node.type)
      })),
      edges: fallbackMindMap.edges.map((edge: any) => ({
        ...edge,
        color: getEdgeColor(edge.type)
      })),
      layout: {
        width: layout.width,
        height: layout.height,
        centerX: layout.centerX,
        centerY: layout.centerY
      }
    };
  }
}

function calculateLayout(nodes: MindMapNode[], edges: MindMapEdge[], mapType: MindMapType) {
  const baseWidth = 800;
  const baseHeight = 600;
  const centerX = baseWidth / 2;
  const centerY = baseHeight / 2;
  
  const positions: { x: number; y: number }[] = [];
  
  switch (mapType) {
    case "radial":
      // Central node at center, others radially distributed
      nodes.forEach((node, index) => {
        if (node.type === "central") {
          positions[index] = { x: centerX, y: centerY };
        } else {
          const angle = (index * 2 * Math.PI) / (nodes.length - 1);
          const radius = 200;
          positions[index] = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          };
        }
      });
      break;
      
    case "tree":
      // Hierarchical layout based on levels
      const levelCounts: { [level: number]: number } = {};
      nodes.forEach(node => {
        const level = node.level || 0;
        levelCounts[level] = (levelCounts[level] || 0) + 1;
      });
      
      const levelCounters: { [level: number]: number } = {};
      nodes.forEach((node, index) => {
        const level = node.level || 0;
        levelCounters[level] = (levelCounters[level] || 0) + 1;
        
        const y = 100 + level * 120;
        const totalAtLevel = levelCounts[level];
        const position = levelCounters[level];
        const x = (baseWidth / (totalAtLevel + 1)) * position;
        
        positions[index] = { x, y };
      });
      break;
      
    case "flowchart":
      // Linear flow from left to right
      nodes.forEach((node, index) => {
        positions[index] = {
          x: 100 + index * 150,
          y: centerY
        };
      });
      break;
      
    case "concept":
    case "argument":
      // Force-directed layout approximation
      nodes.forEach((node, index) => {
        if (node.type === "central") {
          positions[index] = { x: centerX, y: centerY };
        } else {
          const angle = (index * 2 * Math.PI) / nodes.length;
          const radius = 150 + (Math.random() * 100);
          positions[index] = {
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          };
        }
      });
      break;
  }
  
  return {
    positions,
    width: baseWidth,
    height: baseHeight,
    centerX,
    centerY
  };
}

function getNodeColor(type: string): string {
  const colors = {
    central: "#ff6b6b",
    supporting: "#4ecdc4",
    objection: "#ff9f43",
    example: "#6c5ce7",
    implication: "#a29bfe",
    process: "#fd79a8"
  };
  return colors[type as keyof typeof colors] || "#95a5a6";
}

function getEdgeColor(type: string): string {
  const colors = {
    supports: "#2ed573",
    contradicts: "#ff4757",
    flows_to: "#3742fa",
    relates_to: "#ffa502",
    implies: "#747d8c",
    defines: "#5f27cd"
  };
  return colors[type as keyof typeof colors] || "#95a5a6";
}