import { ToolDefinition } from '@/lib/tools/registry';
export const seguroVidaTool: ToolDefinition = {
  id: 'seguro-vida', slug: 'calculadora-seguro-vida',
  name: 'Calculadora de Seguro de Vida',
  description: 'Estima el capital asegurado que necesitas y la prima mensual aproximada de tu seguro de vida según tu edad, ingresos, deudas y situación familiar.',
  icon: '🛡️', category: 'math',
  keywords: ['calculadora seguro de vida', 'cuanto capital seguro vida necesito', 'precio seguro de vida por edades', 'seguro vida prima mensual', 'seguro vida familiar calculadora'],
  tags: ['seguro', 'vida', 'prima', 'capital'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
