import { ToolDefinition } from '@/lib/tools/registry';

export const precioM2Tool: ToolDefinition = {
  id: 'precio-m2',
  slug: 'calculadora-precio-m2',
  name: 'Calculadora de Precio por Metro Cuadrado',
  description: 'Calcula el precio por metro cuadrado de una vivienda o local. Compara propiedades y calcula el precio total a partir del precio/m².',
  icon: '🏘️',
  category: 'math',
  keywords: ['precio metro cuadrado', 'calculadora precio m2', 'cuánto vale el metro cuadrado', 'precio vivienda m2', 'comparar pisos precio'],
  tags: ['inmobiliario', 'vivienda', 'metro cuadrado'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
