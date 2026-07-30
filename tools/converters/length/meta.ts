import type { ToolDefinition } from '@/lib/tools/types'

export const lengthConverterTool: ToolDefinition = {
  id: 'length-converter',
  slug: 'conversor-longitud',
  name: 'Conversor de longitud',
  description: 'Convierte entre metros, kilómetros, pulgadas, pies, millas y más unidades de longitud.',
  icon: '📏',
  category: 'converters',
  keywords: ['metros', 'kilómetros', 'pulgadas', 'pies', 'millas', 'conversor longitud', 'convertir medidas'],
  tags: ['longitud', 'medidas', 'conversión'],
  component: () => import('./component'),
}
