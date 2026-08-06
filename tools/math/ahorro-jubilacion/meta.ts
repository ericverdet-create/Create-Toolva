import { ToolDefinition } from '@/lib/tools/registry';
export const ahorroJubilacionTool: ToolDefinition = {
  id: 'ahorro-jubilacion', slug: 'calculadora-plan-ahorro-jubilacion',
  name: 'Plan de Ahorro para la Jubilación',
  description: 'Calcula cuánto necesitas ahorrar cada mes para jubilarte con el capital que deseas. Proyección de ahorro con interés compuesto y simulación de diferentes escenarios.',
  icon: '🏖️', category: 'math',
  keywords: ['calculadora jubilacion ahorro', 'cuanto ahorrar para jubilarse', 'plan ahorro jubilacion calculadora', 'fondo jubilacion calculadora', 'ahorro mensual jubilacion'],
  tags: ['jubilación', 'ahorro', 'plan pensión', 'inversión'],
  faq: [
    { question: '¿Cuánto dinero necesito para jubilarme en España?', answer: 'Depende de tu estilo de vida y la edad de jubilación. Si quieres 1.500€ netos al mes y te jubilas a los 65, necesitarías un capital de unos 300.000-400.000€ en fondos propios, asumiendo que cobras también pensión pública.' },
    { question: '¿Cuánto debo ahorrar al mes para la jubilación?', answer: 'Si empiezas a los 30 años y quieres un capital de 200.000€ a los 65, con una rentabilidad media del 5% anual, necesitas ahorrar unos 200€ al mes. Cuanto antes empieces, menos tienes que ahorrar mensualmente.' },
    { question: '¿Es mejor un plan de pensiones o un fondo de inversión para la jubilación?', answer: 'Los planes de pensiones ofrecen deducción fiscal en el IRPF (hasta 1.500€/año), pero el dinero queda bloqueado hasta la jubilación. Los fondos de inversión son más flexibles y también eficientes fiscalmente. Lo ideal suele ser combinar ambos.' },
    { question: '¿A qué edad debo empezar a ahorrar para la jubilación?', answer: 'Cuanto antes, mejor. Empezar a los 25 en vez de a los 35 puede suponer el doble de capital acumulado gracias al interés compuesto. No existe una edad mínima, pero cada año que esperas reduce significativamente el resultado final.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
