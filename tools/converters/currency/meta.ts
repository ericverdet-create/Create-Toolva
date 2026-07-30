import type { ToolDefinition } from '@/lib/tools/types'
export const currencyConverterTool: ToolDefinition = {
  id: 'currency-converter', slug: 'conversor-divisas', name: 'Conversor de divisas',
  description: 'Convierte entre euros, dolares, libras, yenes y mas de 17 divisas. Tasas orientativas.',
  icon: '💱', category: 'converters',
  keywords: ['conversor divisas', 'cambio euro dolar', 'convertir moneda', 'tipo de cambio', 'euro a dolar'],
  tags: ['divisas', 'moneda', 'cambio'],
  component: () => import('./component'),
}
