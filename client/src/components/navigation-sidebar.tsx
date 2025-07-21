import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a comprehensive table of contents covering all major topics from the actual document
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
    { id: "homework1-answers", title: "Homework 1 with Answers", level: 1 },
    
    // Week 2: Truth Tables and Proofs
    { id: "propositional-calculus", title: "Propositional Calculus and Truth Tables", level: 0 },
    { id: "week2", title: "Week 2: Truth Tables and Elementary Proofs", level: 1 },
    { id: "constructing-formulas", title: "Constructing well-formed formulas", level: 2 },
    { id: "evaluating-truth", title: "Evaluating truth values", level: 2 },
    { id: "valid-inferences", title: "Making valid inferences", level: 2 },
    { id: "truth-tables", title: "Truth Tables", level: 1 },
    { id: "systematic-method", title: "Truth tables systematically", level: 2 },
    { id: "truth-table-negation", title: "Basic Truth Table: Negation (¬)", level: 2 },
    { id: "conjunction", title: "Conjunction (∧)", level: 2 },
    { id: "disjunction", title: "Disjunction (∨)", level: 2 },
    { id: "conditional", title: "Conditional (→)", level: 2 },
    { id: "elementary-proofs", title: "Elementary Proofs", level: 1 },
    { id: "modus-ponens", title: "Modus Ponens (MP)", level: 2 },
    { id: "modus-tollens", title: "Modus Tollens (MT)", level: 2 },
    { id: "double-negation", title: "Double Negation (DN)", level: 2 },
    { id: "homework2", title: "Homework 2: Truth Tables and Elementary Proofs", level: 1 },
    { id: "homework2-answers", title: "Homework 2 with Answers", level: 1 },
    
    // Week 3: Boolean Algebra
    { id: "boolean-algebra", title: "Boolean Algebra", level: 0 },
    { id: "week3", title: "Week 3: Boolean Operations and Laws", level: 1 },
    { id: "intro-boolean", title: "Introduction to Boolean Algebra", level: 2 },
    { id: "basic-operations", title: "Basic Operations", level: 2 },
    { id: "fundamental-laws", title: "Fundamental Laws of Boolean Algebra", level: 2 },
    { id: "boolean-functions", title: "Boolean Functions and Truth Tables", level: 2 },
    { id: "boolean-simplification", title: "Boolean Expressions and Simplification", level: 2 },
    { id: "logic-gates", title: "Logic Gates and Digital Circuits", level: 1 },
    { id: "homework3", title: "Homework 3: Boolean Algebra", level: 1 },
    { id: "homework3-answers", title: "Homework 3 with Answers", level: 1 },
    
    // Midterm Exam
    { id: "midterm", title: "First Midterm Examination", level: 0 },
    { id: "midterm-answers", title: "First Midterm with Answers", level: 1 },
    
    // Advanced Topics: Predicate Logic
    { id: "predicate-logic", title: "Predicate Logic and Quantification", level: 0 },
    { id: "week4", title: "Week 4: Introduction to Predicate Logic", level: 1 },
    { id: "predicates-functions", title: "Predicates and Functions", level: 2 },
    { id: "quantifiers", title: "Quantifiers", level: 2 },
    { id: "translation-predicate", title: "Translation into Predicate Logic", level: 2 },
    { id: "homework4", title: "Homework 4: Predicate Logic", level: 1 },
    { id: "homework4-answers", title: "Homework 4 with Answers", level: 1 },
    
    // Advanced Quantification
    { id: "advanced-quantification", title: "Advanced Quantification", level: 0 },
    { id: "week5", title: "Week 5: Advanced Quantification and Mathematical Analysis", level: 1 },
    { id: "multiple-quantifiers", title: "Multiple Quantifiers", level: 2 },
    { id: "uniqueness", title: "Uniqueness and Existence", level: 2 },
    { id: "mathematical-statements", title: "Complex Mathematical Statements", level: 2 },
    { id: "epsilon-delta", title: "The Epsilon-Delta Definition", level: 2 },
    { id: "homework5", title: "Homework 5: Advanced Quantification", level: 1 },
    { id: "homework5-answers", title: "Homework 5 with Answers", level: 1 },
    
    // Models and Proofs
    { id: "models-proofs", title: "Models and Proofs", level: 0 },
    { id: "week6", title: "Week 6: Models and Proof Theory", level: 1 },
    { id: "semantic-concepts", title: "Semantic Concepts", level: 2 },
    { id: "consistency", title: "Consistency and Satisfiability", level: 2 },
    { id: "homework6", title: "Homework 6: Models and Proofs", level: 1 },
    { id: "homework6-answers", title: "Homework 6 with Answers", level: 1 },
    
    // Final Examination
    { id: "final-exam", title: "Final Examination", level: 0 },
    { id: "final-answers", title: "Final Examination with Answers", level: 1 },
    { id: "recursivity", title: "Recursivity and Definability", level: 1 }
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
        "homework1-answers": "Homework 1",
        "propositional-calculus": "Propositional Calculus",
        "week2": "Week 2:",
        "constructing-formulas": "well-formed formulas",
        "evaluating-truth": "truth values",
        "valid-inferences": "valid inferences",
        "truth-tables": "Truth Tables",
        "systematic-method": "systematically",
        "truth-table-negation": "Negation",
        "conjunction": "Conjunction",
        "disjunction": "Disjunction",
        "conditional": "Conditional",
        "elementary-proofs": "Elementary Proofs",
        "modus-ponens": "Modus Ponens",
        "modus-tollens": "Modus Tollens",
        "double-negation": "Double Negation",
        "homework2": "Homework 2",
        "homework2-answers": "Homework 2",
        "boolean-algebra": "Boolean Algebra",
        "week3": "Week 3:",
        "intro-boolean": "Introduction to Boolean",
        "basic-operations": "Basic Operations",
        "fundamental-laws": "Fundamental Laws",
        "boolean-functions": "Boolean Functions",
        "boolean-simplification": "Boolean Expressions",
        "logic-gates": "Logic Gates",
        "homework3": "Homework 3",
        "homework3-answers": "Homework 3",
        "midterm": "First Midterm Examination",
        "midterm-answers": "First Midterm",
        "predicate-logic": "Predicate Logic",
        "week4": "Week 4:",
        "predicates-functions": "Predicates and Functions",
        "quantifiers": "Quantifiers",
        "translation-predicate": "Translation into Predicate",
        "homework4": "Homework 4",
        "homework4-answers": "Homework 4",
        "advanced-quantification": "Advanced Quantification",
        "week5": "Week 5:",
        "multiple-quantifiers": "Multiple Quantifiers",
        "uniqueness": "Uniqueness",
        "mathematical-statements": "Mathematical Statements",
        "epsilon-delta": "Epsilon-Delta",
        "homework5": "Homework 5",
        "homework5-answers": "Homework 5",
        "models-proofs": "Models and Proofs",
        "week6": "Week 6:",
        "semantic-concepts": "Semantic Concepts",
        "consistency": "Consistency",
        "homework6": "Homework 6",
        "homework6-answers": "Homework 6",
        "final-exam": "Final Examination",
        "final-answers": "Final Examination",
        "recursivity": "Recursivity"
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
