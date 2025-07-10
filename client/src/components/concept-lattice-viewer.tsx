import { useState, useCallback, useMemo } from 'react';
import { ReactFlow, Node, Edge, Controls, Background, useNodesState, useEdgesState, MarkerType, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare, Edit3, ChevronDown, ChevronRight, Quote } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { AIModel } from "@shared/schema";
import type { ConceptLattice, ConceptNode as LatticeNode, ConceptEdge as LatticeEdge } from "@shared/concept-lattice-schema";

// Custom node components
function ConceptNodeComponent({ data }: { data: any }) {
  const { node, onEdit, onChat, onToggleExpand } = data;
  const isMainIdea = node.type === 'main_idea';
  const isExpandable = node.style.isExpandable && !isMainIdea;
  const isExpanded = node.style.isExpanded || false;

  const getFontSizeClass = (size: string) => {
    switch (size) {
      case 'large': return 'text-xl font-bold';
      case 'medium': return 'text-base font-semibold';
      case 'small': return 'text-sm';
      case 'very_small': return 'text-xs';
      case 'tiny': return 'text-xs font-light';
      default: return 'text-sm';
    }
  };

  const getNodeStyle = () => {
    const baseStyle = "p-3 rounded-lg border-2 shadow-lg max-w-xs";
    const color = node.style.color || '#3b82f6';
    
    switch (node.type) {
      case 'main_idea':
        return `${baseStyle} bg-white border-4 shadow-xl font-bold min-w-48`;
      case 'basic_argument':
        return `${baseStyle} bg-blue-50 border-blue-200`;
      case 'example':
        return `${baseStyle} bg-green-50 border-green-200`;
      case 'supporting_quote':
        return `${baseStyle} bg-yellow-50 border-yellow-200`;
      case 'fine_argument':
        return `${baseStyle} bg-purple-50 border-purple-200`;
      default:
        return `${baseStyle} bg-gray-50 border-gray-200`;
    }
  };

  const renderContent = () => {
    let content = node.content;
    
    // Add appropriate formatting based on type
    if (node.type === 'supporting_quote' && !content.includes('"')) {
      content = `"${content}"`;
    }
    
    // Truncate if not expanded and content is long
    if (!isExpanded && content.length > 100 && isExpandable) {
      content = content.substring(0, 97) + "...";
    }

    return content;
  };

  return (
    <div className={getNodeStyle()} style={{ borderColor: node.style.color }}>
      <div className="flex items-start justify-between">
        <div className={`${getFontSizeClass(node.style.fontSize)} flex-1`}>
          {renderContent()}
        </div>
        
        {isExpandable && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(node.id)}
            className="ml-2 p-1 h-6 w-6"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </Button>
        )}
      </div>

      {!isMainIdea && (
        <div className="flex items-center space-x-1 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChat(node)}
            className="text-xs h-6 px-2"
          >
            <MessageSquare className="w-3 h-3 mr-1" />
            Ask
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(node)}
            className="text-xs h-6 px-2"
          >
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
          {node.type === 'supporting_quote' && (
            <Quote className="w-3 h-3 text-yellow-600" />
          )}
        </div>
      )}
    </div>
  );
}

const nodeTypes = {
  conceptNode: ConceptNodeComponent,
};

interface ConceptLatticeViewerProps {
  lattice: ConceptLattice;
  selectedModel: AIModel;
  onLatticeUpdate: (lattice: ConceptLattice) => void;
  onAskQuestion?: (question: string) => void;
  onRewrite?: (text: string) => void;
}

export default function ConceptLatticeViewer({
  lattice,
  selectedModel,
  onLatticeUpdate,
  onAskQuestion,
  onRewrite
}: ConceptLatticeViewerProps) {
  const [editingNode, setEditingNode] = useState<LatticeNode | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editInstruction, setEditInstruction] = useState("");
  const [chatNode, setChatNode] = useState<LatticeNode | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const { toast } = useToast();

  // Debug logging
  console.log("ConceptLatticeViewer render:", {
    lattice,
    hasNodes: lattice?.nodes?.length,
    hasEdges: lattice?.edges?.length
  });

  // Convert lattice data to ReactFlow format
  const convertToFlowNodes = useCallback((latticeNodes: LatticeNode[]): Node[] => {
    return latticeNodes.map((node) => ({
      id: node.id,
      type: 'conceptNode',
      position: node.position,
      data: {
        node,
        onEdit: (node: LatticeNode) => {
          setEditingNode(node);
          setEditContent(node.content);
          setEditInstruction("");
        },
        onChat: (node: LatticeNode) => {
          setChatNode(node);
          setChatMessage(`About "${node.content.substring(0, 50)}..." - `);
        },
        onToggleExpand: (nodeId: string) => {
          if (lattice?.nodes) {
            const updatedNodes = lattice.nodes.map(n => 
              n.id === nodeId 
                ? { ...n, style: { ...n.style, isExpanded: !n.style.isExpanded } }
                : n
            );
            onLatticeUpdate({ ...lattice, nodes: updatedNodes });
          }
        }
      },
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }));
  }, [lattice, onLatticeUpdate]);

  const convertToFlowEdges = useCallback((latticeEdges: LatticeEdge[]): Edge[] => {
    return latticeEdges.map((edge) => ({
      id: edge.id,
      source: edge.sourceId,
      target: edge.targetId,
      type: 'smoothstep',
      style: {
        strokeWidth: edge.style.strokeWidth,
        stroke: edge.style.color,
      },
      markerEnd: {
        type: MarkerType.Arrow,
        color: edge.style.color,
      },
      label: edge.type === 'supports' ? 'supports' : 
             edge.type === 'illustrates' ? 'illustrates' :
             edge.type === 'quotes' ? 'quotes' : '',
    }));
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(convertToFlowNodes(lattice?.nodes || []));
  const [edges, setEdges, onEdgesChange] = useEdgesState(convertToFlowEdges(lattice?.edges || []));

  // Debug logging
  console.log("ReactFlow state:", {
    nodes: nodes.length,
    edges: edges.length,
    nodesSample: nodes.slice(0, 2)
  });

  // Update nodes when lattice changes
  useMemo(() => {
    if (lattice?.nodes && lattice?.edges) {
      setNodes(convertToFlowNodes(lattice.nodes));
      setEdges(convertToFlowEdges(lattice.edges));
    }
  }, [lattice, convertToFlowNodes, convertToFlowEdges, setNodes, setEdges]);

  // Edit node mutation
  const editNodeMutation = useMutation({
    mutationFn: async (data: { nodeId: string; newContent: string; instruction: string; model: AIModel }) => {
      return await apiRequest("/api/concept-lattice/edit-node", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
    },
    onSuccess: (updatedNode: LatticeNode) => {
      if (lattice?.nodes) {
        const updatedNodes = lattice.nodes.map(n => 
          n.id === updatedNode.id ? updatedNode : n
        );
        onLatticeUpdate({ ...lattice, nodes: updatedNodes });
      }
      setEditingNode(null);
      toast({
        title: "Node updated",
        description: "Your changes have been applied to the concept lattice."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update node",
        variant: "destructive"
      });
    }
  });

  const handleEditSubmit = () => {
    if (!editingNode || !editContent.trim()) return;

    editNodeMutation.mutate({
      nodeId: editingNode.id,
      newContent: editContent,
      instruction: editInstruction || "Update the content as specified",
      model: selectedModel
    });
  };

  const handleChatSubmit = () => {
    if (!chatNode || !chatMessage.trim()) return;
    
    if (onAskQuestion) {
      onAskQuestion(chatMessage);
    }
    setChatNode(null);
    setChatMessage("");
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Background variant="dots" gap={20} size={1} />
        <Controls />
      </ReactFlow>

      {/* Edit Node Dialog */}
      <Dialog open={!!editingNode} onOpenChange={() => setEditingNode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {editingNode?.type.replace('_', ' ').toUpperCase()}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Enter the new content..."
                rows={4}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Edit Instruction</label>
              <Textarea
                value={editInstruction}
                onChange={(e) => setEditInstruction(e.target.value)}
                placeholder="e.g., Make this more concise, add an example, replace with a quote from Darwin..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleEditSubmit}
                disabled={editNodeMutation.isPending || !editContent.trim()}
                className="flex-1"
              >
                {editNodeMutation.isPending ? "Updating..." : "Update Node"}
              </Button>
              <Button variant="outline" onClick={() => setEditingNode(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={!!chatNode} onOpenChange={() => setChatNode(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ask about {chatNode?.type.replace('_', ' ')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded text-sm">
              <strong>Node content:</strong> {chatNode?.content}
            </div>

            <div>
              <label className="text-sm font-medium">Your question or request</label>
              <Textarea
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="What does this mean? Can you give a better example? Replace this with..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleChatSubmit}
                disabled={!chatMessage.trim()}
                className="flex-1"
              >
                Ask Question
              </Button>
              <Button variant="outline" onClick={() => setChatNode(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}