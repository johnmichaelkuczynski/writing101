#!/usr/bin/env python3
import fitz
import re

def extract_complete_content():
    try:
        # Open the PDF file
        doc = fitz.open('attached_assets/Introduction to Symbolic Logic_1752780490115.pdf')
        
        # Extract all text
        full_text = ''
        for page in doc:
            full_text += page.get_text() + '\n'
        
        doc.close()
        
        print(f"Total characters extracted: {len(full_text)}")
        
        # Clean up the text slightly for better formatting
        # Remove excessive newlines but preserve paragraph breaks
        cleaned_text = re.sub(r'\n\s*\n\s*\n+', '\n\n', full_text)
        
        # Create the TypeScript content structure
        escaped_text = cleaned_text.replace('`', '\\`')
        html_content = format_content_as_html(cleaned_text)
        
        typescript_content = f'''export const symbolicLogicContent = {{
  sections: [
    {{
      id: "symbolic-logic",
      title: "Introduction to Symbolic Logic",
      author: "J.-M. Kuczynski",
      content: `<div class="document-content">{html_content}</div>`
    }}
  ],
  fullText: `{escaped_text}`,
  title: "Introduction to Symbolic Logic",
  author: "J.-M. Kuczynski",
  year: "2024"
}};

export function getFullDocumentContent(): string {{
  return symbolicLogicContent.fullText;
}}

export function getDocumentTitle(): string {{
  return symbolicLogicContent.title;
}}

export function getDocumentAuthor(): string {{
  return symbolicLogicContent.author;
}}

export function getDocumentYear(): string {{
  return symbolicLogicContent.year;
}}
'''
        
        # Write the content file
        with open('shared/symbolic-logic-content.ts', 'w', encoding='utf-8') as f:
            f.write(typescript_content)
        
        print("Content successfully extracted and TypeScript file created!")
        print(f"File: shared/symbolic-logic-content.ts")
        
        return cleaned_text
        
    except Exception as e:
        print(f"Error extracting content: {e}")
        return None

def format_content_as_html(text):
    """Format text content as HTML with proper paragraph tags and structure"""
    # First, let's clean and structure the text better
    lines = text.split('\n')
    
    # Process lines to identify headers, paragraphs, and sections
    formatted_lines = []
    current_paragraph = []
    
    for line in lines:
        line = line.strip()
        if not line:
            # Empty line - end current paragraph if we have one
            if current_paragraph:
                formatted_lines.append('\n\n'.join(current_paragraph))
                current_paragraph = []
            continue
            
        # Check if this is a section header (starts with number followed by period)
        if line.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.')) and len(line.split()) <= 10:
            # This is likely a section header
            if current_paragraph:
                formatted_lines.append('\n\n'.join(current_paragraph))
                current_paragraph = []
            formatted_lines.append(f"HEADER:{line}")
        else:
            # Regular content line
            current_paragraph.append(line)
    
    # Don't forget the last paragraph
    if current_paragraph:
        formatted_lines.append('\n\n'.join(current_paragraph))
    
    # Now convert to HTML
    html_content = ""
    for item in formatted_lines:
        if item.startswith("HEADER:"):
            header_text = item.replace("HEADER:", "").strip()
            html_content += f'<p class="document-paragraph mb-6 mt-8 font-normal">{header_text}</p>'
        elif item.strip():
            # Regular paragraph - split by double newlines for sub-paragraphs
            paragraphs = item.split('\n\n')
            for para in paragraphs:
                if para.strip():
                    clean_para = para.strip().replace('\n', ' ')
                    # Escape backticks and other special characters
                    clean_para = clean_para.replace('`', '\\`').replace('${', '\\${')
                    html_content += f'<p class="document-paragraph mb-4">{clean_para}</p>'
    
    return html_content

if __name__ == "__main__":
    extract_complete_content()