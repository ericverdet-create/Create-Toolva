import { ToolDefinition } from '@/lib/tools/registry';

export const plusvaliaMunicipalTool: ToolDefinition = {
  id: 'plusvalia-municipal',
  slug: 'plusvalia-municipal',
  name: 'Calculadora de Plusvalía Municipal',
  description: 'Calcula el Impuesto sobre el Incremento del Valor de los Terrenos de Naturaleza Urbana (IIVTNU) al vender o heredar un inmueble.',
  icon: '🏠',
  category: 'math',
  keywords: ['plusvalía municipal', 'calculadora plusvalía', 'impuesto plusvalía', 'IIVTNU', 'venta inmueble impuesto', 'plusvalía herencia'],
  tags: ['plusvalía', 'impuesto', 'inmueble', 'venta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
