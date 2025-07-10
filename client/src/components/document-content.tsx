import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import { tractatusContent } from "@shared/tractatus-content";

interface DocumentContentProps {
  mathMode?: boolean;
  onQuestionFromSelection?: (question: string) => void;
  onTextSelectedForChat?: (text: string) => void;
  onRewriteFromSelection?: (text: string) => void;
  onPassageDiscussion?: (text: string) => void;

}

export default function DocumentContent({ mathMode = true, onQuestionFromSelection, onTextSelectedForChat, onRewriteFromSelection, onPassageDiscussion }: DocumentContentProps) {
  const { selection, isSelecting, clearSelection, highlightSelection, removeHighlights } = useTextSelection();

  // Math rendering is handled in processContentForMathMode function

  const handleAskQuestion = (text: string) => {
    if (onPassageDiscussion) {
      onPassageDiscussion(text);
    }
    clearSelection();
  };

  const handleSendToChat = (text: string) => {
    if (onTextSelectedForChat) {
      onTextSelectedForChat(text);
    }
    clearSelection();
  };

  const handleRewrite = (text: string) => {
    if (onRewriteFromSelection) {
      onRewriteFromSelection(text);
    }
    clearSelection();
  };



  const handleHighlight = () => {
    highlightSelection();
    clearSelection();
  };

  // Function to convert math content based on mode
  const processContentForMathMode = (content: string) => {
    if (!mathMode) {
      // Remove LaTeX notation when math mode is off
      return content
        .replace(/\$\$([^$]+)\$\$/g, '$1') // Remove display math delimiters
        .replace(/\$([^$]+)\$/g, '$1') // Remove inline math delimiters
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)') // Convert sqrt notation
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)') // Convert fractions
        .replace(/\\text\{([^}]+)\}/g, '$1') // Remove text commands
        .replace(/\\mathbb\{([^}]+)\}/g, '$1') // Remove mathbb
        .replace(/\\forall/g, 'for all') // Convert universal quantifier
        .replace(/\\Rightarrow/g, 'implies') // Convert implication
        .replace(/\\ldots/g, '...') // Convert ellipsis
        .replace(/\\times/g, '×'); // Convert multiplication
    } else {
      // Process LaTeX notation for rendering
      let processed = content;
      // Replace display math blocks
      processed = processed.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
        return renderMathString(latex, true);
      });
      // Replace inline math
      processed = processed.replace(/\$([^$]+)\$/g, (match, latex) => {
        return renderMathString(latex, false);
      });
      return processed;
    }
  };

  return (
    <div className="bg-card overflow-hidden">
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="p-8 w-full max-w-5xl mx-auto" data-document-content>
          <article className="prose prose-xl max-w-none text-foreground w-full leading-relaxed select-text">
            {/* Document Title */}
            <header className="text-center mb-12">
              <h1 className="text-3xl font-georgia font-bold text-foreground mb-2">
                {tractatusContent.title}
              </h1>
              <p className="text-lg font-georgia text-muted-foreground">
                by {tractatusContent.author}
              </p>
            </header>

            {/* Dynamic Content Sections */}
            {tractatusContent.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="text-2xl font-georgia font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}>
                  {processContentForMathMode(section.content)
                    .split('\n\n')
                    .filter(paragraph => paragraph.trim())
                    .map((paragraph, index) => {
                      const trimmed = paragraph.trim();
                      // Check if paragraph starts with a number (numbered proposition)
                      const isNumbered = /^\d+(\.\d+)*\s/.test(trimmed) || /^\d+$/.test(trimmed);
                      
                      return (
                        <p 
                          key={index} 
                          className={`mb-4 whitespace-pre-wrap ${
                            isNumbered ? '' : 'indent-8'
                          }`}
                        >
                          {trimmed}
                        </p>
                      );
                    })
                  }
                </div>
              </section>
            ))}
          </article>
        </div>
      </ScrollArea>
      
      {/* Selection Toolbar */}
      {selection && isSelecting && (
        <SelectionToolbar
          selectedText={selection.text}
          onAskQuestion={handleAskQuestion}
          onSendToChat={handleSendToChat}
          onRewrite={handleRewrite}

          onHighlight={handleHighlight}
          onClear={clearSelection}
        />
      )}
    </div>
  );
}