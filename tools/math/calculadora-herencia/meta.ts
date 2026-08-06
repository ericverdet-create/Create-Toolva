import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraHerenciaTool: ToolDefinition = {
  id: 'calculadora-herencia',
  slug: 'calculadora-impuesto-sucesiones-herencia',
  name: 'Calculadora Impuesto de Sucesiones y Herencias',
  description: 'Estima el impuesto de sucesiones a pagar por una herencia en España. Calcula la cuota tributaria según el parentesco, la comunidad autónoma y el valor de los bienes heredados.',
  icon: '⚖️',
  category: 'math',
  keywords: ['calculadora impuesto sucesiones herencia españa', 'cuanto se paga por una herencia en españa', 'impuesto herencia por comunidad autonoma', 'calcular herencia españa 2026', 'impuesto sucesiones entre hermanos', 'herencia hijos cuanto pagan'],
  tags: ['herencia', 'sucesiones', 'impuesto', 'patrimonio'],
  faq: [
    { question: '¿Cuánto se paga de impuesto de herencias en España?', answer: 'El impuesto de sucesiones varía enormemente según la comunidad autónoma. Madrid, Andalucía, Canarias o Extremadura tienen bonificaciones del 99% para hijos y cónyuge. Otras como Aragón o Baleares tienen tipos más altos. En algunos casos el impuesto puede ser casi 0€; en otros puede superar el 30% de la herencia.' },
    { question: '¿Quién paga más impuesto de herencias: hijos o hermanos?', answer: 'Cuanto más lejano es el parentesco, más impuesto se paga. Los hijos (Grupo II) tienen las reducciones más altas. Los hermanos y tíos (Grupo III) pagan más y tienen menos reducciones. Los primos y extraños (Grupo IV) pagan el tipo más alto, sin apenas reducciones.' },
    { question: '¿Hay que pagar siempre el impuesto de herencias?', answer: 'No siempre. Muchas comunidades autónomas tienen bonificaciones del 99% para los herederos directos (hijos, cónyuge). Además, existen reducciones por el tipo de bien heredado, la edad del heredero y el grado de parentesco. En Madrid y Andalucía, heredar entre padre e hijo puede ser prácticamente gratis.' },
    { question: '¿Cuándo hay que pagar el impuesto de herencias?', answer: 'El plazo general es de 6 meses desde el fallecimiento del causante. Se puede solicitar una prórroga de otros 6 meses. El impuesto se paga en la comunidad autónoma donde residía el fallecido, no donde vive el heredero.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
