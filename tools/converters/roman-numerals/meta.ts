import type { ToolDefinition } from '@/lib/tools/types'
export const romanNumeralsTool: ToolDefinition = {
  id: 'roman-numerals', slug: 'numeros-romanos', name: 'Numeros romanos',
  description: 'Convierte entre numeros arabigos y romanos. Soporta del 1 al 3999.',
  icon: 'Ⅻ', category: 'converters',
  keywords: ['numeros romanos', 'convertir numeros romanos', 'romano a decimal', 'decimal a romano'],
  tags: ['romanos', 'numeracion', 'conversion'],
  component: () => import('./component'),
}
