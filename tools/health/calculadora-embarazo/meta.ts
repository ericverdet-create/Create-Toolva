import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraEmbarazoTool: ToolDefinition = {
  id: 'calculadora-embarazo', slug: 'fecha-probable-parto',
  name: 'Fecha Probable de Parto',
  description: 'Calcula la fecha probable de parto y las semanas de gestación a partir de la fecha de tu última regla o de la fecha de concepción. Incluye trimestres y hitos del embarazo.',
  icon: '🤱', category: 'health',
  keywords: ['fecha probable parto calculadora', 'cuantas semanas de embarazo tengo', 'calculadora semanas gestacion', 'fecha parto por fecha ultima regla', 'calculadora embarazo online'],
  tags: ['embarazo', 'parto', 'gestación', 'semanas'],
  faq: [
    { question: '¿Cómo se calcula la fecha probable de parto?', answer: 'Se suman 280 días (40 semanas) a la fecha de la última regla. También se puede usar la regla de Naegele: al primer día de la última regla se le añaden 7 días y se restan 3 meses. El margen normal es ±2 semanas alrededor de esa fecha.' },
    { question: '¿Cuándo empieza a contar el embarazo?', answer: 'El embarazo se cuenta desde el primer día de la última regla, aunque la fecundación ocurra aproximadamente 2 semanas después. Por eso, cuando el médico dice "6 semanas de embarazo", el bebé tiene en realidad unas 4 semanas desde la concepción.' },
    { question: '¿Cuáles son los trimestres del embarazo?', answer: 'El primer trimestre va de la semana 1 a la 12, el segundo de la semana 13 a la 27, y el tercer trimestre de la semana 28 hasta el parto (semana 40 aprox.). Cada trimestre tiene controles y ecografías específicas.' },
    { question: '¿Qué pasa si el bebé no nace en la fecha probable de parto?', answer: 'Es completamente normal. Solo un 5% de los bebés nacen exactamente en la fecha calculada. El parto se considera a término entre las semanas 37 y 42. Si supera las 42 semanas, el médico valorará inducir el parto.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
