import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraPensionesJubilacionTool: ToolDefinition = {
  id: 'calculadora-pensiones-jubilacion', slug: 'calculadora-pension-jubilacion-espana',
  name: 'Calculadora Pensión de Jubilación',
  description: 'Estima tu pensión de jubilación en España según tus años cotizados, base reguladora y edad. Calcula cuánto cobrarás al jubilarte con el sistema de la Seguridad Social española.',
  icon: '🧓', category: 'math',
  keywords: ['calculadora pension jubilacion espana', 'cuanto cobro de pension', 'calcular pension jubilacion', 'pension seguridad social calculadora', 'cuanto me corresponde de pension'],
  tags: ['pensión', 'jubilación', 'Seguridad Social', 'España'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
