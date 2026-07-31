import { ToolDefinition } from '@/lib/tools/registry';

export const pensionCalculatorTool: ToolDefinition = {
  id: 'pension-calculator',
  slug: 'calculadora-pension-jubilacion',
  name: 'Calculadora de Pensión de Jubilación',
  description: 'Estima tu pensión de jubilación en España según tus años cotizados, base reguladora y edad de jubilación.',
  icon: '👴',
  category: 'math',
  keywords: ['calculadora pensión jubilación', 'pensión jubilación españa', 'cuánto cobraré de pensión', 'base reguladora pensión', 'años cotizados pensión'],
  tags: ['pensión', 'jubilación', 'seguridad social'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
