import { ToolDefinition } from '@/lib/tools/registry';

export const gastoCalorico: ToolDefinition = {
  id: 'gasto-calorico',
  slug: 'gasto-calorico-actividad',
  name: 'Gasto Calórico por Actividad',
  description: 'Calcula las calorías quemadas haciendo ejercicio o actividades físicas. Usa valores MET científicos para más de 40 actividades: correr, nadar, ciclismo, yoga y más.',
  icon: '🔥',
  category: 'health',
  keywords: ['calorías quemadas ejercicio', 'gasto calórico actividad física', 'cuántas calorías quemo corriendo', 'calorías ejercicio calculadora', 'MET actividades'],
  tags: ['calorías', 'ejercicio', 'deporte', 'MET'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
