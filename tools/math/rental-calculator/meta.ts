import { ToolDefinition } from '@/lib/tools/registry';

export const rentalCalculatorTool: ToolDefinition = {
  id: 'rental-calculator',
  slug: 'calculadora-alquiler',
  name: 'Calculadora de Alquiler',
  description: 'Calcula la rentabilidad de un alquiler, el esfuerzo económico y si una vivienda es asequible según tus ingresos.',
  icon: '🏠',
  category: 'math',
  keywords: ['calculadora alquiler', 'rentabilidad alquiler', 'esfuerzo alquiler', 'puedo pagar alquiler', 'precio alquiler'],
  tags: ['alquiler', 'vivienda', 'inversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
