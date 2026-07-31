import { ToolDefinition } from '@/lib/tools/registry';
export const cicloMenstrualTool: ToolDefinition = {
  id: 'ciclo-menstrual', slug: 'calculadora-ciclo-menstrual',
  name: 'Calculadora Ciclo Menstrual',
  description: 'Predice tus próximas reglas, días fértiles y ovulación según la duración de tu ciclo. Muestra los próximos 3 ciclos con calendario detallado.',
  icon: '🌸', category: 'health',
  keywords: ['calculadora ciclo menstrual', 'cuándo me viene la regla', 'días fértiles calculadora', 'próxima menstruación', 'ovulación calculadora'],
  tags: ['ciclo', 'menstruación', 'fertilidad', 'mujer'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
