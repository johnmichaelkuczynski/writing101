#!/usr/bin/env python3
"""
Extract complete Dictionary of Analytic Philosophy content from PDF
"""
import fitz
import re

def extract_complete_dictionary():
    """Extract all content from the dictionary PDF"""
    pdf_path = "attached_assets/Dictionary of Analytic Philosophy_1752437353621.pdf"
    
    # Open the PDF
    doc = fitz.open(pdf_path)
    
    full_text = ""
    
    # Extract text from all pages
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text = page.get_text()
        full_text += text + "\n"
    
    doc.close()
    
    # Clean up the text
    lines = full_text.split('\n')
    cleaned_lines = []
    
    for line in lines:
        line = line.strip()
        if line and not line.isspace():
            cleaned_lines.append(line)
    
    # Join and organize the content
    complete_text = '\n'.join(cleaned_lines)
    
    # Split into logical sections based on content analysis
    sections = organize_dictionary_content(complete_text)
    
    return sections

def organize_dictionary_content(text):
    """Organize dictionary content into logical sections"""
    
    # Find all entries (lines that start with a term followed by colon or definition)
    entries = []
    current_entry = ""
    
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Check if this is a new dictionary entry (starts with a capitalized term)
        if (line and line[0].isupper() and 
            (':' in line or 
             line.endswith('.') or 
             any(word in line.lower() for word in ['definition', 'meaning', 'refers to', 'is a', 'are']))):
            
            if current_entry:
                entries.append(current_entry.strip())
            current_entry = line
        else:
            if current_entry:
                current_entry += " " + line
    
    # Add the last entry
    if current_entry:
        entries.append(current_entry.strip())
    
    # Organize into thematic sections
    fundamental_concepts = []
    language_meaning = []
    logic_inference = []
    knowledge_belief = []
    mathematics_formal = []
    mind_consciousness = []
    metaphysics_reality = []
    
    for entry in entries:
        entry_lower = entry.lower()
        
        # Categorize based on keywords
        if any(term in entry_lower for term in ['algorithm', 'axiom', 'proof', 'logic', 'inference', 'deduction', 'induction', 'syllogism', 'validity', 'sound']):
            logic_inference.append(entry)
        elif any(term in entry_lower for term in ['meaning', 'semantics', 'syntax', 'language', 'ambiguity', 'vague', 'indexical', 'proposition', 'sentence', 'word']):
            language_meaning.append(entry)
        elif any(term in entry_lower for term in ['knowledge', 'belief', 'truth', 'justification', 'evidence', 'epistemic', 'certainty', 'doubt', 'skeptic']):
            knowledge_belief.append(entry)
        elif any(term in entry_lower for term in ['set', 'number', 'mathematics', 'formal', 'system', 'function', 'relation', 'structure', 'model']):
            mathematics_formal.append(entry)
        elif any(term in entry_lower for term in ['mind', 'consciousness', 'mental', 'thought', 'concept', 'idea', 'perception', 'experience', 'qualia']):
            mind_consciousness.append(entry)
        elif any(term in entry_lower for term in ['reality', 'existence', 'being', 'substance', 'property', 'cause', 'time', 'space', 'object', 'metaphysics']):
            metaphysics_reality.append(entry)
        else:
            fundamental_concepts.append(entry)
    
    # Create sections
    sections = [
        {
            'id': 'fundamental-concepts',
            'title': 'Fundamental Concepts',
            'content': '\n\n'.join(fundamental_concepts)
        },
        {
            'id': 'language-meaning',
            'title': 'Language and Meaning',
            'content': '\n\n'.join(language_meaning)
        },
        {
            'id': 'logic-inference',
            'title': 'Logic and Inference',
            'content': '\n\n'.join(logic_inference)
        },
        {
            'id': 'knowledge-belief',
            'title': 'Knowledge and Belief',
            'content': '\n\n'.join(knowledge_belief)
        },
        {
            'id': 'mathematics-formal',
            'title': 'Mathematics and Formal Systems',
            'content': '\n\n'.join(mathematics_formal)
        },
        {
            'id': 'mind-consciousness',
            'title': 'Mind and Consciousness',
            'content': '\n\n'.join(mind_consciousness)
        },
        {
            'id': 'metaphysics-reality',
            'title': 'Metaphysics and Reality',
            'content': '\n\n'.join(metaphysics_reality)
        }
    ]
    
    return sections

def create_complete_typescript_file(sections):
    """Create the complete TypeScript content file"""
    
    # Create the TypeScript content
    typescript_content = '''export const tractatusContent = {
  title: "Dictionary of Analytic Philosophy",
  author: "J.-M. Kuczynski, PhD",
  sections: [
'''
    
    for i, section in enumerate(sections):
        typescript_content += f'''    {{
      id: "{section['id']}",
      title: "{section['title']}",
      content: `{section['content']}`
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
    
    # Write to the shared content file
    with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
        f.write(typescript_content)
    
    print(f"Created complete dictionary content with {len(sections)} sections")
    print(f"Total characters: {sum(len(section['content']) for section in sections)}")

def main():
    print("Extracting complete Dictionary of Analytic Philosophy...")
    sections = extract_complete_dictionary()
    create_complete_typescript_file(sections)
    print("Complete dictionary extraction finished!")

if __name__ == "__main__":
    main()