#!/usr/bin/env python3
"""
Extract properly formatted Tractatus text preserving original structure
"""

import fitz  # PyMuPDF
import re

def extract_formatted_text():
    """Extract text from PDF preserving original paragraph structure"""
    
    # Open the PDF
    pdf_path = "attached_assets/Tractatus Logico-Philosophicus_ the original authoritative edition_1752121392510.pdf"
    doc = fitz.open(pdf_path)
    
    full_text = ""
    
    # Extract text from all pages
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text()
        full_text += text + "\n"
    
    doc.close()
    
    # Find where Russell's introduction ends and Wittgenstein's text begins
    # Look for the distinctive numbered propositions
    wittgenstein_start = full_text.find("1\nThe world is all that is the case.")
    if wittgenstein_start == -1:
        wittgenstein_start = full_text.find("1 The world is all that is the case.")
    if wittgenstein_start == -1:
        # Try alternative pattern
        wittgenstein_start = full_text.find("The world is all that is the case.")
    
    if wittgenstein_start == -1:
        print("Could not find start of Wittgenstein's text")
        return None
        
    # Extract Russell's introduction (everything before Wittgenstein)
    russell_intro = full_text[:wittgenstein_start].strip()
    
    # Extract Wittgenstein's text (from the start to the end)
    wittgenstein_text = full_text[wittgenstein_start:].strip()
    
    # Clean up the introduction text - preserve paragraph breaks
    russell_intro = clean_text_preserve_structure(russell_intro)
    
    # Clean up Wittgenstein's text - preserve numbered proposition structure
    wittgenstein_text = clean_wittgenstein_structure(wittgenstein_text)
    
    return russell_intro, wittgenstein_text

def clean_text_preserve_structure(text):
    """Clean text while preserving original paragraph structure"""
    # Split into lines
    lines = text.split('\n')
    
    # Remove page headers/footers and very short lines that are artifacts
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        # Skip empty lines, page numbers, headers
        if (len(line) == 0 or 
            line.isdigit() or 
            line in ['Tractatus', 'Logico-', 'Philosophicus', 'INTRODUCTION', 'By BERTRAND RUSSELL']):
            continue
        cleaned_lines.append(line)
    
    # Rejoin with proper spacing
    result = []
    current_paragraph = []
    
    for line in cleaned_lines:
        # If line starts with capital letter and previous paragraph exists, it's likely a new paragraph
        if (len(current_paragraph) > 0 and 
            line and line[0].isupper() and 
            current_paragraph[-1][-1] in '.!?'):
            # End current paragraph
            result.append(' '.join(current_paragraph))
            current_paragraph = [line]
        else:
            current_paragraph.append(line)
    
    # Add final paragraph
    if current_paragraph:
        result.append(' '.join(current_paragraph))
    
    return '\n\n'.join(result)

def clean_wittgenstein_structure(text):
    """Clean Wittgenstein's text preserving the numbered proposition structure"""
    # Split into lines
    lines = text.split('\n')
    
    # Remove artifacts but preserve numbered structure
    cleaned_lines = []
    for line in lines:
        line = line.strip()
        # Skip page numbers and headers but keep everything else
        if (len(line) == 0 or 
            line.isdigit() and len(line) < 3):  # Skip standalone page numbers
            continue
        cleaned_lines.append(line)
    
    # Reconstruct with proper proposition structure
    result = []
    current_section = []
    
    for line in cleaned_lines:
        # Check if this is a numbered proposition (starts with number followed by space)
        if re.match(r'^\d+(\.\d+)*\s+', line):
            # This is a new numbered proposition
            if current_section:
                result.append(' '.join(current_section))
            current_section = [line]
        else:
            # Continuation of current proposition
            current_section.append(line)
    
    # Add final section
    if current_section:
        result.append(' '.join(current_section))
    
    return '\n\n'.join(result)

if __name__ == "__main__":
    russell_intro, wittgenstein_text = extract_formatted_text()
    
    if russell_intro and wittgenstein_text:
        # Save to files for inspection
        with open("russell_intro_formatted.txt", "w", encoding="utf-8") as f:
            f.write(russell_intro)
        
        with open("wittgenstein_formatted.txt", "w", encoding="utf-8") as f:
            f.write(wittgenstein_text)
        
        print(f"Russell introduction: {len(russell_intro)} characters")
        print(f"Wittgenstein text: {len(wittgenstein_text)} characters")
        print("Files saved: russell_intro_formatted.txt, wittgenstein_formatted.txt")
        
        # Show first few lines of each
        print("\nRussell intro preview:")
        print(russell_intro[:500] + "...")
        print("\nWittgenstein preview:")
        print(wittgenstein_text[:500] + "...")
    else:
        print("Failed to extract text")