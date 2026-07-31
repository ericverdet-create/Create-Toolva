import { ToolDefinition } from '@/lib/tools/registry';

export const multiplicationTableTool: ToolDefinition = {
  id: 'multiplication-table',
  slug: 'tabla-multiplicar',
  name: 'Tabla de Multiplicar',
  description: 'Genera la tabla de multiplicar de cualquier número. Ideal para aprender y repasar las tablas de multiplicar.',
  icon: '✖️',
  category: 'math',
  keywords: ['tabla multiplicar', 'multiplicación', 'tablas de multiplicar', 'aprender tablas', 'tabla del 1 al 10'],
  tags: ['multiplicación', 'tablas', 'matemáticas'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
