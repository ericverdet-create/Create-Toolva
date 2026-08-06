import { ToolDefinition } from '@/lib/tools/registry';

export const autonomosCalculatorTool: ToolDefinition = {
  id: 'autonomos-calculator',
  slug: 'calculadora-autonomos',
  name: 'Cuota de Autónomos',
  description: 'Calcula la cuota mensual de la Seguridad Social para autónomos en España según tus ingresos netos reales en 2024.',
  icon: '🧑‍💼',
  category: 'tax',
  keywords: ['cuota autónomos', 'seguridad social autónomos', 'cuota ss autónomo', 'autónomo españa', 'base cotización autónomo'],
  tags: ['autónomos', 'seguridad social', 'españa'],
  faq: [
    { question: '¿Cuánto paga un autónomo a la Seguridad Social en 2026?', answer: 'Desde 2023, la cuota de autónomos depende de los ingresos reales. Los tramos van desde unos 200€/mes (ingresos menores de 670€) hasta unos 590€/mes (ingresos superiores a 6.000€). Los nuevos autónomos que se dan de alta por primera vez pagan una tarifa plana de 80€/mes durante el primer año.' },
    { question: '¿Qué son los rendimientos netos para calcular la cuota de autónomo?', answer: 'Los rendimientos netos son los ingresos de la actividad menos los gastos deducibles, menos una reducción del 7% por gastos de difícil justificación (3% para autónomos societarios). Ese resultado mensual determina el tramo de cotización.' },
    { question: '¿Puedo cambiar de tramo si mis ingresos varían?', answer: 'Sí. Puedes cambiar de tramo de cotización hasta 6 veces al año. Al finalizar el ejercicio, la Seguridad Social regulariza tu cuota en función de los ingresos reales declarados en la renta. Si cotizaste de más, te devuelven; si cotizaste de menos, pagas la diferencia.' },
    { question: '¿La tarifa plana de 80€ sigue existiendo en 2026?', answer: 'Sí. Los autónomos que se dan de alta por primera vez (o que lleven más de 2 años sin cotizar) pueden acogerse a la tarifa plana de 80€/mes durante el primer año. En el segundo año, si los rendimientos no superan el SMI, pueden seguir con una cuota reducida.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
