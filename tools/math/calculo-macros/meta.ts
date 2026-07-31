import { ToolDefinition } from '@/lib/tools/registry';
export const calculoMacrosTool: ToolDefinition = {
  id: 'calculo-macros', slug: 'calculadora-macros',
  name: 'Calculadora de Macros',
  description: 'Calcula tus macronutrientes diarios (proteínas, carbohidratos y grasas) en gramos según tus calorías objetivo y distribución por meta: perder peso, ganar músculo o mantenimiento.',
  icon: '🥗', category: 'health',
  keywords: ['calculadora macros', 'macronutrientes diarios', 'gramos proteínas carbohidratos grasas', 'distribución macros dieta', 'macros para perder peso'],
  tags: ['macros', 'dieta', 'nutrición', 'calorías'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
