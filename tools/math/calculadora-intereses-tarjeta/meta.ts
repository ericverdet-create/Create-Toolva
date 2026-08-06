import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraInteresTarjetaTool: ToolDefinition = {
  id: 'calculadora-intereses-tarjeta', slug: 'calculadora-intereses-tarjeta',
  name: 'Calculadora de Intereses de Tarjeta de Crédito',
  description: 'Calcula cuánto pagarás en intereses por tu tarjeta de crédito y cuánto tiempo tardarás en saldar la deuda. Compara pagos mínimos vs cuotas fijas.',
  icon: '💳', category: 'math',
  keywords: ['calculadora intereses tarjeta credito', 'cuanto pago de intereses tarjeta', 'deuda tarjeta credito', 'pago minimo tarjeta', 'calculadora deuda tarjeta'],
  tags: ['tarjeta', 'crédito', 'intereses', 'deuda'],
  faq: [
    { question: '¿Cuánto se paga de intereses por una deuda de tarjeta de crédito?', answer: 'Depende del tipo de interés de la tarjeta (TAE) y del sistema de pago. Con una TAE del 25% y una deuda de 3.000€ pagando solo el mínimo mensual, podrías tardar más de 10 años en saldarla y pagar más de 2.500€ solo en intereses. Pagando una cuota fija mayor, el tiempo y los intereses se reducen drásticamente.' },
    { question: '¿Qué es el pago mínimo de una tarjeta de crédito?', answer: 'El pago mínimo es la cantidad mínima que debes pagar cada mes para mantener la tarjeta al día. Suele ser el mayor entre: un porcentaje de la deuda (2-3%), una cantidad fija mínima (entre 10-25€), o el total si la deuda es muy pequeña. Pagar solo el mínimo maximiza los intereses que paga el banco.' },
    { question: '¿Cuál es el tipo de interés normal de una tarjeta de crédito en España?', answer: 'Las tarjetas de crédito en España tienen TAEs que van del 18% al 30% en tarjetas estándar, y pueden superar el 25-26% en tarjetas revolving. El Tribunal Supremo ha anulado tipos de usura en tarjetas revolving superiores al doble del interés normal del dinero.' },
    { question: '¿Qué es una tarjeta revolving y por qué es cara?', answer: 'Una tarjeta revolving es aquella en la que la deuda se renueva continuamente y pagas una cuota fija mensual baja. El problema es que al pagar poco, el capital apenas baja y los intereses siguen acumulándose. Son las tarjetas más caras del mercado y las que más han sido cuestionadas por los tribunales.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
