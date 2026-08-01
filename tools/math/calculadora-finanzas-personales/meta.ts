import { ToolDefinition } from '@/lib/tools/registry';
export const calculadoraFinanzasPersonalesTool: ToolDefinition = {
  id: 'calculadora-finanzas-personales', slug: 'calculadora-regla-50-30-20',
  name: 'Calculadora Regla 50/30/20',
  description: 'Aplica la regla financiera 50/30/20 a tu sueldo: 50% necesidades, 30% deseos, 20% ahorro. Descubre cómo distribuir tu dinero de forma óptima para alcanzar tu libertad financiera.',
  icon: '💰', category: 'math',
  keywords: ['regla 50 30 20 calculadora', 'distribuir sueldo regla 50 30 20', 'como distribuir dinero sueldo', 'calculadora ahorro mensual', 'finanzas personales calculadora'],
  tags: ['finanzas', 'presupuesto', 'ahorro', 'sueldo'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
