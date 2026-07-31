import { ToolDefinition } from '@/lib/tools/registry';

export const businessDaysTool: ToolDefinition = {
  id: 'business-days',
  slug: 'dias-laborables',
  name: 'Calculadora de Días Laborables',
  description: 'Calcula los días laborables entre dos fechas, excluyendo fines de semana y festivos nacionales de España.',
  icon: '📅',
  category: 'math',
  keywords: ['días laborables', 'días hábiles', 'festivos españa', 'días trabajo', 'calcular días laborables'],
  tags: ['días', 'laborables', 'calendario'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
