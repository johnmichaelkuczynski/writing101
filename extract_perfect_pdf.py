#!/usr/bin/env python3
"""
Extract PDF with PERFECT formatting preservation using pdfplumber
"""

import fitz
import re

def extract_pdf_with_perfect_formatting():
    """Extract PDF preserving exact visual formatting"""
    
    doc = fitz.open('attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf')
    
    all_text = ""
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Get text with layout preservation
        blocks = page.get_text("dict")
        
        page_text = ""
        for block in blocks["blocks"]:
            if "lines" in block:
                for line in block["lines"]:
                    line_text = ""
                    for span in line["spans"]:
                        text = span["text"]
                        # Check if text is bold, italic, etc.
                        flags = span["flags"]
                        
                        if flags & 2**4:  # Bold
                            text = f"**{text}**"
                        if flags & 2**1:  # Italic  
                            text = f"*{text}*"
                            
                        line_text += text
                    
                    if line_text.strip():
                        page_text += line_text + "\n"
                
                if page_text.strip():
                    page_text += "\n"  # Double line break between blocks
        
        all_text += page_text
    
    doc.close()
    
    # Split into Russell intro and Wittgenstein main text
    lines = all_text.split('\n')
    
    # Find where Wittgenstein starts (look for "1" followed by "The world...")
    witt_start = -1
    for i in range(len(lines) - 2):
        if lines[i].strip() == '1':
            next_line = lines[i+1].strip()
            if 'The world is everything that is the case' in next_line:
                witt_start = i
                break
    
    if witt_start == -1:
        print("Could not find Wittgenstein start")
        return None, None
    
    russell_lines = lines[:witt_start]
    wittgenstein_lines = lines[witt_start:]
    
    # Process Russell introduction
    russell_content = process_russell_formatting(russell_lines)
    
    # Process Wittgenstein with numbered propositions
    wittgenstein_content = process_wittgenstein_formatting(wittgenstein_lines)
    
    return russell_content, wittgenstein_content

def process_russell_formatting(lines):
    """Process Russell preserving exact paragraph structure"""
    
    # Find actual content start
    content_start = -1
    for i, line in enumerate(lines):
        if 'MR WITTGENSTEIN' in line.upper():
            content_start = i
            break
    
    if content_start == -1:
        return ""
    
    # Clean and structure content
    content_lines = []
    for line in lines[content_start:]:
        line = line.strip()
        if (line and 
            not line.isdigit() and 
            line not in ['INTRODUCTION', 'By BERTRAND RUSSELL', 'Tractatus', 'Logico-', 'Philosophicus']):
            content_lines.append(line)
    
    # Rebuild with proper HTML paragraph structure
    paragraphs = []
    current_para = []
    
    for line in content_lines:
        if not line:
            if current_para:
                paragraphs.append(' '.join(current_para))
                current_para = []
        else:
            # Check if this starts a new paragraph (capital letter, previous ended with period)
            if (current_para and 
                line[0].isupper() and 
                current_para[-1].endswith(('.', '!', '?')) and
                not line.lower().startswith(('and ', 'or ', 'but ', 'however', 'thus', 'this', 'that', 'it ', 'he ', 'she '))):
                
                paragraphs.append(' '.join(current_para))
                current_para = [line]
            else:
                current_para.append(line)
    
    if current_para:
        paragraphs.append(' '.join(current_para))
    
    return paragraphs

def process_wittgenstein_formatting(lines):
    """Process Wittgenstein preserving numbered proposition structure"""
    
    # Clean lines
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        if line and not (line.isdigit() and len(line) <= 3):
            cleaned_lines.append(line)
    
    # Group by propositions
    propositions = []
    current_prop = []
    
    for line in cleaned_lines:
        if is_proposition_start(line):
            if current_prop:
                propositions.append('\n'.join(current_prop))
            current_prop = [line]
        else:
            current_prop.append(line)
    
    if current_prop:
        propositions.append('\n'.join(current_prop))
    
    return propositions

def is_proposition_start(line):
    """Check if line starts new numbered proposition"""
    stripped = line.strip()
    
    # Main propositions
    if stripped in ['1', '2', '3', '4', '5', '6', '7']:
        return True
    
    # Sub-propositions  
    if re.match(r'^\d+\.\d+$', stripped):
        return True
    
    # Propositions with text on same line
    if re.match(r'^\d+(\.\d+)?\s+[A-Z]', stripped):
        return True
    
    return False

def create_html_formatted_content(russell_paragraphs, wittgenstein_propositions):
    """Create properly formatted HTML content"""
    
    # Russell section with proper indentation
    russell_html = ""
    for para in russell_paragraphs:
        # Apply proper indentation for normal paragraphs
        russell_html += f'<p class="document-paragraph">{para}</p>\n'
    
    # Wittgenstein section with numbered propositions
    wittgenstein_html = ""
    for prop in wittgenstein_propositions:
        lines = prop.split('\n')
        first_line = lines[0].strip()
        
        # Check if starts with number
        if re.match(r'^\d+(\.\d+)*\s*', first_line):
            wittgenstein_html += f'<p class="document-proposition">{prop.replace(chr(10), "<br>")}</p>\n'
        else:
            wittgenstein_html += f'<p class="document-paragraph">{prop.replace(chr(10), "<br>")}</p>\n'
    
    return russell_html, wittgenstein_html

def write_typescript_with_html_formatting(russell_html, wittgenstein_html):
    """Write TypeScript file with HTML formatting"""
    
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write('export const tractatusContent = {\n')
        f.write('  title: "Tractatus Logico-Philosophicus",\n')
        f.write('  author: "Ludwig Wittgenstein",\n')
        f.write('  sections: [\n')
        
        # Russell section
        russell_escaped = russell_html.replace('`', '\\`').replace('${', '\\${')
        f.write('    {\n')
        f.write('      id: "introduction",\n')
        f.write('      title: "Introduction by Bertrand Russell",\n')
        f.write(f'      content: `{russell_escaped}`,\n')
        f.write('      isHtml: true\n')
        f.write('    },\n')
        
        # Wittgenstein section
        witt_escaped = wittgenstein_html.replace('`', '\\`').replace('${', '\\${')
        f.write('    {\n')
        f.write('      id: "tractatus",\n')
        f.write('      title: "Tractatus Logico-Philosophicus",\n')
        f.write(f'      content: `{witt_escaped}`,\n')
        f.write('      isHtml: true\n')
        f.write('    }\n')
        
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
    russell_paragraphs, wittgenstein_propositions = extract_pdf_with_perfect_formatting()
    
    if russell_paragraphs and wittgenstein_propositions:
        russell_html, wittgenstein_html = create_html_formatted_content(russell_paragraphs, wittgenstein_propositions)
        write_typescript_with_html_formatting(russell_html, wittgenstein_html)
        
        print(f"CREATED HTML-FORMATTED TRACTATUS:")
        print(f"Russell paragraphs: {len(russell_paragraphs)}")
        print(f"Wittgenstein propositions: {len(wittgenstein_propositions)}")
        print(f"Russell HTML length: {len(russell_html)}")
        print(f"Wittgenstein HTML length: {len(wittgenstein_html)}")
    else:
        print("FAILED to extract content")