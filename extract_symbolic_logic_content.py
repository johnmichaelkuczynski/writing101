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
    """Format text content as HTML with proper paragraph tags"""
    # Split into paragraphs
    paragraphs = text.split('\n\n')
    
    html_content = ""
    for para in paragraphs:
        if para.strip():
            # Clean up the paragraph
            clean_para = para.strip().replace('\n', ' ')
            # Escape backticks and other special characters
            clean_para = clean_para.replace('`', '\\`').replace('${', '\\${')
            html_content += f'<p class="document-paragraph">{clean_para}</p>'
    
    return html_content

if __name__ == "__main__":
    extract_complete_content()