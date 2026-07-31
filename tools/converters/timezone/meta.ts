import { ToolDefinition } from '@/lib/tools/registry';

export const timezoneTool: ToolDefinition = {
  id: 'timezone',
  slug: 'conversor-zonas-horarias',
  name: 'Conversor de Zonas Horarias',
  description: 'Convierte horas entre zonas horarias del mundo. Compara horarios en diferentes ciudades al instante.',
  icon: '🌍',
  category: 'converters',
  keywords: ['conversor zonas horarias', 'hora en otro país', 'diferencia horaria', 'hora nueva york madrid', 'zona horaria'],
  tags: ['horario', 'zona horaria', 'mundial'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
