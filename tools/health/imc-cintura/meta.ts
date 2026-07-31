import { ToolDefinition } from '@/lib/tools/registry';

export const imcCinturaTool: ToolDefinition = {
  id: 'imc-cintura',
  slug: 'riesgo-cardiovascular-cintura',
  name: 'Riesgo Cardiovascular por Cintura',
  description: 'Calcula tu riesgo cardiovascular mediante el índice cintura-cadera (ICC) y la relación cintura-altura. Más preciso que el IMC para detectar obesidad abdominal.',
  icon: '❤️',
  category: 'health',
  keywords: ['índice cintura cadera', 'riesgo cardiovascular', 'obesidad abdominal', 'perímetro cintura', 'cintura altura ratio'],
  tags: ['cintura', 'cardiovascular', 'salud', 'obesidad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
