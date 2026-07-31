import type { ToolDefinition } from '@/lib/tools/types';
export const salaryCalculatorTool: ToolDefinition = {
  id: 'salary-calculator', slug: 'calculadora-salario-neto',
  name: 'Calculadora de Salario Neto',
  description: 'Calcula tu salario neto a partir del bruto. Descuento IRPF y cotización a la Seguridad Social en España 2024.',
  icon: '💼', category: 'math',
  keywords: ['salario neto', 'salario bruto', 'IRPF', 'seguridad social', 'nómina', 'sueldo neto', 'calcular nómina'],
  tags: ['salario', 'nómina', 'IRPF', 'trabajo'],
  component: () => import('./component'),
  relatedTools: ['iva-calculator'], requiresAuth: false, isPremium: false, hasAI: false,
};
