import { ToolDefinition } from '@/lib/tools/registry';

export const mortgageOverpaymentTool: ToolDefinition = {
  id: 'mortgage-overpayment',
  slug: 'amortizacion-hipoteca',
  name: 'Amortización Anticipada de Hipoteca',
  description: 'Calcula el ahorro en intereses y reducción de plazo al hacer amortizaciones anticipadas de tu hipoteca.',
  icon: '🏦',
  category: 'math',
  keywords: ['amortización anticipada hipoteca', 'amortizar hipoteca', 'ahorrar intereses hipoteca', 'reducir cuota hipoteca', 'amortización hipotecaria'],
  tags: ['hipoteca', 'amortización', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
