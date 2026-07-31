import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraHidratacionTool: ToolDefinition = {
  id: 'calculadora-hidratacion', slug: 'cuanta-agua-beber-al-dia',
  name: '¿Cuánta Agua Beber al Día?',
  description: 'Calcula tu ingesta diaria de agua recomendada según peso, actividad física, temperatura y si estás embarazada o dando el pecho. Con equivalencias en vasos y botellas.',
  icon: '💧', category: 'health',
  keywords: ['cuanta agua beber al dia calculadora', 'litros agua diarios recomendados', 'hidratacion diaria calculadora', 'agua segun peso calculadora', 'ingesta agua recomendada'],
  tags: ['agua', 'hidratación', 'salud', 'dieta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
