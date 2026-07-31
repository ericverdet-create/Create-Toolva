import { ToolDefinition } from '@/lib/tools/registry';

export const qrGeneratorTool: ToolDefinition = {
  id: 'qr-generator',
  slug: 'generador-qr',
  name: 'Generador de Código QR',
  description: 'Crea códigos QR a partir de cualquier texto, URL o contacto. Descarga gratis en PNG.',
  icon: '📱',
  category: 'converters',
  keywords: ['qr', 'código qr', 'qr code', 'generar qr', 'url qr', 'qr gratis'],
  tags: ['qr', 'código', 'imagen'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
