import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MindMap, MindMapNode, MindMapEdge } from "@shared/schema";

interface MindMapViewerProps {
  mindMap: MindMap;
  onNodeClick?: (node: MindMapNode) => void;
  onNodeDoubleClick?: (node: MindMapNode) => void;
  onEdgeClick?: (edge: MindMapEdge) => void;
}

export default function MindMapViewer({
  mindMap,
  onNodeClick,
  onNodeDoubleClick,
  onEdgeClick
}: MindMapViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const container = containerRef.current;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply zoom and pan
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    
    // Draw edges first
    mindMap.edges.forEach(edge => {
      const sourceNode = mindMap.nodes.find(n => n.id === edge.source);
      const targetNode = mindMap.nodes.find(n => n.id === edge.target);
      
      if (sourceNode && targetNode) {
        drawEdge(ctx, sourceNode, targetNode, edge);
      }
    });
    
    // Draw nodes
    mindMap.nodes.forEach(node => {
      drawNode(ctx, node);
    });
    
    ctx.restore();
  }, [mindMap, zoom, pan]);

  const drawNode = (ctx: CanvasRenderingContext2D, node: MindMapNode) => {
    const x = node.x || 0;
    const y = node.y || 0;
    
    // Node styling based on type
    const nodeStyles = {
      central: { color: '#ff6b6b', size: 60, fontSize: 14 },
      supporting: { color: '#4ecdc4', size: 45, fontSize: 12 },
      objection: { color: '#ff9f43', size: 45, fontSize: 12 },
      example: { color: '#6c5ce7', size: 40, fontSize: 11 },
      implication: { color: '#a29bfe', size: 40, fontSize: 11 },
      process: { color: '#fd79a8', size: 50, fontSize: 12 }
    };
    
    const style = nodeStyles[node.type] || nodeStyles.supporting;
    
    // Draw node circle
    ctx.beginPath();
    ctx.arc(x, y, style.size, 0, 2 * Math.PI);
    ctx.fillStyle = style.color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw node label
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${style.fontSize}px Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Word wrap for long labels
    const words = node.label.split(' ');
    const maxWidth = style.size * 1.5;
    let lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    // Draw lines
    const lineHeight = style.fontSize + 2;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, x, startY + (index * lineHeight));
    });
  };

  const drawEdge = (ctx: CanvasRenderingContext2D, source: MindMapNode, target: MindMapNode, edge: MindMapEdge) => {
    const sourceX = source.x || 0;
    const sourceY = source.y || 0;
    const targetX = target.x || 0;
    const targetY = target.y || 0;
    
    // Calculate connection points on node circles
    const sourceRadius = getNodeRadius(source.type);
    const targetRadius = getNodeRadius(target.type);
    
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const startX = sourceX + (dx / distance) * sourceRadius;
    const startY = sourceY + (dy / distance) * sourceRadius;
    const endX = targetX - (dx / distance) * targetRadius;
    const endY = targetY - (dy / distance) * targetRadius;
    
    // Draw edge line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = edge.color || '#95a5a6';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw arrowhead
    const arrowLength = 10;
    const arrowAngle = Math.PI / 6;
    const angle = Math.atan2(dy, dx);
    
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowLength * Math.cos(angle - arrowAngle),
      endY - arrowLength * Math.sin(angle - arrowAngle)
    );
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowLength * Math.cos(angle + arrowAngle),
      endY - arrowLength * Math.sin(angle + arrowAngle)
    );
    ctx.stroke();
    
    // Draw edge label
    if (edge.label) {
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      
      ctx.fillStyle = '#2c3e50';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Background for label
      const metrics = ctx.measureText(edge.label);
      const padding = 4;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(
        midX - metrics.width / 2 - padding,
        midY - 6 - padding,
        metrics.width + padding * 2,
        12 + padding * 2
      );
      
      ctx.fillStyle = '#2c3e50';
      ctx.fillText(edge.label, midX, midY);
    }
  };

  const getNodeRadius = (type: string): number => {
    const sizes = {
      central: 60,
      supporting: 45,
      objection: 45,
      example: 40,
      implication: 40,
      process: 50
    };
    return sizes[type as keyof typeof sizes] || 45;
  };

  const handleCanvasClick = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;
    
    // Find clicked node
    const clickedNode = mindMap.nodes.find(node => {
      const nodeX = node.x || 0;
      const nodeY = node.y || 0;
      const radius = getNodeRadius(node.type);
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      return distance <= radius;
    });
    
    if (clickedNode && onNodeClick) {
      onNodeClick(clickedNode);
    }
  };

  const handleCanvasDoubleClick = (event: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left - pan.x) / zoom;
    const y = (event.clientY - rect.top - pan.y) / zoom;
    
    // Find clicked node
    const clickedNode = mindMap.nodes.find(node => {
      const nodeX = node.x || 0;
      const nodeY = node.y || 0;
      const radius = getNodeRadius(node.type);
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      return distance <= radius;
    });
    
    if (clickedNode && onNodeDoubleClick) {
      onNodeDoubleClick(clickedNode);
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: event.clientX - pan.x,
      y: event.clientY - pan.y
    });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    
    setPan({
      x: event.clientX - dragStart.x,
      y: event.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.3));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFitToScreen = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const padding = 50;
    
    // Calculate bounds
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    mindMap.nodes.forEach(node => {
      const x = node.x || 0;
      const y = node.y || 0;
      const radius = getNodeRadius(node.type);
      
      minX = Math.min(minX, x - radius);
      maxX = Math.max(maxX, x + radius);
      minY = Math.min(minY, y - radius);
      maxY = Math.max(maxY, y + radius);
    });
    
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const scaleX = (canvasWidth - padding * 2) / contentWidth;
    const scaleY = (canvasHeight - padding * 2) / contentHeight;
    const scale = Math.min(scaleX, scaleY, 1);
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    setZoom(scale);
    setPan({
      x: canvasWidth / 2 - centerX * scale,
      y: canvasHeight / 2 - centerY * scale
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[400px] bg-gray-50 rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        id="mindmap-canvas"
        className="w-full h-full cursor-grab"
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      />
      
      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomIn}
          className="bg-white"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleZoomOut}
          className="bg-white"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleFitToScreen}
          className="bg-white"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleReset}
          className="bg-white"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-sm text-gray-600">
        {Math.round(zoom * 100)}%
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded text-xs text-gray-600">
        <p>Click: Select node • Double-click: Action • Drag: Pan view</p>
      </div>
    </div>
  );
}