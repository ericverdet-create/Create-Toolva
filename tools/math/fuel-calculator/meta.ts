import type { ToolDefinition } from '@/lib/tools/types'
export const fuelCalculatorTool: ToolDefinition = {
  id: 'fuel-calculator', slug: 'calculadora-combustible', name: 'Calculadora de combustible',
  description: 'Calcula el consumo de combustible, litros necesarios, distancia y coste del viaje.',
  icon: '⛽', category: 'math',
  keywords: ['calculadora combustible', 'consumo gasolina', 'litros por 100km', 'coste viaje', 'gasto gasolinera'],
  tags: ['combustible', 'gasolina', 'viaje', 'coche'],
  component: () => import('./component'),
}
