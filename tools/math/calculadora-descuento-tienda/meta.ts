import { ToolDefinition } from '@/lib/tools/registry';
export const descuentoTiendaTool: ToolDefinition = {
  id: 'calculadora-descuento-tienda', slug: 'calculadora-precio-oferta',
  name: 'Precio con Descuento',
  description: 'Calcula el precio final con descuento, cuánto ahorras y qué porcentaje de descuento tiene un artículo. También calcula el descuento inverso: qué % se aplicó.',
  icon: '🏷️', category: 'math',
  keywords: ['calculadora descuento precio', 'precio con oferta calculadora', 'cuanto ahorro con el descuento', 'calcular precio rebajado', 'descuento porcentaje calculadora online'],
  tags: ['descuento', 'oferta', 'precio', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
