import { ToolDefinition } from '@/lib/tools/registry';

export const idealWeightTool: ToolDefinition = {
  id: 'ideal-weight',
  slug: 'peso-ideal',
  name: 'Calculadora de Peso Ideal',
  description: 'Calcula tu peso ideal según tu altura, sexo y complexión usando las fórmulas de Devine, Robinson, Miller y Hamwi.',
  icon: '⚖️',
  category: 'health',
  keywords: ['calculadora peso ideal', 'cuánto debo pesar', 'peso ideal altura', 'peso saludable', 'peso ideal mujer', 'peso ideal hombre'],
  tags: ['peso ideal', 'salud', 'IMC', 'nutrición'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
