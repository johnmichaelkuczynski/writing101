import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Create a table of contents based on the actual mathematical theorems in the document
const createTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [
    // Introduction
    { id: "introduction", title: "Introduction", level: 0 },
    { id: "table-of-contents", title: "Table of Contents", level: 1 },
    
    // Core Theorems - Structural Foundation
    { id: "theorem-0", title: "Theorem 0: Cardinality Gap and Incompleteness", level: 0 },
    { id: "theorem-1", title: "Theorem 1: Non-Recursiveness of Arithmetic Provability", level: 1 },
    { id: "theorem-2", title: "Theorem 2: Non-Recursiveness of Natural Language", level: 1 },
    { id: "theorem-3", title: "Theorem 3: Semantic Truth Outpaces Syntactic Provability", level: 1 },
    { id: "theorem-4", title: "Theorem 4: Structural vs Epistemic Gap", level: 1 },
    { id: "theorem-5", title: "Theorem 5: Diagonalization Reveals, Not Causes", level: 1 },
    
    // Recursive and Mapping Theorems
    { id: "theorem-6", title: "Theorem 6: Recursive Flattening", level: 0 },
    { id: "theorem-7", title: "Theorem 7: Lossy Mapping from Proofs to Truths", level: 1 },
    { id: "theorem-8", title: "Theorem 8: Power Set Barrier", level: 1 },
    { id: "theorem-9", title: "Theorem 9: Limits of Meta-Arithmetic", level: 1 },
    { id: "theorem-10", title: "Theorem 10: Continuity of Incompleteness", level: 1 },
    
    // Epistemic and Logical Closure
    { id: "theorem-11", title: "Theorem 11: Consequence Explosion", level: 0 },
    { id: "theorem-12", title: "Theorem 12: Recursive vs Meta-Recursive Domains", level: 1 },
    { id: "theorem-13", title: "Theorem 13: Epistemic Shadows", level: 1 },
    { id: "theorem-14", title: "Theorem 14: Diagonal-Free Incompleteness", level: 1 },
    { id: "theorem-15", title: "Theorem 15: Quantifier Collapse", level: 1 },
    
    // Advanced Structural Results
    { id: "theorem-16", title: "Theorem 16: Encoding Saturation", level: 0 },
    { id: "theorem-17", title: "Theorem 17: Proof Closure vs Truth Closure", level: 1 },
    { id: "theorem-18", title: "Theorem 18: No Iterative Extension Can Achieve Completeness", level: 1 },
    { id: "theorem-19", title: "Theorem 19: Model Independence Requires Transcendence", level: 1 },
    { id: "theorem-20", title: "Theorem 20: Truth Is Not Inferentially Bootstrappable", level: 1 },
    
    // Meta-Theoretical Analysis
    { id: "theorem-21", title: "Theorem 21: Inference Cannot Secure Its Own Validity", level: 0 },
    { id: "theorem-22", title: "Theorem 22: Systems Cannot Generate Semantic Anchors", level: 1 },
    { id: "theorem-23", title: "Theorem 23: Axiomatic Closure vs Semantic Openness", level: 1 },
    { id: "theorem-24", title: "Theorem 24: Systems Cannot Anticipate Extensions", level: 1 },
    { id: "theorem-25", title: "Theorem 25: Semantic Validity Results in Circularity", level: 1 },
    
    // Foundational Dependencies
    { id: "theorem-26", title: "Theorem 26: Formal Systems Rely on Non-Formal Judgments", level: 0 },
    { id: "theorem-27", title: "Theorem 27: Expressive Power Limits Self-Validation", level: 1 },
    { id: "theorem-28", title: "Theorem 28: Recursive Truth Approximation Fails", level: 1 },
    
    // Final Theorems
    { id: "theorem-29", title: "Theorem 29: Truth Drift", level: 0 },
    { id: "theorem-30", title: "Theorem 30: The Compression Barrier", level: 1 },
    { id: "theorem-31", title: "Theorem 31: Anti-Compression via Meta-Layers", level: 1 },
    { id: "theorem-32", title: "Theorem 32: Internal Truth Presupposes External Truth", level: 1 },
    { id: "theorem-33", title: "Theorem 33: Topological Discontinuity", level: 1 },
    { id: "theorem-34", title: "Theorem 34: Formal Incompleteness", level: 1 },
    
    // Conclusion and References
    { id: "future-research", title: "Future Research Directions", level: 0 },
    { id: "applications", title: "Potential Applications", level: 1 },
    { id: "references", title: "References", level: 0 }
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
        "introduction": "Introduction",
        "table-of-contents": "Table of Contents",
        "theorem-0": "Theorem 0",
        "theorem-1": "Theorem 1",
        "theorem-2": "Theorem 2",
        "theorem-3": "Theorem 3",
        "theorem-4": "Theorem 4",
        "theorem-5": "Theorem 5",
        "theorem-6": "Theorem 6",
        "theorem-7": "Theorem 7",
        "theorem-8": "Theorem 8",
        "theorem-9": "Theorem 9",
        "theorem-10": "Theorem 10",
        "theorem-11": "Theorem 11",
        "theorem-12": "Theorem 12",
        "theorem-13": "Theorem 13",
        "theorem-14": "Theorem 14",
        "theorem-15": "Theorem 15",
        "theorem-16": "Theorem 16",
        "theorem-17": "Theorem 17",
        "theorem-18": "Theorem 18",
        "theorem-19": "Theorem 19",
        "theorem-20": "Theorem 20",
        "theorem-21": "Theorem 21",
        "theorem-22": "Theorem 22",
        "theorem-23": "Theorem 23",
        "theorem-24": "Theorem 24",
        "theorem-25": "Theorem 25",
        "theorem-26": "Theorem 26",
        "theorem-27": "Theorem 27",
        "theorem-28": "Theorem 28",
        "theorem-29": "Theorem 29",
        "theorem-30": "Theorem 30",
        "theorem-31": "Theorem 31",
        "theorem-32": "Theorem 32",
        "theorem-33": "Theorem 33",
        "theorem-34": "Theorem 34",
        "future-research": "Future Research",
        "applications": "Potential Applications",
        "references": "References"
      };
      
      const searchText = titleMap[id];
      console.log(`Searching for text: ${searchText}`);
      
      if (searchText) {
        // Find all elements containing this text in the document content area
        const contentArea = document.querySelector('[data-document-content]');
        if (contentArea) {
          const allElements = contentArea.querySelectorAll('h1, h2, h3, p');
          for (let i = 0; i < allElements.length; i++) {
            const el = allElements[i];
            if (el.textContent?.includes(searchText)) {
              element = el as HTMLElement;
              console.log(`Found element by text search: ${el.tagName}`);
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
