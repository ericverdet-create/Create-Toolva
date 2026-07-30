import type { ToolDefinition } from '@/lib/tools/types'

export const discountCalculatorTool: ToolDefinition = {
  id: 'discount-calculator',
  slug: 'calculadora-descuentos',
  name: 'Calculadora de descuentos',
  description: 'Calcula el precio final y el ahorro al aplicar un porcentaje de descuento.',
  icon: '🏷️',
  category: 'math',
  keywords: ['descuento', 'oferta', 'precio', 'rebaja', 'porcentaje', 'ahorro', 'calculadora descuentos'],
  tags: ['descuentos', 'compras', 'ofertas'],
  component: () => import('./component'),
}
