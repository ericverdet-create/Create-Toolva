import { ToolDefinition } from '@/lib/tools/registry';

export const morseCodeTool: ToolDefinition = {
  id: 'morse-code',
  slug: 'codigo-morse',
  name: 'Código Morse',
  description: 'Convierte texto a código Morse y viceversa al instante. Incluye soporte para letras, números y signos de puntuación. Tabla de referencia completa del alfabeto Morse.',
  icon: '📡',
  category: 'converters',
  keywords: ['morse', 'código', 'telégrafo', 'señal', 'puntos', 'rayas', 'comunicación', 'SOS'],
  tags: ['morse', 'comunicación', 'código'],
  component: () => import('./component'),
};
