import { ToolDefinition } from '@/lib/tools/registry';

export const randomNumberTool: ToolDefinition = {
  id: 'random-number',
  slug: 'generador-numeros-aleatorios',
  name: 'Generador de Números Aleatorios',
  description: 'Genera números aleatorios entre dos valores. Útil para sorteos, juegos, lotería y estadística.',
  icon: '🎲',
  category: 'math',
  keywords: ['número aleatorio', 'generador números aleatorios', 'sorteo aleatorio', 'número al azar', 'random number'],
  tags: ['aleatorio', 'sorteo', 'azar'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
