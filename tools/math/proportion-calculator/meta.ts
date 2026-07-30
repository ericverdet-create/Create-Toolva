import type { ToolDefinition } from '@/lib/tools/types'
export const proportionCalculatorTool: ToolDefinition = {
  id: 'proportion-calculator', slug: 'calculadora-proporciones', name: 'Calculadora de proporciones',
  description: 'Resuelve reglas de tres y proporciones: A/B = C/D. Deja en blanco el valor a calcular.',
  icon: '⚖️', category: 'math',
  keywords: ['regla de tres', 'calculadora proporciones', 'proporcion', 'resolver proporcion'],
  tags: ['proporcion', 'regla de tres', 'matematicas'],
  component: () => import('./component'),
}
