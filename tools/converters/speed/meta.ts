import type { ToolDefinition } from '@/lib/tools/types'
export const speedConverterTool: ToolDefinition = {
  id: 'speed-converter',
  slug: 'conversor-velocidad',
  name: 'Conversor de velocidad',
  description: 'Convierte entre km/h, mph, m/s, nudos, Mach y otras unidades de velocidad.',
  icon: '💨',
  category: 'converters',
  keywords: ['conversor velocidad', 'km/h a mph', 'convertir velocidad', 'nudos a kmh', 'mach a kmh'],
  tags: ['velocidad', 'conversión'],
  component: () => import('./component'),
}
