import { useState, useEffect } from "react";
import { BookOpen, Edit3, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation-sidebar";
import DocumentContent from "@/components/document-content";
import InstructionInterface from "@/components/instruction-interface";
import ChatInterface from "@/components/chat-interface";
import ModelSelector from "@/components/model-selector";
import MathToggle from "@/components/math-toggle";
import RewriteModal from "@/components/rewrite-modal";

import { initializeMathRenderer } from "@/lib/math-renderer";
import { paperContent } from "@shared/paper-content";
import type { AIModel } from "@shared/schema";

export default function LivingBook() {
  const [selectedModel, setSelectedModel] = useState<AIModel>("deepseek");
  const [mathMode, setMathMode] = useState<boolean>(true);
  const [questionFromSelection, setQuestionFromSelection] = useState<string>("");
  const [selectedTextForChat, setSelectedTextForChat] = useState<string>("");
  const [rewriteModalOpen, setRewriteModalOpen] = useState(false);
  const [rewriteMode, setRewriteMode] = useState<"selection" | "chunks">("chunks");
  const [selectedTextForRewrite, setSelectedTextForRewrite] = useState<string>("");


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





  const getFullDocumentText = () => {
    return paperContent.sections
      .map(section => section.content)
      .join('\n\n');
  };



  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="text-primary text-xl" />
              <h1 className="font-inter font-semibold text-lg text-foreground">
                Living Book: Tractatus Logico-Philosophicus
              </h1>
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
              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={setSelectedModel} 
              />
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
        fullDocumentText={getFullDocumentText()}
      />



    </div>
  );
}
