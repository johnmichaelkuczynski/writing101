import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { renderMathInElement, renderMathString } from "@/lib/math-renderer";
import { useTextSelection } from "@/hooks/use-text-selection";
import { useAuth } from "@/hooks/use-auth";
import SelectionToolbar from "@/components/selection-toolbar";
import ChunkingModal from "@/components/chunking-modal";
import { tractatusContent } from "@shared/tractatus-content";
import { Copy, Lock } from "lucide-react";
import { Link } from "wouter";

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
  const { user } = useAuth();
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

            {/* Dynamic Content Sections */}
            {user ? (
              // Registered users see all content
              tractatusContent.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12">
                  <div 
                    className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                    dangerouslySetInnerHTML={{ 
                      __html: processContentForMathMode(section.content) 
                    }}
                  />
                </section>
              ))
            ) : (
              // Unregistered users see truncated content with paywall after axiom of comprehension
              <>
                <section key="fundamentals-preview" id="fundamentals" className="mb-12">
                  <div 
                    className={`text-muted-foreground leading-relaxed prose prose-lg max-w-none ${mathMode ? 'document-math-content' : 'document-text-content'}`}
                    dangerouslySetInnerHTML={{ 
                      __html: processContentForMathMode(`<p class="dictionary-entry"><strong>Algorithm:</strong> A fixed procedure for carrying out a task. The rules that we learn in grade school to multiply, add, etc., multi-digit numbers are algorithms. By formalizing inferences, logicians create algorithms for determining whether, given two statements, one of them follows from the other. A problem with algorithms is that what one has to know in order to know whether a given algorithm is applicable to a given task is often much heftier than what one would have to know to carry out that task in an ad hoc manner. In this fact lies the doom of attempts to algorithmize—or, to use the more popular term—"mechanize" thought.</p>

<p class="dictionary-entry"><strong>Axiom:</strong> A statement that, in some context, is assumed to be true and therefore isn't argued for.</p>

<p class="dictionary-entry"><strong>Axiom (second definition):</strong> A statement-form that, in some context, is assumed to have a true interpretation. See "interpretation."</p>

<p class="dictionary-entry"><strong>The axiom of comprehension:</strong> This is the principle that, given any property, there is a set containing all and only those objects that have that property. There is a set containing all and only those things that are people (i.e., that have the property of being a person). There's a set containing all and only those things that are acorns (i.e., that have the property of being an acorn). And so on. The axiom of comprehension seems self-evident. But Bertrand Russell discovered that it has self-contradictory consequences and is therefore false. The set of people is not a member of itself, since no person is a set. But some sets do seem to be members of themselves. The set of sets would seem to be such a set.</p>`) 
                    }}
                  />
                </section>
                
                {/* Freemium Paywall for Unregistered Users - Positioned after axiom of comprehension */}
                <div className="bg-gradient-to-t from-background via-background/90 to-transparent p-8 border border-border rounded-lg shadow-lg text-center mb-12">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-3">Unlock Full Access</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You've seen the first 5 pages. Register now to access the complete Dictionary of Analytic Philosophy with full AI features and unlimited content.
                  </p>
                  <div className="space-y-3">
                    <Button asChild size="lg" className="w-48">
                      <Link href="/auth">Sign Up for Free</Link>
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Already have an account? <Link href="/auth" className="text-primary hover:underline">Sign in</Link>
                    </p>
                  </div>
                </div>
              </>
            )}
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
    </div>
  );
}