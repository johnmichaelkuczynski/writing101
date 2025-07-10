#!/usr/bin/env python3
"""
FINAL FIX: Extract Tractatus with PERFECT formatting preservation
"""

import fitz
import re

def extract_with_perfect_formatting():
    """Extract text preserving exact paragraph breaks and structure"""
    
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf')
    
    # Extract text blocks with formatting info
    all_blocks = []
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Get text blocks with position and formatting
        blocks = page.get_text("dict")
        
        for block in blocks["blocks"]:
            if "lines" in block:
                block_text = ""
                for line in block["lines"]:
                    line_text = ""
                    for span in line["spans"]:
                        line_text += span["text"]
                    if line_text.strip():
                        block_text += line_text + "\n"
                
                if block_text.strip():
                    all_blocks.append(block_text.strip())
    
    doc.close()
    
    # Reconstruct with proper paragraph structure
    full_text = "\n\n".join(all_blocks)
    
    # Find Russell's intro and Wittgenstein's main text
    lines = full_text.split('\n')
    
    # Look for "1" followed by "The world is everything that is the case"
    witt_start = -1
    for i in range(len(lines) - 1):
        if lines[i].strip() == '1':
            next_few_lines = ' '.join(lines[i+1:i+3])
            if 'The world is everything that is the case' in next_few_lines:
                witt_start = i
                break
    
    if witt_start == -1:
        print("Could not find Wittgenstein start")
        return None, None
    
    # Split into sections
    russell_lines = lines[:witt_start]
    wittgenstein_lines = lines[witt_start:]
    
    # Process Russell intro - preserve paragraphs
    russell_content = process_russell_with_formatting(russell_lines)
    
    # Process Wittgenstein - preserve numbered structure  
    wittgenstein_content = process_wittgenstein_with_formatting(wittgenstein_lines)
    
    return russell_content, wittgenstein_content

def process_russell_with_formatting(lines):
    """Process Russell preserving paragraph structure"""
    
    # Skip title pages, find actual content
    content_start = -1
    for i, line in enumerate(lines):
        if 'MR WITTGENSTEIN' in line.upper():
            content_start = i
            break
    
    if content_start == -1:
        return ""
    
    # Clean lines while preserving structure
    cleaned_lines = []
    for line in lines[content_start:]:
        line = line.strip()
        # Skip page numbers, headers, but keep everything else
        if (line and 
            not line.isdigit() and 
            line not in ['INTRODUCTION', 'By BERTRAND RUSSELL', 'Tractatus', 'Logico-', 'Philosophicus']):
            cleaned_lines.append(line)
    
    # Rebuild with proper paragraph breaks
    paragraphs = []
    current_para = []
    
    for line in cleaned_lines:
        # Check if this starts a new paragraph
        if (current_para and 
            line and line[0].isupper() and 
            current_para[-1].endswith(('.', '!', '?')) and
            not line.lower().startswith(('and ', 'or ', 'but ', 'however', 'thus', 'this', 'that', 'it ', 'he ', 'she '))):
            
            # End current paragraph
            paragraphs.append(' '.join(current_para))
            current_para = [line]
        else:
            current_para.append(line)
    
    # Add final paragraph
    if current_para:
        paragraphs.append(' '.join(current_para))
    
    return '\n\n'.join(paragraphs)

def process_wittgenstein_with_formatting(lines):
    """Process Wittgenstein preserving numbered proposition structure"""
    
    # Clean lines
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        # Skip page numbers but keep everything else
        if line and not (line.isdigit() and len(line) <= 3):
            cleaned_lines.append(line)
    
    # Group by numbered propositions
    propositions = []
    current_prop = []
    
    for line in cleaned_lines:
        # Check if this starts a new numbered proposition
        if is_new_proposition(line):
            if current_prop:
                # Join current proposition with proper line breaks
                prop_text = '\n'.join(current_prop)
                propositions.append(prop_text)
            current_prop = [line]
        else:
            current_prop.append(line)
    
    # Add final proposition
    if current_prop:
        prop_text = '\n'.join(current_prop)
        propositions.append(prop_text)
    
    # Join propositions with double line breaks
    return '\n\n'.join(propositions)

def is_new_proposition(line):
    """Check if line starts a new numbered proposition"""
    
    stripped = line.strip()
    
    # Main propositions: 1, 2, 3, 4, 5, 6, 7
    if stripped in ['1', '2', '3', '4', '5', '6', '7']:
        return True
    
    # Sub-propositions: 1.1, 2.01, etc.
    if re.match(r'^\d+\.\d+$', stripped):
        return True
    
    # Propositions with text on same line
    if re.match(r'^\d+(\.\d+)?\s+[A-Z]', stripped):
        return True
    
    return False

def create_formatted_tractatus_file(russell_content, wittgenstein_content):
    """Create TypeScript file with perfect formatting"""
    
    # Create sections
    sections = []
    
    # Russell introduction
    sections.append({
        'id': 'introduction',
        'title': 'Introduction by Bertrand Russell',
        'content': russell_content
    })
    
    # Wittgenstein main text
    sections.append({
        'id': 'tractatus',
        'title': 'Tractatus Logico-Philosophicus',
        'content': wittgenstein_content
    })
    
    # Write TypeScript file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write('export const tractatusContent = {\n')
        f.write('  title: "Tractatus Logico-Philosophicus",\n')
        f.write('  author: "Ludwig Wittgenstein",\n')
        f.write('  sections: [\n')
        
        for i, section in enumerate(sections):
            # Escape content properly
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

if __name__ == "__main__":
    russell_content, wittgenstein_content = extract_with_perfect_formatting()
    
    if russell_content and wittgenstein_content:
        create_formatted_tractatus_file(russell_content, wittgenstein_content)
        
        print(f"CREATED PROPERLY FORMATTED TRACTATUS:")
        print(f"Russell: {len(russell_content)} characters")
        print(f"Wittgenstein: {len(wittgenstein_content)} characters")
        print(f"Total: {len(russell_content) + len(wittgenstein_content)} characters")
        
        # Show formatting preview
        print("\nRUSSELL PREVIEW:")
        print(russell_content[:500] + "...")
        print("\nWITTGENSTEIN PREVIEW:")
        print(wittgenstein_content[:500] + "...")
    else:
        print("FAILED to extract properly formatted content")