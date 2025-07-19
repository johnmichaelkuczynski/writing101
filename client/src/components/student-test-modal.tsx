import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download, FileText, Printer, X, Loader2, BookOpen, Trophy, CheckCircle, RotateCcw } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"generate" | "take" | "results">("generate");
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<any>(null);
  const [parsedQuestions, setParsedQuestions] = useState<any[]>([]);
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
      const questions = parseTestContent(data.studentTest.testContent);
      setParsedQuestions(questions);
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

  const submitTestMutation = useMutation({
    mutationFn: async (data: { studentTestId: number; userAnswers: Record<string, string> }) => {
      const response = await apiRequest("/api/submit-test", {
        method: "POST",
        body: JSON.stringify(data)
      });
      return response.json();
    },
    onSuccess: (data) => {
      setTestResult(data.testResult);
      setViewMode("results");
      toast({ title: "Test submitted and graded successfully!" });
    },
    onError: (error) => {
      toast({
        title: "Error submitting test",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Parse test content into structured questions
  const parseTestContent = (content: string) => {
    console.log("Parsing test content:", content);
    const questions: any[] = [];
    
    // Split content into lines and clean up
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Look for lines that end with a question mark and don't start with A) B) C) D)
      if (line.includes('?') && !line.match(/^[A-Z]\)/)) {
        const questionText = line;
        const options: any[] = [];
        i++; // Move to next line to look for options
        
        // Collect consecutive option lines (A) B) C) D))
        while (i < lines.length) {
          const optionLine = lines[i];
          const optionMatch = optionLine.match(/^([A-Z])\)\s*(.+)/);
          
          if (optionMatch) {
            options.push({
              letter: optionMatch[1],
              text: optionMatch[2]
            });
            i++;
          } else {
            // No more options for this question, stop collecting
            break;
          }
        }
        
        // Only add question if it has at least 2 options
        if (options.length >= 2) {
          questions.push({
            number: (questions.length + 1).toString(),
            text: questionText,
            options: options
          });
          console.log("Found complete question:", { 
            number: questions.length, 
            text: questionText.substring(0, 50) + "...", 
            optionCount: options.length 
          });
        }
      } else {
        i++; // Move to next line if current line is not a question
      }
    }
    
    console.log("Final parsed questions:", questions.length, questions.map(q => ({ 
      number: q.number, 
      text: q.text.substring(0, 50) + "...",
      optionCount: q.options.length 
    })));
    
    return questions;
  };

  const handleGenerateTest = () => {
    const requestData: any = {
      sourceText: selectedText,
      instructions: customInstructions.trim() || undefined,
      model: selectedModel
    };
    
    // Only include chunkIndex if it's a valid number
    if (typeof chunkIndex === 'number') {
      requestData.chunkIndex = chunkIndex;
    }
    
    studentTestMutation.mutate(requestData);
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

  const handleTakeTest = () => {
    setViewMode("take");
    setUserAnswers({});
  };

  const handleSubmitTest = () => {
    if (!currentStudentTest) return;
    
    submitTestMutation.mutate({
      studentTestId: currentStudentTest.id,
      userAnswers: userAnswers
    });
  };

  const handleAnswerSelect = (questionNumber: string, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionNumber]: answer
    }));
  };

  const resetTest = () => {
    // Store the source text before resetting
    const currentSourceText = selectedText;
    const currentInstructions = customInstructions;
    const currentModel = selectedModel;
    
    // Reset state
    setViewMode("generate");
    setCurrentStudentTest(null);
    setUserAnswers({});
    setTestResult(null);
    setParsedQuestions([]);
    
    // Auto-generate new test with same parameters but fresh questions
    setTimeout(() => {
      const requestData: any = {
        sourceText: currentSourceText,
        instructions: currentInstructions.trim() || "Create a comprehensive practice test with 15-20 multiple choice questions at easy to moderate difficulty level. Generate DIFFERENT questions from the previous test to provide variety and comprehensive coverage.",
        model: currentModel
      };
      
      // Include chunkIndex if it was used before
      if (typeof chunkIndex === 'number') {
        requestData.chunkIndex = chunkIndex;
      }
      
      studentTestMutation.mutate(requestData);
    }, 100);
  };

  // Auto-reset to generate mode when modal opens to force fresh test generation
  useEffect(() => {
    if (isOpen) {
      resetTest();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold">
            <FileText className="mr-2 h-5 w-5 text-purple-600" />
            Test Me - Student Practice Test
          </DialogTitle>
        </DialogHeader>
        
        {/* View Mode: Generate Test */}
        {viewMode === "generate" && (
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
                  Leave blank for default: 5-7 multiple choice questions at easy to moderate difficulty level.
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
                    <Button variant="outline" size="sm" onClick={handleTakeTest}>
                      <BookOpen className="h-4 w-4 mr-1" />
                      Take Test
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadTxt}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
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
        )}

        {/* View Mode: Take Test */}
        {viewMode === "take" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Take Your Practice Test</h3>
              <Button variant="outline" size="sm" onClick={() => setViewMode("generate")}>
                Back to Test
              </Button>
            </div>
            
            <ScrollArea className="h-[500px] w-full border rounded-md p-4">
              <div className="space-y-6">
                {parsedQuestions.map((question, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-semibold text-lg">
                      {question.number}. {question.text}
                    </h4>
                    
                    {question.options.length > 0 && (
                      <RadioGroup
                        value={userAnswers[question.number] || ""}
                        onValueChange={(value) => handleAnswerSelect(question.number, value)}
                      >
                        {question.options.map((option: any, optIndex: number) => (
                          <div key={optIndex} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.letter} id={`q${question.number}-${option.letter}`} />
                            <Label htmlFor={`q${question.number}-${option.letter}`} className="cursor-pointer">
                              {option.letter}) {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {Object.keys(userAnswers).length} of {parsedQuestions.length} questions answered
              </p>
              <Button 
                onClick={handleSubmitTest}
                disabled={submitTestMutation.isPending || Object.keys(userAnswers).length === 0}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {submitTestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Grading...
                  </>
                ) : (
                  <>
                    <Trophy className="mr-2 h-4 w-4" />
                    Submit & Grade Test
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* View Mode: Results */}
        {viewMode === "results" && testResult && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Test Results</h3>
              <Button variant="outline" size="sm" onClick={resetTest} disabled={studentTestMutation.isPending}>
                {studentTestMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Take New Test
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-600">{testResult.score}%</p>
                <p className="text-sm text-blue-600">Final Score</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-600">{testResult.correctCount}</p>
                <p className="text-sm text-green-600">Correct Answers</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                <p className="text-2xl font-bold text-gray-600">{testResult.totalQuestions}</p>
                <p className="text-sm text-gray-600">Total Questions</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Question Review</h4>
              <ScrollArea className="h-[400px] w-full border rounded-md p-4">
                <div className="space-y-4">
                  {parsedQuestions.map((question, index) => {
                    const userAnswer = testResult.userAnswers[question.number];
                    const correctAnswer = testResult.correctAnswers[question.number];
                    const isCorrect = userAnswer === correctAnswer;
                    
                    return (
                      <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <div className="flex items-start justify-between">
                          <h5 className="font-semibold">{question.number}. {question.text}</h5>
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                          ) : (
                            <X className="h-5 w-5 text-red-600 mt-1" />
                          )}
                        </div>
                        
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Your answer:</span> {
                              userAnswer ? (
                                (() => {
                                  const option = question.options.find((opt: any) => opt.letter === userAnswer);
                                  return option ? `${userAnswer}) ${option.text}` : userAnswer;
                                })()
                              ) : "Not answered"
                            }
                          </p>
                          {!isCorrect && (
                            <p className="text-sm">
                              <span className="font-medium">Correct answer:</span> {
                                correctAnswer ? (
                                  (() => {
                                    const option = question.options.find((opt: any) => opt.letter === correctAnswer);
                                    return option ? `${correctAnswer}) ${option.text}` : correctAnswer;
                                  })()
                                ) : "Unknown"
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}