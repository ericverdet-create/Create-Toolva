import { ToolDefinition } from '@/lib/tools/registry';

export const gratuityCalculatorTool: ToolDefinition = {
  id: 'gratuity-calculator',
  slug: 'calculadora-indemnizacion',
  name: 'Calculadora de Indemnización por Despido',
  description: 'Calcula la indemnización por despido procedente e improcedente en España según los años trabajados y el salario.',
  icon: '💼',
  category: 'math',
  keywords: ['calculadora indemnización despido', 'indemnización improcedente', 'indemnización procedente', 'días por año trabajado', 'cuánto me corresponde despido'],
  tags: ['indemnización', 'despido', 'laboral', 'España'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
