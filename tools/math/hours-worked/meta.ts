import { ToolDefinition } from '@/lib/tools/registry';

export const hoursWorkedTool: ToolDefinition = {
  id: 'hours-worked',
  slug: 'calculadora-horas-trabajadas',
  name: 'Calculadora de Horas Trabajadas',
  description: 'Calcula el total de horas trabajadas y el salario a cobrar según tu precio por hora. Añade múltiples jornadas.',
  icon: '⏱️',
  category: 'math',
  keywords: ['horas trabajadas', 'calculadora horas', 'precio hora', 'salario horas', 'coste hora trabajador'],
  tags: ['horas', 'trabajo', 'salario'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
