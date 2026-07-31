import { ToolDefinition } from '@/lib/tools/registry';
export const areaFigurasTool: ToolDefinition = {
  id: 'area-figuras', slug: 'calculadora-area-figuras',
  name: 'Calculadora de Áreas',
  description: 'Calcula el área y perímetro de figuras geométricas: cuadrado, rectángulo, círculo, triángulo, trapecio, rombo, elipse y más. Con fórmulas explicadas.',
  icon: '📐', category: 'math',
  keywords: ['calculadora área figuras geométricas', 'área círculo calculadora', 'área rectángulo', 'perímetro figuras', 'fórmulas área geometría'],
  tags: ['área', 'geometría', 'figuras', 'perímetro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
