import type { ToolDefinition } from '@/lib/tools/types'
export const uuidGeneratorTool: ToolDefinition = {
  id: 'uuid-generator', slug: 'generador-uuid', name: 'Generador de UUID',
  description: 'Genera UUIDs v4 aleatorios. Genera uno o varios UUIDs, listos para copiar.',
  icon: 'ID', category: 'crypto',
  keywords: ['generador uuid', 'generar uuid', 'uuid online', 'uuid v4', 'guid generator'],
  tags: ['uuid', 'guid', 'aleatorio'],
  component: () => import('./component'),
}
