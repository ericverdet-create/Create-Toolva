import { ToolDefinition } from '@/lib/tools/registry';

export const proteinasDiariasTool: ToolDefinition = {
  id: 'proteinas-diarias',
  slug: 'proteinas-diarias-recomendadas',
  name: 'Proteínas Diarias Recomendadas',
  description: 'Calcula cuántos gramos de proteína necesitas al día según tu peso, nivel de actividad y objetivo: perder grasa, mantener o ganar músculo.',
  icon: '🥩',
  category: 'health',
  keywords: ['proteínas diarias recomendadas', 'cuántas proteínas necesito', 'gramos proteína por kilo', 'proteína para ganar músculo', 'ingesta proteína diaria'],
  tags: ['proteínas', 'nutrición', 'músculo', 'dieta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
