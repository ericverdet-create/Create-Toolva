import { ToolDefinition } from '@/lib/tools/registry';

export const numberToWordsTool: ToolDefinition = {
  id: 'number-to-words',
  slug: 'numero-a-letras',
  name: 'Número a Letras',
  description: 'Convierte cualquier número a su expresión en palabras en español. Ideal para cheques, facturas y documentos legales.',
  icon: '🔤',
  category: 'text',
  keywords: ['número a letras', 'convertir número a letras', 'cifra en palabras', 'cheque', 'factura', 'escribir número'],
  tags: ['texto', 'número', 'letras'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
