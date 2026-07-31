import { ToolDefinition } from '@/lib/tools/registry';

export const loanCalculatorTool: ToolDefinition = {
  id: 'loan-calculator',
  slug: 'calculadora-prestamo',
  name: 'Calculadora de Préstamo',
  description: 'Calcula la cuota mensual, intereses totales y tabla de amortización de cualquier préstamo personal.',
  icon: '🏦',
  category: 'math',
  keywords: ['préstamo', 'cuota mensual', 'intereses', 'amortización', 'crédito personal', 'calcular préstamo', 'TAE', 'TIN'],
  tags: ['finanzas', 'préstamo', 'crédito'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
