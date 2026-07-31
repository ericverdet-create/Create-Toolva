import { ToolDefinition } from '@/lib/tools/registry';
export const temperaturaCoccinaTool: ToolDefinition = {
  id: 'temperatura-cocina', slug: 'temperatura-horno-cocina',
  name: 'Temperaturas de Horno y Cocina',
  description: 'Convierte temperaturas de horno entre °C, °F y gas. Guía de temperaturas para carnes, pescados, masas y repostería. Imprescindible en la cocina.',
  icon: '🍳', category: 'converters',
  keywords: ['temperatura horno grados celsius fahrenheit', 'convertir temperatura horno', 'numero gas horno temperatura', 'temperatura cocinar carne', 'horno convector temperatura'],
  tags: ['horno', 'cocina', 'temperatura', 'recetas'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
