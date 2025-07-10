#!/usr/bin/env python3
"""
Extract text from PDF preserving EXACT original formatting and structure
"""

import fitz  # PyMuPDF
import json

def extract_exact_text():
    """Extract text preserving exact paragraph breaks and structure"""
    
    pdf_path = "attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf"
    doc = fitz.open(pdf_path)
    
    full_text = ""
    
    # Extract text from all pages with formatting
    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # Get text blocks to preserve formatting
        blocks = page.get_text("dict")
        page_text = ""
        
        for block in blocks["blocks"]:
            if "lines" in block:
                for line in block["lines"]:
                    line_text = ""
                    for span in line["spans"]:
                        line_text += span["text"]
                    if line_text.strip():
                        page_text += line_text + "\n"
                page_text += "\n"  # Block separator
        
        full_text += page_text
    
    doc.close()
    
    # Split into Russell's intro and Wittgenstein's main text
    # Look for "1" followed by "The world is all that is the case"
    lines = full_text.split('\n')
    
    wittgenstein_start_idx = -1
    for i, line in enumerate(lines):
        line = line.strip()
        if line == "1" and i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            if "The world is all that is the case" in next_line:
                wittgenstein_start_idx = i
                break
        elif line.startswith("1 The world is all that is the case"):
            wittgenstein_start_idx = i
            break
    
    if wittgenstein_start_idx == -1:
        print("Could not find start of Wittgenstein text")
        return None, None
    
    # Extract sections
    russell_lines = lines[:wittgenstein_start_idx]
    wittgenstein_lines = lines[wittgenstein_start_idx:]
    
    # Clean Russell intro - preserve paragraph structure
    russell_text = clean_russell_intro(russell_lines)
    
    # Clean Wittgenstein - preserve numbered proposition structure
    wittgenstein_text = clean_wittgenstein_exact(wittgenstein_lines)
    
    return russell_text, wittgenstein_text

def clean_russell_intro(lines):
    """Clean Russell intro preserving exact paragraph structure"""
    cleaned = []
    current_para = []
    
    skip_patterns = [
        "Tractatus", "Logico-", "Philosophicus", 
        "INTRODUCTION", "By BERTRAND RUSSELL"
    ]
    
    for line in lines:
        line = line.strip()
        
        # Skip headers and page numbers
        if (not line or 
            line.isdigit() or 
            line in skip_patterns or
            len(line) < 3):
            continue
        
        # Check if this starts a new paragraph
        if (current_para and 
            line and line[0].isupper() and 
            current_para[-1].endswith(('.', '!', '?'))):
            # Save current paragraph
            cleaned.append(' '.join(current_para))
            current_para = [line]
        else:
            current_para.append(line)
    
    # Add final paragraph
    if current_para:
        cleaned.append(' '.join(current_para))
    
    return '\n\n'.join(cleaned)

def clean_wittgenstein_exact(lines):
    """Clean Wittgenstein preserving exact numbered structure"""
    cleaned = []
    current_prop = []
    
    for line in lines:
        line = line.strip()
        
        # Skip page numbers and artifacts
        if not line or (line.isdigit() and len(line) < 3):
            continue
        
        # Check if this is a new numbered proposition
        if (line.isdigit() or 
            line.replace('.', '').replace(' ', '').isdigit() or
            any(line.startswith(f"{i} ") for i in range(1, 8)) or
            any(line.startswith(f"{i}.") for i in range(1, 8))):
            
            # Save current proposition
            if current_prop:
                cleaned.append(' '.join(current_prop))
            current_prop = [line]
        else:
            current_prop.append(line)
    
    # Add final proposition
    if current_prop:
        cleaned.append(' '.join(current_prop))
    
    return '\n\n'.join(cleaned)

def create_tractatus_content():
    """Create the tractatus content file with proper structure"""
    
    russell_text, wittgenstein_text = extract_exact_text()
    
    if not russell_text or not wittgenstein_text:
        print("Failed to extract text")
        return
    
    # Create sections based on numbered propositions
    sections = []
    
    # Russell introduction as first section
    sections.append({
        "id": "introduction",
        "title": "Introduction by Bertrand Russell",
        "content": russell_text
    })
    
    # Split Wittgenstein into main numbered sections (1-7)
    witt_paragraphs = wittgenstein_text.split('\n\n')
    
    section_titles = [
        "The World and Facts",
        "Objects and States of Affairs", 
        "Pictures and Thoughts",
        "Propositions and Language",
        "Logic and Truth-Functions",
        "Science and Necessity",
        "Ethics and the Mystical"
    ]
    
    current_section = {"content": []}
    section_idx = 0
    
    for para in witt_paragraphs:
        if not para.strip():
            continue
            
        # Check if this starts a new main section (1, 2, 3, etc.)
        first_line = para.split()[0] if para.split() else ""
        if first_line in ['1', '2', '3', '4', '5', '6', '7']:
            # Save previous section
            if current_section["content"] and section_idx < len(section_titles):
                sections.append({
                    "id": f"section-{section_idx + 1}",
                    "title": section_titles[section_idx],
                    "content": '\n\n'.join(current_section["content"])
                })
                section_idx += 1
            
            # Start new section
            current_section = {"content": [para]}
        else:
            current_section["content"].append(para)
    
    # Add final section
    if current_section["content"] and section_idx < len(section_titles):
        sections.append({
            "id": f"section-{section_idx + 1}",
            "title": section_titles[section_idx],
            "content": '\n\n'.join(current_section["content"])
        })
    
    # Create the TypeScript content
    content = {
        "title": "Tractatus Logico-Philosophicus",
        "author": "Ludwig Wittgenstein",
        "sections": sections
    }
    
    # Generate TypeScript file
    ts_content = f"""export const tractatusContent = {{
  title: "{content['title']}",
  author: "{content['author']}",
  sections: [
"""
    
    for section in content['sections']:
        escaped_content = section['content'].replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        ts_content += f"""    {{
      id: "{section['id']}",
      title: "{section['title']}",
      content: `{section['content']}`
    }},
"""
    
    ts_content += """  ]
};

export function getFullDocumentContent(): string {
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
"""
    
    return ts_content

if __name__ == "__main__":
    content = create_tractatus_content()
    if content:
        with open("tractatus_exact.ts", "w", encoding="utf-8") as f:
            f.write(content)
        print("Created tractatus_exact.ts with proper formatting")