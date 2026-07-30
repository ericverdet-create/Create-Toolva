import { ToolDefinition } from '@/lib/tools/registry';

export const colorConverterTool: ToolDefinition = {
  id: 'color-converter',
  slug: 'conversor-colores',
  name: 'Conversor de Colores',
  description: 'Convierte colores entre HEX, RGB y HSL al instante. Incluye selector visual de color y vista previa en tiempo real. Ideal para diseñadores y desarrolladores web.',
  icon: '🎨',
  category: 'converters',
  keywords: ['color', 'hex', 'rgb', 'hsl', 'diseño', 'css', 'paleta', 'web', 'hexa'],
  tags: ['color', 'diseño', 'css'],
  component: () => import('./component'),
};
