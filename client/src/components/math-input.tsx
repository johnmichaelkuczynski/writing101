import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { renderMathString } from "@/lib/math-renderer";
import { Calculator, Square, Divide, Plus, Minus, Equal } from "lucide-react";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function MathInput({ value, onChange, placeholder = "Type math expressions like x^2, sqrt(x), 1/2x...", className = "" }: MathInputProps) {
  const [showToolbar, setShowToolbar] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertSymbol = (symbol: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = value.substring(0, start) + symbol + value.substring(end);
    
    onChange(newValue);
    
    // Set cursor position after inserted symbol
    setTimeout(() => {
      if (textarea) {
        const newPosition = start + symbol.length;
        textarea.setSelectionRange(newPosition, newPosition);
        textarea.focus();
      }
    }, 10);
  };

  const mathButtons = [
    { symbol: "^2", label: "x²", icon: Square },
    { symbol: "^3", label: "x³", icon: Square },
    { symbol: "^", label: "x^n", icon: Square },
    { symbol: "sqrt(", label: "√", icon: Calculator },
    { symbol: "/", label: "÷", icon: Divide },
    { symbol: " * ", label: "×", icon: Calculator },
    { symbol: " + ", label: "+", icon: Plus },
    { symbol: " - ", label: "-", icon: Minus },
    { symbol: " = ", label: "=", icon: Equal },
    { symbol: "(", label: "(", icon: Calculator },
    { symbol: ")", label: ")", icon: Calculator },
    { symbol: "sin(", label: "sin", icon: Calculator },
    { symbol: "cos(", label: "cos", icon: Calculator },
    { symbol: "log(", label: "log", icon: Calculator },
    { symbol: "ln(", label: "ln", icon: Calculator },
    { symbol: "pi", label: "π", icon: Calculator },
    { symbol: "alpha", label: "α", icon: Calculator },
    { symbol: "beta", label: "β", icon: Calculator },
    { symbol: "gamma", label: "γ", icon: Calculator },
    { symbol: "theta", label: "θ", icon: Calculator },
    { symbol: "infinity", label: "∞", icon: Calculator },
    { symbol: "sum", label: "Σ", icon: Calculator },
    { symbol: "int", label: "∫", icon: Calculator },
    { symbol: "lim", label: "lim", icon: Calculator },
    { symbol: "leq", label: "≤", icon: Calculator },
    { symbol: "geq", label: "≥", icon: Calculator },
    { symbol: "neq", label: "≠", icon: Calculator },
    { symbol: "approx", label: "≈", icon: Calculator },
  ];

  // Convert LaTeX-style input to proper LaTeX for rendering
  const convertToLatex = (input: string): string => {
    return input
      .replace(/\^(\w+)/g, '^{$1}')
      .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
      .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
      .replace(/sin\(/g, '\\sin(')
      .replace(/cos\(/g, '\\cos(')
      .replace(/log\(/g, '\\log(')
      .replace(/ln\(/g, '\\ln(')
      .replace(/pi/g, '\\pi')
      .replace(/alpha/g, '\\alpha')
      .replace(/beta/g, '\\beta')
      .replace(/gamma/g, '\\gamma')
      .replace(/theta/g, '\\theta')
      .replace(/infinity/g, '\\infty')
      .replace(/sum/g, '\\sum')
      .replace(/int/g, '\\int')
      .replace(/lim/g, '\\lim')
      .replace(/leq/g, '\\leq')
      .replace(/geq/g, '\\geq')
      .replace(/neq/g, '\\neq')
      .replace(/approx/g, '\\approx');
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-20 font-mono text-sm"
          onFocus={() => setShowToolbar(true)}
        />
        
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setShowToolbar(!showToolbar)}
          className="absolute top-2 right-2 p-1 h-6 w-6"
        >
          <Calculator className="w-3 h-3" />
        </Button>
      </div>

      {/* Math Preview */}
      {value.trim() && (
        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded border min-h-12 flex items-center">
          <span className="text-xs text-muted-foreground mr-2">Preview:</span>
          <div 
            className="math-preview flex-1"
            dangerouslySetInnerHTML={{ 
              __html: renderMathString(convertToLatex(value)) 
            }}
          />
        </div>
      )}

      {/* Math Toolbar */}
      {showToolbar && (
        <div className="border rounded-lg p-3 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Math Symbols</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowToolbar(false)}
              className="h-6 w-6 p-0"
            >
              <X2 className="w-3 h-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
            {mathButtons.map((btn, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => insertSymbol(btn.symbol)}
                className="h-8 w-8 p-0 text-xs"
                title={`Insert ${btn.label}`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
          
          <div className="mt-2 text-xs text-muted-foreground">
            <p>Examples: x^2, sqrt(16), 1/2x, sin(theta), pi/4</p>
          </div>
        </div>
      )}
    </div>
  );
}