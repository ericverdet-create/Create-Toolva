import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraLetraDniTool: ToolDefinition = {
  id: 'calculadora-letra-dni', slug: 'calculadora-letra-dni',
  name: 'Calculadora Letra DNI / NIF',
  description: 'Calcula la letra de tu DNI o NIF al instante. Introduce tus 8 dígitos y obtén la letra correcta. También valida si un DNI/NIF es correcto. Gratis y sin datos personales.',
  icon: '🪪', category: 'math',
  keywords: ['calculadora letra dni', 'letra nif', 'calcular letra dni', 'validar dni', 'letra dni españa', 'calcular nif', 'letra dni online'],
  tags: ['DNI', 'NIF', 'España', 'identidad'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
