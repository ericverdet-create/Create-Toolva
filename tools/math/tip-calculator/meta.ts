import type { ToolDefinition } from '@/lib/tools/types'
export const tipCalculatorTool: ToolDefinition = {
  id: 'tip-calculator', slug: 'calculadora-propinas', name: 'Calculadora de propinas',
  description: 'Calcula la propina y el total a pagar. Divide la cuenta entre varias personas.',
  icon: '🍽️', category: 'math',
  keywords: ['calculadora propinas', 'dividir cuenta restaurante', 'propina porcentaje', 'split bill'],
  tags: ['propinas', 'restaurante', 'dividir cuenta'],
  component: () => import('./component'),
}
