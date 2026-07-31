import { ToolDefinition } from '@/lib/tools/registry';

export const liquidacionSalarioTool: ToolDefinition = {
  id: 'liquidacion-salario',
  slug: 'liquidacion-salario',
  name: 'Liquidación de Salario',
  description: 'Calcula la liquidación de salario pendiente al dejar un trabajo: días del mes trabajados, pagas extras prorrateadas, vacaciones no disfrutadas y horas extra.',
  icon: '💼',
  category: 'math',
  keywords: ['liquidación salario', 'finiquito días trabajados', 'vacaciones pendientes pago', 'pagas extra prorrateadas', 'cuánto me deben al dejar trabajo'],
  tags: ['finiquito', 'liquidación', 'trabajo', 'vacaciones'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
