import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import ChunkingModal from "@/components/chunking-modal";

import { paperContent } from "@shared/paper-content";
import { Copy, Lock } from "lucide-react";

interface DocumentContentProps {
  mathMode?: boolean;
  onQuestionFromSelection?: (question: string) => void;
  onTextSelectedForChat?: (text: string) => void;
  onRewriteFromSelection?: (text: string) => void;
  onPassageDiscussion?: (text: string) => void;
  onCreateStudyGuide?: (text: string) => void;
  onTestMe?: (text: string) => void;
}

export default function DocumentContent({ 
  mathMode = true, 
  onQuestionFromSelection, 
  onTextSelectedForChat, 
  onRewriteFromSelection, 
  onPassageDiscussion, 
  onCreateStudyGuide,
  onTestMe
}: DocumentContentProps) {
  const { selection, isSelecting, clearSelection, highlightSelection, removeHighlights } = useTextSelection();
  const [showChunkingModal, setShowChunkingModal] = useState(false);
  const [selectedTextForChunking, setSelectedTextForChunking] = useState("");


  // Math rendering is handled in processContentForMathMode function

  const handleAskQuestion = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onPassageDiscussion) {
        onPassageDiscussion(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleSendToChat = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onTextSelectedForChat) {
        onTextSelectedForChat(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleRewrite = (text: string) => {
    // Check if text is large and needs chunking
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      // Open chunking modal for large selections
      setShowChunkingModal(true);
      setSelectedTextForChunking(text);
    } else {
      // For smaller texts, use normal selection
      if (onRewriteFromSelection) {
        onRewriteFromSelection(text);
      }
    }
    // Don't clear selection - let user choose other actions if needed
  };



  const handleCreateStudyGuide = (text: string) => {
    if (onCreateStudyGuide) {
      onCreateStudyGuide(text);
    }
    // Don't clear selection - let user choose other actions if needed
  };

  const handleTestMe = (text: string) => {
    if (onTestMe) {
      onTestMe(text);
    }
    // Don't clear selection - let user choose other actions if needed
  };





  const handleHighlight = () => {
    highlightSelection();
    clearSelection();
  };

  const handleSelectAll = () => {
    const documentContent = document.querySelector('[data-document-content]');
    if (documentContent) {
      const range = document.createRange();
      range.selectNodeContents(documentContent);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Get the full document text
      const fullText = paperContent.sections.map(section => 
        `${section.title}\n\n${section.content}`
      ).join('\n\n');
      
      // Check if text is large (over 1000 words) and needs chunking
      const wordCount = fullText.split(/\s+/).length;
      
      if (wordCount > 1000) {
        // Open chunking modal for large selections
        setShowChunkingModal(true);
        setSelectedTextForChunking(fullText);
      } else {
        // For smaller texts, use normal selection
        if (onTextSelectedForChat) {
          onTextSelectedForChat(fullText);
        }
      }
    }
  };

  // Function to convert math content based on mode and add IDs to section headings
  const processContentForMathMode = (content: string) => {
    try {
      if (!content || typeof content !== 'string') {
        return content || '';
      }
      
      // Add IDs to section headings for navigation
      let processedContent = content;
      let counter = 0;
      const seenTitles = new Set<string>(); // Track seen titles to avoid duplicates
      
      // Split content to find where actual content starts (after table of contents)
      const contentParts = processedContent.split('1.0 The concept of an inference');
      
      if (contentParts.length > 1) {
        // Skip the table of contents section entirely and show only the actual content
        const actualContent = '1.0 The concept of an inference' + contentParts.slice(1).join('1.0 The concept of an inference');
        
        const processedActualContent = actualContent.replace(
          /class="document-paragraph mb-6 mt-8 font-normal">([0-9]+\.[0-9]+(?:\.[0-9]+)?\s+[^<]+)/g,
          (match, titleText) => {
            const fullTitle = titleText.trim();
            const sectionNumber = titleText.match(/^([0-9]+\.[0-9]+(?:\.[0-9]+)?)/)?.[1] || '';
            const id = `section-${sectionNumber.replace(/\./g, '-')}-${counter}`;
            counter++;
            return `class="document-paragraph mb-6 mt-8 font-normal" id="${id}">${titleText}`;
          }
        );
        
        // Only show the header and actual content, skip the table of contents
        const headerPart = '<div class="document-content"><p class="document-paragraph mb-4">Introduction to Symbolic Logic</p><p class="document-paragraph mb-4">J.-M. Kuczynski</p>';
        processedContent = headerPart + processedActualContent;
      }
      
      if (!mathMode) {
        // Remove LaTeX notation when math mode is off
        return processedContent
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
        let processed = processedContent;
        // Replace display math blocks
        processed = processed.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
          if (!match || !latex) return match || '';
          return renderMathString(latex, true);
        });
        // Replace inline math
        processed = processed.replace(/\$([^$]+)\$/g, (match, latex) => {
          if (!match || !latex) return match || '';
          return renderMathString(latex, false);
        });
        return processed;
      }
    } catch (error) {
      console.error('Error processing content for math mode:', error);
      return content || '';
    }
  };

  return (
    <div className="bg-card overflow-hidden relative">
      {/* Select All Button */}
      <div className="absolute top-16 right-6 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="bg-white/90 hover:bg-white border border-gray-300 shadow-sm text-xs px-2 py-1 h-7"
        >
          <Copy className="w-3 h-3 mr-1" />
          Select All
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="p-6 w-full max-w-4xl mx-auto" data-document-content>
          <article className="max-w-none text-foreground w-full select-text">
            {/* Document Title */}
            <header className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-3">
                {paperContent.title}
              </h1>
              <p className="text-lg font-medium text-muted-foreground">
                by {paperContent.author}
              </p>
            </header>

            {/* Full Document Content - Professional Formatting */}
            {paperContent.sections.map((section, index) => (
              <section key={section.id} id={section.id} className="mb-8">
                <div 
                  className={`text-foreground leading-7 document-content-formatted ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                  dangerouslySetInnerHTML={{ 
                    __html: processContentForMathMode(section.content) 
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
          onCreateStudyGuide={handleCreateStudyGuide}
          onTestMe={handleTestMe}
          onHighlight={handleHighlight}
          onClear={clearSelection}
        />
      )}

      {/* Chunking Modal */}
      <ChunkingModal
        isOpen={showChunkingModal}
        onClose={() => setShowChunkingModal(false)}
        selectedText={selectedTextForChunking}
        onChunkSelected={(chunk) => {
          if (onTextSelectedForChat) {
            onTextSelectedForChat(chunk);
          }
        }}
        onChunkDiscussion={(chunk) => {
          if (onPassageDiscussion) {
            onPassageDiscussion(chunk);
          }
        }}
        onChunkRewrite={(chunk) => {
          if (onRewriteFromSelection) {
            onRewriteFromSelection(chunk);
          }
        }}
      />
      

    </div>
  );
}