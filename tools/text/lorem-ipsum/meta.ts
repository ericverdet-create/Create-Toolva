import type { ToolDefinition } from '@/lib/tools/types';
export const loremIpsumTool: ToolDefinition = {
  id: 'lorem-ipsum', slug: 'generador-lorem-ipsum',
  name: 'Generador Lorem Ipsum',
  description: 'Genera texto Lorem Ipsum de relleno para maquetas y diseños. Elige número de párrafos, palabras o frases.',
  icon: '📄', category: 'text',
  keywords: ['lorem ipsum', 'texto de relleno', 'placeholder text', 'dummy text', 'texto prueba', 'maqueta'],
  tags: ['lorem', 'texto', 'diseño', 'maqueta'],
  component: () => import('./component'),
  relatedTools: ['word-counter'], requiresAuth: false, isPremium: false, hasAI: false,
};
