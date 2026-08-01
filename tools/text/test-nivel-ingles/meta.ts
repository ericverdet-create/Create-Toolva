import { ToolDefinition } from '@/lib/tools/registry';
export const testNivelInglesTool: ToolDefinition = {
  id: 'test-nivel-ingles', slug: 'test-nivel-ingles',
  name: 'Test de Nivel de Inglés',
  description: 'Descubre tu nivel de inglés (A1 a C2) con 20 preguntas de vocabulario y gramática. Test rápido y gratuito basado en el Marco Europeo de Referencia (MCER).',
  icon: '🇬🇧', category: 'text',
  keywords: ['test nivel ingles', 'nivel de ingles online', 'test ingles a1 b1 c1', 'examen nivel ingles', 'cuál es mi nivel de inglés', 'test ingles gratis mcer'],
  tags: ['inglés', 'nivel', 'MCER', 'vocabulario'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
