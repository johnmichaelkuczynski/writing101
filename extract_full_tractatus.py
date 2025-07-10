#!/usr/bin/env python3
import sys
import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path):
    """Extract all text from PDF while preserving formatting"""
    doc = fitz.open(pdf_path)
    full_text = ""
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        full_text += text + "\n"
    
    doc.close()
    return full_text

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 extract_full_tractatus.py <pdf_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    try:
        text = extract_text_from_pdf(pdf_path)
        
        # Write to file
        with open("tractatus_complete.txt", "w", encoding="utf-8") as f:
            f.write(text)
        
        print(f"Successfully extracted {len(text)} characters to tractatus_complete.txt")
        
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)