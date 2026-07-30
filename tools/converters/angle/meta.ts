import type { ToolDefinition } from '@/lib/tools/types'
export const angleConverterTool: ToolDefinition = {
  id: 'angle-converter', slug: 'conversor-angulos', name: 'Conversor de angulos',
  description: 'Convierte entre grados, radianes, gradianes y otras unidades de angulo.',
  icon: '📐', category: 'converters',
  keywords: ['conversor angulos', 'grados a radianes', 'radianes a grados', 'convertir angulo'],
  tags: ['angulos', 'radianes', 'grados'],
  component: () => import('./component'),
}
