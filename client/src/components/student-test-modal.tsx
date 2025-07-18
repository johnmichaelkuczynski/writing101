import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, Printer, X, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard, downloadPDF } from "@/lib/export-utils";
import { renderMathInElement } from "@/lib/math-renderer";
import type { AIModel, StudentTest } from "@shared/schema";

interface StudentTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  selectedModel: AIModel;
  mathMode?: boolean;
  chunkIndex?: number;
}

export default function StudentTestModal({ 
  isOpen, 
  onClose, 
  selectedText, 
  selectedModel,
  mathMode = true,
  chunkIndex 
}: StudentTestModalProps) {
  const [customInstructions, setCustomInstructions] = useState("");
  const [currentStudentTest, setCurrentStudentTest] = useState<StudentTest | null>(null);
  const [showFullText, setShowFullText] = useState(false);
  const { toast } = useToast();

  const studentTestMutation = useMutation({
    mutationFn: async (data: { sourceText: string; instructions?: string; model: AIModel; chunkIndex?: number }) => {
      const response = await apiRequest("/api/generate-student-test", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentStudentTest(data.studentTest);
      toast({ title: "Student test generated successfully!" });
    },
    onError: (error) => {
      toast({
        title: "Error generating student test",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleGenerateTest = () => {
    studentTestMutation.mutate({
      sourceText: selectedText,
      instructions: customInstructions.trim() || undefined,
      model: selectedModel,
      chunkIndex
    });
  };

  const handleDownloadTxt = () => {
    if (!currentStudentTest) return;
    
    const timestamp = new Date().toLocaleString();
    const content = `STUDENT PRACTICE TEST
Generated: ${timestamp}
Model: ${selectedModel}
Instructions: ${customInstructions || "Default instructions"}

${currentStudentTest.testContent}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `student-test-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({ title: "Student test downloaded as TXT" });
  };

  const handlePrintPDF = () => {
    if (!currentStudentTest) return;
    
    const timestamp = new Date().toLocaleString();
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast({ title: "Popup blocked. Please allow popups for printing.", variant: "destructive" });
      return;
    }

    let processedContent = currentStudentTest.testContent
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Student Practice Test</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>
        <style>
          @page { margin: 1in; size: letter; }
          body { font-family: Georgia, serif; font-size: 12pt; line-height: 1.6; color: #333; }
          .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          .title { font-size: 18pt; font-weight: bold; margin: 0; }
          .subtitle { font-size: 14pt; margin: 5px 0; }
          .meta { font-size: 10pt; color: #666; margin: 5px 0; }
          .content { text-align: justify; }
          .katex { font-size: 1em !important; }
          .katex-display { margin: 1em 0 !important; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Student Practice Test</h1>
          <p class="subtitle">Introduction to Symbolic Logic</p>
          <p class="meta">Generated: ${timestamp}</p>
          <p class="meta">Model: ${selectedModel}</p>
          <p class="meta">Instructions: ${customInstructions || "Default instructions"}</p>
        </div>
        <div class="content" id="math-content">${processedContent}</div>
        <script>
          document.addEventListener("DOMContentLoaded", function() {
            renderMathInElement(document.getElementById('math-content'), {
              delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
              ],
              throwOnError: false
            });
            setTimeout(() => window.print(), 500);
          });
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const handleCopy = async () => {
    if (!currentStudentTest) return;
    
    const success = await copyToClipboard(currentStudentTest.testContent);
    if (success) {
      toast({ title: "Student test copied to clipboard" });
    } else {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  // Process content for math mode
  const processContentForMathMode = (content: string) => {
    if (!mathMode) {
      return content
        .replace(/\$\$([^$]+)\$\$/g, '$1')
        .replace(/\$([^$]+)\$/g, '$1')
        .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
        .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
        .replace(/\\text\{([^}]+)\}/g, '$1')
        .replace(/\\mathbb\{([^}]+)\}/g, '$1')
        .replace(/\\forall/g, 'for all')
        .replace(/\\Rightarrow/g, 'implies')
        .replace(/\\ldots/g, '...')
        .replace(/\\times/g, '×');
    }
    return content;
  };

  const renderContent = (content: string) => {
    const processedContent = processContentForMathMode(content);
    
    if (mathMode) {
      // Process LaTeX math notation
      let mathProcessedContent = processedContent;
      mathProcessedContent = mathProcessedContent.replace(/\$\$([^$]+)\$\$/g, (match, latex) => {
        const katexHtml = renderMathInElement(latex, { displayMode: true });
        return `<div class="katex-display">${katexHtml}</div>`;
      });
      mathProcessedContent = mathProcessedContent.replace(/\$([^$]+)\$/g, (match, latex) => {
        const katexHtml = renderMathInElement(latex, { displayMode: false });
        return `<span class="katex-inline">${katexHtml}</span>`;
      });
      
      return {
        __html: mathProcessedContent
          .replace(/\n\n/g, '<br/><br/>')
          .replace(/\n/g, '<br/>')
      };
    }
    
    return {
      __html: processedContent
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n/g, '<br/>')
    };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            Test Me - Student Practice Test
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Column - Instructions */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Custom Instructions (Optional)</h3>
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="e.g., 'Three multiple choice questions, one short answer, focus on logical reasoning, moderate difficulty'"
                className="min-h-[120px]"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Leave blank for default: 5-7 questions (mix of multiple choice and short answer) at easy to moderate difficulty level.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Selected Text Preview</h3>
              <ScrollArea className="h-[200px] w-full border rounded-md p-3">
                <p className="text-sm whitespace-pre-wrap">{selectedText.substring(0, 500)}...</p>
              </ScrollArea>
            </div>
            
            <Button 
              onClick={handleGenerateTest}
              disabled={studentTestMutation.isPending}
              className="w-full"
            >
              {studentTestMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Test...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Practice Test
                </>
              )}
            </Button>
          </div>
          
          {/* Right Column - Generated Test */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Generated Practice Test</h3>
              {currentStudentTest && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setShowFullText(true)}>
                    View Full Text
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                    <Download className="h-4 w-4 mr-1" />
                    TXT
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrintPDF}>
                    <Printer className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              )}
            </div>
            
            <ScrollArea className="h-[400px] w-full border rounded-md p-4">
              {currentStudentTest ? (
                <div dangerouslySetInnerHTML={renderContent(currentStudentTest.testContent)} />
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Generate a practice test to see it here</p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
        
        {/* Full Text Modal */}
        {showFullText && currentStudentTest && (
          <Dialog open={showFullText} onOpenChange={setShowFullText}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Full Practice Test</span>
                  <Button variant="ghost" size="sm" onClick={() => setShowFullText(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              <ScrollArea className="h-[70vh] w-full border rounded-md p-4">
                <div dangerouslySetInnerHTML={renderContent(currentStudentTest.testContent)} />
              </ScrollArea>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Instructions: {customInstructions || "Default instructions"}
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                    <Download className="h-4 w-4 mr-1" />
                    Download TXT
                  </Button>
                  <Button variant="outline" size="sm" onClick={handlePrintPDF}>
                    <Printer className="h-4 w-4 mr-1" />
                    Print PDF
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  );
}