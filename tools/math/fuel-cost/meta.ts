import { ToolDefinition } from '@/lib/tools/registry';

export const fuelCostTool: ToolDefinition = {
  id: 'fuel-cost',
  slug: 'coste-viaje-combustible',
  name: 'Coste de Viaje en Combustible',
  description: 'Calcula el coste total en combustible de un viaje según la distancia, consumo del vehículo y precio del combustible.',
  icon: '⛽',
  category: 'math',
  keywords: ['coste viaje gasolina', 'calculadora gasolina viaje', 'consumo combustible viaje', 'precio gasolina trayecto', 'gastos viaje coche'],
  tags: ['viaje', 'gasolina', 'combustible', 'coche'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
