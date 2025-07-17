import { ScrollArea } from "@/components/ui/scroll-area";
import { paperContent } from "@shared/paper-content";

// Navigation sections dynamically generated from paper content
const documentSections = paperContent.sections.map(section => ({
  term: section.title,
  id: section.id
}));

export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="w-64 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="p-4 h-full flex flex-col">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3 flex-shrink-0">
          Document Navigation
        </h3>
        <ScrollArea className="flex-1 h-full">
          <div className="pr-4">
            <nav className="space-y-1">
              {documentSections.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNavClick(entry.id)}
                  className="block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                >
                  {entry.term}
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
