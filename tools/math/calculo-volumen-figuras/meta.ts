import { ToolDefinition } from '@/lib/tools/registry';
export const volumenFigurasTool: ToolDefinition = {
  id: 'volumen-figuras', slug: 'calculadora-volumen-figuras',
  name: 'Calculadora de Volúmenes',
  description: 'Calcula el volumen y superficie de cuerpos geométricos: cubo, esfera, cilindro, cono, pirámide y prisma. Con fórmulas y unidades.',
  icon: '📦', category: 'math',
  keywords: ['calculadora volumen figuras', 'volumen esfera calculadora', 'volumen cilindro', 'volumen cubo', 'fórmulas volumen geometría'],
  tags: ['volumen', 'geometría', '3D', 'figuras'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
