import { ToolDefinition } from '@/lib/tools/registry';

export const shoeSizeTool: ToolDefinition = {
  id: 'shoe-size',
  slug: 'conversor-tallas-zapatos',
  name: 'Conversor Tallas de Zapatos',
  description: 'Convierte tallas de zapatos entre sistemas EU, UK, US hombre, US mujer y cm. Incluye tabla completa para adultos y niños.',
  icon: '👟',
  category: 'converters',
  keywords: ['tallas zapatos', 'conversor tallas calzado', 'talla zapato europea americana', 'zapatos talla UK', 'tabla tallas zapatos'],
  tags: ['zapatos', 'tallas', 'calzado', 'moda'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
