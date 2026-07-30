import type { ToolDefinition } from '@/lib/tools/types'
export const dateDiffTool: ToolDefinition = {
  id: 'date-diff', slug: 'dias-entre-fechas', name: 'Dias entre fechas',
  description: 'Calcula los dias entre dos fechas. Incluye dias laborables, semanas y meses.',
  icon: '📅', category: 'math',
  keywords: ['dias entre fechas', 'calcular dias', 'diferencia fechas', 'dias laborables'],
  tags: ['fechas', 'dias', 'calendario'],
  component: () => import('./component'),
}
