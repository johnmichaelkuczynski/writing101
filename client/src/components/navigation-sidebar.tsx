import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a table of contents based on the Writing 101 course content
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [
    // Academic Writing Principles
    { id: "academic-writing-principles", title: "Academic Writing Principles", level: 0 },
    { id: "clarity", title: "Clarity", level: 1 },
    { id: "evidence", title: "Evidence", level: 1 },
    { id: "analysis", title: "Analysis", level: 1 },
    
    // Discussion Assignment 1
    { id: "discussion-1", title: "Discussion 1: Understanding Academic Writing", level: 0 },
    
    // Essay 1
    { id: "essay-1", title: "Essay 1: Academic vs. Popular Writing", level: 0 },
    { id: "essay-1-section-1", title: "Section 1: Academic vs. Popular", level: 1 },
    { id: "essay-1-section-2", title: "Section 2: Translation Exercise", level: 1 },
    
    // Source Types and Evidence
    { id: "discussion-2", title: "Discussion 2: Types of Academic Evidence", level: 0 },
    { id: "primary-sources", title: "Primary Sources", level: 1 },
    { id: "secondary-sources", title: "Secondary Sources", level: 1 },
    { id: "tertiary-sources", title: "Tertiary Sources", level: 1 },
    
    // Essay 2
    { id: "essay-2", title: "Essay 2: Source Evaluation", level: 0 },
    { id: "essay-2-introduction", title: "Introduction", level: 1 },
    { id: "essay-2-analysis", title: "Source Analysis", level: 1 },
    { id: "essay-2-comparison", title: "Comparative Analysis", level: 1 },
    
    // Argument Analysis
    { id: "discussion-3", title: "Discussion 3: Academic Arguments", level: 0 },
    { id: "premises", title: "Premises", level: 1 },
    { id: "logical-reasoning", title: "Logical Reasoning", level: 1 },
    { id: "conclusions", title: "Conclusions", level: 1 },
    
    // Essay 3
    { id: "essay-3", title: "Essay 3: Argument and Counterargument", level: 0 },
    { id: "clarity-complexity-dilemma", title: "Clarity-Complexity Dilemma", level: 1 },
    { id: "resolving-dilemma", title: "Resolving the Dilemma", level: 1 },
    
    // Theory and Evidence
    { id: "discussion-4", title: "Discussion 4: Theory and Evidence", level: 0 },
    
    // Final Research Paper
    { id: "final-paper", title: "Final Research Paper", level: 0 },
    { id: "paper-requirements", title: "Paper Requirements", level: 1 },
    { id: "works-cited", title: "Works Cited", level: 1 }
  ];
  
  return tableOfContents;
};

const tableOfContents = createTableOfContents();



export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    console.log(`Clicking navigation item: ${id}`);
    
    // First try to find exact ID match
    let element = document.getElementById(id);
    console.log(`Found element by ID: ${!!element}`);
    
    // If not found, try to find the content by searching text
    if (!element) {
      const titleMap: { [key: string]: string } = {
        "academic-writing-principles": "Academic writing is the practice",
        "clarity": "Clarity - The foundation",
        "evidence": "Evidence - Academic writing builds",
        "analysis": "Analysis - Academic writing requires",
        "discussion-1": "Discussion Assignment 1",
        "essay-1": "Essay 1 -- Analyzing Academic vs. Popular Writing",
        "essay-1-section-1": "Section 1 (30 points) Academic vs. Popular Writing",
        "essay-1-section-2": "Section 2 (20 points) Translation Exercise",
        "discussion-2": "Discussion 2: Types of Academic Evidence",
        "primary-sources": "Primary Sources involve:",
        "secondary-sources": "Secondary Sources involve:",
        "tertiary-sources": "Tertiary Sources involve:",
        "essay-2": "Essay 2 -- Source Evaluation and Analysis",
        "essay-2-introduction": "Section 1 (10 points) Introduction",
        "essay-2-analysis": "Section 2 (20 points) Source Analysis",
        "essay-2-comparison": "Section 3 (20 points) Comparative Analysis",
        "discussion-3": "Discussion 3: Analyzing Academic Arguments",
        "premises": "Premises (claims supported by evidence)",
        "logical-reasoning": "Logical reasoning connecting the premises",
        "conclusions": "A supported conclusion",
        "essay-3": "Essay 3 -- Argument and Counterargument",
        "clarity-complexity-dilemma": "Section 1 (30 points) The Argumentative Dilemma",
        "resolving-dilemma": "Section 2 (20 points) Resolving the Dilemma",
        "discussion-4": "Discussion 4: Theory and Evidence Integration",
        "final-paper": "Final Research Paper",
        "paper-requirements": "Minimum 5 scholarly sources",
        "works-cited": "Works Cited:"
      };
      
      const searchText = titleMap[id];
      console.log(`Searching for text: ${searchText}`);
      
      if (searchText) {
        // Find all elements containing this text in the document content area
        const contentArea = document.querySelector('[data-document-content]');
        if (contentArea) {
          const allElements = contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
          for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            const textContent = el.textContent || '';
            
            // Skip table of contents sections - look for actual theorem statements
            if (textContent.includes(searchText) && 
                !textContent.includes('Table of Contents') && 
                !el.closest('.table-of-contents')) {
              element = el as HTMLElement;
              console.log(`Found element by text search: ${el.tagName} - ${textContent.substring(0, 50)}...`);
              break;
            }
          }
        }
      }
    }
    
    if (element) {
      console.log(`Scrolling to element: ${element.tagName}#${element.id || 'no-id'}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Add a temporary highlight to show the user where they landed
      element.style.backgroundColor = '#fef3c7';
      setTimeout(() => {
        element.style.backgroundColor = '';
      }, 2000);
    } else {
      console.log(`No element found for navigation ID: ${id}`);
    }
  };

  return (
    <aside className="w-48 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-160px)]">
      <div className="p-3 h-full flex flex-col">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3 flex-shrink-0">
          Table of Contents
        </h3>
        <ScrollArea className="flex-1 h-full">
          <div className="pr-2">
            <nav className="space-y-1">
              {tableOfContents.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNavClick(entry.id)}
                  className={`block w-full text-left px-2 py-1.5 text-xs hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded transition-colors font-normal ${
                    entry.level === 0 ? 'text-slate-800 dark:text-slate-200' : 
                    entry.level === 1 ? 'pl-4 text-slate-700 dark:text-slate-300' : 
                    'pl-6 text-slate-700 dark:text-slate-300'
                  }`}
                  title={entry.title}
                >
                  <span className="block text-xs leading-tight whitespace-normal">
                    {entry.title}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
