import { ToolDefinition } from '@/lib/tools/registry';

export const taxRefundTool: ToolDefinition = {
  id: 'tax-refund',
  slug: 'simulador-declaracion-renta',
  name: 'Simulador Declaración de la Renta',
  description: 'Simula el resultado de tu declaración de la Renta en España: calcula si te saldrá a pagar o a devolver según tu sueldo, retenciones y deducciones.',
  icon: '📋',
  category: 'math',
  keywords: ['simulador renta', 'declaracion renta resultado', 'sale a pagar o devolver', 'simulador IRPF 2024', 'borrador renta', 'calculadora renta'],
  tags: ['renta', 'IRPF', 'declaración', 'hacienda'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
