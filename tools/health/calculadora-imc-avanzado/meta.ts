import { ToolDefinition } from '@/lib/tools/registry';
export const imcAvanzadoTool: ToolDefinition = {
  id: 'imc-avanzado', slug: 'imc-peso-ideal-completo',
  name: 'IMC + Peso Ideal Completo',
  description: 'Calcula tu IMC, peso ideal, rango saludable, calorías de mantenimiento y tiempo estimado para llegar a tu peso objetivo. Todo en una sola calculadora.',
  icon: '⚖️', category: 'health',
  keywords: ['IMC calculadora completa', 'peso ideal calculadora', 'cuánto debo pesar', 'calorías para adelgazar', 'tiempo bajar de peso calculadora'],
  tags: ['IMC', 'peso', 'salud', 'adelgazar'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
