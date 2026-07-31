import { ToolDefinition } from '@/lib/tools/registry';

export const bodyFatTool: ToolDefinition = {
  id: 'body-fat',
  slug: 'calculadora-grasa-corporal',
  name: 'Calculadora de Grasa Corporal',
  description: 'Calcula tu porcentaje de grasa corporal con la fórmula de la Marina de EE.UU. Solo necesitas una cinta métrica.',
  icon: '📏',
  category: 'health',
  keywords: ['grasa corporal', 'porcentaje grasa corporal', 'calcular grasa corporal', 'body fat calculator', 'medir grasa sin báscula'],
  tags: ['grasa corporal', 'fitness', 'salud'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
