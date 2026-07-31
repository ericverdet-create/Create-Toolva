import { ToolDefinition } from '@/lib/tools/registry';

export const netSalaryTool: ToolDefinition = {
  id: 'net-salary',
  slug: 'calculadora-sueldo-neto',
  name: 'Calculadora de Sueldo Neto',
  description: 'Calcula tu sueldo neto en España a partir del bruto anual. Incluye IRPF, cotizaciones a la Seguridad Social y neto mensual.',
  icon: '💰',
  category: 'math',
  keywords: ['sueldo neto', 'salario neto bruto', 'calculadora irpf', 'cuánto cobro neto', 'sueldo neto españa 2024'],
  tags: ['sueldo', 'IRPF', 'neto'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
