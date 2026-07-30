import type { ToolDefinition } from '@/lib/tools/types'
export const areaConverterTool: ToolDefinition = {
  id: 'area-converter',
  slug: 'conversor-area',
  name: 'Conversor de área',
  description: 'Convierte entre metros cuadrados, hectáreas, acres, pies cuadrados y más unidades de superficie.',
  icon: '📐',
  category: 'converters',
  keywords: ['conversor area', 'metros cuadrados', 'hectareas', 'acres', 'convertir superficie', 'pies cuadrados'],
  tags: ['área', 'superficie', 'conversión'],
  component: () => import('./component'),
}
