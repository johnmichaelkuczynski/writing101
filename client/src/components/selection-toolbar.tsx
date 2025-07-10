import { Button } from "@/components/ui/button";
import { MessageCircle, Highlighter, X, MessageSquare, Edit3 } from "lucide-react";
import { useState } from "react";

interface SelectionToolbarProps {
  selectedText: string;
  onAskQuestion: (text: string) => void;
  onSendToChat: (text: string) => void;
  onRewrite: (text: string) => void;

  onHighlight: () => void;
  onClear: () => void;
  position?: { x: number; y: number };
}

export default function SelectionToolbar({ 
  selectedText, 
  onAskQuestion, 
  onSendToChat,
  onRewrite,

  onHighlight, 
  onClear, 
  position 
}: SelectionToolbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !selectedText) return null;

  const handleAskQuestion = () => {
    const questionText = `About this passage: "${selectedText.substring(0, 100)}${selectedText.length > 100 ? '...' : ''}"\n\n`;
    onAskQuestion(questionText);
    setIsVisible(false);
  };

  const handleSendToChat = () => {
    onSendToChat(selectedText);
    setIsVisible(false);
  };

  const handleRewrite = () => {
    onRewrite(selectedText);
    setIsVisible(false);
  };





  const handleHighlight = () => {
    onHighlight();
    setIsVisible(false);
  };

  const handleClear = () => {
    onClear();
    setIsVisible(false);
  };

  const style = position ? {
    position: 'fixed' as const,
    top: position.y - 50,
    left: position.x,
    zIndex: 1000,
  } : {
    position: 'fixed' as const,
    bottom: '140px',
    right: '20px',
    zIndex: 1000,
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 flex items-center space-x-2"
      style={style}
    >
      <div className="text-xs text-muted-foreground max-w-40 truncate">
        "{selectedText.substring(0, 30)}..."
      </div>
      
      <Button
        size="sm"
        variant="outline"
        onClick={handleAskQuestion}
        className="flex items-center space-x-1 text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <MessageCircle className="w-3 h-3" />
        <span className="text-xs">Ask</span>
      </Button>
      
      <Button
        size="sm"
        variant="outline"
        onClick={handleSendToChat}
        className="flex items-center space-x-1 text-green-600 border-green-200 hover:bg-green-50"
      >
        <MessageSquare className="w-3 h-3" />
        <span className="text-xs">Chat</span>
      </Button>

      <Button
        size="sm"
        variant="outline"
        onClick={handleRewrite}
        className="flex items-center space-x-1 text-purple-600 border-purple-200 hover:bg-purple-50"
      >
        <Edit3 className="w-3 h-3" />
        <span className="text-xs">Rewrite</span>
      </Button>


      
      <Button
        size="sm"
        variant="outline"
        onClick={handleHighlight}
        className="flex items-center space-x-1 text-yellow-600 border-yellow-200 hover:bg-yellow-50"
      >
        <Highlighter className="w-3 h-3" />
        <span className="text-xs">Highlight</span>
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        onClick={handleClear}
        className="text-gray-500 hover:text-gray-700"
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
}