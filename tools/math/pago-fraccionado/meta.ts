import { ToolDefinition } from '@/lib/tools/registry';

export const pagoFraccionadoTool: ToolDefinition = {
  id: 'pago-fraccionado',
  slug: 'pago-fraccionado-autonomos',
  name: 'Pago Fraccionado Autónomos (Modelo 130)',
  description: 'Calcula el pago fraccionado trimestral del IRPF para autónomos en estimación directa (Modelo 130).',
  icon: '🧾',
  category: 'math',
  keywords: ['pago fraccionado autónomos', 'modelo 130', 'IRPF trimestral autónomos', 'declaración trimestral', 'estimación directa IRPF'],
  tags: ['autónomos', 'IRPF', 'modelo 130', 'trimestral'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
