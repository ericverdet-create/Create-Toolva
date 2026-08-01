import { ToolDefinition } from '@/lib/tools/registry';
export const generadorListaAleatoriosTool: ToolDefinition = {
  id: 'generador-numeros-aleatorios-lista', slug: 'generador-lista-numeros-aleatorios',
  name: 'Generador de Lista Aleatoria',
  description: 'Genera listas de números aleatorios sin repetición, ordena aleatoriamente una lista de elementos, o realiza un sorteo entre participantes. Ideal para rifas, quinielas y sorteos.',
  icon: '🎯', category: 'math',
  keywords: ['generador numeros aleatorios sin repeticion', 'sorteo online lista', 'generador lista aleatoria', 'rifa online gratis', 'sorteo participantes online'],
  tags: ['sorteo', 'aleatorio', 'lista', 'rifa'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
