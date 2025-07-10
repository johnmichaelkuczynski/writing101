#!/usr/bin/env python3
"""
Script to create complete tractatus-content.ts with ALL authentic PDF content
"""

import fitz

def main():
    # Extract ALL text from PDF
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf')
    
    complete_text = ""
    
    # Get every page
    for page_num in range(len(doc)):
        page_text = doc[page_num].get_text()
        complete_text += page_text + "\n"
    
    doc.close()
    
    # Clean up only the most basic artifacts
    lines = complete_text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        # Only skip completely empty lines and isolated page numbers
        stripped = line.strip()
        if stripped and not (stripped.isdigit() and len(stripped) <= 2):
            cleaned_lines.append(line)
    
    # Find Russell's intro and Wittgenstein's main text
    full_content = '\n'.join(cleaned_lines)
    
    # Split at a reasonable point - look for numbered propositions starting
    split_point = -1
    
    # Look for patterns that indicate Wittgenstein's numbered text
    for i, line in enumerate(cleaned_lines):
        line_clean = line.strip()
        
        # Look for proposition 1 patterns
        if ('1' in line_clean and 
            i + 1 < len(cleaned_lines) and
            any(phrase in cleaned_lines[i+1].lower() for phrase in ['world', 'welt'])):
            split_point = i
            break
        
        # Alternative: look for the actual German text
        if 'Die Welt ist alles' in line:
            split_point = i
            break
    
    if split_point == -1:
        # Fallback - just use everything as one section
        print("Could not find split point - using all text")
        content = full_content
        sections = [{
            'id': 'complete',
            'title': 'Tractatus Logico-Philosophicus - Complete Text',
            'content': content
        }]
    else:
        print(f"Found split at line {split_point}")
        russell_text = '\n'.join(cleaned_lines[:split_point])
        wittgenstein_text = '\n'.join(cleaned_lines[split_point:])
        
        sections = [
            {
                'id': 'introduction',
                'title': 'Introduction and Preliminary Material',
                'content': russell_text
            },
            {
                'id': 'tractatus',
                'title': 'Tractatus Logico-Philosophicus - Main Text',
                'content': wittgenstein_text
            }
        ]
    
    # Write TypeScript file with ALL authentic content
    write_typescript_file(sections)

def write_typescript_file(sections):
    """Write the complete authentic content"""
    
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write('export const tractatusContent = {\n')
        f.write('  title: "Tractatus Logico-Philosophicus",\n')
        f.write('  author: "Ludwig Wittgenstein",\n')
        f.write('  sections: [\n')
        
        for i, section in enumerate(sections):
            # Escape backticks and template literals in content
            content = section['content'].replace('`', '\\`').replace('${', '\\${')
            
            f.write('    {\n')
            f.write(f'      id: "{section["id"]}",\n')
            f.write(f'      title: "{section["title"]}",\n')
            f.write(f'      content: `{content}`\n')
            f.write('    }')
            
            if i < len(sections) - 1:
                f.write(',')
            f.write('\n')
        
        f.write('  ]\n')
        f.write('};\n\n')
        
        # Add utility functions
        f.write('''export function getFullDocumentContent(): string {
  return tractatusContent.sections
    .map(section => section.content)
    .join('\\n\\n');
}

export function getDocumentTitle(): string {
  return tractatusContent.title;
}

export function getDocumentAuthor(): string {
  return tractatusContent.author;
}
''')
    
    print(f"Created tractatus-content.ts with {len(sections)} sections")
    print(f"Total content length: {sum(len(s['content']) for s in sections)} characters")

if __name__ == "__main__":
    main()