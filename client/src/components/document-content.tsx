import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { renderMathInElement } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import { paperContent } from "@/data/paper-content";

interface DocumentContentProps {
  onQuestionFromSelection?: (question: string) => void;
  onTextSelectedForChat?: (text: string) => void;
}

export default function DocumentContent({ onQuestionFromSelection, onTextSelectedForChat }: DocumentContentProps) {
  const { selection, isSelecting, clearSelection, highlightSelection, removeHighlights } = useTextSelection();

  useEffect(() => {
    renderMathInElement();
  }, []);

  const handleAskQuestion = (questionText: string) => {
    if (onQuestionFromSelection) {
      onQuestionFromSelection(questionText);
    }
    clearSelection();
  };

  const handleSendToChat = (text: string) => {
    if (onTextSelectedForChat) {
      onTextSelectedForChat(text);
    }
    clearSelection();
  };

  const handleHighlight = () => {
    highlightSelection();
    clearSelection();
  };

  return (
    <div className="bg-card overflow-hidden">
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="p-8 w-full max-w-5xl mx-auto" data-document-content>
          <article className="prose prose-xl max-w-none text-foreground w-full leading-relaxed select-text">
            {/* Document Title */}
            <header className="text-center mb-12">
              <h1 className="text-3xl font-georgia font-bold text-foreground mb-4">
                {paperContent.title}
              </h1>
            </header>

            {/* Dynamic Content Sections */}
            {paperContent.sections.map((section) => (
              <section key={section.id} id={section.id} className="mb-12">
                <h2 className="text-2xl font-georgia font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <div 
                  className="text-muted-foreground leading-relaxed prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: section.content
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
          onHighlight={handleHighlight}
          onClear={clearSelection}
        />
      )}
    </div>
  );
}