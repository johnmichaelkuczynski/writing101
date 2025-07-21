// Generic book content structure - ready for your new book
export interface BookSection {
  id: string;
  title: string;
  content: string;
}

export interface BookContent {
  title: string;
  author: string;
  sections: BookSection[];
}

// Placeholder content - replace with your new book
export const bookContent: BookContent = {
  title: "Ready for Your New Book",
  author: "Author Name",
  sections: [
    {
      id: "intro",
      title: "Introduction", 
      content: `<div class="document-content">
        <p class="document-paragraph mb-4">This philosophical learning platform is ready for your new book content.</p>
        <p class="document-paragraph mb-4">Please provide your new book and I'll integrate it into the system while maintaining all functionality.</p>
        <p class="document-paragraph mb-4">All AI-powered features including discussion, rewriting, study guides, and testing will work with your new content.</p>
      </div>`
    }
  ]
};

// Utility function to get full document text
export function getFullDocumentContent(): string {
  return bookContent.sections
    .map(section => `${section.title}\n\n${section.content}`)
    .join('\n\n');
}