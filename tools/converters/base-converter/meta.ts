import { ToolDefinition } from '@/lib/tools/registry';

export const baseConverterTool: ToolDefinition = {
  id: 'base-converter',
  slug: 'conversor-bases-numericas',
  name: 'Conversor de Bases Numéricas',
  description: 'Convierte números entre binario, octal, decimal y hexadecimal al instante.',
  icon: '💻',
  category: 'converters',
  keywords: ['binario', 'hexadecimal', 'octal', 'decimal', 'conversor bases', 'base numerica', 'binario a decimal'],
  tags: ['programación', 'binario', 'hex'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
