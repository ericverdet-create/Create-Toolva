import { ToolDefinition } from '@/lib/tools/registry';

export const alquilerVsCompraTool: ToolDefinition = {
  id: 'alquiler-vs-compra',
  slug: 'calculadora-alquiler-vs-compra',
  name: 'Calculadora Alquiler vs Compra Vivienda',
  description: 'Compara el coste real de alquilar vs comprar una vivienda en España. Calcula el punto de equilibrio, el coste total a 10, 20 y 30 años y cuándo compensa más comprar que alquilar.',
  icon: '🏠',
  category: 'math',
  keywords: ['alquilar o comprar casa calculadora', 'comprar o alquilar vivienda españa', 'cuando compensa comprar piso', 'alquiler vs hipoteca comparativa', 'punto equilibrio alquiler compra', 'calculadora alquiler compra 2026'],
  tags: ['vivienda', 'hipoteca', 'alquiler', 'inversión'],
  faq: [
    { question: '¿Qué es mejor: alquilar o comprar una casa en España?', answer: 'Depende del precio de la vivienda, el alquiler de mercado, el plazo que planeas vivir ahí y tu situación financiera. En general, si vas a quedarte más de 7-10 años, comprar suele compensar. Si es menos tiempo, el alquiler puede ser más flexible y económico.' },
    { question: '¿Cuándo compensa más comprar que alquilar?', answer: 'El "punto de equilibrio" es el año en que el coste acumulado de comprar iguala al de alquilar. Suele estar entre los 5 y 12 años dependiendo del mercado. A partir de ahí, comprar sale más barato porque sigues teniendo el activo.' },
    { question: '¿Cuánto dinero necesito para comprar un piso en España?', answer: 'Necesitas como mínimo el 20% del precio de la vivienda como entrada (los bancos financian hasta el 80%), más un 10-12% adicional para gastos: ITP o IVA, notaría, registro, gestoría y tasación. En total, entre el 30-35% del precio en efectivo.' },
    { question: '¿Qué gastos tiene comprar una vivienda que no tiene el alquiler?', answer: 'Al comprar pagas: entrada + hipoteca, ITP (6-10% según CC.AA.) o IVA (10% obra nueva), notaría, registro, gestoría, tasación, seguro de hogar obligatorio, IBI, comunidad de propietarios y mantenimiento. El alquiler solo requiere la fianza y la mensualidad.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
