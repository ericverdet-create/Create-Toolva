import { ToolDefinition } from '@/lib/tools/registry';
export const seguroVidaTool: ToolDefinition = {
  id: 'seguro-vida', slug: 'calculadora-seguro-vida',
  name: 'Calculadora de Seguro de Vida',
  description: 'Estima el capital asegurado que necesitas y la prima mensual aproximada de tu seguro de vida según tu edad, ingresos, deudas y situación familiar.',
  icon: '🛡️', category: 'math',
  keywords: ['calculadora seguro de vida', 'cuanto capital seguro vida necesito', 'precio seguro de vida por edades', 'seguro vida prima mensual', 'seguro vida familiar calculadora'],
  tags: ['seguro', 'vida', 'prima', 'capital'],
  faq: [
    { question: '¿Cuánto capital necesito en un seguro de vida?', answer: 'La regla general es cubrir entre 5 y 10 veces tus ingresos anuales netos, más las deudas pendientes (hipoteca, préstamos). Si ganas 30.000€ netos y tienes una hipoteca de 100.000€, necesitarías entre 250.000€ y 400.000€ de capital asegurado.' },
    { question: '¿Cuánto cuesta un seguro de vida en España?', answer: 'Una persona de 35 años sin enfermedades previas puede contratar un seguro de vida de 150.000€ por unos 15-25€ al mes. El precio sube significativamente a partir de los 45-50 años y si eres fumador.' },
    { question: '¿Es obligatorio el seguro de vida con la hipoteca?', answer: 'No es legalmente obligatorio, pero muchos bancos lo exigen para conceder la hipoteca o lo vinculan a mejores condiciones de tipo de interés. Puedes contratarlo con cualquier aseguradora, no solo con el banco.' },
    { question: '¿Qué cubre un seguro de vida?', answer: 'El seguro de vida básico cubre el fallecimiento del asegurado. Existen modalidades que también cubren invalidez permanente, enfermedades graves o incapacidad temporal. El capital se paga a los beneficiarios designados.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
