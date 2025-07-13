#!/usr/bin/env python3
"""
Create complete Dictionary of Analytic Philosophy from Word document
"""

def extract_full_content():
    """Extract complete content from the Word document"""
    
    # Read the entire document
    with open('attached_assets/Dictionary of Analytic Philosophy_1752438188841.docx', 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Clean up the content
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        if line and len(line) > 2 and not line.isspace():
            cleaned_lines.append(line)
    
    # Join all cleaned content
    full_text = '\n\n'.join(cleaned_lines)
    
    # Create the complete TypeScript content file
    typescript_content = f'''export const tractatusContent = {{
  title: "Dictionary of Analytic Philosophy",
  author: "J.-M. Kuczynski, PhD",
  sections: [
    {{
      id: "complete-dictionary",
      title: "Complete Dictionary",
      content: `{full_text.replace('`', '\\`').replace('${', '\\${')}`.replace('\\n', '\\n')
    }}
  ]
}};

export function getFullDocumentContent(): string {{
  return tractatusContent.sections.map(section => section.content).join('\\n\\n');
}}

export function getDocumentTitle(): string {{
  return tractatusContent.title;
}}

export function getDocumentAuthor(): string {{
  return tractatusContent.author;
}}'''
    
    # Write the file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write(typescript_content)
    
    print(f"Created complete dictionary with {len(full_text)} characters")
    print(f"Total cleaned lines: {len(cleaned_lines)}")

if __name__ == "__main__":
    extract_full_content()