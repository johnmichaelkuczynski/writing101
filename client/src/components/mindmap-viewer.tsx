import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionMode,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Eye, MessageSquare, Edit3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MindMapNode {
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

interface LocalMindMap {
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

interface MindMapViewerProps {
  mindMap: LocalMindMap;
  onNodeClick?: (node: MindMapNode) => void;
  onAskQuestion?: (text: string) => void;
  onRewrite?: (text: string) => void;
  onViewPassage?: (sectionId: string) => void;
}

const nodeTypeColors = {
  central: '#8b5cf6',
  supporting: '#06b6d4',
  example: '#10b981',
  objection: '#f59e0b',
  implication: '#ef4444'
};

const nodeTypeLabels = {
  central: 'Central',
  supporting: 'Supporting',
  example: 'Example',
  objection: 'Objection',
  implication: 'Implication'
};

function CustomNode({ data }: { data: any }) {
  const { node, onNodeClick, onAskQuestion, onRewrite, onViewPassage } = data;
  
  return (
    <Card 
      className="min-w-[200px] max-w-[300px] cursor-pointer border-2 hover:shadow-lg transition-shadow"
      style={{ borderColor: nodeTypeColors[node.type as keyof typeof nodeTypeColors] }}
      onClick={() => onNodeClick?.(node)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge 
            variant="secondary" 
            style={{ backgroundColor: nodeTypeColors[node.type as keyof typeof nodeTypeColors], color: 'white' }}
          >
            {nodeTypeLabels[node.type as keyof typeof nodeTypeLabels]}
          </Badge>
        </div>
        <CardTitle className="text-sm font-medium">{node.label}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
          {node.content}
        </p>
        <div className="flex gap-1 flex-wrap">
          {onViewPassage && node.metadata?.sectionId && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onViewPassage(node.metadata!.sectionId!);
              }}
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          )}
          {onAskQuestion && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onAskQuestion(`Explain this concept: ${node.label}`);
              }}
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Ask
            </Button>
          )}
          {onRewrite && node.content && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onRewrite(node.content);
              }}
            >
              <Edit3 className="w-3 h-3 mr-1" />
              Rewrite
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const nodeTypes = {
  mindMapNode: CustomNode,
};

export default function MindMapViewer({ 
  mindMap, 
  onNodeClick, 
  onAskQuestion, 
  onRewrite, 
  onViewPassage 
}: MindMapViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  useEffect(() => {
    // Convert mind map nodes to ReactFlow nodes
    const flowNodes: Node[] = mindMap.nodes.map((node) => ({
      id: node.id,
      type: 'mindMapNode',
      position: node.position,
      data: {
        node,
        onNodeClick: (node: MindMapNode) => {
          setSelectedNode(node);
          onNodeClick?.(node);
        },
        onAskQuestion,
        onRewrite,
        onViewPassage
      },
      draggable: true,
    }));

    // Convert mind map edges to ReactFlow edges
    const flowEdges: Edge[] = mindMap.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      label: edge.type,
      labelStyle: { fontSize: 10, fontWeight: 500 },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [mindMap, onNodeClick, onAskQuestion, onRewrite, onViewPassage, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const exportAsPDF = useCallback(async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: 'white',
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${mindMap.title.replace(/\s+/g, '_')}_mindmap.pdf`);
    } catch (error) {
      console.error('Failed to export mind map:', error);
    }
  }, [mindMap.title]);

  const exportAsImage = useCallback(async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: 'white',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `${mindMap.title.replace(/\s+/g, '_')}_mindmap.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to export mind map:', error);
    }
  }, [mindMap.title]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{mindMap.title}</h2>
            <p className="text-sm text-muted-foreground">{mindMap.centralClaim}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={exportAsImage}>
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            <Button size="sm" variant="outline" onClick={exportAsPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Mind Map */}
      <div className="flex-1 relative" style={{ height: '500px', minHeight: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          className="react-flow w-full h-full"
        >
          <Background />
          <Controls />
          
          <Panel position="top-left" className="bg-background border rounded-lg p-2">
            <div className="flex flex-col gap-1 text-xs">
              <div className="font-medium mb-1">Legend:</div>
              {Object.entries(nodeTypeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span>{nodeTypeLabels[type as keyof typeof nodeTypeLabels]}</span>
                </div>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="border-t bg-background p-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                style={{ backgroundColor: nodeTypeColors[selectedNode.type as keyof typeof nodeTypeColors], color: 'white' }}
              >
                {nodeTypeLabels[selectedNode.type as keyof typeof nodeTypeLabels]}
              </Badge>
              <h3 className="font-medium">{selectedNode.label}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{selectedNode.content}</p>
            {selectedNode.metadata?.sourceText && (
              <div className="text-xs bg-muted p-2 rounded italic">
                "{selectedNode.metadata.sourceText}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}