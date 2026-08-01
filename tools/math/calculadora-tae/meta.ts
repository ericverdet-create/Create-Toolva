import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraTaeTool: ToolDefinition = {
  id: 'calculadora-tae', slug: 'calculadora-tae-prestamo',
  name: 'Calculadora TAE Préstamo',
  description: 'Calcula la TAE (Tasa Anual Equivalente) de un préstamo a partir del TIN, comisiones y plazo. Compara el coste real entre diferentes ofertas bancarias.',
  icon: '📊', category: 'math',
  keywords: ['calculadora tae prestamo', 'diferencia tin tae', 'calcular tae banco', 'tae calculadora online', 'tasa anual equivalente calculadora'],
  tags: ['TAE', 'TIN', 'préstamo', 'banco'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
