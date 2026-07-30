import type { ToolDefinition } from '@/lib/tools/types'
export const finalPriceTool: ToolDefinition = {
  id: 'final-price', slug: 'precio-final-descuentos', name: 'Precio final con descuentos',
  description: 'Aplica varios descuentos encadenados a un precio. Calcula cuanto ahorras en total.',
  icon: '🏷️', category: 'math',
  keywords: ['precio final descuento', 'multiples descuentos', 'calcular precio', 'descuento encadenado', 'ahorro'],
  tags: ['precio', 'descuento', 'ahorro'],
  component: () => import('./component'),
}
