import { ToolDefinition } from '@/lib/tools/registry';

export const porcentajeNotaTool: ToolDefinition = {
  id: 'porcentaje-nota',
  slug: 'calcular-nota-examen',
  name: 'Calcular Nota de Examen',
  description: 'Calcula tu nota final combinando parciales, trabajos y prácticas con sus porcentajes. Descubre qué nota necesitas en el examen final para aprobar.',
  icon: '📝',
  category: 'math',
  keywords: ['calcular nota final examen', 'nota necesaria para aprobar', 'nota ponderada asignatura', 'cuánto necesito en el examen', 'nota parcial final'],
  tags: ['examen', 'nota', 'universidad', 'aprobar'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
