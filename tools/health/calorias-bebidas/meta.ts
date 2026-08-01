import { ToolDefinition } from '@/lib/tools/registry';
export const caloriasBedidasTool: ToolDefinition = {
  id: 'calorias-bebidas', slug: 'calculadora-calorias-bebidas',
  name: 'Calculadora de Calorías en Bebidas',
  description: 'Consulta las calorías de más de 50 bebidas: refrescos, zumos, alcohol, cafés y batidos. Calcula cuántas calorías consumes al día con tus bebidas habituales.',
  icon: '🥤', category: 'health',
  keywords: ['calorias bebidas', 'cuantas calorias tiene una cerveza', 'calorias refresco', 'calorias vino copa', 'calorias zumo naranja'],
  tags: ['calorías', 'bebidas', 'alcohol', 'dieta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
