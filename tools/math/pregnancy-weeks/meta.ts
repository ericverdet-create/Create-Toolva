import { ToolDefinition } from '@/lib/tools/registry';

export const pregnancyWeeksTool: ToolDefinition = {
  id: 'pregnancy-weeks',
  slug: 'calculadora-semanas-embarazo',
  name: 'Calculadora de Semanas de Embarazo',
  description: 'Calcula las semanas de embarazo y la fecha probable de parto a partir de la última menstruación o fecha de concepción.',
  icon: '🤰',
  category: 'health',
  keywords: ['semanas embarazo', 'calculadora embarazo', 'fecha probable parto', 'semanas gestación', 'cuántas semanas de embarazo tengo'],
  tags: ['embarazo', 'maternidad', 'salud'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
