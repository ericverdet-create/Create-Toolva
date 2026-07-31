import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraIrpfTool: ToolDefinition = {
  id: 'calculadora-irpf', slug: 'calculadora-irpf-espana',
  name: 'Calculadora IRPF España',
  description: 'Calcula el IRPF de tu salario en España: tramos impositivos, cuota íntegra, retención estimada y sueldo neto resultante. Actualizado con los tramos vigentes.',
  icon: '🧾', category: 'math',
  keywords: ['calculadora irpf españa', 'cuanto irpf pago por mi sueldo', 'tramos irpf calculadora', 'calcular retencion irpf nomina', 'impuesto renta calculadora'],
  tags: ['IRPF', 'impuestos', 'renta', 'retención'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
