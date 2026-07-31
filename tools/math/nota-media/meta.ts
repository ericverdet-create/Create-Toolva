import { ToolDefinition } from '@/lib/tools/registry';

export const notaMediaTool: ToolDefinition = {
  id: 'nota-media',
  slug: 'calculadora-nota-media',
  name: 'Calculadora Nota Media',
  description: 'Calcula tu nota media ponderada del expediente académico. Añade asignaturas con sus créditos o pesos y obtén la media para oposiciones, másteres y becas.',
  icon: '🎓',
  category: 'math',
  keywords: ['calculadora nota media expediente', 'nota media ponderada', 'media expediente universitario', 'nota media oposiciones', 'calcular media notas'],
  tags: ['notas', 'expediente', 'universidad', 'media'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
