import { ToolDefinition } from '@/lib/tools/registry';

export const cementCalculatorTool: ToolDefinition = {
  id: 'cement-calculator',
  slug: 'calculadora-cemento',
  name: 'Calculadora de Cemento y Hormigón',
  description: 'Calcula la cantidad de cemento, arena, grava y agua necesaria para preparar hormigón o mortero según el volumen de obra.',
  icon: '🏗️',
  category: 'math',
  keywords: ['calculadora cemento', 'cuánto cemento necesito', 'hormigón cantidad', 'mortero cemento arena', 'sacos de cemento', 'mezcla hormigón'],
  tags: ['cemento', 'construcción', 'hormigón'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
