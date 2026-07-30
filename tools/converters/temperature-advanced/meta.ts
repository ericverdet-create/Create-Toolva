import { ToolDefinition } from '@/lib/tools/registry';

export const temperatureAdvancedTool: ToolDefinition = {
  id: 'temperature-advanced',
  slug: 'conversor-temperatura-completo',
  name: 'Conversor Temperatura Completo',
  description: 'Convierte entre todas las escalas de temperatura: Celsius, Fahrenheit, Kelvin, Rankine y Réaumur. Conversión instantánea entre los 5 sistemas de medida de temperatura.',
  icon: '🌡️',
  category: 'converters',
  keywords: ['temperatura', 'celsius', 'fahrenheit', 'kelvin', 'rankine', 'réaumur', 'grados', 'convertir'],
  tags: ['temperatura', 'física', 'conversión'],
  component: () => import('./component'),
};
