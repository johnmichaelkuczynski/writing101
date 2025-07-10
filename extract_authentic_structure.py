#!/usr/bin/env python3
"""
Extract authentic text with exact original structure preserved
"""

import fitz
import re

def main():
    # Open PDF
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf')
    
    # Extract all text
    full_text = ''
    for page_num in range(len(doc)):
        page_text = doc[page_num].get_text()
        full_text += page_text + '\n'
    doc.close()
    
    # Split by lines for processing
    lines = full_text.split('\n')
    
    # Find Russell's intro end / Wittgenstein start
    witt_start = find_wittgenstein_start(lines)
    
    if witt_start == -1:
        print("ERROR: Could not locate Wittgenstein text start")
        return
    
    print(f"Found Wittgenstein at line {witt_start}")
    
    # Extract sections
    russell_lines = lines[:witt_start]
    wittgenstein_lines = lines[witt_start:]
    
    # Process Russell intro
    russell_text = process_russell_intro(russell_lines)
    
    # Process Wittgenstein with exact structure
    wittgenstein_sections = process_wittgenstein_exact(wittgenstein_lines)
    
    # Create the final TypeScript file
    create_tractatus_file(russell_text, wittgenstein_sections)

def find_wittgenstein_start(lines):
    """Find where Wittgenstein's numbered text begins"""
    
    for i, line in enumerate(lines):
        stripped = line.strip()
        
        # Pattern 1: "1" on its own line, followed by "The world..."
        if stripped == '1' and i+1 < len(lines):
            next_line = lines[i+1].strip()
            if 'The world is all that is the case' in next_line:
                return i
        
        # Pattern 2: "1 The world..." on same line
        if stripped.startswith('1 The world is all that is the case'):
            return i
            
        # Pattern 3: Just "The world..." (in case 1 is on previous line)
        if stripped.startswith('The world is all that is the case'):
            # Check if previous line has "1"
            if i > 0 and lines[i-1].strip() == '1':
                return i-1
            else:
                return i
    
    return -1

def process_russell_intro(lines):
    """Process Russell's introduction preserving paragraph structure"""
    
    # Skip title pages and headers
    content_lines = []
    in_content = False
    
    for line in lines:
        stripped = line.strip()
        
        # Skip until we hit the actual introduction text
        if not in_content:
            if 'MR WITTGENSTEIN' in stripped.upper():
                in_content = True
                content_lines.append(stripped)
            continue
        
        # Skip page numbers and artifacts
        if (not stripped or 
            stripped.isdigit() or 
            len(stripped) < 3):
            continue
            
        content_lines.append(stripped)
    
    # Rebuild paragraphs
    paragraphs = []
    current_para = []
    
    for line in content_lines:
        # New paragraph indicators:
        # - Line starts with capital and previous para ended with punctuation
        # - Line is significantly indented
        # - Line starts with "The", "In", "Mr", etc. (common paragraph starters)
        
        if (current_para and 
            line and line[0].isupper() and 
            current_para[-1].endswith(('.', '!', '?')) and
            not line.startswith(('and', 'or', 'but', 'however', 'thus', 'this', 'that', 'it', 'he', 'she'))):
            
            paragraphs.append(' '.join(current_para))
            current_para = [line]
        else:
            current_para.append(line)
    
    if current_para:
        paragraphs.append(' '.join(current_para))
    
    return '\n\n'.join(paragraphs)

def process_wittgenstein_exact(lines):
    """Process Wittgenstein preserving exact numbered structure"""
    
    sections = []
    current_section = []
    
    # Clean lines first
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        # Skip page numbers and very short artifacts
        if stripped and not (stripped.isdigit() and len(stripped) < 3):
            cleaned_lines.append(stripped)
    
    # Group by numbered propositions
    current_prop = []
    
    for line in cleaned_lines:
        # Check if this starts a new numbered proposition
        if is_new_proposition(line):
            if current_prop:
                sections.append('\n'.join(current_prop))
            current_prop = [line]
        else:
            current_prop.append(line)
    
    if current_prop:
        sections.append('\n'.join(current_prop))
    
    return sections

def is_new_proposition(line):
    """Check if line starts a new numbered proposition"""
    stripped = line.strip()
    
    # Main propositions: 1, 2, 3, 4, 5, 6, 7
    if stripped in ['1', '2', '3', '4', '5', '6', '7']:
        return True
    
    # Sub-propositions: 1.1, 2.1, etc.
    if re.match(r'^\d+\.\d+$', stripped):
        return True
    
    # Propositions with text on same line
    if re.match(r'^\d+(\.\d+)?\s+[A-Z]', stripped):
        return True
    
    return False

def create_tractatus_file(russell_text, wittgenstein_sections):
    """Create the TypeScript content file"""
    
    # Group Wittgenstein sections by main numbers
    grouped_sections = []
    
    # Russell intro
    grouped_sections.append({
        'id': 'introduction',
        'title': 'Introduction by Bertrand Russell',
        'content': russell_text
    })
    
    # Group by main propositions 1-7
    section_titles = [
        'The World and Facts',
        'Objects and States of Affairs', 
        'Pictures and Thoughts',
        'Propositions and Language',
        'Logic and Truth-Functions',
        'Science and Necessity',
        'Ethics and the Mystical'
    ]
    
    current_group = []
    group_index = 0
    
    for section in wittgenstein_sections:
        first_line = section.split('\n')[0].strip()
        
        # Check if this starts a new main section (1, 2, 3, etc)
        if first_line in ['1', '2', '3', '4', '5', '6', '7'] or any(first_line.startswith(f'{i} ') for i in range(1, 8)):
            # Save previous group
            if current_group and group_index < len(section_titles):
                grouped_sections.append({
                    'id': f'section-{group_index + 1}',
                    'title': section_titles[group_index],
                    'content': '\n\n'.join(current_group)
                })
                group_index += 1
            
            current_group = [section]
        else:
            current_group.append(section)
    
    # Add final group
    if current_group and group_index < len(section_titles):
        grouped_sections.append({
            'id': f'section-{group_index + 1}',
            'title': section_titles[group_index],
            'content': '\n\n'.join(current_group)
        })
    
    # Write TypeScript file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write('export const tractatusContent = {\n')
        f.write('  title: \"Tractatus Logico-Philosophicus\",\n')
        f.write('  author: \"Ludwig Wittgenstein\",\n')
        f.write('  sections: [\n')
        
        for section in grouped_sections:
            # Escape content for TypeScript
            content = section['content'].replace('`', '\\`').replace('${', '\\${')
            
            f.write(f'    {{\n')
            f.write(f'      id: \"{section[\"id\"]}\",\n')
            f.write(f'      title: \"{section[\"title\"]}\",\n')
            f.write(f'      content: `{content}`\n')
            f.write(f'    }},\n')
        
        f.write('  ]\n')
        f.write('};\n\n')
        
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
    
    print("Created authentic tractatus-content.ts with exact PDF structure")

if __name__ == "__main__":
    main()