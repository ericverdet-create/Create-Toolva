import type { ToolDefinition } from '@/lib/tools/types'

export const charCounterTool: ToolDefinition = {
  id: 'char-counter',
  slug: 'contador-caracteres',
  name: 'Contador de caracteres',
  description: 'Cuenta caracteres, palabras, líneas, frases y tiempo de lectura de cualquier texto.',
  icon: '🔢',
  category: 'text',
  keywords: ['contar caracteres', 'contador palabras', 'longitud texto', 'contador letras', 'tiempo lectura'],
  tags: ['texto', 'caracteres', 'palabras'],
  component: () => import('./component'),
}
