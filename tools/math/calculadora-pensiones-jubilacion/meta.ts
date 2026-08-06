import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraPensionesJubilacionTool: ToolDefinition = {
  id: 'calculadora-pensiones-jubilacion', slug: 'calculadora-pension-jubilacion-espana',
  name: 'Calculadora Pensión de Jubilación',
  description: 'Estima tu pensión de jubilación en España según tus años cotizados, base reguladora y edad. Calcula cuánto cobrarás al jubilarte con el sistema de la Seguridad Social española.',
  icon: '🧓', category: 'math',
  keywords: ['calculadora pension jubilacion espana', 'cuanto cobro de pension', 'calcular pension jubilacion', 'pension seguridad social calculadora', 'cuanto me corresponde de pension'],
  tags: ['pensión', 'jubilación', 'Seguridad Social', 'España'],
  faq: [
    { question: '¿Cuántos años hay que cotizar para cobrar la pensión máxima en España?', answer: 'Para cobrar el 100% de la base reguladora necesitas haber cotizado al menos 37 años en 2026 (el periodo se amplía gradualmente hasta los 38,5 años en 2027). Con menos años cotizados cobras un porcentaje menor: con 15 años cotizados (el mínimo) cobras el 50%.' },
    { question: '¿Cuál es la pensión máxima y mínima en España en 2026?', answer: 'La pensión máxima del sistema público español en 2026 es de aproximadamente 3.267€/mes (14 pagas). La pensión mínima garantizada varía según la situación personal: unos 780€/mes para jubilados con cónyuge, y unos 950€/mes para jubilados sin cónyuge a cargo.' },
    { question: '¿Cómo se calcula la base reguladora de la pensión?', answer: 'La base reguladora se calcula con los últimos 25 años cotizados (300 meses). Se suman las bases de cotización de esos 300 meses, actualizadas por inflación (excepto las de los últimos 2 años), y se divide entre 350. El resultado es la base reguladora mensual.' },
    { question: '¿A qué edad me puedo jubilar en España en 2026?', answer: 'La edad ordinaria de jubilación en 2026 es de 66 años y 8 meses para quienes hayan cotizado menos de 38 años. Si tienes 38 años o más de cotización, puedes jubilarte a los 65 años. La jubilación anticipada es posible desde 2-4 años antes, con penalización en la cuantía.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
