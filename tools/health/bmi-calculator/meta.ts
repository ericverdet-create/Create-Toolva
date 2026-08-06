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
  faq: [
    { question: '¿Qué es el IMC y cómo se calcula?', answer: 'El IMC (Índice de Masa Corporal) se calcula dividiendo tu peso en kilogramos entre el cuadrado de tu altura en metros. Por ejemplo, 70 kg y 1,75 m → IMC = 70 / (1,75²) = 22,9, que es peso normal.' },
    { question: '¿Cuál es el IMC normal para un adulto?', answer: 'La OMS establece: menos de 18,5 = bajo peso; 18,5–24,9 = peso normal; 25–29,9 = sobrepeso; 30 o más = obesidad. Sin embargo, el IMC no distingue entre músculo y grasa, por lo que es orientativo.' },
    { question: '¿El IMC es igual para hombres y mujeres?', answer: 'La fórmula es la misma, pero la interpretación puede variar ligeramente. Las mujeres tienen naturalmente más grasa corporal que los hombres con el mismo IMC. Para mayor precisión se recomienda medir también el perímetro de cintura.' },
    { question: '¿Cuánto debería pesar según mi altura?', answer: 'Para tener un IMC saludable (18,5–24,9), una persona de 1,70 m debería pesar entre 53 y 72 kg. Una persona de 1,80 m, entre 60 y 81 kg. Usa esta calculadora para ver tu rango exacto.' },
  ],
  component: () => import('./component'),
}
