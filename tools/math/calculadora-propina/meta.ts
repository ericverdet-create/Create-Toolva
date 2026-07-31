import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraPropinaTool: ToolDefinition = {
  id: 'calculadora-propina-restaurante', slug: 'calculadora-propina-restaurante',
  name: 'Calculadora de Propina por Persona',
  description: 'Calcula la propina de un restaurante y divide la cuenta entre comensales. Elige el porcentaje de propina y el número de personas para saber exactamente cuánto paga cada uno.',
  icon: '🍽️', category: 'math',
  keywords: ['calculadora propina restaurante', 'dividir cuenta restaurante', 'cuanta propina dejar', 'propina por persona calculadora', 'split bill calculadora'],
  tags: ['propina', 'restaurante', 'cuenta', 'comensales'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
