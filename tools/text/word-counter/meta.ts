import type { ToolDefinition } from '@/lib/tools/types'
export const wordCounterTool: ToolDefinition = {
  id: 'word-counter', slug: 'word-counter', category: 'text',
  name: 'Contador de palabras',
  description: 'Cuenta palabras, caracteres, frases y parrafos. Calcula el tiempo de lectura estimado.',
  keywords: ['contador palabras', 'contar palabras', 'caracteres', 'word count'],
  icon: '📝', tags: ['texto', 'escritura'], relatedTools: [],
  component: () => import('./component'),
  requiresAuth: false, isPremium: false, hasAI: false,
}
