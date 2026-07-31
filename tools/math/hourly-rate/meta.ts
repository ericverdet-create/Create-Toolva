import { ToolDefinition } from '@/lib/tools/registry';

export const hourlyRateTool: ToolDefinition = {
  id: 'hourly-rate',
  slug: 'calcular-precio-hora',
  name: 'Calcular Precio por Hora',
  description: 'Calcula cuánto cobrar por hora como autónomo o freelance. Incluye costes fijos, impuestos, vacaciones y margen de beneficio.',
  icon: '⏱️',
  category: 'math',
  keywords: ['precio hora freelance', 'cuánto cobrar por hora', 'tarifa hora autónomo', 'calcular honorarios', 'precio hora trabajo'],
  tags: ['autónomo', 'freelance', 'tarifa', 'hora'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
