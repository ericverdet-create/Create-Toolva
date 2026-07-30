import { ToolDefinition } from '@/lib/tools/registry';

export const bmrCalculatorTool: ToolDefinition = {
  id: 'bmr-calculator',
  slug: 'calculadora-calorias-basales',
  name: 'Calculadora Calorías Basales',
  description: 'Calcula tu metabolismo basal (BMR) y gasto calórico total diario (TDEE). Usa las fórmulas de Mifflin-St Jeor y Harris-Benedict. Obtén tus calorías para perder o ganar peso.',
  icon: '🔥',
  category: 'health',
  keywords: ['bmr', 'tdee', 'calorias', 'metabolismo', 'dieta', 'peso', 'nutricion', 'harris', 'mifflin'],
  tags: ['salud', 'nutrición', 'dieta'],
  component: () => import('./component'),
};
