import { ToolDefinition } from '@/lib/tools/registry';

export const finiquitoCalculatorTool: ToolDefinition = {
  id: 'finiquito-calculator',
  slug: 'calculadora-finiquito',
  name: 'Calculadora de Finiquito',
  description: 'Calcula tu finiquito en España: indemnización por despido, vacaciones pendientes y pagas extra proporcionales.',
  icon: '📋',
  category: 'math',
  keywords: ['finiquito', 'despido', 'indemnización', 'calculadora finiquito', 'liquidación laboral', 'vacaciones pendientes'],
  tags: ['laboral', 'finiquito', 'españa'],
  faq: [
    { question: '¿Qué incluye el finiquito cuando te despiden?', answer: 'El finiquito siempre incluye el salario de los días trabajados y no cobrados, las vacaciones no disfrutadas del año en curso y la parte proporcional de las pagas extra. La indemnización por despido se añade según el tipo de extinción del contrato.' },
    { question: '¿Cuánto es la indemnización por despido improcedente en 2026?', answer: 'La indemnización por despido improcedente es de 33 días de salario por año trabajado, con un máximo de 24 mensualidades. Para contratos anteriores a 2012, los años previos se calculan a 45 días/año hasta un máximo de 42 mensualidades.' },
    { question: '¿Tengo que pagar IRPF por la indemnización del despido?', answer: 'La indemnización obligatoria por despido improcedente está exenta de IRPF hasta el límite legal (33 días × años × salario diario, máximo 180.000€). La parte que supere ese límite, o la indemnización pactada voluntariamente que supere el mínimo legal, sí tributa.' },
    { question: '¿Puedo negarme a firmar el finiquito?', answer: 'Sí. Tienes derecho a no firmar el finiquito o a firmarlo con la nota "no conforme" si no estás de acuerdo con las cantidades. Tienes 60 días hábiles para impugnar el despido ante el juzgado de lo social y 1 año para reclamar cantidades del finiquito.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
