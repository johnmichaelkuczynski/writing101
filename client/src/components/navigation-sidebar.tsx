import { ScrollArea } from "@/components/ui/scroll-area";
import { paperContent } from "@shared/paper-content";

// Extract table of contents from the document content
const extractTableOfContents = () => {
  const tableOfContents: Array<{ id: string; title: string; level: number }> = [];
  const seenTitles = new Set<string>(); // Track seen titles to avoid duplicates
  
  // Get the full content from the first section (which contains all the text)
  const content = paperContent.sections[0]?.content || '';
  
  // Regular expressions to match section headings
  const sectionPattern = /class="document-paragraph mb-6 mt-8 font-normal">([0-9]+\.[0-9]+(?:\.[0-9]+)?\s+[^<]+)</g;
  
  let match;
  let counter = 0;
  while ((match = sectionPattern.exec(content)) !== null) {
    const fullTitle = match[1].trim();
    const sectionNumber = fullTitle.match(/^([0-9]+\.[0-9]+(?:\.[0-9]+)?)/)?.[1] || '';
    
    // Skip duplicates - only include the first occurrence
    if (seenTitles.has(fullTitle)) {
      continue;
    }
    seenTitles.add(fullTitle);
    
    // Determine level based on section number depth
    const level = (sectionNumber.match(/\./g) || []).length;
    
    // Create unique ID from section number and counter to avoid duplicates
    const id = `section-${sectionNumber.replace(/\./g, '-')}-${counter}`;
    counter++;
    
    tableOfContents.push({
      id,
      title: fullTitle,
      level
    });
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
    <aside className="w-64 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="p-4 h-full flex flex-col">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3 flex-shrink-0">
          Table of Contents
        </h3>
        <ScrollArea className="flex-1 h-full">
          <div className="pr-4">
            <nav className="space-y-1">
              {tableOfContents.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNavClick(entry.id)}
                  className={`block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-primary rounded-md transition-colors ${
                    entry.level === 1 ? 'pl-3' : 
                    entry.level === 2 ? 'pl-6' : 
                    'pl-9'
                  }`}
                >
                  {entry.title}
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
