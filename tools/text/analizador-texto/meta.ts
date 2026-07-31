import { ToolDefinition } from '@/lib/tools/registry';
export const analizadorTextoTool: ToolDefinition = {
  id: 'analizador-texto', slug: 'analizador-texto-seo',
  name: 'Analizador de Texto y SEO',
  description: 'Analiza tu texto: palabras, caracteres, oraciones, párrafos, tiempo de lectura estimado, densidad de keywords y palabras más frecuentes. Ideal para SEO y redacción.',
  icon: '📊', category: 'text',
  keywords: ['analizador texto online', 'densidad palabras clave texto', 'contador palabras avanzado', 'analisis seo texto', 'tiempo lectura calculadora'],
  tags: ['texto', 'SEO', 'palabras', 'análisis'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
