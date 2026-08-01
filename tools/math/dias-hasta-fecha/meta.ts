import { ToolDefinition } from '@/lib/tools/registry';
export const diasHastaFechaTool: ToolDefinition = {
  id: 'dias-hasta-fecha', slug: 'cuantos-dias-faltan-para',
  name: 'Días que Faltan Para…',
  description: 'Cuenta los días, semanas y meses que faltan para cualquier fecha: Navidad, vacaciones, cumpleaños, boda o cualquier evento importante. Con cuenta regresiva en tiempo real.',
  icon: '📅', category: 'math',
  keywords: ['cuantos dias faltan para navidad', 'dias que faltan calculadora', 'cuenta atras fecha calculadora', 'cuanto falta para mis vacaciones', 'countdown dias calculadora'],
  tags: ['días', 'cuenta atrás', 'evento', 'fecha'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
