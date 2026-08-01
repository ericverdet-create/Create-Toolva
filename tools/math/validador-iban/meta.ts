import { ToolDefinition } from '@/lib/tools/registry';
export const validadorIbanTool: ToolDefinition = {
  id: 'validador-iban', slug: 'validador-iban',
  name: 'Validador de IBAN',
  description: 'Valida si un número IBAN es correcto y muestra su estructura: país, entidad, oficina, control y número de cuenta. Compatible con IBAN españoles y europeos.',
  icon: '🏦', category: 'math',
  keywords: ['validador iban', 'validar iban', 'comprobar iban', 'iban españa', 'iban correcto', 'verificar iban', 'numero cuenta iban'],
  tags: ['IBAN', 'banco', 'cuenta corriente', 'España'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
