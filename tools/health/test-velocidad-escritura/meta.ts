import { ToolDefinition } from '@/lib/tools/registry';
export const testVelocidadEscrituraTool: ToolDefinition = {
  id: 'test-velocidad-escritura', slug: 'test-velocidad-escritura-palabras-por-minuto',
  name: 'Test de Velocidad de Escritura',
  description: 'Mide tu velocidad de escritura en palabras por minuto (PPM) y tu precisión. Elige texto en español o inglés y compara con la media mundial. ¡Bate tu récord!',
  icon: '⌨️', category: 'text',
  keywords: ['test velocidad escritura palabras por minuto', 'cuantas palabras por minuto escribo', 'test mecanografia online', 'velocidad escritura calculadora', 'typing speed test español'],
  tags: ['escritura', 'mecanografía', 'PPM', 'velocidad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
