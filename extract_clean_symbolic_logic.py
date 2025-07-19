#!/usr/bin/env python3

import fitz  # PyMuPDF
import re
import sys

def extract_symbolic_logic_content():
    try:
        # Open the uploaded PDF
        pdf_path = "attached_assets/Introduction to Symbolic Logic_1752780490115.pdf"
        doc = fitz.open(pdf_path)
        
        full_text = ""
        
        # Extract text from all pages
        for page_num in range(len(doc)):
            page = doc[page_num]
            text = page.get_text()
            full_text += text + "\n"
        
        doc.close()
        
        # Clean up the text
        # Remove excessive whitespace but preserve paragraph structure
        full_text = re.sub(r'\n\s*\n', '\n\n', full_text)
        full_text = re.sub(r'[ \t]+', ' ', full_text)
        full_text = full_text.strip()
        
        # Split into logical sections based on major headings
        sections = []
        current_section = ""
        
        lines = full_text.split('\n')
        
        for line in lines:
            line = line.strip()
            if not line:
                current_section += "\n\n"
                continue
                
            # Check if this is a major section heading (numbers like 1.0, 2.0, etc.)
            if re.match(r'^\d+\.\d+\s+', line) and current_section.strip():
                # Save the previous section
                if current_section.strip():
                    sections.append(current_section.strip())
                current_section = line + "\n\n"
            else:
                current_section += line + "\n"
        
        # Add the last section
        if current_section.strip():
            sections.append(current_section.strip())
        
        # If we don't have proper sections, treat the whole text as one section
        if len(sections) < 2:
            sections = [full_text]
        
        print("=== EXTRACTED CLEAN CONTENT ===")
        print(f"Total characters: {len(full_text)}")
        print(f"Number of sections: {len(sections)}")
        print("\n=== FIRST 2000 CHARACTERS ===")
        print(full_text[:2000])
        print("\n=== FULL CONTENT FOR TYPESCRIPT ===")
        
        # Generate TypeScript content
        typescript_content = """export const symbolicLogicContent = {
  sections: [
    {
      id: "symbolic-logic",
      title: "Introduction to Symbolic Logic",
      author: "J.-M. Kuczynski",
      content: `"""
        
        # Escape backticks and format for HTML
        html_content = full_text.replace('`', '\\`').replace('${', '\\${')
        
        # Convert to HTML paragraphs with proper formatting
        html_paragraphs = []
        paragraphs = html_content.split('\n\n')
        
        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
                
            # Check if it's a section heading
            if re.match(r'^\d+\.\d+\s+', para):
                html_paragraphs.append(f'<h3 class="text-lg font-semibold mt-6 mb-3">{para}</h3>')
            # Check if it's a subsection heading
            elif re.match(r'^\d+\.\d+\.\d+\s+', para):
                html_paragraphs.append(f'<h4 class="text-base font-medium mt-4 mb-2">{para}</h4>')
            else:
                # Regular paragraph with proper indentation
                html_paragraphs.append(f'<p class="document-paragraph mb-4 text-indent-2rem">{para}</p>')
        
        html_content = '\n'.join(html_paragraphs)
        
        typescript_content += html_content
        typescript_content += """`
    }
  ]
};"""
        
        # Write to TypeScript file
        with open('shared/symbolic-logic-content.ts', 'w', encoding='utf-8') as f:
            f.write(typescript_content)
        
        print("TypeScript file created successfully!")
        print(f"Content length: {len(html_content)} characters")
        
        return True
        
    except Exception as e:
        print(f"Error extracting content: {e}")
        return False

if __name__ == "__main__":
    success = extract_symbolic_logic_content()
    sys.exit(0 if success else 1)