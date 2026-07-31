import { ToolDefinition } from '@/lib/tools/registry';

export const countdownTimerTool: ToolDefinition = {
  id: 'countdown-timer',
  slug: 'cuenta-atras',
  name: 'Cuenta Atrás y Cronómetro',
  description: 'Temporizador de cuenta atrás y cronómetro online. Perfecto para cocinar, estudiar, ejercicio o presentaciones.',
  icon: '⏳',
  category: 'math',
  keywords: ['cuenta atrás', 'cronómetro', 'temporizador online', 'cuenta atras online', 'timer online'],
  tags: ['timer', 'cronómetro', 'tiempo'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
