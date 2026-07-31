import { ToolDefinition } from '@/lib/tools/registry';

export const amortizacionHipotecaTool: ToolDefinition = {
  id: 'amortizacion-hipoteca',
  slug: 'cuadro-amortizacion-hipoteca',
  name: 'Cuadro de Amortización Hipoteca',
  description: 'Genera el cuadro de amortización mensual de tu hipoteca. Muestra capital, intereses y saldo pendiente mes a mes con el sistema francés.',
  icon: '📋',
  category: 'math',
  keywords: ['cuadro amortización hipoteca', 'tabla amortización préstamo', 'hipoteca mes a mes', 'cuota hipoteca desglose', 'amortización sistema francés'],
  tags: ['hipoteca', 'amortización', 'préstamo', 'cuota'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
