import { ToolDefinition } from '@/lib/tools/registry';

export const tipSplitterTool: ToolDefinition = {
  id: 'tip-splitter',
  slug: 'dividir-cuenta-propina',
  name: 'Dividir Cuenta y Propina',
  description: 'Divide la cuenta del restaurante entre varias personas y calcula la propina. Cuánto paga cada uno.',
  icon: '🍽️',
  category: 'math',
  keywords: ['dividir cuenta restaurante', 'calculadora propina', 'dividir cuenta entre personas', 'split bill', 'cuánto paga cada uno'],
  tags: ['cuenta', 'propina', 'restaurante'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
