import { ToolDefinition } from '@/lib/tools/registry';

export const tensionArterialTool: ToolDefinition = {
  id: 'tension-arterial',
  slug: 'tension-arterial',
  name: 'Tensión Arterial',
  description: 'Interpreta tu tensión arterial según las guías ESC/ESH. Introduce sistólica y diastólica y obtén tu categoría: óptima, normal, alta o hipertensión grado 1/2/3.',
  icon: '💓',
  category: 'health',
  keywords: ['tensión arterial normal', 'hipertensión valores', 'presión arterial alta', 'sistólica diastólica', 'tensión arterial tabla'],
  tags: ['tensión', 'hipertensión', 'salud', 'corazón'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
