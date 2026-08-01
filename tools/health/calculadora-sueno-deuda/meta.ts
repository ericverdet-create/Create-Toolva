import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraSuenoDeudaTool: ToolDefinition = {
  id: 'calculadora-sueno-deuda', slug: 'calculadora-deuda-sueno',
  name: 'Calculadora de Deuda de Sueño',
  description: 'Calcula tu déficit o deuda de sueño acumulada. Descubre cuántas horas de sueño te faltan según tu edad y hábitos. Obtén recomendaciones para recuperar un sueño saludable.',
  icon: '😴', category: 'health',
  keywords: ['deuda de sueño calculadora', 'cuantas horas dormir', 'deficit sueño calcular', 'calculadora horas sueño', 'horas dormir por edad'],
  tags: ['sueño', 'salud', 'descanso', 'bienestar'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
