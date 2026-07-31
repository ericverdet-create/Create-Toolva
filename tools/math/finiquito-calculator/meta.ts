import { ToolDefinition } from '@/lib/tools/registry';

export const finiquitoCalculatorTool: ToolDefinition = {
  id: 'finiquito-calculator',
  slug: 'calculadora-finiquito',
  name: 'Calculadora de Finiquito',
  description: 'Calcula tu finiquito en España: indemnización por despido, vacaciones pendientes y pagas extra proporcionales.',
  icon: '📋',
  category: 'math',
  keywords: ['finiquito', 'despido', 'indemnización', 'calculadora finiquito', 'liquidación laboral', 'vacaciones pendientes'],
  tags: ['laboral', 'finiquito', 'españa'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
