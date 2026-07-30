import type { ToolDefinition } from '@/lib/tools/types'
export const base64Tool: ToolDefinition = {
  id: 'base64',
  slug: 'codificador-base64',
  name: 'Codificador Base64',
  description: 'Codifica y decodifica texto en formato Base64. Herramienta esencial para desarrolladores.',
  icon: '📦',
  category: 'crypto',
  keywords: ['base64 encode', 'base64 decode', 'codificar base64', 'decodificar base64', 'base64 online'],
  tags: ['base64', 'encoding', 'desarrollo'],
  component: () => import('./component'),
}
