#!/usr/bin/env python3
import re

def create_authentic_content():
    # Read the extracted PDF content
    with open('/tmp/symbolic_logic_full.txt', 'r', encoding='utf-8') as f:
        full_text = f.read()
    
    # Find section breaks and create the content structure
    sections = []
    
    # Split into logical sections based on the numbered headings
    section_pattern = r'(\d+\.\d*\s+[^0-9\n]*?)(?=\d+\.\d*\s+|\Z)'
    matches = re.finditer(section_pattern, full_text, re.MULTILINE | re.DOTALL)
    
    for match in matches:
        section_text = match.group(1).strip()
        lines = section_text.split('\n')
        if lines:
            title = lines[0].strip()
            content = '\n'.join(lines[1:]).strip()
            
            # Clean up the title and create ID
            section_id = title.lower().replace(' ', '-').replace('.', '-').replace(',', '').replace(':', '')
            section_id = re.sub(r'[^a-z0-9-]', '', section_id)
            
            sections.append({
                'id': section_id,
                'title': title,
                'content': content
            })
    
    # Create the TypeScript content
    ts_content = '''export const symbolicLogicContent = {
  title: "Introduction to Symbolic Logic",
  author: "J.-M. Kuczynski",
  sections: [
'''
    
    for section in sections:
        # Format content for HTML
        html_content = section['content'].replace('\n\n', '</p><p class="document-paragraph mb-4">').replace('\n', ' ')
        html_content = f'<div class="document-content"><h2 id="{section["id"]}" class="text-xl font-bold mb-4">{section["title"]}</h2><p class="document-paragraph mb-4">{html_content}</p></div>'
        
        ts_content += f'''    {{
      id: "{section['id']}",
      title: "{section['title']}",
      content: `{html_content}`
    }},
'''
    
    ts_content += '''  ]
};'''
    
    # Write to file
    with open('/tmp/authentic_symbolic_logic.ts', 'w', encoding='utf-8') as f:
        f.write(ts_content)
    
    print(f"Created authentic content with {len(sections)} sections")
    for section in sections[:10]:  # Show first 10
        print(f"- {section['title']}")

if __name__ == "__main__":
    create_authentic_content()