import type { ToolDefinition } from '@/lib/tools/types'
export const mortgageCalculatorTool: ToolDefinition = {
  id: 'mortgage-calculator',
  slug: 'calculadora-hipoteca',
  name: 'Calculadora de hipoteca',
  description: 'Calcula la cuota mensual de tu hipoteca, el total pagado y los intereses totales. Amortización completa.',
  icon: '🏠',
  category: 'math',
  keywords: ['calculadora hipoteca', 'cuota hipoteca', 'calcular hipoteca', 'prestamo hipotecario', 'amortizacion'],
  tags: ['hipoteca', 'prestamo', 'finanzas'],
  component: () => import('./component'),
}
