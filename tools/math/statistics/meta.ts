import type { ToolDefinition } from '@/lib/tools/types'
export const statisticsTool: ToolDefinition = {
  id: 'statistics', slug: 'calculadora-estadistica', name: 'Estadistica basica',
  description: 'Calcula media, mediana, moda, desviacion tipica, varianza y mas sobre un conjunto de datos.',
  icon: '📈', category: 'math',
  keywords: ['calculadora estadistica', 'media mediana moda', 'desviacion tipica', 'varianza', 'estadistica online'],
  tags: ['estadistica', 'media', 'mediana', 'moda'],
  component: () => import('./component'),
}
