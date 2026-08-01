import { ToolDefinition } from '@/lib/tools/registry';
export const simuladorDadosTool: ToolDefinition = {
  id: 'simulador-dados', slug: 'simulador-tirada-dados-online',
  name: 'Simulador de Dados Online',
  description: 'Lanza dados virtuales online: d4, d6, d8, d10, d12, d20 y d100. Personaliza el número de dados y caras. Perfecto para juegos de rol, juegos de mesa y estadística.',
  icon: '🎲', category: 'math',
  keywords: ['tirar dado online', 'simulador dados virtual', 'dado virtual online', 'dado 20 caras online', 'dados rol online'],
  tags: ['dados', 'juegos', 'azar', 'rol'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
