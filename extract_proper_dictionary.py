"""
Extract complete Dictionary content from DOCX using python-docx
"""
from docx import Document

def extract_dictionary_from_docx():
    """Extract all text from the DOCX file preserving sentence continuity"""
    doc = Document("/home/runner/workspace/attached_assets/Dictionary of Analytic Philosophy_1752438650632.docx")
    
    full_text = []
    current_paragraph = ""
    
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        if text:
            # Check if this text should be joined with previous text
            if current_paragraph and not text[0].isupper() and not current_paragraph.endswith('.'):
                # This looks like a continuation - join with previous
                current_paragraph += " " + text
            else:
                # This starts a new paragraph
                if current_paragraph:
                    full_text.append(current_paragraph)
                current_paragraph = text
    
    # Don't forget the last paragraph
    if current_paragraph:
        full_text.append(current_paragraph)
    
    return '\n\n'.join(full_text)

def create_clean_typescript():
    """Create the TypeScript content file with clean text"""
    content = extract_dictionary_from_docx()
    
    # Convert to HTML with proper paragraph structure
    paragraphs = content.split('\n\n')
    html_content = '<div class="document-content">'
    
    for paragraph in paragraphs:
        if paragraph.strip():
            # Clean the paragraph text
            clean_para = paragraph.strip()
            # Add proper paragraph tags with styling
            html_content += f'<p class="document-paragraph">{clean_para}</p>'
    
    html_content += '</div>'
    
    # Escape backticks and template literals for TypeScript
    escaped_content = html_content.replace('`', '\\`').replace('${', '\\${')
    
    typescript_content = f'''export const tractatusContent = {{
  sections: [
    {{
      id: "complete-dictionary",
      title: "Dictionary of Analytic Philosophy",
      content: `{escaped_content}`
    }}
  ]
}};

export function getFullDocumentContent(): string {{
  return tractatusContent.sections.map(section => section.content).join('\\n\\n');
}}

export function getDocumentTitle(): string {{
  return "Dictionary of Analytic Philosophy by J.-M. Kuczynski, PhD";
}}

export function getDocumentAuthor(): string {{
  return "J.-M. Kuczynski, PhD";
}}
'''
    
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write(typescript_content)
    
    print(f"Successfully extracted {len(content)} characters from DOCX")
    print("Clean Dictionary content with HTML formatting written to shared/tractatus-content.ts")

if __name__ == "__main__":
    create_clean_typescript()