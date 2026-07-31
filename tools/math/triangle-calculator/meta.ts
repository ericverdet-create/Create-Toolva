import type { ToolDefinition } from '@/lib/tools/types';
export const triangleCalculatorTool: ToolDefinition = {
  id: 'triangle-calculator', slug: 'calculadora-triangulo',
  name: 'Calculadora de Triángulos',
  description: 'Calcula el área, perímetro, altura y ángulos de cualquier triángulo. Soporta triángulos rectángulos, isósceles y equiláteros.',
  icon: '📐', category: 'math',
  keywords: ['área triángulo', 'perímetro triángulo', 'calcular triángulo', 'hipotenusa', 'triángulo rectángulo', 'ángulos'],
  tags: ['geometría', 'triángulo', 'área', 'matemáticas'],
  component: () => import('./component'),
  relatedTools: ['percentage-calculator'], requiresAuth: false, isPremium: false, hasAI: false,
};
