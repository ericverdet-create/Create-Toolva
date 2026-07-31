import { ToolDefinition } from '@/lib/tools/registry';

export const alcoholCalculatorTool: ToolDefinition = {
  id: 'alcohol-calculator',
  slug: 'calculadora-alcohol',
  name: 'Calculadora de Tasa de Alcohol',
  description: 'Calcula la tasa de alcoholemia en sangre según bebidas consumidas, peso, sexo y tiempo transcurrido. Estima cuándo estás en condiciones de conducir.',
  icon: '🍺',
  category: 'health',
  keywords: ['calculadora alcohol', 'tasa alcoholemia', 'gramos alcohol', 'puedo conducir', 'promilage alcohol sangre'],
  tags: ['alcohol', 'conducir', 'seguridad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
