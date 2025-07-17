import { useState, useEffect } from "react";
import { BookOpen, Edit3, FileText, User, LogOut, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation-sidebar";
import DocumentContent from "@/components/document-content";
import InstructionInterface from "@/components/instruction-interface";
import ChatInterface from "@/components/chat-interface";
import ModelSelector from "@/components/model-selector";
import MathToggle from "@/components/math-toggle";
import RewriteModal from "@/components/rewrite-modal";
import PassageDiscussionModal from "@/components/passage-discussion-modal";
import QuizModal from "@/components/quiz-modal";
import StudyGuideModal from "@/components/study-guide-modal";
import TestModal from "@/components/test-modal";
import ChunkingModal from "@/components/chunking-modal";
import AuthModal from "@/components/auth-modal";
import PaymentModal from "@/components/payment-modal";


import { initializeMathRenderer } from "@/lib/math-renderer";
import { tractatusContent, getFullDocumentContent } from "@shared/tractatus-content";
import { useAuth } from "@/hooks/use-auth";
import type { AIModel } from "@shared/schema";

export default function LivingBook() {
  const { user, logout, isAuthenticated } = useAuth();
  const [selectedModel, setSelectedModel] = useState<AIModel>("openai");
  const [mathMode, setMathMode] = useState<boolean>(true);
  const [questionFromSelection, setQuestionFromSelection] = useState<string>("");
  const [selectedTextForChat, setSelectedTextForChat] = useState<string>("");
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false);
  const [rewriteMode, setRewriteMode] = useState<"selection" | "chunks">("chunks");
  const [selectedTextForRewrite, setSelectedTextForRewrite] = useState<string>("");
  const [passageDiscussionOpen, setPassageDiscussionOpen] = useState(false);
  const [selectedTextForDiscussion, setSelectedTextForDiscussion] = useState<string>("");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedTextForQuiz, setSelectedTextForQuiz] = useState<string>("");
  const [quizChunkIndex, setQuizChunkIndex] = useState<number | null>(null);
  const [studyGuideModalOpen, setStudyGuideModalOpen] = useState(false);
  const [selectedTextForStudyGuide, setSelectedTextForStudyGuide] = useState<string>("");
  const [studyGuideChunkIndex, setStudyGuideChunkIndex] = useState<number | null>(null);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [testType, setTestType] = useState<"selection" | "cumulative">("selection");
  const [selectedTextForTest, setSelectedTextForTest] = useState<string>("");
  const [testCursorPosition, setTestCursorPosition] = useState<number | null>(null);
  const [chunkingModalOpen, setChunkingModalOpen] = useState(false);
  const [pendingChunkText, setPendingChunkText] = useState<string>("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);



  useEffect(() => {
    initializeMathRenderer();
  }, []);

  const handleQuestionFromSelection = (question: string) => {
    setQuestionFromSelection(question);
  };

  const handleTextSelectedForChat = (text: string) => {
    setSelectedTextForChat(text);
  };

  const handleSelectedTextUsed = () => {
    setSelectedTextForChat("");
  };

  const handleQuestionProcessed = () => {
    setQuestionFromSelection("");
  };

  const handleRewriteFromSelection = (text: string) => {
    setSelectedTextForRewrite(text);
    setRewriteMode("selection");
    setRewriteModalOpen(true);
  };

  const handleChunkRewrite = () => {
    setSelectedTextForRewrite("");
    setRewriteMode("chunks");
    setRewriteModalOpen(true);
  };

  const handleRewriteModalClose = () => {
    setRewriteModalOpen(false);
    setSelectedTextForRewrite("");
  };

  const handlePassageDiscussion = (text: string) => {
    setSelectedTextForDiscussion(text);
    setPassageDiscussionOpen(true);
  };

  const handlePassageDiscussionClose = () => {
    setPassageDiscussionOpen(false);
    setSelectedTextForDiscussion("");
  };

  const handleCreateTestFromSelection = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      setPendingChunkText(text);
      setChunkingModalOpen(true);
    } else {
      setSelectedTextForQuiz(text);
      setQuizChunkIndex(null);
      setQuizModalOpen(true);
    }
  };

  const handleChunkAction = (chunk: string, chunkIndex: number, action: 'quiz' | 'chat' | 'rewrite' | 'study-guide') => {
    if (action === 'quiz') {
      setSelectedTextForQuiz(chunk);
      setQuizChunkIndex(chunkIndex);
      setQuizModalOpen(true);
    } else if (action === 'chat') {
      setSelectedTextForChat(chunk);
    } else if (action === 'rewrite') {
      setSelectedTextForRewrite(chunk);
      setRewriteMode("selection");
      setRewriteModalOpen(true);
    } else if (action === 'study-guide') {
      setSelectedTextForStudyGuide(chunk);
      setStudyGuideChunkIndex(chunkIndex);
      setStudyGuideModalOpen(true);
    }
  };

  const handleCreateStudyGuideFromSelection = (text: string) => {
    const wordCount = text.split(/\s+/).length;
    
    if (wordCount > 1000) {
      setPendingChunkText(text);
      setChunkingModalOpen(true);
    } else {
      setSelectedTextForStudyGuide(text);
      setStudyGuideChunkIndex(null);
      setStudyGuideModalOpen(true);
    }
  };

  const handleStudyGuideModalClose = () => {
    setStudyGuideModalOpen(false);
    setSelectedTextForStudyGuide("");
    setStudyGuideChunkIndex(null);
  };

  const handleTestMe = (text: string) => {
    setSelectedTextForTest(text);
    setTestType("selection");
    setTestCursorPosition(null);
    setTestModalOpen(true);
  };

  const handleTestMeCumulative = () => {
    // Get cursor position from current document scroll or selection
    const scrollPosition = window.scrollY;
    setSelectedTextForTest("");
    setTestType("cumulative");
    setTestCursorPosition(scrollPosition);
    setTestModalOpen(true);
  };

  const handleTestModalClose = () => {
    setTestModalOpen(false);
    setSelectedTextForTest("");
    setTestCursorPosition(null);
  };

  const handleQuizModalClose = () => {
    setQuizModalOpen(false);
    setSelectedTextForQuiz("");
    setQuizChunkIndex(null);
  };

  const handleChunkingModalClose = () => {
    setChunkingModalOpen(false);
    setPendingChunkText("");
  };

  const openAuthModal = (tab: "login" | "register") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };





  const getFullDocumentText = () => {
    return tractatusContent.sections
      .map(section => section.content)
      .join('\n\n');
  };



  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-primary text-lg" />
              <div className="flex flex-col">
                <h1 className="font-inter font-semibold text-base text-foreground">
                  Unabomber Manifesto
                </h1>
                <a 
                  href="mailto:contact@zhisystems.ai"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <MathToggle 
                mathMode={mathMode} 
                onToggle={setMathMode} 
              />

              <Button
                variant="outline"
                size="sm"
                onClick={handleChunkRewrite}
                className="flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Rewrite Document</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullText = getFullDocumentContent();
                  handleCreateTestFromSelection(fullText);
                }}
                className="flex items-center space-x-2 text-orange-600 border-orange-200 hover:bg-orange-50"
              >
                <FileText className="w-4 h-4" />
                <span>Create Test</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullText = getFullDocumentContent();
                  handleCreateStudyGuideFromSelection(fullText);
                }}
                className="flex items-center space-x-2 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <BookOpen className="w-4 h-4" />
                <span>Study Guide</span>
              </Button>

              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={setSelectedModel} 
              />

              {/* Authentication section */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-2 border-l pl-2 ml-2">
                  <div className="text-sm">
                    <span className="font-medium">{user.username}</span>
                    <div className="text-xs text-muted-foreground">
                      {(user.credits || 0).toLocaleString()} credits
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentModalOpen(true)}
                    className="flex items-center space-x-1"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Buy Credits</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-1"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2 border-l pl-2 ml-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openAuthModal("login")}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openAuthModal("register")}
                    className="flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Register</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-none w-full main-content-with-bottom-bar">
        {/* Navigation Sidebar - Narrower */}
        <div className="w-60 flex-shrink-0">
          <NavigationSidebar />
        </div>

        {/* Main Content Area - MUCH WIDER FOR DOCUMENT READING */}
        <main className="flex-1 max-w-5xl mx-4">
          {/* Document Content */}
          <DocumentContent 
            mathMode={mathMode}
            onQuestionFromSelection={handleQuestionFromSelection}
            onTextSelectedForChat={handleTextSelectedForChat}
            onRewriteFromSelection={handleRewriteFromSelection}
            onPassageDiscussion={handlePassageDiscussion}
            onCreateTest={handleCreateTestFromSelection}
            onCreateStudyGuide={handleCreateStudyGuideFromSelection}
            onTestMe={handleTestMe}
            onTestMeCumulative={handleTestMeCumulative}
          />
        </main>

        {/* Chat Panel - Fixed Width */}
        <div className="w-96 flex-shrink-0">
          <ChatInterface 
            selectedModel={selectedModel} 
            mathMode={mathMode}
            selectedText={selectedTextForChat}
            onSelectedTextUsed={() => setSelectedTextForChat("")}
          />
        </div>
      </div>

      {/* Instruction Interface - Bottom Bar */}
      <InstructionInterface 
        selectedModel={selectedModel} 
        mathMode={mathMode}
        initialQuestion={questionFromSelection}
        onQuestionProcessed={handleQuestionProcessed}
      />

      {/* Rewrite Modal */}
      <RewriteModal
        isOpen={rewriteModalOpen}
        onClose={handleRewriteModalClose}
        selectedModel={selectedModel}
        mode={rewriteMode}
        selectedText={selectedTextForRewrite}
        fullDocumentText={getFullDocumentContent()}
      />

      {/* Passage Discussion Modal */}
      <PassageDiscussionModal
        isOpen={passageDiscussionOpen}
        onClose={handlePassageDiscussionClose}
        selectedText={selectedTextForDiscussion}
        selectedModel={selectedModel}
        mathMode={mathMode}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={quizModalOpen}
        onClose={handleQuizModalClose}
        sourceText={selectedTextForQuiz}
        chunkIndex={quizChunkIndex}
        selectedModel={selectedModel}
      />

      {/* Study Guide Modal */}
      <StudyGuideModal
        isOpen={studyGuideModalOpen}
        onClose={handleStudyGuideModalClose}
        sourceText={selectedTextForStudyGuide}
        chunkIndex={studyGuideChunkIndex}
        selectedModel={selectedModel}
      />

      {/* Test Modal */}
      <TestModal
        isOpen={testModalOpen}
        onClose={handleTestModalClose}
        selectedText={selectedTextForTest}
        testType={testType}
        cursorPosition={testCursorPosition}
        selectedModel={selectedModel}
        mathMode={mathMode}
      />

      {/* Chunking Modal */}
      <ChunkingModal
        isOpen={chunkingModalOpen}
        onClose={handleChunkingModalClose}
        text={pendingChunkText}
        onChunkAction={handleChunkAction}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

    </div>
  );
}
