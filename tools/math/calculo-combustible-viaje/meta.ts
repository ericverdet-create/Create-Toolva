import { ToolDefinition } from '@/lib/tools/registry';
export const combustibleViajeTool: ToolDefinition = {
  id: 'calculo-combustible-viaje', slug: 'cuanto-cuesta-viaje-en-coche',
  name: 'Coste de Viaje en Coche',
  description: 'Calcula cuánto cuesta un viaje en coche: combustible necesario, precio total, coste por persona y comparativa entre gasolina y diésel. Solo introduce los kilómetros.',
  icon: '🚗', category: 'math',
  keywords: ['cuanto cuesta viaje en coche calculadora', 'calcular gasolina viaje', 'coste combustible trayecto', 'gasolina litros viaje', 'precio viaje coche calculadora'],
  tags: ['viaje', 'coche', 'gasolina', 'combustible'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
