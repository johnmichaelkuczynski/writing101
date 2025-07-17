import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { renderMathString } from "@/lib/math-renderer";
import MathInput from "@/components/math-input";
import ModelSelector from "@/components/model-selector";
import { 
  Brain, 
  Target, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Download, 
  Printer, 
  Loader2,
  Send,
  RotateCcw,
  Trophy
} from "lucide-react";
import { AIModel } from "@shared/schema";

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText?: string;
  testType: "selection" | "cumulative";
  cursorPosition?: number;
}

interface Question {
  id: number;
  question: string;
  options?: string[];
  type: "multiple-choice" | "short-answer" | "essay" | "true-false" | "fill-blank";
  correctAnswer?: string;
  explanation?: string;
}

interface TestSession {
  id: number;
  questions: Question[];
  userAnswers: { [key: number]: string };
  submitted: boolean;
  score?: {
    total: number;
    correct: number;
    percentage: number;
    grade: string;
    feedback: string;
  };
}

export default function TestModal({ isOpen, onClose, selectedText, testType, cursorPosition }: TestModalProps) {
  const [step, setStep] = useState<"setup" | "generating" | "taking" | "results">("setup");
  const [instructions, setInstructions] = useState("");
  const [selectedModel, setSelectedModel] = useState<AIModel>("openai");
  const [testSession, setTestSession] = useState<TestSession | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const queryClient = useQueryClient();

  // Timer effect
  useEffect(() => {
    if (step === "taking" && timeStarted) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - timeStarted.getTime()) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timeStarted]);

  // Generate test mutation
  const generateTestMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        sourceText: selectedText || "",
        instructions: instructions || "Create a comprehensive test with multiple question types",
        testType,
        model: selectedModel,
        cursorPosition: testType === "cumulative" ? cursorPosition : undefined,
      };

      const response = await apiRequest("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      return response;
    },
    onSuccess: (data) => {
      // Parse the test content and create questions
      const questions = parseTestContent(data.testContent);
      const newSession: TestSession = {
        id: data.id,
        questions,
        userAnswers: {},
        submitted: false,
      };
      setTestSession(newSession);
      setTimeStarted(new Date());
      setStep("taking");
    },
    onError: (error) => {
      console.error("Test generation failed:", error);
    },
  });

  // Submit test mutation
  const submitTestMutation = useMutation({
    mutationFn: async (answers: { [key: number]: string }) => {
      if (!testSession) throw new Error("No test session");
      
      const responses = Object.entries(answers).map(([questionIndex, answer]) => ({
        testSessionId: testSession.id,
        questionIndex: parseInt(questionIndex),
        userAnswer: answer,
      }));

      const gradeResponse = await apiRequest("/api/grade-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testSessionId: testSession.id,
          responses,
          model: selectedModel,
        }),
      });

      return gradeResponse;
    },
    onSuccess: (gradeData) => {
      setTestSession(prev => prev ? {
        ...prev,
        submitted: true,
        score: gradeData,
      } : null);
      setStep("results");
    },
  });

  const parseTestContent = (content: string): Question[] => {
    // Parse AI-generated test content into structured questions
    const questions: Question[] = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentQuestion: Partial<Question> = {};
    let questionId = 1;
    
    for (const line of lines) {
      if (line.match(/^\d+\./)) {
        // New question
        if (currentQuestion.question) {
          questions.push({ id: questionId++, ...currentQuestion } as Question);
        }
        currentQuestion = {
          question: line.replace(/^\d+\.\s*/, ''),
          type: "short-answer"
        };
      } else if (line.match(/^[A-D]\)/)) {
        // Multiple choice option
        if (!currentQuestion.options) {
          currentQuestion.options = [];
          currentQuestion.type = "multiple-choice";
        }
        currentQuestion.options.push(line);
      } else if (line.toLowerCase().includes("true") || line.toLowerCase().includes("false")) {
        currentQuestion.type = "true-false";
      } else if (currentQuestion.question && line.trim()) {
        // Continuation of question
        currentQuestion.question += " " + line;
      }
    }
    
    // Add the last question
    if (currentQuestion.question) {
      questions.push({ id: questionId, ...currentQuestion } as Question);
    }
    
    return questions.length > 0 ? questions : [
      {
        id: 1,
        question: content,
        type: "short-answer"
      }
    ];
  };

  const handleStartTest = () => {
    if (!selectedText && testType === "selection") return;
    setStep("generating");
    generateTestMutation.mutate();
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitTest = () => {
    if (!testSession) return;
    submitTestMutation.mutate(userAnswers);
  };

  const handleResetTest = () => {
    setStep("setup");
    setTestSession(null);
    setUserAnswers({});
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setTimeStarted(null);
    setInstructions("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: Question) => {
    const answer = userAnswers[question.id] || "";
    
    return (
      <Card key={question.id} className="mb-4">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
              Q{question.id}
            </span>
            <div 
              className="flex-1" 
              dangerouslySetInnerHTML={{ 
                __html: renderMathString(question.question) 
              }} 
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === "multiple-choice" && question.options && (
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answer === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="mt-1"
                  />
                  <span dangerouslySetInnerHTML={{ __html: renderMathString(option) }} />
                </label>
              ))}
            </div>
          )}
          
          {question.type === "true-false" && (
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="True"
                  checked={answer === "True"}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value="False"
                  checked={answer === "False"}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
                <span>False</span>
              </label>
            </div>
          )}
          
          {(question.type === "short-answer" || question.type === "essay" || question.type === "fill-blank") && (
            <MathInput
              value={answer}
              onChange={(value) => handleAnswerChange(question.id, value)}
              placeholder="Enter your answer (supports math notation like x^2, sqrt(x), etc.)"
              className="w-full"
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {testType === "selection" ? (
              <>
                <Brain className="w-5 h-5 text-red-600" />
                Test Me: Selected Text
              </>
            ) : (
              <>
                <Target className="w-5 h-5 text-amber-600" />
                Test Me: Everything Up to This Point
              </>
            )}
            {step === "taking" && (
              <Badge variant="outline" className="ml-auto">
                <Clock className="w-3 h-3 mr-1" />
                {formatTime(timeElapsed)}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          {step === "setup" && (
            <div className="space-y-4 p-1">
              <div>
                <Label htmlFor="test-instructions">Test Instructions (Optional)</Label>
                <Textarea
                  id="test-instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Specify the difficulty level, question types, or focus areas for your test..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>AI Model</Label>
                <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
              </div>

              {selectedText && (
                <div>
                  <Label>Selected Content Preview</Label>
                  <ScrollArea className="h-32 w-full border rounded p-3 mt-1 bg-gray-50 dark:bg-gray-900">
                    <div className="text-sm">
                      {selectedText.substring(0, 500)}
                      {selectedText.length > 500 && "..."}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button 
                  onClick={handleStartTest}
                  disabled={!selectedText && testType === "selection"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Generate Test
                </Button>
              </div>
            </div>
          )}

          {step === "generating" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                <div>
                  <h3 className="text-lg font-medium">Generating Your Test</h3>
                  <p className="text-muted-foreground">Creating questions based on the content...</p>
                </div>
              </div>
            </div>
          )}

          {step === "taking" && testSession && (
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">
                    Question {currentQuestion + 1} of {testSession.questions.length}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {Object.keys(userAnswers).length} answered
                  </span>
                </div>
                <Button 
                  onClick={handleSubmitTest}
                  disabled={submitTestMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {submitTestMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Trophy className="w-4 h-4 mr-2" />
                  )}
                  Submit Test
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                {testSession.questions.map(renderQuestion)}
              </ScrollArea>
            </div>
          )}

          {step === "results" && testSession?.score && (
            <div className="space-y-4 p-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                  <h3 className="text-2xl font-bold">Test Complete!</h3>
                </div>
                <div className="text-4xl font-bold text-blue-600">
                  {testSession.score.percentage}%
                </div>
                <Badge 
                  variant={testSession.score.grade === 'A' ? 'default' : testSession.score.grade === 'F' ? 'destructive' : 'secondary'}
                  className="text-lg px-3 py-1"
                >
                  Grade: {testSession.score.grade}
                </Badge>
                <p className="text-muted-foreground">
                  {testSession.score.correct} out of {testSession.score.total} questions correct
                </p>
                <p className="text-sm">Time: {formatTime(timeElapsed)}</p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Feedback</h4>
                <p className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded">
                  {testSession.score.feedback}
                </p>
              </div>

              <div className="flex justify-center space-x-2">
                <Button variant="outline" onClick={handleResetTest}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Another Test
                </Button>
                <Button variant="outline" onClick={onClose}>
                  <Download className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}