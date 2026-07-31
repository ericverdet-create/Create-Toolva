import { ToolDefinition } from '@/lib/tools/registry';

export const inflationCalculatorTool: ToolDefinition = {
  id: 'inflation-calculator',
  slug: 'calculadora-inflacion',
  name: 'Calculadora de Inflación',
  description: 'Calcula el poder adquisitivo de una cantidad según la inflación acumulada. Compara precios de distintos años.',
  icon: '📈',
  category: 'math',
  keywords: ['inflación', 'IPC', 'poder adquisitivo', 'calculadora inflación', 'precio constante', 'deflactor'],
  tags: ['inflación', 'economía', 'precios'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
