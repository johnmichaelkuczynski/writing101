import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import { paperContent } from "@shared/paper-content";

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
                {paperContent.title}
              </h1>
              <p className="text-lg font-georgia text-muted-foreground">
                by {paperContent.author}
              </p>
            </header>

            {/* Dynamic Content Sections */}
            {paperContent.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="text-2xl font-georgia font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div 
                  className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                  dangerouslySetInnerHTML={{ 
                    __html: processContentForMathMode(section.content)
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/^/, '<p class="mb-4">')
                      .replace(/$/, '</p>')
                  }}
                />
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