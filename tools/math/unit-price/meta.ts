import { ToolDefinition } from '@/lib/tools/registry';

export const unitPriceTool: ToolDefinition = {
  id: 'unit-price',
  slug: 'comparador-precio-unidad',
  name: 'Comparador de Precio por Unidad',
  description: 'Compara el precio por kg, litro o unidad de diferentes productos para saber cuál es más barato realmente.',
  icon: '🛒',
  category: 'math',
  keywords: ['precio por kilo', 'precio unitario', 'comparar precios supermercado', 'precio por litro', 'cuál es más barato'],
  tags: ['precio', 'compra', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
