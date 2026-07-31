import { ToolDefinition } from '@/lib/tools/registry';

export const horasExtrasTool: ToolDefinition = {
  id: 'horas-extras',
  slug: 'calculadora-horas-extras',
  name: 'Calculadora Horas Extra',
  description: 'Calcula el valor de tus horas extra según tu sueldo bruto anual. Aplica los recargos legales del 25% (laborables) y 75% (festivos) o los de tu convenio.',
  icon: '⏰',
  category: 'math',
  keywords: ['calculadora horas extra', 'cuánto cobrar hora extra', 'precio hora extra trabajo', 'horas extraordinarias valor', 'hora extra convenio'],
  tags: ['horas extra', 'trabajo', 'sueldo', 'convenio'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
