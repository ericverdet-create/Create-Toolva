import { ToolDefinition } from '@/lib/tools/registry';

export const conversorBasesNumericasTool: ToolDefinition = {
  id: 'conversor-bases-numericas', slug: 'conversor-bases-numericas',
  name: 'Conversor de Bases Numéricas',
  description: 'Convierte números entre decimal, binario, hexadecimal y octal al instante. Muestra el proceso paso a paso. Imprescindible para programadores y estudiantes de informática.',
  icon: '💻', category: 'math',
  keywords: ['conversor bases numericas', 'decimal a binario', 'binario a decimal', 'hexadecimal a decimal', 'octal a decimal', 'convertir base numerica', 'decimal hexadecimal binario'],
  tags: ['binario', 'hexadecimal', 'octal', 'programación'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
