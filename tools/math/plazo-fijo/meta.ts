import { ToolDefinition } from '@/lib/tools/registry';

export const plazoFijoTool: ToolDefinition = {
  id: 'plazo-fijo',
  slug: 'simulador-plazo-fijo',
  name: 'Simulador Depósito a Plazo Fijo',
  description: 'Calcula los intereses y el capital final de un depósito bancario a plazo fijo. Compara rendimiento bruto y neto tras retención del 19% en el IRPF.',
  icon: '🏦',
  category: 'math',
  keywords: ['plazo fijo calculadora', 'depósito bancario intereses', 'cuánto gana plazo fijo', 'rentabilidad depósito', 'intereses ahorro banco'],
  tags: ['ahorro', 'banco', 'depósito', 'interés'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
