import { ToolDefinition } from '@/lib/tools/registry';

export const calorieFoodsTool: ToolDefinition = {
  id: 'calorie-foods',
  slug: 'calorias-alimentos',
  name: 'Calorías de los Alimentos',
  description: 'Consulta las calorías, proteínas, carbohidratos y grasas de más de 80 alimentos comunes. Calcula el total de tu plato o dieta diaria.',
  icon: '🥗',
  category: 'health',
  keywords: ['calorías alimentos', 'tabla calorías comida', 'cuántas calorías tiene', 'calorías por 100g', 'valor nutricional alimentos'],
  tags: ['calorías', 'nutrición', 'dieta', 'alimentos'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
