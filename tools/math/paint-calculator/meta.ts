import { ToolDefinition } from '@/lib/tools/registry';

export const paintCalculatorTool: ToolDefinition = {
  id: 'paint-calculator',
  slug: 'calculadora-pintura',
  name: 'Calculadora de Pintura',
  description: 'Calcula los litros de pintura necesarios para pintar una habitación según las medidas, número de capas y tipo de superficie.',
  icon: '🎨',
  category: 'math',
  keywords: ['calculadora pintura', 'cuánta pintura necesito', 'litros pintura habitación', 'pintura pared', 'rendimiento pintura'],
  tags: ['pintura', 'hogar', 'reforma'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
