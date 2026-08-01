import { ToolDefinition } from '@/lib/tools/registry';
export const testMemoriaTool: ToolDefinition = {
  id: 'test-memoria', slug: 'test-memoria-numeros-online',
  name: 'Test de Memoria de Números',
  description: 'Pon a prueba tu memoria a corto plazo con este test de secuencias numéricas. Memoriza la secuencia, repítela y descubre tu capacidad de memoria. ¡Bate tu récord!',
  icon: '🧠', category: 'health',
  keywords: ['test de memoria online', 'test memoria numeros', 'ejercicio memoria online', 'memoria a corto plazo test', 'cuantos numeros puedo memorizar'],
  tags: ['memoria', 'test', 'cerebro', 'cognición'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
