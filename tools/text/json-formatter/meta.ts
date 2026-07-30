import type { ToolDefinition } from '@/lib/tools/types'
export const jsonFormatterTool: ToolDefinition = {
  id: 'json-formatter', slug: 'formateador-json', name: 'Formateador JSON',
  description: 'Formatea y valida JSON al instante. Minifica JSON. Detecta errores de sintaxis.',
  icon: '{ }', category: 'text',
  keywords: ['formateador json', 'validar json', 'minificar json', 'json beautify', 'json online'],
  tags: ['json', 'formato', 'desarrollo'],
  component: () => import('./component'),
}
