import { ToolDefinition } from '@/lib/tools/registry';

export const interesDemoraTool: ToolDefinition = {
  id: 'interes-demora',
  slug: 'interes-demora',
  name: 'Interés de Demora',
  description: 'Calcula el interés de demora legal en España para facturas impagadas, préstamos y deudas. Aplica el tipo oficial del Banco de España vigente.',
  icon: '📅',
  category: 'math',
  keywords: ['interés demora', 'interés legal dinero', 'recargo impago factura', 'tipo interés banco españa', 'mora deuda'],
  tags: ['demora', 'interés', 'impago', 'legal'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
