import { ToolDefinition } from '@/lib/tools/registry';

export const energiaSolarTool: ToolDefinition = {
  id: 'energia-solar',
  slug: 'calculadora-placas-solares',
  name: 'Calculadora de Placas Solares',
  description: 'Estima el número de paneles solares necesarios para tu hogar, ahorro energético anual y retorno de la inversión (ROI) de la instalación fotovoltaica.',
  icon: '☀️',
  category: 'math',
  keywords: ['calculadora placas solares', 'paneles solares cuántos necesito', 'autoconsumo solar', 'ROI paneles solares', 'instalación fotovoltaica'],
  tags: ['solar', 'energía', 'fotovoltaica', 'ahorro'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
