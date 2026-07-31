import { ToolDefinition } from '@/lib/tools/registry';

export const descuentoAcumuladoTool: ToolDefinition = {
  id: 'descuento-acumulado',
  slug: 'descuento-acumulado',
  name: 'Descuento Acumulado',
  description: 'Calcula el precio final al aplicar varios descuentos consecutivos. Compara con un descuento único equivalente. Ideal para rebajas y negociaciones.',
  icon: '🏷️',
  category: 'math',
  keywords: ['descuento acumulado', 'varios descuentos', 'precio final descuento', 'descuento sobre descuento', 'calcular rebajas'],
  tags: ['descuento', 'precio', 'rebaja', 'compra'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
