export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedDate?: string;
  category: string;
  tags: string[];
  readingTime: number;
  relatedTools: string[];
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'cuanto-hipoteca-puedo-pagar',
    title: '¿Cuánta hipoteca puedo pagar? Cálculo paso a paso (2026)',
    description: 'Descubre cuánta hipoteca puedes permitirte según tu sueldo, ahorros y gastos. Incluye reglas del Banco de España, ratio de endeudamiento y ejemplos reales.',
    date: '2026-08-06',
    category: 'Finanzas',
    tags: ['hipoteca', 'financiación', 'banco', 'vivienda'],
    readingTime: 6,
    relatedTools: ['calculadora-hipoteca', 'amortizacion-hipoteca', 'alquiler-vs-compra'],
  },
  {
    slug: 'irpf-2026-tramos-retenciones',
    title: 'IRPF 2026: tramos, tipos y cómo calcular tu retención',
    description: 'Guía completa del IRPF 2026 en España. Conoce los tramos del impuesto, cómo se calcula la retención en nómina y cuánto pagarás en la declaración de la renta.',
    date: '2026-08-06',
    category: 'Impuestos',
    tags: ['IRPF', 'retención', 'renta', 'hacienda', '2026'],
    readingTime: 7,
    relatedTools: ['calculadora-irpf', 'sueldo-neto', 'calculadora-retencion-irpf-autonomo'],
  },
  {
    slug: 'coste-real-coche-por-km',
    title: 'El coste real de tu coche: cuánto te cuesta cada kilómetro',
    description: 'Muchos conductores solo piensan en la gasolina, pero el coste real de un coche es mucho mayor. Calcula exactamente cuánto te cuesta cada km con todos los gastos incluidos.',
    date: '2026-08-06',
    category: 'Finanzas',
    tags: ['coche', 'gastos', 'kilometraje', 'transporte'],
    readingTime: 5,
    relatedTools: ['calculadora-coste-km', 'precio-venta-coche', 'fuel-calculator'],
  },
  {
    slug: 'impuesto-sucesiones-herencia-espana',
    title: 'Impuesto de sucesiones en España: cuánto se paga por una herencia (2026)',
    description: 'Guía del impuesto de herencias en España por comunidad autónoma. Descubre cuánto pagarás según tu parentesco, el valor de los bienes y dónde vivía el fallecido.',
    date: '2026-08-06',
    category: 'Impuestos',
    tags: ['herencia', 'sucesiones', 'impuesto', 'patrimonio'],
    readingTime: 8,
    relatedTools: ['calculadora-impuesto-sucesiones-herencia'],
  },
  {
    slug: 'calcular-prestacion-paro-desempleo',
    title: '¿Cuánto paro me corresponde? Cálculo de la prestación por desempleo 2026',
    description: 'Aprende a calcular cuánto paro te corresponde según los meses cotizados, tu base reguladora y las bases mínimas y máximas del SEPE en 2026.',
    date: '2026-08-06',
    category: 'Trabajo',
    tags: ['paro', 'desempleo', 'SEPE', 'prestación', 'cotización'],
    readingTime: 6,
    relatedTools: ['calculadora-paro', 'sueldo-neto'],
  },
];

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find(p => p.slug === slug);
}
