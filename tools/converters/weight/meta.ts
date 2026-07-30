import type { ToolDefinition } from '@/lib/tools/types'

export const weightConverterTool: ToolDefinition = {
  id: 'weight-converter',
  slug: 'conversor-peso',
  name: 'Conversor de peso',
  description: 'Convierte entre kilogramos, gramos, libras, onzas, stones y otras unidades de masa.',
  icon: '⚖️',
  category: 'converters',
  keywords: ['kilogramos', 'gramos', 'libras', 'onzas', 'conversor peso', 'convertir peso', 'masa'],
  tags: ['peso', 'masa', 'conversión'],
  component: () => import('./component'),
}
