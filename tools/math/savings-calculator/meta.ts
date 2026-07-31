import { ToolDefinition } from '@/lib/tools/registry';

export const savingsCalculatorTool: ToolDefinition = {
  id: 'savings-calculator',
  slug: 'calculadora-ahorro',
  name: 'Calculadora de Ahorro',
  description: 'Calcula cuánto tiempo tardarás en ahorrar una cantidad objetivo con aportaciones mensuales e intereses.',
  icon: '💰',
  category: 'math',
  keywords: ['ahorro', 'calculadora ahorro', 'objetivo ahorro', 'interés ahorro', 'plan ahorro', 'depósito'],
  tags: ['finanzas', 'ahorro', 'inversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
