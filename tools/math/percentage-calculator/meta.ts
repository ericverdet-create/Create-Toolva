import type { ToolDefinition } from '@/lib/tools/types'
export const percentageCalculatorTool: ToolDefinition = {
  id: 'percentage-calculator', slug: 'percentage-calculator', category: 'math',
  name: 'Calculadora de porcentajes',
  description: 'Calcula porcentajes de cualquier cifra. Que porcentaje es X de Y, o cuanto es el X% de Y.',
  keywords: ['porcentaje', 'calcular porcentaje', 'tanto por ciento', '%'],
  icon: '📊', tags: ['matematicas', 'porcentaje'], relatedTools: ['iva-calculator'],
  faq: [
    { question: '¿Cómo se calcula el porcentaje de una cantidad?', answer: 'Para calcular el X% de una cantidad Y, multiplica Y × X y divide entre 100. Ejemplo: el 15% de 200 = 200 × 15 / 100 = 30. También puedes multiplicar directamente por 0,15.' },
    { question: '¿Cómo calculo qué porcentaje es una cifra de otra?', answer: 'Divide la parte entre el total y multiplica por 100. Ejemplo: ¿qué porcentaje es 30 de 200? → 30 / 200 × 100 = 15%. Es la operación inversa a calcular el porcentaje de una cantidad.' },
    { question: '¿Cómo calculo un aumento o descuento porcentual?', answer: 'Para un aumento: multiplica el precio × (1 + porcentaje/100). Para un descuento: multiplica × (1 - porcentaje/100). Ejemplo: 100€ con 20% de descuento = 100 × 0,8 = 80€.' },
    { question: '¿Cómo se calcula la variación porcentual entre dos números?', answer: 'Variación % = ((nuevo valor - valor original) / valor original) × 100. Si un producto pasa de 50€ a 65€, la subida es ((65-50)/50) × 100 = 30%. Si el resultado es negativo, es una bajada.' },
  ],
  component: () => import('./component'),
  requiresAuth: false, isPremium: false, hasAI: false,
}
