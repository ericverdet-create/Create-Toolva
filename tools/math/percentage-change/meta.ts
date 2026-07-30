import type { ToolDefinition } from '@/lib/tools/types'
export const percentageChangeTool: ToolDefinition = {
  id: 'percentage-change', slug: 'calculadora-variacion-porcentual', name: 'Variacion porcentual',
  description: 'Calcula el porcentaje de cambio entre dos valores. Ideal para precios y estadisticas.',
  icon: '📊', category: 'math',
  keywords: ['variacion porcentual', 'porcentaje cambio', 'subida porcentaje', 'bajada precio'],
  tags: ['porcentaje', 'variacion', 'cambio'],
  component: () => import('./component'),
}
