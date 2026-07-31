import { ToolDefinition } from '@/lib/tools/registry';
export const velocidadVientoTool: ToolDefinition = {
  id: 'velocidad-viento', slug: 'escala-beaufort-viento',
  name: 'Velocidad del Viento (Escala Beaufort)',
  description: 'Convierte la velocidad del viento entre km/h, m/s, nudos y mph. Identifica el grado en la escala Beaufort y los efectos típicos en tierra y mar.',
  icon: '🌬️', category: 'converters',
  keywords: ['escala beaufort calculadora', 'convertir velocidad viento', 'kmh a nudos viento', 'velocidad viento en nudos', 'convertidor viento meteorologia'],
  tags: ['viento', 'Beaufort', 'meteorología', 'nudos'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
