import { ToolDefinition } from '@/lib/tools/registry';

export const numerologyTool: ToolDefinition = {
  id: 'numerology',
  slug: 'numerologia',
  name: 'Calculadora de Numerología',
  description: 'Calcula tu número de la suerte, número del camino de vida y número de expresión según la numerología pitagórica.',
  icon: '🔮',
  category: 'math',
  keywords: ['calculadora numerología', 'número de la suerte', 'número camino de vida', 'numerología nombre', 'numerología fecha nacimiento'],
  tags: ['numerología', 'suerte', 'esotérico'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
