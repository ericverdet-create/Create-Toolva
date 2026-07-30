import type { ToolDefinition } from '@/lib/tools/types'
export const compoundInterestTool: ToolDefinition = {
  id: 'compound-interest', slug: 'calculadora-interes-compuesto', name: 'Interes compuesto',
  description: 'Calcula el crecimiento de tu inversion con interes compuesto, con o sin aportaciones periodicas.',
  icon: '💹', category: 'math',
  keywords: ['interes compuesto', 'calculadora inversion', 'rentabilidad', 'ahorro interes', 'calcular interes'],
  tags: ['interes', 'inversion', 'ahorro'],
  component: () => import('./component'),
}
