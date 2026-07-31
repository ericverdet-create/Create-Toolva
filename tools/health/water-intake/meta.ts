import { ToolDefinition } from '@/lib/tools/registry';

export const waterIntakeTool: ToolDefinition = {
  id: 'water-intake',
  slug: 'calculadora-agua-diaria',
  name: 'Calculadora de Agua Diaria',
  description: 'Calcula cuánta agua debes beber al día según tu peso, actividad física y temperatura. Recomendaciones personalizadas.',
  icon: '💧',
  category: 'health',
  keywords: ['cuánta agua beber', 'calculadora agua diaria', 'hidratación diaria', 'litros agua día', 'agua según peso'],
  tags: ['agua', 'hidratación', 'salud'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
