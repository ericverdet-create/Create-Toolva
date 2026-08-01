import { ToolDefinition } from '@/lib/tools/registry';
export const detectorNumeroPrimoTool: ToolDefinition = {
  id: 'detector-numero-primo', slug: 'detector-numero-primo',
  name: 'Detector de Números Primos',
  description: 'Comprueba si un número es primo al instante y muestra su factorización. Lista los primos en un rango. Herramienta perfecta para matemáticas y estudio.',
  icon: '🔍', category: 'math',
  keywords: ['numero primo', 'es primo', 'factorización', 'detectar primo', 'lista numeros primos', 'numeros primos hasta', 'factorizar numero'],
  tags: ['primo', 'factorización', 'matemáticas', 'divisores'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
