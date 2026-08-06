import { ToolDefinition } from '@/lib/tools/registry';

export const netSalaryTool: ToolDefinition = {
  id: 'net-salary',
  slug: 'calculadora-sueldo-neto',
  name: 'Calculadora de Sueldo Neto',
  description: 'Calcula tu sueldo neto en España a partir del bruto anual. Incluye IRPF, cotizaciones a la Seguridad Social y neto mensual.',
  icon: '💰',
  category: 'math',
  keywords: ['sueldo neto', 'salario neto bruto', 'calculadora irpf', 'cuánto cobro neto', 'sueldo neto españa 2024'],
  tags: ['sueldo', 'IRPF', 'neto'],
  faq: [
    { question: '¿Cuánto me queda neto de un sueldo de 25.000€ brutos?', answer: 'Con 25.000€ brutos anuales, sin hijos y en Madrid, el sueldo neto aproximado es de unos 19.500–20.000€ al año, unos 1.625–1.667€ netos al mes en 12 pagas. La retención de IRPF es de alrededor del 15%.' },
    { question: '¿Qué descuentos se aplican a la nómina en España?', answer: 'De tu sueldo bruto se descuentan: cotización a la Seguridad Social (6,35% del empleado: 4,7% contingencias comunes + 1,55% desempleo + 0,1% formación) y la retención de IRPF, que varía según el sueldo y situación personal.' },
    { question: '¿Cómo puedo calcular mi sueldo neto mensual?', answer: 'Toma tu salario bruto anual, resta las cotizaciones a la Seguridad Social (aprox. 6,35%) y después aplica la retención de IRPF correspondiente a tu tramo. El resultado dividido entre 12 es tu neto mensual. Esta calculadora lo hace automáticamente.' },
    { question: '¿Qué diferencia hay entre sueldo bruto y neto?', answer: 'El sueldo bruto es el acordado en contrato antes de deducciones. El sueldo neto es lo que recibes en cuenta, tras descontar IRPF y cotizaciones a la Seguridad Social. La diferencia puede ser del 20-35% según el salario.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
