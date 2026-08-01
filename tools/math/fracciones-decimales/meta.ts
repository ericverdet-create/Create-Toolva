import { ToolDefinition } from '@/lib/tools/registry';
export const fraccionesDecimalesTool: ToolDefinition = {
  id: 'fracciones-decimales', slug: 'conversor-fracciones-decimales',
  name: 'Conversor Fracciones y Decimales',
  description: 'Convierte fracciones a decimales y decimales a fracciones al instante. Simplifica fracciones, opera con ellas y obtén representaciones exactas. Ideal para matemáticas y cocina.',
  icon: '½', category: 'math',
  keywords: ['convertir fraccion a decimal', 'fraccion a decimal calculadora', 'simplificar fracciones', 'decimal a fraccion', 'calculadora fracciones online'],
  tags: ['fracciones', 'decimales', 'matemáticas', 'conversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
