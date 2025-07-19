#!/usr/bin/env python3

import re

def clean_content():
    """Remove all Tailwind CSS classes that are ruining the text formatting"""
    
    # Read the current content
    with open('shared/symbolic-logic-content.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Clean up the HTML by removing all the margin and font classes
    # Keep only the basic document-paragraph class
    cleaned_content = content
    
    # Remove all the bad Tailwind classes
    cleaned_content = re.sub(r' mb-\d+', '', cleaned_content)  # Remove margin-bottom classes
    cleaned_content = re.sub(r' mt-\d+', '', cleaned_content)  # Remove margin-top classes
    cleaned_content = re.sub(r' font-normal', '', cleaned_content)  # Remove font-normal
    
    # Write the cleaned content back
    with open('shared/symbolic-logic-content.ts', 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print("✅ Text formatting fixed - removed all Tailwind margin classes")

if __name__ == '__main__':
    clean_content()