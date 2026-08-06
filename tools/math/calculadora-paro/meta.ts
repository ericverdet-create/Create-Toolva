import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraParoTool: ToolDefinition = {
  id: 'calculadora-paro',
  slug: 'calculadora-prestacion-desempleo',
  name: 'Calculadora Prestación por Desempleo',
  description: 'Calcula cuánto cobras de paro en España según tus bases de cotización y el tiempo cotizado. Conoce tu prestación contributiva mensual, duración y cuantía máxima y mínima 2026.',
  icon: '📋',
  category: 'math',
  keywords: ['cuanto cobro de paro', 'calculadora paro 2026', 'prestacion desempleo calculadora', 'cuanto tiempo cobro el paro', 'base reguladora paro calculadora', 'calcular subsidio desempleo'],
  tags: ['paro', 'desempleo', 'prestación', 'SEPE'],
  faq: [
    { question: '¿Cuánto cobro de paro?', answer: 'La prestación por desempleo es el 70% de tu base reguladora los primeros 180 días, y el 50% a partir del día 181. La base reguladora es la media de tus bases de cotización por contingencias profesionales de los últimos 180 días trabajados.' },
    { question: '¿Cuánto tiempo puedo cobrar el paro?', answer: 'El tiempo de prestación depende de cuánto hayas cotizado: con 360-539 días cotizados cobras 4 meses, aumentando progresivamente hasta un máximo de 2 años (720 días) si has cotizado más de 2.160 días.' },
    { question: '¿Cuál es la cuantía máxima y mínima del paro en 2026?', answer: 'En 2026, la cuantía máxima es de 1.570€/mes (sin hijos). La cuantía mínima es de 560€/mes (sin hijos) o 749€/mes (con hijos). Estas cuantías se actualizan anualmente con el IPREM.' },
    { question: '¿Qué es la base reguladora del paro?', answer: 'Es la media de tus bases de cotización por contingencias profesionales de los últimos 180 días cotizados. Es la cifra sobre la que se calcula el porcentaje de tu prestación (70% los primeros 6 meses, 50% después).' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
