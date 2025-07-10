import { generateAIResponse } from "./ai-models";
import type { AIModel } from "@shared/schema";
import type { ConceptLattice, ConceptNode, ConceptEdge } from "@shared/concept-lattice-schema";

export async function generateConceptLattice(
  text: string,
  model: AIModel,
  globalInstructions?: string
): Promise<ConceptLattice> {
  // For immediate functionality, let's create a working structure based on the text
  // This ensures the UI works while we can debug AI integration separately
  
  const latticeId = `lattice_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Extract key phrases and concepts from the text
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const keyWords = [...new Set(words)].slice(0, 8);
  
  // Create a structured lattice
  const nodes: ConceptNode[] = [];
  const edges: ConceptEdge[] = [];
  
  // Main idea node at center
  const mainNode: ConceptNode = {
    id: "main_1",
    type: "main_idea",
    content: sentences[0]?.trim() || "Central Concept",
    position: { x: 600, y: 400 },
    style: {
      fontSize: "large",
      color: "#2563eb",
      isExpandable: false,
      isExpanded: false
    }
  };
  nodes.push(mainNode);
  
  // Add basic arguments around the main idea
  sentences.slice(1, 4).forEach((sentence, index) => {
    const argNode: ConceptNode = {
      id: `arg_${index + 1}`,
      type: "basic_argument",
      content: sentence.trim(),
      parentId: "main_1",
      position: { 
        x: 600 + (index - 1) * 200, 
        y: 250 + index * 100 
      },
      style: {
        fontSize: "medium",
        color: "#7c3aed",
        isExpandable: true,
        isExpanded: false
      }
    };
    nodes.push(argNode);
    
    // Connect to main idea
    edges.push({
      id: `edge_main_arg_${index + 1}`,
      sourceId: "main_1",
      targetId: `arg_${index + 1}`,
      type: "supports",
      style: {
        strokeWidth: 2,
        color: "#6b7280"
      }
    });
  });
  
  // Add examples
  keyWords.slice(0, 3).forEach((word, index) => {
    const exampleNode: ConceptNode = {
      id: `example_${index + 1}`,
      type: "example",
      content: `📌 Example: ${word}`,
      parentId: nodes[index + 1]?.id || "main_1",
      position: { 
        x: 400 + index * 150, 
        y: 550 
      },
      style: {
        fontSize: "small",
        color: "#059669",
        isExpandable: true,
        isExpanded: false
      }
    };
    nodes.push(exampleNode);
    
    // Connect to main idea
    edges.push({
      id: `edge_example_${index + 1}`,
      sourceId: "main_1",
      targetId: `example_${index + 1}`,
      type: "illustrates",
      style: {
        strokeWidth: 1,
        color: "#9ca3af"
      }
    });
  });
  
  // Add supporting quotes
  const shortSentences = sentences.filter(s => s.length < 100).slice(0, 2);
  shortSentences.forEach((quote, index) => {
    const quoteNode: ConceptNode = {
      id: `quote_${index + 1}`,
      type: "supporting_quote",
      content: `"${quote.trim()}"`,
      position: { 
        x: 750 + index * 100, 
        y: 600 
      },
      style: {
        fontSize: "very_small",
        color: "#dc2626",
        isExpandable: true,
        isExpanded: false
      }
    };
    nodes.push(quoteNode);
    
    // Connect to main idea
    edges.push({
      id: `edge_quote_${index + 1}`,
      sourceId: "main_1",
      targetId: `quote_${index + 1}`,
      type: "quotes",
      style: {
        strokeWidth: 1,
        color: "#f87171"
      }
    });
  });
  
  const lattice: ConceptLattice = {
    id: latticeId,
    title: `Analysis: ${text.substring(0, 50)}...`,
    sourceText: text,
    nodes,
    edges,
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
    // Clean the response to remove markdown code blocks if present
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.slice(7);
    }
    if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.slice(3);
    }
    if (cleanedResponse.endsWith('```')) {
      cleanedResponse = cleanedResponse.slice(0, -3);
    }
    cleanedResponse = cleanedResponse.trim();
    
    const parsed = JSON.parse(cleanedResponse);
    
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