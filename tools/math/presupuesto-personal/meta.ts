import { ToolDefinition } from '@/lib/tools/registry';
export const presupuestoPersonalTool: ToolDefinition = {
  id: 'presupuesto-personal', slug: 'presupuesto-personal',
  name: 'Presupuesto Personal (50/30/20)',
  description: 'Planifica tu presupuesto mensual con la regla 50/30/20: necesidades, deseos y ahorro. Introduce tus ingresos y gastos y descubre si estás en equilibrio.',
  icon: '📊', category: 'math',
  keywords: ['presupuesto personal mensual', 'regla 50 30 20', 'cómo organizar dinero', 'control gastos personales', 'planificador gastos mes'],
  tags: ['presupuesto', 'finanzas', 'ahorro', 'gastos'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
