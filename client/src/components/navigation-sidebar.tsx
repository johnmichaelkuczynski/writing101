import { ScrollArea } from "@/components/ui/scroll-area";
import { bookContent as paperContent } from "@shared/book-content";

// Extract table of contents from the document content
const extractTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [];
  
  // Get the full content from the first section (which contains all the text)
  const content = paperContent.sections[0]?.content || '';
  
  // Extract major headings and sections from the content
  const lines = content.split('\n');
  let counter = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) continue;
    
    // Check for major section headings
    if (line.match(/^Week \d+:/i) || 
        line.match(/^Introduction to/i) ||
        line.match(/^Basic Concepts/i) ||
        line.match(/^Material vs\./i) ||
        line.match(/^Translation Practice/i) ||
        line.match(/^Practice Exercises/i) ||
        line.match(/^Truth Tables/i) ||
        line.match(/^Logic Gates/i) ||
        line.match(/^Boolean Algebra/i) ||
        line.match(/^Formal Logic/i) ||
        line.match(/^Propositional Logic/i) ||
        line.match(/^Predicate Logic/i) ||
        line.match(/^Set Theory/i) ||
        line.match(/^Recursive Definitions/i) ||
        (line.length < 60 && line.match(/^[A-Z][^.]*[^.]$/))) {
      
      // Create ID from the title
      const id = `toc-${counter}`;
      counter++;
      
      // Determine level based on content
      let level = 1;
      if (line.match(/^Week \d+:/i)) level = 0;
      else if (line.match(/^[A-Z][a-z]+ [A-Z]/)) level = 1;
      else level = 2;
      
      tableOfContents.push({
        id,
        title: line,
        level
      });
    }
  }
  
  return tableOfContents;
};

const tableOfContents = extractTableOfContents();



export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log(`Element with id '${id}' not found`);
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
                  className={`block w-full text-left px-2 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded transition-colors ${
                    entry.level === 1 ? 'pl-1 md:pl-3' : 
                    entry.level === 2 ? 'pl-2 md:pl-6' : 
                    'pl-3 md:pl-9'
                  }`}
                  title={entry.title}
                >
                  <span className="block text-xs leading-tight whitespace-normal md:truncate">
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
