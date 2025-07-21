import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a comprehensive table of contents covering all major topics
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [
    // Week 1: Basic Concepts
    { id: "week1", title: "Week 1: Basic Concepts, Notation, and Logical Operators", level: 0 },
    { id: "intro-logic", title: "Introduction to Logic", level: 1 },
    { id: "basic-concepts", title: "Basic Concepts", level: 1 },
    { id: "logical-symbols", title: "Basic Logical Symbols", level: 1 },
    { id: "material-strict", title: "Material vs. Strict Implication", level: 1 },
    { id: "translation-practice", title: "Translation Practice", level: 1 },
    { id: "practice-exercises", title: "Practice Exercises", level: 1 },
    { id: "homework1", title: "Homework 1: Basic Concepts", level: 1 },
    
    // Week 2: Truth Tables
    { id: "week2", title: "Week 2: Truth Tables and Logical Equivalence", level: 0 },
    { id: "truth-tables", title: "Truth Tables", level: 1 },
    { id: "logical-equivalence", title: "Logical Equivalence", level: 1 },
    { id: "tautologies", title: "Tautologies and Contradictions", level: 1 },
    { id: "homework2", title: "Homework 2: Truth Tables", level: 1 },
    
    // Week 3: Boolean Algebra and Logic Gates
    { id: "week3", title: "Week 3: Boolean Algebra and Logic Gates", level: 0 },
    { id: "boolean-algebra", title: "Boolean Algebra", level: 1 },
    { id: "logic-gates", title: "Logic Gates", level: 1 },
    { id: "circuit-design", title: "Circuit Design", level: 1 },
    { id: "homework3", title: "Homework 3: Boolean Algebra", level: 1 },
    
    // Midterm and Advanced Topics
    { id: "midterm", title: "First Midterm Examination", level: 0 },
    { id: "predicate-logic", title: "Predicate Logic", level: 0 },
    { id: "quantifiers", title: "Quantifiers", level: 1 },
    { id: "models-proofs", title: "Models and Proofs", level: 1 },
    { id: "set-theory", title: "Set Theory", level: 0 },
    { id: "recursive-definitions", title: "Recursive Definitions", level: 0 },
    { id: "final-exam", title: "Final Examination", level: 0 }
  ];
  
  return tableOfContents;
};

const tableOfContents = createTableOfContents();



export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    // First try to find exact ID match
    let element = document.getElementById(id);
    
    // If not found, try to find the content by searching text
    if (!element) {
      const titleMap: { [key: string]: string } = {
        "week1": "Week 1: Basic Concepts, Notation, and Logical Operators",
        "intro-logic": "Introduction to Logic",
        "basic-concepts": "Basic Concepts",
        "logical-symbols": "Basic Logical Symbols",
        "material-strict": "Material vs. Strict Implication",
        "translation-practice": "Translation Practice",
        "practice-exercises": "Practice Exercises",
        "homework1": "Homework 1",
        "week2": "Week 2:",
        "truth-tables": "Truth Tables",
        "logical-equivalence": "Logical Equivalence",
        "tautologies": "Tautologies",
        "homework2": "Homework 2",
        "week3": "Week 3:",
        "boolean-algebra": "Boolean Algebra",
        "logic-gates": "Logic Gates",
        "circuit-design": "Circuit Design",
        "homework3": "Homework 3",
        "midterm": "First Midterm Examination",
        "predicate-logic": "Predicate Logic",
        "quantifiers": "Quantifiers",
        "models-proofs": "Models and Proofs",
        "set-theory": "Set Theory",
        "recursive-definitions": "Recursive Definitions",
        "final-exam": "Final Examination"
      };
      
      const searchText = titleMap[id];
      if (searchText) {
        // Find all elements containing this text
        const allElements = document.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
          const el = allElements[i];
          if (el.textContent?.includes(searchText)) {
            element = el as HTMLElement;
            break;
          }
        }
      }
    }
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="w-48 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-280px)]">
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
                  className={`block w-full text-left px-2 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded transition-colors font-medium ${
                    entry.level === 0 ? 'font-semibold text-slate-900 dark:text-slate-100' : 
                    entry.level === 1 ? 'pl-4' : 
                    'pl-6'
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
