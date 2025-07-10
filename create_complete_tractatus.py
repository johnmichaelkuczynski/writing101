#!/usr/bin/env python3
"""
Script to create complete tractatus-content.ts with ALL authentic PDF content
"""

# Read the complete extracted text
with open('tractatus_complete.txt', 'r', encoding='utf-8') as f:
    full_text = f.read()

# Split into introduction and main content
lines = full_text.split('\n')

# Find where Russell's introduction ends and Wittgenstein's text begins
intro_end = -1
for i, line in enumerate(lines):
    if line.strip().startswith('PREFACE') or line.strip().startswith('1'):
        intro_end = i
        break

if intro_end == -1:
    # If we can't find the split, treat first 200 lines as intro
    intro_end = 200

intro_text = '\n'.join(lines[:intro_end]).strip()
main_text = '\n'.join(lines[intro_end:]).strip()

# Create the TypeScript content file
ts_content = f'''export const tractatusContent = {{
  title: "Tractatus Logico-Philosophicus",
  author: "Ludwig Wittgenstein",
  
  sections: [
    {{
      id: "introduction",
      title: "Introduction by Bertrand Russell",
      content: `{intro_text}`
    }},
    {{
      id: "main-text",
      title: "Tractatus Logico-Philosophicus",
      content: `{main_text}`
    }}
  ]
}};

export function getFullDocumentContent(): string {{
  return tractatusContent.sections.map(section => section.content).join('\\n\\n');
}}

export function getDocumentTitle(): string {{
  return tractatusContent.title;
}}

export function getDocumentAuthor(): string {{
  return tractatusContent.author;
}}'''

# Write the complete content
with open('shared/tractatus-content.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print(f"Created complete tractatus-content.ts with {len(full_text)} characters")
print(f"Introduction: {len(intro_text)} characters")
print(f"Main text: {len(main_text)} characters")