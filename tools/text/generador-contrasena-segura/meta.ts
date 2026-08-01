import { ToolDefinition } from '@/lib/tools/registry';
export const generadorContrasenaTool: ToolDefinition = {
  id: 'generador-contrasena-segura', slug: 'generador-contrasena-segura-online',
  name: 'Comprobador de Contraseña Segura',
  description: 'Comprueba si tu contraseña es segura y cuánto tardaría en ser descifrada. Analiza longitud, complejidad y patrones débiles. Obtén recomendaciones para mejorar tu seguridad online.',
  icon: '🔐', category: 'text',
  keywords: ['comprobar contraseña segura', 'como de segura es mi contraseña', 'fuerza contraseña online', 'test seguridad contraseña', 'contraseña segura online'],
  tags: ['contraseña', 'seguridad', 'password', 'ciberseguridad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
