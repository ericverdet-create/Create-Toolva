import type { ToolDefinition } from '@/lib/tools/types';
export const volumeConverterTool: ToolDefinition = {
  id: 'volume-converter', slug: 'conversor-volumen',
  name: 'Conversor de Volumen',
  description: 'Convierte entre litros, mililitros, galones, pies cúbicos, metros cúbicos y más unidades de volumen.',
  icon: '🧴', category: 'converters',
  keywords: ['litros', 'mililitros', 'galones', 'conversor volumen', 'metros cúbicos', 'cl', 'dl'],
  tags: ['volumen', 'líquidos', 'conversión'],
  component: () => import('./component'),
  relatedTools: ['length-converter'], requiresAuth: false, isPremium: false, hasAI: false,
};
