import { ToolDefinition } from '@/lib/tools/registry';

export const calorieCalculatorTool: ToolDefinition = {
  id: 'calorie-calculator',
  slug: 'calculadora-calorias',
  name: 'Calculadora de Calorías',
  description: 'Calcula tus calorías diarias necesarias (TDEE) según tu edad, peso, altura y nivel de actividad física.',
  icon: '🔥',
  category: 'health',
  keywords: ['calorías', 'TDEE', 'metabolismo', 'dieta', 'adelgazar', 'peso', 'actividad física', 'kcal diarias'],
  tags: ['salud', 'calorías', 'dieta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
