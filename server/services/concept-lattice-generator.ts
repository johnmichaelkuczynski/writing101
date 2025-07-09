import { generateAIResponse } from "./ai-models";
import type { AIModel } from "@shared/schema";
import type { ConceptLattice, ConceptNode, ConceptEdge } from "@shared/concept-lattice-schema";

export async function generateConceptLattice(
  text: string,
  model: AIModel,
  globalInstructions?: string
): Promise<ConceptLattice> {
  const prompt = `
Analyze the following text and create a structured concept lattice with these specific components:

TEXT TO ANALYZE:
${text}

${globalInstructions ? `GLOBAL INSTRUCTIONS: ${globalInstructions}\n` : ''}

Create a JSON response with this exact structure:

{
  "title": "Brief descriptive title for the concept lattice",
  "nodes": [
    {
      "id": "unique_id",
      "type": "main_idea|basic_argument|example|supporting_quote|fine_argument",
      "content": "The actual content text",
      "parentId": "parent_node_id_if_applicable",
      "position": {"x": number, "y": number},
      "style": {
        "fontSize": "large|medium|small|very_small|tiny",
        "color": "#hexcolor",
        "isExpandable": boolean,
        "isExpanded": false
      }
    }
  ],
  "edges": [
    {
      "id": "edge_id",
      "sourceId": "source_node_id",
      "targetId": "target_node_id", 
      "type": "supports|illustrates|quotes|argues_for|nested_under",
      "style": {
        "strokeWidth": number,
        "color": "#hexcolor"
      }
    }
  ]
}

REQUIREMENTS:
1. Main Ideas: 2-4 central concepts, large font, distinct colors, positioned centrally
2. Basic Arguments: Support main ideas, medium font, expandable, connected by lines
3. Examples: Illustrate arguments, small font, use emojis appropriately (🎯, 📌, etc)
4. Supporting Quotes: Extract key quotes, very small font, with quotation marks
5. Fine Arguments: Detailed sub-points, tiny font, nested under basic arguments

Position nodes in a logical layout with main ideas at center and supporting elements radiating outward.
Use colors that create visual hierarchy and connection patterns.
All nodes except main ideas should be expandable.

Return ONLY the JSON object, no additional text.
`;

  const response = await generateAIResponse(model, prompt, false);
  
  try {
    const parsed = JSON.parse(response);
    
    const latticeId = `lattice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const lattice: ConceptLattice = {
      id: latticeId,
      title: parsed.title || "Concept Lattice",
      sourceText: text,
      nodes: parsed.nodes || [],
      edges: parsed.edges || [],
      layout: {
        width: 1200,
        height: 800,
        centerX: 600,
        centerY: 400
      },
      metadata: {
        createdAt: new Date(),
        model: model,
        version: "1.0"
      }
    };

    return lattice;
  } catch (error) {
    console.error("Failed to parse concept lattice response:", error);
    throw new Error("Failed to generate concept lattice structure");
  }
}

export async function editConceptNode(
  lattice: ConceptLattice,
  nodeId: string,
  newContent: string,
  instruction: string,
  model: AIModel
): Promise<ConceptNode> {
  const node = lattice.nodes.find(n => n.id === nodeId);
  if (!node) {
    throw new Error("Node not found");
  }

  const prompt = `
You are editing a concept lattice node. Here's the context:

ORIGINAL NODE:
Type: ${node.type}
Content: ${node.content}

EDIT INSTRUCTION: ${instruction}
NEW CONTENT REQUEST: ${newContent}

SOURCE TEXT CONTEXT:
${lattice.sourceText}

Generate an improved version of this node that:
1. Maintains the same type (${node.type})
2. Follows the instruction: ${instruction}
3. Incorporates the new content: ${newContent}
4. Stays relevant to the source text
5. Maintains appropriate style for ${node.type}

For examples, use emojis appropriately (🎯, 📌, etc).
For quotes, include quotation marks.
For arguments, be clear and logical.

Return ONLY the improved content text, no additional formatting or explanation.
`;

  const response = await generateAIResponse(model, prompt, false);

  return {
    ...node,
    content: response.trim()
  };
}

export async function refineConceptLattice(
  lattice: ConceptLattice,
  globalInstructions: string,
  model: AIModel
): Promise<ConceptLattice> {
  const prompt = `
You have a concept lattice that needs global refinement based on user instructions.

CURRENT LATTICE:
Title: ${lattice.title}
Source Text: ${lattice.sourceText}

CURRENT NODES:
${lattice.nodes.map(node => `${node.type}: ${node.content}`).join('\n')}

USER GLOBAL INSTRUCTIONS:
${globalInstructions}

Apply these instructions to modify the lattice structure. You can:
- Reorganize connections between ideas and arguments
- Replace quotes with examples or vice versa
- Change argument assignments to different main ideas
- Add new supporting elements
- Remove or modify existing elements

Return a JSON response with the same structure as the original:
{
  "title": "Updated title if needed",
  "nodes": [...],
  "edges": [...]
}

Maintain the position and style structure but update content and connections as requested.
Return ONLY the JSON object.
`;

  const response = await generateAIResponse(model, prompt, false);
  
  try {
    const parsed = JSON.parse(response);
    
    return {
      ...lattice,
      title: parsed.title || lattice.title,
      nodes: parsed.nodes || lattice.nodes,
      edges: parsed.edges || lattice.edges,
      metadata: {
        ...lattice.metadata,
        createdAt: new Date()
      }
    };
  } catch (error) {
    console.error("Failed to parse refined lattice response:", error);
    throw new Error("Failed to refine concept lattice");
  }
}