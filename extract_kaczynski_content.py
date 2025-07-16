#!/usr/bin/env python3
"""
Extract complete Industrial Society and Its Future content from PDF
"""

def extract_complete_content():
    """Extract all content from the uploaded PDF file"""
    try:
        # Try different encodings
        encodings = ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']
        content = None
        
        for encoding in encodings:
            try:
                with open('attached_assets/Industrial Society and Its Future_1752668074406.pdf', 'r', encoding=encoding) as file:
                    content = file.read()
                print(f"Successfully read with encoding: {encoding}")
                break
            except UnicodeDecodeError:
                continue
        
        if content is None:
            # Try binary read as fallback
            with open('attached_assets/Industrial Society and Its Future_1752668074406.pdf', 'rb') as file:
                raw_content = file.read()
                content = raw_content.decode('utf-8', errors='ignore')
                print("Read with binary mode and UTF-8 with ignore errors")
        
        print(f"Total characters extracted: {len(content)}")
        
        # Escape content for TypeScript
        escaped_content = content.replace('`', '\\`').replace('${', '\\${')
        
        # Create the TypeScript content file
        typescript_content = f'''export const industrialSocietyContent = {{
  title: "Industrial Society and Its Future",
  author: "Theodore Kaczynski",
  year: "1995",
  fullText: `{escaped_content}`
}};

export function getFullDocumentContent(): string {{
  return industrialSocietyContent.fullText;
}}

export function getDocumentTitle(): string {{
  return industrialSocietyContent.title;
}}

export function getDocumentAuthor(): string {{
  return industrialSocietyContent.author;
}}

export function getDocumentYear(): string {{
  return industrialSocietyContent.year;
}}
'''
        
        # Write the content file
        with open('industrial_society_content.ts', 'w', encoding='utf-8') as f:
            f.write(typescript_content)
        
        print("Content successfully extracted and TypeScript file created!")
        print(f"File: industrial_society_content.ts")
        
        return content
        
    except Exception as e:
        print(f"Error extracting content: {e}")
        return None

if __name__ == "__main__":
    extract_complete_content()