import { ToolDefinition } from '@/lib/tools/registry';

export const bmiChildrenTool: ToolDefinition = {
  id: 'bmi-children',
  slug: 'imc-ninos',
  name: 'IMC para Niños y Adolescentes',
  description: 'Calcula el Índice de Masa Corporal (IMC) para niños y adolescentes de 2 a 18 años según percentiles de la OMS.',
  icon: '👶',
  category: 'health',
  keywords: ['imc niños', 'imc infantil', 'peso ideal niño', 'obesidad infantil', 'percentil peso talla niño'],
  tags: ['IMC', 'niños', 'pediatría'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
