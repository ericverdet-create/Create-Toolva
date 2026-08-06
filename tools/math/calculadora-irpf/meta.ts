import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraIrpfTool: ToolDefinition = {
  id: 'calculadora-irpf', slug: 'calculadora-irpf-espana',
  name: 'Calculadora IRPF España',
  description: 'Calcula el IRPF de tu salario en España: tramos impositivos, cuota íntegra, retención estimada y sueldo neto resultante. Actualizado con los tramos vigentes.',
  icon: '🧾', category: 'math',
  keywords: ['calculadora irpf españa', 'cuanto irpf pago por mi sueldo', 'tramos irpf calculadora', 'calcular retencion irpf nomina', 'impuesto renta calculadora'],
  tags: ['IRPF', 'impuestos', 'renta', 'retención'],
  faq: [
    { question: '¿Cuánto IRPF me descuentan de la nómina?', answer: 'La retención de IRPF depende de tu salario bruto anual, situación familiar y deducciones. Para un sueldo de 25.000€ brutos sin hijos, la retención suele estar entre el 15% y el 18%. Esta calculadora te da el dato exacto.' },
    { question: '¿Cuáles son los tramos del IRPF en España en 2026?', answer: 'Los tramos estatales son: hasta 12.450€ al 19%, de 12.450€ a 20.200€ al 24%, de 20.200€ a 35.200€ al 30%, de 35.200€ a 60.000€ al 37%, de 60.000€ a 300.000€ al 45%, y más de 300.000€ al 47%. A estos se suman los tramos autonómicos.' },
    { question: '¿Qué diferencia hay entre IRPF y retención?', answer: 'La retención es un anticipo del IRPF que te descuenta la empresa en cada nómina. El IRPF real se calcula en la declaración de la renta anual. Si la retención fue mayor que tu IRPF real, Hacienda te devuelve la diferencia.' },
    { question: '¿Cómo puedo pagar menos IRPF legalmente?', answer: 'Puedes reducir tu base imponible aportando a planes de pensiones (hasta 1.500€/año), deduciendo gastos de trabajo, aplicando la deducción por vivienda habitual si compraste antes de 2013, o tributando en reducción por rendimientos irregulares.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
