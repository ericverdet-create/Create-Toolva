import type { ToolDefinition } from '@/lib/tools/types'

export const vatCalculatorTool: ToolDefinition = {
  id: 'vat-calculator',
  slug: 'calculadora-iva-europeo',
  name: 'Calculadora de IVA europeo',
  description: 'Calcula el IVA de todos los países de la Unión Europea. Base imponible, cuota y total.',
  icon: '🇪🇺',
  category: 'tax',
  keywords: ['IVA europeo', 'VAT', 'impuesto Europa', 'calculadora IVA UE', 'IVA Alemania', 'IVA Francia'],
  tags: ['IVA', 'UE', 'Europa', 'impuestos'],
  component: () => import('./component'),
}
