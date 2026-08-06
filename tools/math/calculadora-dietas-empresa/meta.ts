import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraDietasEmpresaTool: ToolDefinition = {
  id: 'calculadora-dietas-empresa',
  slug: 'calculadora-dietas-empresa',
  name: 'Calculadora Dietas y Gastos de Empresa',
  description: 'Calcula las dietas exentas de IRPF en España según la normativa 2026. Manutención en España y el extranjero, pernocta, y gastos de locomoción. Imprescindible para trabajadores desplazados y autónomos.',
  icon: '🍽️',
  category: 'math',
  keywords: ['dietas empresa exentas irpf 2026', 'calculadora dietas trabajo', 'cuanto es la dieta por dia trabajo', 'dietas manutención hacienda', 'gastos dieta trabajador desplazado', 'dieta pernocta españa'],
  tags: ['dietas', 'IRPF', 'empresa', 'desplazamiento', 'autónomo'],
  faq: [
    { question: '¿Cuánto es la dieta diaria exenta de IRPF en España en 2026?', answer: 'En 2026, la dieta de manutención exenta de IRPF es de 26,67€/día por desplazamiento en España sin pernoctar. Si hay pernoctación, sube a 53,34€/día en España. En el extranjero: 48,08€/día sin pernocta y 91,35€/día con pernocta.' },
    { question: '¿Las dietas de empresa tributan en el IRPF?', answer: 'Solo tributan si superan los límites legales. Lo que está por debajo de los límites de Hacienda está exento de IRPF y de cotización a la Seguridad Social. Lo que supere esos límites sí se considera rendimiento del trabajo y tributa normalmente.' },
    { question: '¿Qué diferencia hay entre dieta con pernocta y sin pernocta?', answer: 'La dieta sin pernocta cubre los gastos de comida cuando el trabajador vuelve el mismo día. La dieta con pernocta es mayor porque cubre también el alojamiento. Hacienda establece importes diferentes para cada caso.' },
    { question: '¿Un autónomo puede deducirse las dietas?', answer: 'Los autónomos pueden deducirse gastos de manutención de hasta 26,67€/día en España y 48,08€ en el extranjero, siempre que estén relacionados con la actividad y se realicen en establecimientos de hostelería pagando por medios electrónicos.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
