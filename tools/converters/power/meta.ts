import type { ToolDefinition } from '@/lib/tools/types'
export const powerConverterTool: ToolDefinition = {
  id: 'power-converter', slug: 'conversor-potencia', name: 'Conversor de potencia',
  description: 'Convierte entre vatios, kilovatios, caballos de vapor (HP), BTU/h y mas unidades de potencia.',
  icon: '🔌', category: 'converters',
  keywords: ['conversor potencia', 'vatios a kilovatios', 'HP caballos de vapor', 'BTU potencia', 'convertir potencia'],
  tags: ['potencia', 'vatios', 'kilovatios', 'hp'],
  component: () => import('./component'),
}
