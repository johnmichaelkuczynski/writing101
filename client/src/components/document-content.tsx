import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import SelectionToolbar from "@/components/selection-toolbar";
import ChunkingModal from "@/components/chunking-modal";
import UpgradeWall from "@/components/upgrade-wall";
import { useAuth } from "@/contexts/auth-context";
import { tractatusContent } from "@shared/tractatus-content";
import { Copy, Lock } from "lucide-react";

interface DocumentContentProps {
  mathMode?: boolean;
  onQuestionFromSelection?: (question: string) => void;
  onTextSelectedForChat?: (text: string) => void;
  onRewriteFromSelection?: (text: string) => void;
  onPassageDiscussion?: (text: string) => void;
  onCreateTest?: (text: string) => void;
  onCreateStudyGuide?: (text: string) => void;
}

export default function DocumentContent({ mathMode = true, onQuestionFromSelection, onTextSelectedForChat, onRewriteFromSelection, onPassageDiscussion, onCreateTest, onCreateStudyGuide }: DocumentContentProps) {
  const { selection, isSelecting, clearSelection, highlightSelection, removeHighlights } = useTextSelection();
  const [showChunkingModal, setShowChunkingModal] = useState(false);
  const [selectedTextForChunking, setSelectedTextForChunking] = useState("");
  const [showUpgradeWall, setShowUpgradeWall] = useState(false);
  const { user, isAuthenticated, canAccessContent } = useAuth();

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
    clearSelection();
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
    clearSelection();
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
    clearSelection();
  };

  const handleCreateTest = (text: string) => {
    if (onCreateTest) {
      onCreateTest(text);
    }
    clearSelection();
  };

  const handleCreateStudyGuide = (text: string) => {
    if (onCreateStudyGuide) {
      onCreateStudyGuide(text);
    }
    clearSelection();
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
      const fullText = tractatusContent.sections.map(section => 
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
        <div className="p-8 w-full max-w-5xl mx-auto" data-document-content>
          <article className="prose prose-xl max-w-none text-foreground w-full leading-relaxed select-text">
            {/* Document Title */}
            <header className="text-center mb-12">
              <h1 className="text-3xl font-georgia font-bold text-foreground mb-2">
                Dictionary of Analytic Philosophy
              </h1>
              <p className="text-lg font-georgia text-muted-foreground text-center">
                by J.-M. Kuczynski, PhD
              </p>
            </header>

            {/* Single Section with Mid-Content Paywall */}
            {tractatusContent.sections.map((section, index) => {
              const hasTokens = user?.tokens > 0;
              let displayContent = section.content;
              
              // For the main section, insert paywall in the middle
              if (index === 0) {
                // Split content roughly in half (20% through)
                const contentLength = section.content.length;
                const paywallPosition = Math.floor(contentLength * 0.2);
                
                // Find a good break point near 20% (look for paragraph end)
                let breakPoint = paywallPosition;
                while (breakPoint < contentLength && section.content[breakPoint] !== '>' && section.content[breakPoint - 1] !== 'p') {
                  breakPoint++;
                }
                
                const freeContent = section.content.substring(0, breakPoint);
                const paidContent = section.content.substring(breakPoint);
                
                return (
                  <section key={section.id} id={section.id} className="mb-12">
                    {/* Free content (first 20%) */}
                    <div 
                      className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                      dangerouslySetInnerHTML={{ 
                        __html: processContentForMathMode(freeContent) 
                      }}
                    />
                    
                    {/* Paywall barrier */}
                    <div className="mt-16 text-center py-12 px-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-300">
                      <div className="max-w-md mx-auto">
                        <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          Continue Reading
                        </h3>
                        <p className="text-gray-700 mb-6">
                          You've reached the 20% preview limit. Purchase tokens to access the complete Dictionary of Analytic Philosophy plus premium AI features.
                        </p>
                        <Button 
                          onClick={() => setShowUpgradeWall(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                        >
                          Unlock Full Access
                        </Button>
                        <p className="text-sm text-gray-600 mt-3">
                          Purchase tokens for complete access and AI-powered features
                        </p>
                      </div>
                    </div>
                    
                    {/* Paid content (remaining 80%) - only show if user has tokens */}
                    {hasTokens && (
                      <div 
                        className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                        dangerouslySetInnerHTML={{ 
                          __html: processContentForMathMode(paidContent) 
                        }}
                      />
                    )}
                  </section>
                );
              }
              
              // For other sections, only show if user has tokens
              if (!hasTokens) {
                return null;
              }
              
              return (
                <section key={section.id} id={section.id} className="mb-12">
                  <div 
                    className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                    dangerouslySetInnerHTML={{ 
                      __html: processContentForMathMode(section.content) 
                    }}
                  />
                </section>
              );
            })}
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
          onCreateTest={handleCreateTest}
          onCreateStudyGuide={handleCreateStudyGuide}
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
      
      {/* Upgrade Wall Modal */}
      <UpgradeWall
        isOpen={showUpgradeWall}
        onClose={() => setShowUpgradeWall(false)}
        trigger="page_limit"
      />
    </div>
  );
}