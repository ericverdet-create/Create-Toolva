import type { ToolDefinition } from '@/lib/tools/types'
export const ohmCalculatorTool: ToolDefinition = {
  id: 'ohm-calculator', slug: 'calculadora-ley-ohm', name: 'Ley de Ohm',
  description: 'Calcula voltaje, intensidad, resistencia y potencia. Introduce dos valores y obtén los demas.',
  icon: '⚡', category: 'math',
  keywords: ['ley de ohm', 'calculadora electricidad', 'voltaje intensidad resistencia', 'potencia electrica', 'vatios'],
  tags: ['electricidad', 'ohm', 'voltaje', 'amperios'],
  component: () => import('./component'),
}
