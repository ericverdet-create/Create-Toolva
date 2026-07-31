import { ToolDefinition } from '@/lib/tools/registry';

export const roiCalculatorTool: ToolDefinition = {
  id: 'roi-calculator',
  slug: 'calculadora-roi',
  name: 'Calculadora de ROI',
  description: 'Calcula el retorno de inversión (ROI) de cualquier proyecto o inversión. Incluye ROI anualizado.',
  icon: '📈',
  category: 'math',
  keywords: ['roi', 'retorno inversión', 'rentabilidad', 'calcular roi', 'return on investment', 'rendimiento inversión'],
  tags: ['finanzas', 'roi', 'inversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
