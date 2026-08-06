import { ToolDefinition } from '@/lib/tools/registry';
export const cuotaPrestamoPersonalTool: ToolDefinition = {
  id: 'cuota-prestamo-personal', slug: 'cuota-prestamo-personal',
  name: 'Calculadora de Préstamo Personal',
  description: 'Calcula la cuota mensual de un préstamo personal, total a pagar, intereses y tabla de amortización completa. Compara diferentes plazos al instante.',
  icon: '💳', category: 'math',
  keywords: ['cuota prestamo personal calculadora', 'cuanto pago al mes por un prestamo', 'simulador prestamo personal', 'calcular prestamo banco', 'cuota mensual prestamo'],
  tags: ['préstamo', 'cuota', 'banco', 'financiero'],
  faq: [
    { question: '¿Cómo se calcula la cuota mensual de un préstamo personal?', answer: 'La cuota se calcula con la fórmula de anualidades: C = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el capital, r el tipo de interés mensual y n el número de cuotas. Esta calculadora lo hace automáticamente.' },
    { question: '¿Qué diferencia hay entre TIN y TAE en un préstamo?', answer: 'El TIN (Tipo de Interés Nominal) es el interés puro del préstamo. La TAE (Tasa Anual Equivalente) incluye además las comisiones y gastos, por lo que es el dato real de coste que debes comparar entre entidades.' },
    { question: '¿Cuánto me cuesta un préstamo de 10.000€?', answer: 'Depende del plazo y el tipo de interés. Con un TIN del 8% a 36 meses, la cuota sería de unos 313€/mes y pagarías unos 1.270€ en intereses. Usa esta calculadora para ajustar los valores a tu caso.' },
    { question: '¿Es mejor pedir un préstamo a más plazo o a menos?', answer: 'A más plazo, la cuota mensual es menor pero pagas más intereses en total. A menos plazo, pagas menos intereses pero la cuota es mayor. Depende de tu capacidad de pago mensual.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
