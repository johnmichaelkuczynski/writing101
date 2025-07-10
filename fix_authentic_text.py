#!/usr/bin/env python3
"""
FINAL SOLUTION: Extract authentic Tractatus text with exact original formatting
"""

import fitz
import re

def extract_authentic_tractatus():
    """Extract the real text with proper structure"""
    
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf')
    
    # Extract text from each page separately to preserve structure
    all_pages = []
    for page_num in range(len(doc)):
        page_text = doc[page_num].get_text()
        all_pages.append(page_text)
    
    doc.close()
    
    # Join all pages
    full_text = '\n'.join(all_pages)
    
    # Find Wittgenstein's text start by looking for the characteristic opening
    lines = full_text.split('\n')
    
    # Search for the actual start of Wittgenstein's numbered propositions
    witt_start = -1
    for i, line in enumerate(lines):
        line_clean = line.strip()
        
        # Look for "1" followed by "The world is all that is the case" in next few lines
        if line_clean == '1':
            # Check next few lines for the opening phrase
            for j in range(i+1, min(i+5, len(lines))):
                if 'The world is all that is the case' in lines[j]:
                    witt_start = i
                    break
            if witt_start != -1:
                break
        
        # Also check for the phrase directly
        if 'The world is all that is the case' in line_clean:
            witt_start = i
            break
    
    if witt_start == -1:
        print("ERROR: Cannot find Wittgenstein text start")
        return None
    
    print(f"Found Wittgenstein at line {witt_start}")
    
    # Extract Russell intro and Wittgenstein text
    russell_lines = lines[:witt_start]
    wittgenstein_lines = lines[witt_start:]
    
    # Process Russell introduction
    russell_content = extract_russell_intro(russell_lines)
    
    # Process Wittgenstein with authentic structure
    wittgenstein_content = extract_wittgenstein_authentic(wittgenstein_lines)
    
    return russell_content, wittgenstein_content

def extract_russell_intro(lines):
    """Extract Russell's introduction preserving authentic paragraph breaks"""
    
    # Find start of actual content (skip title pages)
    content_start = -1
    for i, line in enumerate(lines):
        if 'MR WITTGENSTEIN' in line.upper():
            content_start = i
            break
    
    if content_start == -1:
        return ""
    
    # Extract content lines
    content_lines = []
    for i in range(content_start, len(lines)):
        line = lines[i].strip()
        
        # Skip empty lines and page artifacts
        if (not line or 
            line.isdigit() or 
            len(line) < 3 or
            line.upper() in ['INTRODUCTION', 'BY BERTRAND RUSSELL']):
            continue
        
        content_lines.append(line)
    
    # Reconstruct paragraphs based on sentence endings and capital letters
    paragraphs = []
    current_para = []
    
    for line in content_lines:
        # Check if this should start a new paragraph
        if (current_para and 
            line[0].isupper() and 
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

def extract_wittgenstein_authentic(lines):
    """Extract Wittgenstein preserving exact numbered proposition structure"""
    
    # Clean lines (remove page numbers, etc.)
    clean_lines = []
    for line in lines:
        line = line.strip()
        if line and not (line.isdigit() and len(line) < 4):
            clean_lines.append(line)
    
    # Group by propositions preserving exact structure
    propositions = []
    current_prop = []
    
    for line in clean_lines:
        # Check if this starts a new numbered proposition
        if is_proposition_start(line):
            if current_prop:
                propositions.append('\n'.join(current_prop))
            current_prop = [line]
        else:
            current_prop.append(line)
    
    # Add final proposition
    if current_prop:
        propositions.append('\n'.join(current_prop))
    
    return propositions

def is_proposition_start(line):
    """Check if line starts a new numbered proposition"""
    
    # Check for main propositions: 1, 2, 3, 4, 5, 6, 7
    if line.strip() in ['1', '2', '3', '4', '5', '6', '7']:
        return True
    
    # Check for sub-propositions: 1.1, 2.01, etc.
    if re.match(r'^\d+\.\d+', line.strip()):
        return True
    
    # Check for propositions with text on same line
    if re.match(r'^\d+(\.\d+)?\s+[A-Z]', line.strip()):
        return True
    
    return False

def create_final_tractatus_file(russell_content, wittgenstein_propositions):
    """Create the final TypeScript file with authentic content"""
    
    # Group Wittgenstein propositions into sections
    sections = []
    
    # Add Russell intro
    sections.append({
        'id': 'introduction',
        'title': 'Introduction by Bertrand Russell',
        'content': russell_content
    })
    
    # Group propositions by main numbers (1-7)
    section_titles = [
        'The World and Facts',
        'Objects and States of Affairs',
        'Pictures and Thoughts', 
        'Propositions and Language',
        'Logic and Truth-Functions',
        'Science and Necessity',
        'Ethics and the Mystical'
    ]
    
    current_section_props = []
    section_num = 0
    
    for prop in wittgenstein_propositions:
        first_line = prop.split('\n')[0].strip()
        
        # Check if this starts a new main section
        main_number = get_main_section_number(first_line)
        
        if main_number and main_number != section_num + 1:
            # Save previous section
            if current_section_props and section_num < len(section_titles):
                sections.append({
                    'id': f'section-{section_num + 1}',
                    'title': section_titles[section_num],
                    'content': '\n\n'.join(current_section_props)
                })
            
            section_num = main_number - 1
            current_section_props = [prop]
        else:
            current_section_props.append(prop)
    
    # Add final section
    if current_section_props and section_num < len(section_titles):
        sections.append({
            'id': f'section-{section_num + 1}',
            'title': section_titles[section_num],
            'content': '\n\n'.join(current_section_props)
        })
    
    # Write authentic TypeScript file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write('export const tractatusContent = {\n')
        f.write('  title: \"Tractatus Logico-Philosophicus\",\n')
        f.write('  author: \"Ludwig Wittgenstein\",\n')
        f.write('  sections: [\n')
        
        for section in sections:
            # Properly escape content
            content = section['content'].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
            section_id = section['id']
            section_title = section['title']
            
            f.write(f'    {{\n')
            f.write(f'      id: "{section_id}",\n')
            f.write(f'      title: "{section_title}",\n')
            f.write(f'      content: `{content}`\n')
            f.write(f'    }},\n')
        
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
    
    print("Created AUTHENTIC tractatus-content.ts with proper formatting")

def get_main_section_number(line):
    """Get main section number from proposition line"""
    if line.startswith('1 ') or line == '1':
        return 1
    elif line.startswith('2 ') or line == '2':
        return 2
    elif line.startswith('3 ') or line == '3':
        return 3
    elif line.startswith('4 ') or line == '4':
        return 4
    elif line.startswith('5 ') or line == '5':
        return 5
    elif line.startswith('6 ') or line == '6':
        return 6
    elif line.startswith('7 ') or line == '7':
        return 7
    return None

if __name__ == "__main__":
    result = extract_authentic_tractatus()
    if result:
        russell_content, wittgenstein_props = result
        create_final_tractatus_file(russell_content, wittgenstein_props)
        print(f"Extracted {len(wittgenstein_props)} propositions")
    else:
        print("FAILED to extract content")