import { ToolDefinition } from '@/lib/tools/registry';

export const letraDniTool: ToolDefinition = {
  id: 'letra-dni',
  slug: 'calculadora-letra-dni',
  name: 'Calculadora Letra del DNI',
  description: 'Calcula la letra de tu DNI o valida si es correcta. También calcula la letra de NIE (X, Y, Z). Instantáneo y sin errores.',
  icon: '🪪',
  category: 'math',
  keywords: ['calcular letra DNI', 'letra DNI calculadora', 'cómo se calcula letra DNI', 'validar DNI letra', 'letra NIE calculadora'],
  tags: ['DNI', 'NIE', 'identidad', 'España'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
