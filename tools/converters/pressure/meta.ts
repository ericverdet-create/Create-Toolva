import type { ToolDefinition } from '@/lib/tools/types'
export const pressureConverterTool: ToolDefinition = {
  id: 'pressure-converter', slug: 'conversor-presion', name: 'Conversor de presion',
  description: 'Convierte entre Pascal, bar, atm, PSI, mmHg y otras unidades de presion.',
  icon: '🌡️', category: 'converters',
  keywords: ['conversor presion', 'pascal a bar', 'psi a bar', 'atmosferas', 'convertir presion'],
  tags: ['presion', 'pascal', 'bar', 'psi'],
  component: () => import('./component'),
}
