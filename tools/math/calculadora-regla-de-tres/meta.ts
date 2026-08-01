import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraRegraTresTool: ToolDefinition = {
  id: 'calculadora-regla-de-tres', slug: 'calculadora-regla-de-tres',
  name: 'Calculadora Regla de Tres',
  description: 'Calcula la regla de tres simple y compuesta, directa e inversa. Ideal para proporciones, escalas, recetas y problemas matemáticos cotidianos.',
  icon: '🔢', category: 'math',
  keywords: ['regla de tres', 'regla de tres simple', 'regla de tres compuesta', 'directa', 'inversa', 'calcular proporción', 'proporcionalidad'],
  tags: ['proporción', 'matemáticas', 'escala', 'receta'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
