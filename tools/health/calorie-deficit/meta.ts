import { ToolDefinition } from '@/lib/tools/registry';

export const calorieDeficitTool: ToolDefinition = {
  id: 'calorie-deficit',
  slug: 'calculadora-deficit-calorico',
  name: 'Calculadora de Déficit Calórico',
  description: 'Calcula tu déficit calórico para perder peso de forma saludable. Obtén las calorías diarias según tu objetivo.',
  icon: '🥗',
  category: 'health',
  keywords: ['déficit calórico', 'calculadora déficit calorico', 'calorías para adelgazar', 'cuántas calorías necesito', 'perder peso calorías'],
  tags: ['dieta', 'adelgazar', 'calorías'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
