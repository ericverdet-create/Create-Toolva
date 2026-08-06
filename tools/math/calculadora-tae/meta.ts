import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraTaeTool: ToolDefinition = {
  id: 'calculadora-tae', slug: 'calculadora-tae-prestamo',
  name: 'Calculadora TAE Préstamo',
  description: 'Calcula la TAE (Tasa Anual Equivalente) de un préstamo a partir del TIN, comisiones y plazo. Compara el coste real entre diferentes ofertas bancarias.',
  icon: '📊', category: 'math',
  keywords: ['calculadora tae prestamo', 'diferencia tin tae', 'calcular tae banco', 'tae calculadora online', 'tasa anual equivalente calculadora'],
  tags: ['TAE', 'TIN', 'préstamo', 'banco'],
  faq: [
    { question: '¿Qué diferencia hay entre TIN y TAE?', answer: 'El TIN (Tipo de Interés Nominal) es el tipo de interés puro del préstamo, sin incluir comisiones ni gastos. La TAE (Tasa Anual Equivalente) incluye el TIN más todas las comisiones y gastos asociados, expresado como porcentaje anual. La TAE es el indicador real del coste del préstamo y el que debes usar para comparar ofertas.' },
    { question: '¿Por qué la TAE es siempre mayor que el TIN?', answer: 'Porque la TAE incorpora los gastos adicionales del préstamo: comisión de apertura, gastos de estudio, seguros vinculados obligatorios, etc. Si el préstamo no tiene ningún coste adicional y los intereses se pagan mensualmente, la TAE puede ser ligeramente superior al TIN por el efecto del interés compuesto.' },
    { question: '¿Qué TAE se considera buena para un préstamo personal en 2026?', answer: 'En España, las TAEs de préstamos personales en 2026 oscilan entre el 5-8% para perfiles buenos en entidades tradicionales, y pueden superar el 20-25% en préstamos rápidos o con garantías débiles. Una TAE inferior al 8% se considera competitiva para préstamos personales.' },
    { question: '¿Se puede negociar la TAE de un préstamo?', answer: 'Sí, especialmente en entidades bancarias tradicionales donde ya tienes productos. Puedes negociar la comisión de apertura, que es uno de los componentes que más sube la TAE. También puedes comparar varias ofertas usando la TAE como referencia única de comparación.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
