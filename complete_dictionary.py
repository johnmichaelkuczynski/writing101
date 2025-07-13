"""
Extract and create complete Dictionary of Analytic Philosophy content
"""
import os

def read_complete_dictionary():
    """Read the complete dictionary content from uploaded file"""
    file_path = "attached_assets/Dictionary of Analytic Philosophy_1752438650632.docx"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            complete_content = f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                complete_content = f.read()
        except UnicodeDecodeError:
            with open(file_path, 'rb') as f:
                raw_content = f.read()
                complete_content = raw_content.decode('utf-8', errors='ignore')
    
    return complete_content

def create_dictionary_typescript():
    """Create the complete TypeScript content file"""
    content = read_complete_dictionary()
    
    # Escape backticks for TypeScript template literal
    escaped_content = content.replace('`', '\\`')
    
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
    
    print("Complete Dictionary content written to shared/tractatus-content.ts")

if __name__ == "__main__":
    create_dictionary_typescript()