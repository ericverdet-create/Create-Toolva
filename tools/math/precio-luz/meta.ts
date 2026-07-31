import { ToolDefinition } from '@/lib/tools/registry';

export const precioLuzTool: ToolDefinition = {
  id: 'precio-luz',
  slug: 'calculadora-precio-luz',
  name: 'Calculadora Precio de la Luz',
  description: 'Calcula el coste real de tus electrodomésticos y aparatos eléctricos. Introduce vatios y horas de uso y obtén el gasto diario, mensual y anual en euros.',
  icon: '💡',
  category: 'math',
  keywords: ['precio luz electrodomésticos', 'cuánto consume nevera luz', 'coste electricidad aparato', 'gasto luz mensual', 'vatios a euros'],
  tags: ['luz', 'electricidad', 'electrodomésticos', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
