import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraSuenoTool: ToolDefinition = {
  id: 'calculadora-sueno',
  slug: 'calculadora-sueno',
  name: 'Calculadora del Sueño',
  description: 'Calcula a qué hora debes acostarte o despertarte para completar ciclos de sueño de 90 minutos. Despierta descansado evitando interrumpir el sueño REM.',
  icon: '😴',
  category: 'health',
  keywords: ['calculadora sueño', 'a qué hora dormirse', 'ciclos sueño', 'hora despertar sueño', 'cuántas horas dormir'],
  tags: ['sueño', 'descanso', 'REM', 'ciclos'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
