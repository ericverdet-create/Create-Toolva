import type { ToolDefinition } from '@/lib/tools/types'
export const ageCalculatorTool: ToolDefinition = {
  id: 'age-calculator',
  slug: 'calculadora-edad',
  name: 'Calculadora de edad',
  description: 'Calcula tu edad exacta en años, meses y días. Descubre cuántos días has vivido y cuándo es tu próximo cumpleaños.',
  icon: '🎂',
  category: 'math',
  keywords: ['calculadora edad', 'cuántos años tengo', 'calcular edad', 'mi edad exacta', 'días vividos'],
  tags: ['edad', 'cumpleaños', 'fecha'],
  component: () => import('./component'),
}
