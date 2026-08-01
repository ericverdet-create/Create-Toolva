import { ToolDefinition } from '@/lib/tools/registry';
export const ahorroJubilacionTool: ToolDefinition = {
  id: 'ahorro-jubilacion', slug: 'calculadora-plan-ahorro-jubilacion',
  name: 'Plan de Ahorro para la Jubilación',
  description: 'Calcula cuánto necesitas ahorrar cada mes para jubilarte con el capital que deseas. Proyección de ahorro con interés compuesto y simulación de diferentes escenarios.',
  icon: '🏖️', category: 'math',
  keywords: ['calculadora jubilacion ahorro', 'cuanto ahorrar para jubilarse', 'plan ahorro jubilacion calculadora', 'fondo jubilacion calculadora', 'ahorro mensual jubilacion'],
  tags: ['jubilación', 'ahorro', 'plan pensión', 'inversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
