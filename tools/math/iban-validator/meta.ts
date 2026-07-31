import { ToolDefinition } from '@/lib/tools/registry';
export const ibanValidatorTool: ToolDefinition = {
  id: 'iban-validator', slug: 'validador-iban',
  name: 'Validador y Calculadora IBAN',
  description: 'Valida cualquier IBAN europeo y genera el IBAN español a partir del CCC (Código Cuenta Cliente). Verifica dígitos de control al instante.',
  icon: '🏦', category: 'math',
  keywords: ['validar IBAN', 'calculadora IBAN español', 'CCC a IBAN', 'dígito control IBAN', 'comprobar IBAN cuenta bancaria'],
  tags: ['IBAN', 'banco', 'cuenta', 'CCC'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
