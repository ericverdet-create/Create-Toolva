import { ToolDefinition } from '@/lib/tools/registry';

export const timeCalculatorTool: ToolDefinition = {
  id: 'time-calculator',
  slug: 'calculadora-horas',
  name: 'Calculadora de Horas',
  description: 'Suma y resta horas y minutos, calcula horas trabajadas entre dos tiempos y convierte duración a decimal.',
  icon: '⏱️',
  category: 'math',
  keywords: ['calculadora horas', 'suma horas', 'horas trabajadas', 'tiempo', 'restar horas', 'horas decimal'],
  tags: ['tiempo', 'horas', 'trabajo'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
