import { ToolDefinition } from '@/lib/tools/registry';
export const cambioDivisasTool: ToolDefinition = {
  id: 'cambio-divisas', slug: 'cambio-divisas-calculadora',
  name: 'Cambio de Divisas',
  description: 'Convierte entre las principales divisas del mundo: EUR, USD, GBP, JPY, CHF, CAD, AUD, MXN y más. Referencia rápida de tipos de cambio aproximados.',
  icon: '💱', category: 'converters',
  keywords: ['cambio divisas calculadora', 'convertidor moneda', 'tipo de cambio euro dolar', 'cuanto vale el euro en dolares', 'conversor divisas'],
  tags: ['divisas', 'moneda', 'cambio', 'euro', 'dólar'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
