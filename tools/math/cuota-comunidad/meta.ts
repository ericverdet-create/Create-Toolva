import { ToolDefinition } from '@/lib/tools/registry';

export const cuotaComunidadTool: ToolDefinition = {
  id: 'cuota-comunidad',
  slug: 'cuota-comunidad-propietarios',
  name: 'Cuota Comunidad de Propietarios',
  description: 'Calcula la cuota mensual de comunidad de propietarios según el coeficiente de participación de tu piso. Reparte gastos totales entre vecinos.',
  icon: '🏢',
  category: 'math',
  keywords: ['cuota comunidad propietarios', 'gastos comunidad piso', 'coeficiente participación comunidad', 'calcular comunidad vecinos', 'cuánto pago comunidad'],
  tags: ['comunidad', 'propietarios', 'coeficiente', 'piso'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
