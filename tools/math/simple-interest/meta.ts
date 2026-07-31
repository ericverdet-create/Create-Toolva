import { ToolDefinition } from '@/lib/tools/registry';

export const simpleInterestTool: ToolDefinition = {
  id: 'simple-interest',
  slug: 'calculadora-interes-simple',
  name: 'Calculadora de Interés Simple',
  description: 'Calcula el interés simple y el monto total de cualquier capital en función del tiempo y la tasa.',
  icon: '💵',
  category: 'math',
  keywords: ['interés simple', 'calculadora interés', 'intereses', 'capital', 'tasa interés', 'monto final'],
  tags: ['finanzas', 'interés', 'cálculo'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
