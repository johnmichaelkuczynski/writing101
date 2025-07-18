#!/usr/bin/env python3
import fitz
import sys
import os
import re

def extract_pdf_content():
    # Open the PDF
    pdf_path = '/home/runner/workspace/attached_assets/Introduction to Symbolic Logic_1752780490115.pdf'
    doc = fitz.open(pdf_path)
    
    # Extract all text
    full_text = ''
    for page in doc:
        full_text += page.get_text()
    
    doc.close()
    
    # Clean up the text
    # Remove excessive whitespace
    full_text = re.sub(r'\n\s*\n', '\n\n', full_text)
    full_text = re.sub(r' +', ' ', full_text)
    
    # Save to file
    with open('/tmp/symbolic_logic_full.txt', 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    print(f'Extracted {len(full_text)} characters from PDF')
    
    # Show first 1000 characters
    print("First 1000 characters:")
    print(full_text[:1000])
    
    return full_text

if __name__ == "__main__":
    extract_pdf_content()