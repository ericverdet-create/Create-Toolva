import { ToolDefinition } from '@/lib/tools/registry';

export const clothingSizeTool: ToolDefinition = {
  id: 'clothing-size',
  slug: 'conversor-tallas',
  name: 'Conversor de Tallas de Ropa',
  description: 'Convierte tallas de ropa entre España/Europa, UK, USA e Internacional. Camisetas, pantalones y zapatos.',
  icon: '👕',
  category: 'converters',
  keywords: ['conversor tallas', 'tallas ropa', 'talla europea americana', 'convertir talla ropa', 'talla zapatos'],
  tags: ['tallas', 'ropa', 'moda'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
