import { ToolDefinition } from '@/lib/tools/registry';

export const commissionCalculatorTool: ToolDefinition = {
  id: 'commission-calculator',
  slug: 'calculadora-comision',
  name: 'Calculadora de Comisión',
  description: 'Calcula la comisión de una venta, inmueble o servicio. Obtén el importe neto, la comisión y el total.',
  icon: '💼',
  category: 'math',
  keywords: ['comisión', 'calculadora comisión', 'comisión inmobiliaria', 'agente', 'porcentaje venta', 'comisión venta'],
  tags: ['comisión', 'ventas', 'negocio'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
