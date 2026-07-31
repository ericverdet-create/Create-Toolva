import { ToolDefinition } from '@/lib/tools/registry';

export const ovulationCalculatorTool: ToolDefinition = {
  id: 'ovulation-calculator',
  slug: 'calculadora-ovulacion',
  name: 'Calculadora de Ovulación',
  description: 'Calcula tus días fértiles y fecha de ovulación según la fecha de tu último período menstrual y la duración de tu ciclo.',
  icon: '🌸',
  category: 'health',
  keywords: ['calculadora ovulación', 'días fértiles', 'cuando ovulo', 'período fértil', 'ciclo menstrual', 'fertilidad'],
  tags: ['ovulación', 'fertilidad', 'ciclo menstrual', 'salud femenina'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
