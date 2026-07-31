import { ToolDefinition } from '@/lib/tools/registry';

export const electricityBillTool: ToolDefinition = {
  id: 'electricity-bill',
  slug: 'calculadora-factura-luz',
  name: 'Calculadora de Factura de Luz',
  description: 'Estima el coste de tu factura eléctrica en España. Calcula el consumo en kWh y el precio según tarifa regulada.',
  icon: '💡',
  category: 'math',
  keywords: ['calculadora factura luz', 'precio kwh españa', 'factura electricidad', 'coste electricidad', 'cuánto cuesta la luz'],
  tags: ['electricidad', 'factura', 'energía'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
