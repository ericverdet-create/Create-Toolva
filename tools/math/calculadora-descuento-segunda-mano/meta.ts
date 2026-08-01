import { ToolDefinition } from '@/lib/tools/registry';
export const descuentoSegundaManoTool: ToolDefinition = {
  id: 'calculadora-descuento-segunda-mano', slug: 'calculadora-precio-segunda-mano',
  name: 'Calculadora Precio Segunda Mano',
  description: 'Calcula el precio justo de venta para artículos de segunda mano según antigüedad, estado y categoría. Útil para Wallapop, Vinted, Milanuncios y eBay.',
  icon: '♻️', category: 'math',
  keywords: ['precio segunda mano calculadora', 'cuanto vale wallapop', 'calcular precio venta segunda mano', 'precio justo segunda mano', 'depreciacion articulo segunda mano'],
  tags: ['segunda mano', 'wallapop', 'precio', 'venta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
