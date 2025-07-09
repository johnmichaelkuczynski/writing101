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
import { Download, ArrowRight, BookOpen } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface MetaMindMap {
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

interface MetaMindMapViewerProps {
  metaMap: MetaMindMap;
  onSectionClick?: (sectionId: string) => void;
  onViewLocalMap?: (sectionId: string) => void;
}

const relationshipColors = {
  builds_on: '#10b981',
  contradicts: '#ef4444',
  exemplifies: '#f59e0b',
  concludes: '#8b5cf6'
};

const relationshipLabels = {
  builds_on: 'Builds On',
  contradicts: 'Contradicts',
  exemplifies: 'Exemplifies',
  concludes: 'Concludes'
};

function MetaNode({ data }: { data: any }) {
  const { node, onSectionClick, onViewLocalMap } = data;
  
  return (
    <Card 
      className="min-w-[250px] max-w-[350px] cursor-pointer border-2 hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onSectionClick?.(node.sectionId)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            Section {node.id.split('-')[1] || node.id}
          </Badge>
          <BookOpen className="w-4 h-4 text-muted-foreground" />
        </div>
        <CardTitle className="text-sm font-semibold leading-tight">
          {node.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground mb-3 line-clamp-4">
          {node.summary}
        </p>
        <div className="flex gap-1 flex-wrap">
          {onViewLocalMap && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-6 px-2 text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onViewLocalMap(node.sectionId);
              }}
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              Mind Map
            </Button>
          )}
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 px-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSectionClick?.(node.sectionId);
            }}
          >
            <BookOpen className="w-3 h-3 mr-1" />
            Read
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const nodeTypes = {
  metaNode: MetaNode,
};

export default function MetaMindMapViewer({ 
  metaMap, 
  onSectionClick, 
  onViewLocalMap 
}: MetaMindMapViewerProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    // Convert meta map nodes to ReactFlow nodes
    const flowNodes: Node[] = metaMap.nodes.map((node, index) => ({
      id: node.id,
      type: 'metaNode',
      position: node.position.x === 0 && node.position.y === 0 
        ? { 
            x: (index % 3) * 400 - 400, 
            y: Math.floor(index / 3) * 300 - 150 
          }
        : node.position,
      data: {
        node,
        onSectionClick: (sectionId: string) => {
          setSelectedNode(node);
          onSectionClick?.(sectionId);
        },
        onViewLocalMap
      },
      draggable: true,
    }));

    // Convert meta map edges to ReactFlow edges
    const flowEdges: Edge[] = metaMap.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: relationshipColors[edge.relationship as keyof typeof relationshipColors] || '#94a3b8', 
        strokeWidth: 3 
      },
      label: relationshipLabels[edge.relationship as keyof typeof relationshipLabels] || edge.relationship,
      labelStyle: { 
        fontSize: 10, 
        fontWeight: 600,
        color: relationshipColors[edge.relationship as keyof typeof relationshipColors] || '#64748b'
      },
      markerEnd: {
        type: 'arrowclosed',
        color: relationshipColors[edge.relationship as keyof typeof relationshipColors] || '#94a3b8'
      }
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [metaMap, onSectionClick, onViewLocalMap, setNodes, setEdges]);

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
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${metaMap.title.replace(/\s+/g, '_')}_structure.pdf`);
    } catch (error) {
      console.error('Failed to export meta mind map:', error);
    }
  }, [metaMap.title]);

  const exportAsImage = useCallback(async () => {
    const element = document.querySelector('.react-flow') as HTMLElement;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: 'white',
        scale: 2,
      });

      const link = document.createElement('a');
      link.download = `${metaMap.title.replace(/\s+/g, '_')}_structure.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Failed to export meta mind map:', error);
    }
  }, [metaMap.title]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-background">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{metaMap.title}</h2>
            <p className="text-sm text-muted-foreground">
              Overall structure and relationships between sections
            </p>
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

      {/* Meta Mind Map */}
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
          <Background variant="dots" />
          <Controls />
          
          <Panel position="top-left" className="bg-background border rounded-lg p-3">
            <div className="flex flex-col gap-2 text-xs">
              <div className="font-medium mb-1">Relationships:</div>
              {Object.entries(relationshipColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-1 rounded"
                    style={{ backgroundColor: color }}
                  />
                  <span>{relationshipLabels[type as keyof typeof relationshipLabels]}</span>
                </div>
              ))}
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Selected Section Details */}
      {selectedNode && (
        <div className="border-t bg-background p-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">
                Section {selectedNode.id.split('-')[1] || selectedNode.id}
              </Badge>
              <h3 className="font-medium">{selectedNode.label}</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedNode.summary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}