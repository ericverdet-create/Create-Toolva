export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO: '2026-08-06'
  updatedDate?: string;
  category: string;
  tags: string[];
  readingTime: number; // minutos
  relatedTools: string[]; // slugs de herramientas
  content: React.ReactNode;
}
