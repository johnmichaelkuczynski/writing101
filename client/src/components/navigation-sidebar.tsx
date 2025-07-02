import { ScrollArea } from "@/components/ui/scroll-area";
import { paperContent } from "@/data/paper-content";

export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="w-64 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="p-4">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3">
          Document Navigation
        </h3>
        <ScrollArea className="sidebar-scroll">
          <nav className="space-y-1">
            {paperContent.sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
              >
                {section.title}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
