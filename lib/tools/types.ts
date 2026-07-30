import type { ComponentType } from 'react'

export type ToolCategory =
  | 'tax'
  | 'text'
  | 'image'
  | 'crypto'
  | 'math'
  | 'converters'

export interface ToolDefinition {
  // Identidad
  id: string
  slug: string
  category: ToolCategory

  // Contenido
  name: string
  description: string
  keywords: string[]

  // UX
  icon: string          // emoji o nombre de icono
  tags: string[]
  relatedTools: string[]

  // Componente (lazy)
  component: () => Promise<{ default: ComponentType }>

  // Futuros flags (no activos en Sprint 1)
  requiresAuth: boolean
  isPremium: boolean
  hasAI: boolean
}
