import { ToolDefinition } from '@/lib/tools/registry';
export const caloriasEjercicioTool: ToolDefinition = {
  id: 'calorias-ejercicio', slug: 'cuantas-calorias-quemo-haciendo-ejercicio',
  name: 'Calorías Quemadas por Ejercicio',
  description: 'Calcula cuántas calorías quemas corriendo, en bicicleta, nadando, caminando o en el gimnasio. Solo necesitas tu peso y el tiempo de actividad.',
  icon: '🔥', category: 'health',
  keywords: ['cuantas calorias quemo corriendo calculadora', 'calorias quemadas ejercicio', 'calorias bicicleta calculadora', 'quemar calorias calculadora', 'calorias andando calculadora'],
  tags: ['calorías', 'ejercicio', 'running', 'fitness'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
