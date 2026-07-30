import type { ToolDefinition } from '@/lib/tools/types'
export const caseConverterTool: ToolDefinition = {
  id: 'case-converter',
  slug: 'conversor-mayusculas',
  name: 'Conversor de mayúsculas',
  description: 'Convierte texto a mayúsculas, minúsculas, Título, camelCase, snake_case, kebab-case y más.',
  icon: '🔤',
  category: 'text',
  keywords: ['convertir mayusculas', 'minusculas online', 'camelcase', 'snake case', 'conversor texto', 'cambiar mayusculas'],
  tags: ['texto', 'mayúsculas', 'programación'],
  component: () => import('./component'),
}
