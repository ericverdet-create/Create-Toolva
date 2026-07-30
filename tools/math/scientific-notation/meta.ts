import { ToolDefinition } from '@/lib/tools/registry';

export const scientificNotationTool: ToolDefinition = {
  id: 'scientific-notation',
  slug: 'notacion-cientifica',
  name: 'Notación Científica',
  description: 'Convierte números entre notación científica y decimal al instante. Introduce cualquier número muy grande o muy pequeño y obtén su representación en notación científica estándar.',
  icon: '🔬',
  category: 'math',
  keywords: ['notacion', 'científica', 'potencia', 'exponente', 'decimal', 'numero', 'grande', 'pequeño'],
  tags: ['ciencia', 'física', 'matemáticas'],
  component: () => import('./component'),
};
