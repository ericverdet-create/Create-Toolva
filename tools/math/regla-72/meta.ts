import { ToolDefinition } from '@/lib/tools/registry';

export const regla72Tool: ToolDefinition = {
  id: 'regla-72',
  slug: 'regla-del-72',
  name: 'Regla del 72',
  description: 'Calcula en cuántos años se duplica una inversión con la regla del 72. Introduce la tasa de interés anual y obtén el tiempo estimado para doblar tu dinero.',
  icon: '💹',
  category: 'math',
  keywords: ['regla del 72', 'cuándo se duplica inversión', 'doblar dinero años', 'tiempo duplicar capital', 'inversión interés compuesto'],
  tags: ['inversión', 'interés', 'finanzas', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
