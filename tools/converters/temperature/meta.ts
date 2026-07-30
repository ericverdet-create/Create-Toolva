import type { ToolDefinition } from '@/lib/tools/types'
export const temperatureConverterTool: ToolDefinition = {
  id: 'temperature-converter', slug: 'temperature-converter', category: 'converters',
  name: 'Conversor de temperatura',
  description: 'Convierte entre Celsius, Fahrenheit y Kelvin al instante.',
  keywords: ['celsius', 'fahrenheit', 'kelvin', 'convertir temperatura'],
  icon: '🌡️', tags: ['conversores', 'fisica'], relatedTools: [],
  component: () => import('./component'),
  requiresAuth: false, isPremium: false, hasAI: false,
}
