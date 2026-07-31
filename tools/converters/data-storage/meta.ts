import type { ToolDefinition } from '@/lib/tools/types';
export const dataStorageConverterTool: ToolDefinition = {
  id: 'data-storage-converter', slug: 'conversor-almacenamiento',
  name: 'Conversor de Almacenamiento',
  description: 'Convierte entre bytes, kilobytes, megabytes, gigabytes, terabytes y más. Conversión digital precisa.',
  icon: '💾', category: 'converters',
  keywords: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'conversor datos', 'MB a GB', 'GB a TB'],
  tags: ['bytes', 'almacenamiento', 'datos', 'digital'],
  component: () => import('./component'),
  relatedTools: ['length-converter'], requiresAuth: false, isPremium: false, hasAI: false,
};
