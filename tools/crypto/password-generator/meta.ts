import type { ToolDefinition } from '@/lib/tools/types'

export const passwordGeneratorTool: ToolDefinition = {
  id: 'password-generator',
  slug: 'generador-contrasenas',
  name: 'Generador de contraseñas',
  description: 'Genera contraseñas seguras y aleatorias con opciones de longitud y complejidad.',
  icon: '🔐',
  category: 'crypto',
  keywords: ['contraseña', 'password', 'segura', 'aleatoria', 'generador contraseñas', 'clave segura'],
  tags: ['seguridad', 'contraseñas', 'crypto'],
  component: () => import('./component'),
}
