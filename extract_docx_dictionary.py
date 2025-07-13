#!/usr/bin/env python3
"""
Extract complete Dictionary of Analytic Philosophy content from DOCX
"""
import re

def extract_docx_content():
    """Extract all content from the dictionary DOCX file"""
    docx_path = "attached_assets/Dictionary of Analytic Philosophy_1752438188841.docx"
    
    # Read the docx file as plain text (since it's been converted)
    with open(docx_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Clean and process the content
    lines = content.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        if line and not line.isspace() and len(line) > 3:
            cleaned_lines.append(line)
    
    # Join all content
    full_text = '\n\n'.join(cleaned_lines)
    
    # Split into dictionary entries
    entries = extract_dictionary_entries(full_text)
    
    # Organize into sections
    sections = organize_into_sections(entries)
    
    return sections

def extract_dictionary_entries(text):
    """Extract individual dictionary entries"""
    entries = []
    
    # Split by common patterns that indicate new entries
    # Look for terms followed by colons or definitions
    patterns = [
        r'([A-Z][a-zA-Z\s]+?):\s*([^A-Z\n][^\n]*(?:\n[^A-Z\n][^\n]*)*)',
        r'([A-Z][a-zA-Z\s]+?)\s+([A-Z][a-z][^\n]*(?:\n[^A-Z\n][^\n]*)*)'
    ]
    
    current_entry = ""
    lines = text.split('\n\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if this starts a new entry (capitalized word followed by colon or definition)
        if (re.match(r'^[A-Z][a-zA-Z\s]*:', line) or 
            (line and line[0].isupper() and any(indicator in line.lower() for indicator in 
            [':', 'is', 'are', 'means', 'refers', 'definition', 'the', 'a ']))):
            
            if current_entry:
                entries.append(current_entry.strip())
            current_entry = line
        else:
            if current_entry:
                current_entry += '\n\n' + line
    
    # Add the last entry
    if current_entry:
        entries.append(current_entry.strip())
    
    return entries

def organize_into_sections(entries):
    """Organize entries into thematic sections"""
    
    # Initialize sections
    sections = {
        'fundamental': [],
        'language': [],
        'logic': [],
        'knowledge': [],
        'mathematics': [],
        'mind': [],
        'metaphysics': []
    }
    
    for entry in entries:
        entry_lower = entry.lower()
        
        # Categorize based on keywords and content
        if any(term in entry_lower for term in ['logic', 'inference', 'deduction', 'induction', 'syllogism', 'validity', 'sound', 'axiom', 'proof', 'algorithm']):
            sections['logic'].append(entry)
        elif any(term in entry_lower for term in ['meaning', 'semantic', 'syntax', 'language', 'ambiguity', 'vague', 'indexical', 'proposition', 'sentence', 'word', 'expression']):
            sections['language'].append(entry)
        elif any(term in entry_lower for term in ['knowledge', 'belief', 'truth', 'justification', 'evidence', 'epistemic', 'certainty', 'doubt', 'skeptic', 'a priori', 'posteriori']):
            sections['knowledge'].append(entry)
        elif any(term in entry_lower for term in ['set', 'number', 'mathematics', 'formal', 'system', 'function', 'relation', 'structure', 'model', 'axiom']):
            sections['mathematics'].append(entry)
        elif any(term in entry_lower for term in ['mind', 'consciousness', 'mental', 'thought', 'concept', 'idea', 'perception', 'experience', 'cognitive']):
            sections['mind'].append(entry)
        elif any(term in entry_lower for term in ['reality', 'existence', 'being', 'substance', 'property', 'cause', 'time', 'space', 'object', 'metaphysic', 'causal']):
            sections['metaphysics'].append(entry)
        else:
            sections['fundamental'].append(entry)
    
    # Create final section structure
    organized_sections = [
        {
            'id': 'fundamental-concepts',
            'title': 'Fundamental Concepts',
            'content': '\n\n'.join(sections['fundamental'])
        },
        {
            'id': 'language-meaning',
            'title': 'Language and Meaning',
            'content': '\n\n'.join(sections['language'])
        },
        {
            'id': 'logic-inference',
            'title': 'Logic and Inference',
            'content': '\n\n'.join(sections['logic'])
        },
        {
            'id': 'knowledge-belief',
            'title': 'Knowledge and Belief',
            'content': '\n\n'.join(sections['knowledge'])
        },
        {
            'id': 'mathematics-formal',
            'title': 'Mathematics and Formal Systems',
            'content': '\n\n'.join(sections['mathematics'])
        },
        {
            'id': 'mind-consciousness',
            'title': 'Mind and Consciousness',
            'content': '\n\n'.join(sections['mind'])
        },
        {
            'id': 'metaphysics-reality',
            'title': 'Metaphysics and Reality',
            'content': '\n\n'.join(sections['metaphysics'])
        }
    ]
    
    return organized_sections

def create_typescript_content(sections):
    """Create the TypeScript content file"""
    
    typescript_content = '''export const tractatusContent = {
  title: "Dictionary of Analytic Philosophy",
  author: "J.-M. Kuczynski, PhD",
  sections: [
'''
    
    for i, section in enumerate(sections):
        # Escape backticks and other special characters
        content = section['content'].replace('`', '\\`').replace('${', '\\${')
        
        typescript_content += f'''    {{
      id: "{section['id']}",
      title: "{section['title']}",
      content: `{content}`
    }}'''
        
        if i < len(sections) - 1:
            typescript_content += ","
        
        typescript_content += "\n"
    
    typescript_content += '''  ]
};

export function getFullDocumentContent(): string {
  return tractatusContent.sections.map(section => section.content).join('\\n\\n');
}

export function getDocumentTitle(): string {
  return tractatusContent.title;
}

export function getDocumentAuthor(): string {
  return tractatusContent.author;
}
'''
    
    return typescript_content

def main():
    print("Extracting complete Dictionary from DOCX...")
    sections = extract_docx_content()
    
    typescript_content = create_typescript_content(sections)
    
    # Write to the shared content file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write(typescript_content)
    
    total_chars = sum(len(section['content']) for section in sections)
    print(f"Created complete dictionary content with {len(sections)} sections")
    print(f"Total characters: {total_chars}")

if __name__ == "__main__":
    main()