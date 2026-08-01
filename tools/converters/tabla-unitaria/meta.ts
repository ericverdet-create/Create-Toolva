import { ToolDefinition } from '@/lib/tools/registry';
export const tablaUnitariaTool: ToolDefinition = {
  id: 'tabla-unitaria', slug: 'tabla-conversion-unidades-completa',
  name: 'Tabla de Conversión de Unidades',
  description: 'Tabla completa de conversión de unidades: longitud, peso, temperatura, área, volumen y velocidad. Referencia rápida con los factores de conversión más usados en el día a día.',
  icon: '📐', category: 'converters',
  keywords: ['tabla conversion unidades', 'tabla unidades medida', 'conversor unidades tabla', 'equivalencias unidades medida', 'tabla conversion completa'],
  tags: ['conversión', 'tabla', 'unidades', 'referencia'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
