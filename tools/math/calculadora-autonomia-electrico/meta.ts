import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraAutonomiaElectricoTool: ToolDefinition = {
  id: 'calculadora-autonomia-electrico', slug: 'calculadora-autonomia-electrico',
  name: 'Calculadora Autonomía Coche Eléctrico',
  description: 'Calcula la autonomía real de tu coche eléctrico según la batería, consumo y temperatura. Estima el tiempo de carga y el coste por kilómetro.',
  icon: '⚡', category: 'math',
  keywords: ['autonomia coche electrico', 'calculadora autonomia electrico', 'rango bateria electrico', 'consumo coche electrico', 'tiempo carga electrico', 'coste km electrico'],
  tags: ['eléctrico', 'batería', 'autonomía', 'EV'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
