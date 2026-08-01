import { ToolDefinition } from '@/lib/tools/registry';
export const riesgoCardiovascularTool: ToolDefinition = {
  id: 'calculadora-riesgo-cardiovascular', slug: 'calculadora-riesgo-cardiovascular',
  name: 'Calculadora Riesgo Cardiovascular',
  description: 'Evalúa tu riesgo cardiovascular a 10 años según edad, tensión arterial, colesterol, tabaco y diabetes. Basado en la escala SCORE de la Sociedad Europea de Cardiología.',
  icon: '❤️', category: 'health',
  keywords: ['riesgo cardiovascular calculadora', 'calculo riesgo infarto', 'escala SCORE riesgo cardiovascular', 'riesgo cardio vascular online', 'calculo riesgo cardiaco'],
  tags: ['corazón', 'cardiovascular', 'salud', 'riesgo'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
