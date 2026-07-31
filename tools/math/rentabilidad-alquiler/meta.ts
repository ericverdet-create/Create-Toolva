import { ToolDefinition } from '@/lib/tools/registry';

export const rentabilidadAlquilerTool: ToolDefinition = {
  id: 'rentabilidad-alquiler',
  slug: 'rentabilidad-alquiler',
  name: 'Rentabilidad del Alquiler',
  description: 'Calcula la rentabilidad bruta y neta de un piso en alquiler. Incluye gastos de comunidad, IBI, seguro, reparaciones e IRPF para obtener el yield real.',
  icon: '🏠',
  category: 'math',
  keywords: ['rentabilidad alquiler', 'yield inmobiliario', 'piso en alquiler rentabilidad', 'cuánto gano alquilando', 'retorno inversión inmobiliaria'],
  tags: ['alquiler', 'inmobiliario', 'inversión', 'rentabilidad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
