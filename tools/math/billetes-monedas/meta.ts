import { ToolDefinition } from '@/lib/tools/registry';

export const billetesMonedasTool: ToolDefinition = {
  id: 'billetes-monedas',
  slug: 'desglose-billetes-monedas',
  name: 'Desglose en Billetes y Monedas',
  description: 'Calcula con qué billetes y monedas exactas pagar una cantidad de dinero usando el mínimo número de piezas. Euros y céntimos.',
  icon: '💶',
  category: 'math',
  keywords: ['desglose billetes monedas', 'cambio billetes euros', 'cuántos billetes necesito', 'pagar con billetes', 'cambio monedas euros'],
  tags: ['billetes', 'monedas', 'euros', 'cambio'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
