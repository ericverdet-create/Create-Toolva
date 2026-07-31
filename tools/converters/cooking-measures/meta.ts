import { ToolDefinition } from '@/lib/tools/registry';

export const cookingMeasuresTool: ToolDefinition = {
  id: 'cooking-measures',
  slug: 'conversor-medidas-cocina',
  name: 'Conversor de Medidas Culinarias',
  description: 'Convierte medidas de cocina: tazas, cucharadas, cucharaditas, mililitros, onzas y gramos para ingredientes comunes.',
  icon: '🥄',
  category: 'converters',
  keywords: ['conversor medidas cocina', 'tazas a ml', 'cucharadas a gramos', 'onzas a ml', 'medidas recetas', 'cups to ml'],
  tags: ['cocina', 'recetas', 'medidas'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
