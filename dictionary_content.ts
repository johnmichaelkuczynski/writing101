export const tractatusContent = {
  title: "Dictionary of Analytic Philosophy",
  author: "J.-M. Kuczynski, PhD",
  sections: [
    {
      id: "fundamentals",
      title: "Fundamental Concepts",
      content: 
    },
    {
      id: "language",
      title: "Language and Meaning", 
      content: 
    },
    {
      id: "logic",
      title: "Logic and Inference",
      content: 
    },
    {
      id: "knowledge",
      title: "Knowledge and Belief",
      content: 
    },
    {
      id: "mathematics", 
      title: "Mathematics and Formal Systems",
      content: 
    },
    {
      id: "mind",
      title: "Mind and Consciousness", 
      content: 
    },
    {
      id: "metaphysics",
      title: "Metaphysics and Reality",
      content: 
    }
  ]
};

export function getFullDocumentContent(): string {
  return tractatusContent.sections
    .map(section => section.content)
    .join('

');
}

export function getDocumentTitle(): string {
  return tractatusContent.title;
}

export function getDocumentAuthor(): string {
  return tractatusContent.author;
}
