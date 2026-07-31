import { ToolDefinition } from '@/lib/tools/registry';

export const speedDistanceTimeTool: ToolDefinition = {
  id: 'speed-distance-time',
  slug: 'velocidad-distancia-tiempo',
  name: 'Calculadora Velocidad, Distancia y Tiempo',
  description: 'Calcula velocidad, distancia o tiempo conociendo dos de los tres valores. Útil para viajes, running y física.',
  icon: '🏃',
  category: 'math',
  keywords: ['velocidad distancia tiempo', 'calcular velocidad', 'calcular distancia', 'tiempo trayecto', 'calculadora running'],
  tags: ['velocidad', 'distancia', 'física'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
