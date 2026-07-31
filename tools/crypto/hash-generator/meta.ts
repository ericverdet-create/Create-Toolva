import type { ToolDefinition } from '@/lib/tools/types';
export const hashGeneratorTool: ToolDefinition = {
  id: 'hash-generator', slug: 'generador-hash',
  name: 'Generador de Hash',
  description: 'Genera hashes MD5, SHA-1, SHA-256 y SHA-512 de cualquier texto. Útil para verificar integridad de datos.',
  icon: '#️⃣', category: 'crypto',
  keywords: ['hash', 'sha256', 'md5', 'sha1', 'sha512', 'encriptar', 'checksum', 'huella digital'],
  tags: ['hash', 'sha', 'md5', 'seguridad'],
  component: () => import('./component'),
  relatedTools: ['base64', 'password-generator'], requiresAuth: false, isPremium: false, hasAI: false,
};
