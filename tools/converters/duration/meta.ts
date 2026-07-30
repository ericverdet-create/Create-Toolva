import type { ToolDefinition } from '@/lib/tools/types'
export const durationConverterTool: ToolDefinition = {
  id: 'duration-converter',
  slug: 'conversor-tiempo',
  name: 'Conversor de tiempo',
  description: 'Convierte entre segundos, minutos, horas, días, semanas, meses y años fácilmente.',
  icon: '⏱️',
  category: 'converters',
  keywords: ['conversor tiempo', 'segundos a minutos', 'horas a dias', 'convertir tiempo', 'unidades tiempo'],
  tags: ['tiempo', 'duración', 'conversión'],
  component: () => import('./component'),
}
