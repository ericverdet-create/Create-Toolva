import { ToolDefinition } from '@/lib/tools/registry';
export const consumoElectricoAparatosTool: ToolDefinition = {
  id: 'consumo-electrico-aparatos', slug: 'cuanto-consume-mi-electrodomestico',
  name: 'Consumo Eléctrico de Electrodomésticos',
  description: 'Calcula cuánto gasta en electricidad tu nevera, lavadora, televisión, aire acondicionado o cualquier aparato. Coste diario, mensual y anual en euros.',
  icon: '⚡', category: 'math',
  keywords: ['cuanto consume mi nevera calculadora', 'consumo electrico electrodomesticos', 'gasto electricidad aparatos hogar', 'calcular factura luz electrodomesticos', 'coste electrico mensual calculadora'],
  tags: ['electricidad', 'electrodomésticos', 'ahorro', 'factura'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
