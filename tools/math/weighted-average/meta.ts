import { ToolDefinition } from '@/lib/tools/registry';

export const weightedAverageTool: ToolDefinition = {
  id: 'weighted-average',
  slug: 'calculadora-medias',
  name: 'Media Ponderada',
  description: 'Calcula la media ponderada de valores con diferentes pesos. Útil para notas, inversiones y estadísticas.',
  icon: '⚖️',
  category: 'math',
  keywords: ['media ponderada', 'promedio ponderado', 'media weighted', 'calcular nota media', 'promedio notas'],
  tags: ['media', 'estadística', 'notas'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
