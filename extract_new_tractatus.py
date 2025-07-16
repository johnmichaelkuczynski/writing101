#!/usr/bin/env python3
"""
Extract complete authentic Tractatus text from the newly uploaded PDF
"""

import fitz
import re

def extract_complete_tractatus():
    """Extract all authentic text from the PDF preserving structure"""
    
    # Open the newly uploaded PDF
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752662722507.pdf')
    
    # Extract all text
    full_text = ""
    for page_num in range(len(doc)):
        page_text = doc[page_num].get_text()
        full_text += page_text + "\n"
    
    doc.close()
    
    # Split into lines for processing
    lines = full_text.split('\n')
    
    # Find where Russell's introduction starts and Wittgenstein's text begins
    russell_start = -1
    wittgenstein_start = -1
    
    for i, line in enumerate(lines):
        line_stripped = line.strip()
        
        # Find Russell's introduction start
        if russell_start == -1 and 'MR WITTGENSTEIN' in line_stripped.upper():
            russell_start = i
        
        # Find Wittgenstein's text start (look for "1" followed by "The world...")
        if wittgenstein_start == -1:
            if line_stripped == '1' and i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                if 'The world is' in next_line and 'case' in next_line:
                    wittgenstein_start = i
                    break
            elif line_stripped.startswith('1 The world is') and 'case' in line_stripped:
                wittgenstein_start = i
                break
    
    print(f"Russell starts at line: {russell_start}")
    print(f"Wittgenstein starts at line: {wittgenstein_start}")
    
    if russell_start == -1 or wittgenstein_start == -1:
        print("Could not find proper text boundaries")
        return None
    
    # Extract sections
    russell_lines = lines[russell_start:wittgenstein_start]
    wittgenstein_lines = lines[wittgenstein_start:]
    
    # Process Russell's introduction
    russell_content = process_russell_introduction(russell_lines)
    
    # Process Wittgenstein's text
    wittgenstein_content = process_wittgenstein_text(wittgenstein_lines)
    
    return russell_content, wittgenstein_content

def process_russell_introduction(lines):
    """Process Russell's introduction preserving paragraph structure"""
    
    # Clean and rebuild paragraphs
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        # Skip empty lines, page numbers, and headers
        if (line and 
            not line.isdigit() and 
            line not in ['Tractatus', 'Logico-', 'Philosophicus', 'INTRODUCTION', 'By BERTRAND RUSSELL']):
            cleaned_lines.append(line)
    
    # Rebuild into proper paragraphs
    paragraphs = []
    current_paragraph = []
    
    for line in cleaned_lines:
        # Check if this starts a new paragraph
        if (current_paragraph and 
            line[0].isupper() and 
            current_paragraph[-1].endswith(('.', '!', '?'))):
            # End current paragraph
            paragraphs.append(' '.join(current_paragraph))
            current_paragraph = [line]
        else:
            current_paragraph.append(line)
    
    # Add final paragraph
    if current_paragraph:
        paragraphs.append(' '.join(current_paragraph))
    
    # Format as HTML paragraphs
    html_content = ""
    for para in paragraphs:
        if para.strip():
            html_content += f'<p class="document-paragraph">{para.strip()}</p>'
    
    return html_content

def process_wittgenstein_text(lines):
    """Process Wittgenstein's numbered propositions"""
    
    # Clean lines
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        if line and not line.isdigit():
            cleaned_lines.append(line)
    
    # Group into propositions
    propositions = []
    current_prop = []
    
    for line in cleaned_lines:
        # Check if this starts a new numbered proposition
        if re.match(r'^\d+(\.\d+)*\s', line) or re.match(r'^\d+$', line):
            # Save previous proposition
            if current_prop:
                propositions.append(' '.join(current_prop))
            current_prop = [line]
        else:
            current_prop.append(line)
    
    # Add final proposition
    if current_prop:
        propositions.append(' '.join(current_prop))
    
    # Format as HTML paragraphs
    html_content = ""
    for prop in propositions:
        if prop.strip():
            html_content += f'<p class="document-paragraph">{prop.strip()}</p>'
    
    return html_content

def create_tractatus_content_file():
    """Create the new TypeScript content file"""
    
    russell_content, wittgenstein_content = extract_complete_tractatus()
    
    if not russell_content or not wittgenstein_content:
        print("Failed to extract content")
        return
    
    # Create the TypeScript content
    typescript_content = f'''export const tractatusContent = {{
  sections: [
    {{
      id: "introduction",
      title: "Introduction by Bertrand Russell",
      content: `<div class="document-content">{russell_content}</div>`
    }},
    {{
      id: "tractatus",
      title: "Tractatus Logico-Philosophicus by Ludwig Wittgenstein",
      content: `<div class="document-content">{wittgenstein_content}</div>`
    }}
  ]
}};

export function getFullDocumentContent(): string {{
  return tractatusContent.sections.map(section => section.content).join('\\n\\n');
}}

export function getDocumentTitle(): string {{
  return "Tractatus Logico-Philosophicus";
}}

export function getDocumentAuthor(): string {{
  return "Ludwig Wittgenstein";
}}
'''
    
    # Write to file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write(typescript_content)
    
    print("Successfully created new tractatus-content.ts with authentic PDF content")
    print(f"Russell content length: {len(russell_content)}")
    print(f"Wittgenstein content length: {len(wittgenstein_content)}")

if __name__ == "__main__":
    create_tractatus_content_file()