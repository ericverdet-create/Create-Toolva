import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraEmbarazoTool: ToolDefinition = {
  id: 'calculadora-embarazo', slug: 'fecha-probable-parto',
  name: 'Fecha Probable de Parto',
  description: 'Calcula la fecha probable de parto y las semanas de gestación a partir de la fecha de tu última regla o de la fecha de concepción. Incluye trimestres y hitos del embarazo.',
  icon: '🤱', category: 'health',
  keywords: ['fecha probable parto calculadora', 'cuantas semanas de embarazo tengo', 'calculadora semanas gestacion', 'fecha parto por fecha ultima regla', 'calculadora embarazo online'],
  tags: ['embarazo', 'parto', 'gestación', 'semanas'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
