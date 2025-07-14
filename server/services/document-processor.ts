import { tractatusContent } from "@shared/tractatus-content";

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  level: number;
}

export function extractDocumentSections(): DocumentSection[] {
  return tractatusContent.sections.map(section => ({
    ...section,
    level: 1
  }));
}

export function getFullDocumentContent(): string {
  return tractatusContent.getFullDocumentContent();
}
