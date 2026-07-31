import { ToolDefinition } from '@/lib/tools/registry';

export const reverseVatTool: ToolDefinition = {
  id: 'reverse-vat',
  slug: 'calculadora-iva-inverso',
  name: 'IVA Inverso',
  description: 'Calcula la base imponible a partir del precio total con IVA incluido. Extrae el IVA de cualquier importe.',
  icon: '🧾',
  category: 'tax',
  keywords: ['iva inverso', 'base imponible', 'extraer iva', 'precio sin iva', 'calcular base imponible', 'desglosar iva'],
  tags: ['iva', 'impuesto', 'factura'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
