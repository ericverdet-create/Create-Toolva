import { ToolDefinition } from '@/lib/tools/registry';

export const eurosPesetasTool: ToolDefinition = {
  id: 'euros-pesetas',
  slug: 'convertir-euros-pesetas',
  name: 'Conversor Euros a Pesetas',
  description: 'Convierte euros a pesetas y viceversa al tipo de cambio oficial de 166,386 pesetas por euro.',
  icon: '💶',
  category: 'converters',
  keywords: ['euros pesetas', 'convertir euros pesetas', 'pesetas euros', 'tipo cambio peseta', 'cuántas pesetas son un euro'],
  tags: ['euros', 'pesetas', 'conversión'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
