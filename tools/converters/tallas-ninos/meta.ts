import { ToolDefinition } from '@/lib/tools/registry';

export const tallasNinosTool: ToolDefinition = {
  id: 'tallas-ninos',
  slug: 'tallas-ropa-ninos',
  name: 'Tallas de Ropa Niños',
  description: 'Convierte tallas de ropa infantil por edad, altura y peso. Compara sistemas EU, UK, US y tallas españolas para bebés, niños y adolescentes.',
  icon: '👶',
  category: 'converters',
  keywords: ['tallas ropa niños', 'talla infantil por edad', 'talla ropa bebé', 'conversor tallas niños', 'tabla tallas niños españa'],
  tags: ['niños', 'tallas', 'ropa infantil', 'bebé'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
