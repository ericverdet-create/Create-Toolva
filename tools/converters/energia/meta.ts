import { ToolDefinition } from '@/lib/tools/registry';

export const energiaConverterTool: ToolDefinition = {
  id: 'energia-converter',
  slug: 'conversor-energia',
  name: 'Conversor de Energía',
  description: 'Convierte entre unidades de energía: julios, kilojulios, calorías, kilocalorías, kWh, BTU y electronvoltios. Útil para física, nutrición y electricidad.',
  icon: '⚡',
  category: 'converters',
  keywords: ['conversor energía', 'julios a calorías', 'kcal a kWh', 'convertir BTU', 'unidades energía'],
  tags: ['energía', 'julios', 'calorías', 'kWh'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
