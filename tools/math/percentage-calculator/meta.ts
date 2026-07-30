import type { ToolDefinition } from '@/lib/tools/types'
export const percentageCalculatorTool: ToolDefinition = {
  id: 'percentage-calculator', slug: 'percentage-calculator', category: 'math',
  name: 'Calculadora de porcentajes',
  description: 'Calcula porcentajes de cualquier cifra. Que porcentaje es X de Y, o cuanto es el X% de Y.',
  keywords: ['porcentaje', 'calcular porcentaje', 'tanto por ciento', '%'],
  icon: '📊', tags: ['matematicas', 'porcentaje'], relatedTools: ['iva-calculator'],
  component: () => import('./component'),
  requiresAuth: false, isPremium: false, hasAI: false,
}
