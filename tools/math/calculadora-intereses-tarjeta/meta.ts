import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraInteresTarjetaTool: ToolDefinition = {
  id: 'calculadora-intereses-tarjeta', slug: 'calculadora-intereses-tarjeta',
  name: 'Calculadora de Intereses de Tarjeta de Crédito',
  description: 'Calcula cuánto pagarás en intereses por tu tarjeta de crédito y cuánto tiempo tardarás en saldar la deuda. Compara pagos mínimos vs cuotas fijas.',
  icon: '💳', category: 'math',
  keywords: ['calculadora intereses tarjeta credito', 'cuanto pago de intereses tarjeta', 'deuda tarjeta credito', 'pago minimo tarjeta', 'calculadora deuda tarjeta'],
  tags: ['tarjeta', 'crédito', 'intereses', 'deuda'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
