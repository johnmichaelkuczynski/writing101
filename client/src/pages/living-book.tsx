import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import NavigationSidebar from "@/components/navigation-sidebar";
import DocumentContent from "@/components/document-content";
import InstructionInterface from "@/components/instruction-interface";
import ChatInterface from "@/components/chat-interface";
import ModelSelector from "@/components/model-selector";
import { initializeMathRenderer } from "@/lib/math-renderer";
import type { AIModel } from "@shared/schema";

export default function LivingBook() {
  const [selectedModel, setSelectedModel] = useState<AIModel>("deepseek");
  const [questionFromSelection, setQuestionFromSelection] = useState<string>("");
  const [selectedTextForChat, setSelectedTextForChat] = useState<string>("");

  useEffect(() => {
    initializeMathRenderer();
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BookOpen className="text-primary text-xl" />
              <h1 className="font-inter font-semibold text-lg text-foreground">
                Living Book: Incompleteness of Deductive Logic
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ModelSelector 
                selectedModel={selectedModel} 
                onModelChange={setSelectedModel} 
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-none w-full main-content-with-bottom-bar">
        {/* Navigation Sidebar */}
        <NavigationSidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Document Content */}
          <DocumentContent 
            onQuestionFromSelection={setQuestionFromSelection}
            onTextSelectedForChat={setSelectedTextForChat}
          />
        </main>

        {/* Chat Panel - Much Larger */}
        <ChatInterface 
          selectedModel={selectedModel} 
          selectedText={selectedTextForChat}
          onSelectedTextUsed={() => setSelectedTextForChat("")}
        />
      </div>

      {/* Instruction Interface - Bottom Bar */}
      <InstructionInterface 
        selectedModel={selectedModel} 
        initialQuestion={questionFromSelection}
        onQuestionProcessed={() => setQuestionFromSelection("")}
      />
    </div>
  );
}
