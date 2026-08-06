import { ToolDefinition } from '@/lib/tools/registry';

export const amortizacionHipotecaTool: ToolDefinition = {
  id: 'amortizacion-hipoteca',
  slug: 'cuadro-amortizacion-hipoteca',
  name: 'Cuadro de Amortización Hipoteca',
  description: 'Genera el cuadro de amortización mensual de tu hipoteca. Muestra capital, intereses y saldo pendiente mes a mes con el sistema francés.',
  icon: '📋',
  category: 'math',
  keywords: ['cuadro amortización hipoteca', 'tabla amortización préstamo', 'hipoteca mes a mes', 'cuota hipoteca desglose', 'amortización sistema francés'],
  tags: ['hipoteca', 'amortización', 'préstamo', 'cuota'],
  faq: [
    { question: '¿Qué es un cuadro de amortización de hipoteca?', answer: 'Es una tabla que muestra mes a mes cómo se reparte cada cuota entre capital amortizado e intereses, y cuánto capital queda pendiente. Permite saber exactamente cuánto debes en cada momento.' },
    { question: '¿Qué es el sistema francés de amortización?', answer: 'Es el método más habitual en hipotecas españolas. La cuota mensual es constante, pero al principio se pagan más intereses y menos capital. Con el tiempo, la proporción se invierte.' },
    { question: '¿Cuánto dinero ahorro si amortizo anticipadamente?', answer: 'Amortizar anticipadamente reduce el capital pendiente y, por tanto, los intereses futuros. El ahorro depende del tipo de interés y el plazo restante. Cuanto antes amortices, más ahorras.' },
    { question: '¿Cuánta hipoteca puedo pagar con mi sueldo?', answer: 'La regla general es que la cuota mensual no supere el 30-35% de tus ingresos netos mensuales. Con esta calculadora puedes ajustar el capital y el plazo hasta encontrar una cuota asumible.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
