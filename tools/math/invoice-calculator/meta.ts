import { ToolDefinition } from '@/lib/tools/registry';

export const invoiceCalculatorTool: ToolDefinition = {
  id: 'invoice-calculator',
  slug: 'calculadora-factura',
  name: 'Calculadora de Factura',
  description: 'Crea y calcula facturas con múltiples líneas, IVA, descuentos e IRPF. Obtén el total a pagar al instante.',
  icon: '🧾',
  category: 'tax',
  keywords: ['calculadora factura', 'hacer factura', 'total factura', 'factura iva irpf', 'calcular factura autónomo'],
  tags: ['factura', 'IVA', 'IRPF'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
