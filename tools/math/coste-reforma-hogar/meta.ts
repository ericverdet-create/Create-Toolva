import { ToolDefinition } from '@/lib/tools/registry';
export const costeReformaHogarTool: ToolDefinition = {
  id: 'coste-reforma-hogar', slug: 'calculadora-coste-reforma-hogar',
  name: 'Calculadora de Coste de Reforma',
  description: 'Estima el coste de la reforma de tu hogar: cocina, baño, suelos, pintura, electricidad y más. Obtén un presupuesto aproximado por habitación o para toda la vivienda.',
  icon: '🏠', category: 'math',
  keywords: ['calculadora reforma hogar', 'cuanto cuesta reformar piso', 'presupuesto reforma cocina', 'coste reforma baño', 'precio reforma vivienda'],
  tags: ['hogar', 'reforma', 'presupuesto', 'construcción'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
