import { ToolDefinition } from '@/lib/tools/registry';
export const numeroSuerteTool: ToolDefinition = {
  id: 'numero-suerte', slug: 'generador-numeros-suerte',
  name: 'Generador Números de la Suerte',
  description: 'Genera combinaciones aleatorias para Lotería Primitiva, Bonoloto, Euromillones, El Gordo y La Quiniela. También genera números personalizados.',
  icon: '🍀', category: 'math',
  keywords: ['números suerte lotería', 'generador primitiva', 'números euromillones aleatorios', 'combinación bonoloto', 'números quiniela'],
  tags: ['lotería', 'suerte', 'primitiva', 'euromillones'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
