import type { ToolDefinition } from '@/lib/tools/types'
export const bmiCalculatorTool: ToolDefinition = {
  id: 'bmi-calculator',
  slug: 'calculadora-imc',
  name: 'Calculadora de IMC',
  description: 'Calcula tu Índice de Masa Corporal (IMC). Descubre si tu peso es saludable según tu altura.',
  icon: '⚕️',
  category: 'health',
  keywords: ['calculadora IMC', 'indice masa corporal', 'peso ideal', 'calcular IMC', 'sobrepeso', 'BMI'],
  tags: ['IMC', 'BMI', 'salud', 'peso'],
  component: () => import('./component'),
}
