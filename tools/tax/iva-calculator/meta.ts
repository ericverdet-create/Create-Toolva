import { ToolDefinition } from '@/lib/tools/registry';

export const ivaCalculatorTool: ToolDefinition = {
  id: 'iva-calculator',
  slug: 'calculadora-iva',
  name: 'Calculadora IVA',
  description: 'Calcula el IVA de cualquier cantidad. Introduce el precio con o sin IVA y obtén el desglose completo con base imponible, cuota de IVA y total.',
  icon: '🧾',
  category: 'tax',
  keywords: ['iva', 'impuesto', 'precio', 'base imponible', 'factura', 'igic', 'irpf', 'tax'],
  tags: ['iva', 'impuestos', 'fiscal'],
  component: () => import('./component'),
};
