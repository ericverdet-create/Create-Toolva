import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraPensionViudedadTool: ToolDefinition = {
  id: 'calculadora-pension-viudedad',
  slug: 'calculadora-pension-viudedad',
  name: 'Calculadora Pensión de Viudedad',
  description: 'Estima la pensión de viudedad en España según la base reguladora del fallecido y el porcentaje aplicable. Incluye los requisitos de acceso y casos especiales 2026.',
  icon: '🕊️',
  category: 'math',
  keywords: ['calculadora pension viudedad', 'cuanto cobra una viuda de pension', 'pension viudedad 2026 cuantia', 'como calcular pension viudedad espana', 'requisitos pension viudedad', 'pension viudedad porcentaje'],
  tags: ['pensión', 'viudedad', 'Seguridad Social', 'fallecimiento'],
  faq: [
    { question: '¿Cuánto es la pensión de viudedad en España en 2026?', answer: 'La pensión de viudedad equivale al 52% de la base reguladora del fallecido en la mayoría de casos. Sube al 70% si el viudo/viuda tiene cargas familiares, tiene más de 65 años y la pensión es su principal ingreso, o si la renta anual no supera 1,5 veces el SMI.' },
    { question: '¿Quién tiene derecho a la pensión de viudedad?', answer: 'Tienen derecho el cónyuge superviviente si estaban casados, y también las parejas de hecho registradas con al menos 2 años de convivencia acreditada y 5 años de inscripción en el registro de parejas de hecho. En divorcios, puede corresponder si hay pensión compensatoria.' },
    { question: '¿Qué es la base reguladora de la pensión de viudedad?', answer: 'Depende de la causa del fallecimiento. Si fue por enfermedad común, es la media de las bases de cotización de los últimos 15 años. Si fue por accidente laboral o enfermedad profesional, se usan las bases de los últimos 2 años. La pensión es un porcentaje de esa base.' },
    { question: '¿Se puede cobrar la pensión de viudedad si me vuelvo a casar?', answer: 'En general, contraer nuevo matrimonio extingue el derecho a la pensión de viudedad. Sin embargo, si el perceptor tiene 61 o más años, o tiene reconocida una discapacidad igual o superior al 65%, puede mantener la pensión aunque se case de nuevo.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
