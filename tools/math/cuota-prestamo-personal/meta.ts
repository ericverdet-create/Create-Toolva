import { ToolDefinition } from '@/lib/tools/registry';
export const cuotaPrestamoPersonalTool: ToolDefinition = {
  id: 'cuota-prestamo-personal', slug: 'cuota-prestamo-personal',
  name: 'Calculadora de Préstamo Personal',
  description: 'Calcula la cuota mensual de un préstamo personal, total a pagar, intereses y tabla de amortización completa. Compara diferentes plazos al instante.',
  icon: '💳', category: 'math',
  keywords: ['cuota prestamo personal calculadora', 'cuanto pago al mes por un prestamo', 'simulador prestamo personal', 'calcular prestamo banco', 'cuota mensual prestamo'],
  tags: ['préstamo', 'cuota', 'banco', 'financiero'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
