import { ToolDefinition } from '@/lib/tools/registry';

export const autonomosCalculatorTool: ToolDefinition = {
  id: 'autonomos-calculator',
  slug: 'calculadora-autonomos',
  name: 'Cuota de Autónomos',
  description: 'Calcula la cuota mensual de la Seguridad Social para autónomos en España según tus ingresos netos reales en 2024.',
  icon: '🧑‍💼',
  category: 'tax',
  keywords: ['cuota autónomos', 'seguridad social autónomos', 'cuota ss autónomo', 'autónomo españa', 'base cotización autónomo'],
  tags: ['autónomos', 'seguridad social', 'españa'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
