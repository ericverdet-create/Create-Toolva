import { ToolDefinition } from '@/lib/tools/registry';
export const escalarRecetaTool: ToolDefinition = {
  id: 'escalar-receta', slug: 'escalar-receta-calculadora',
  name: 'Escalar Receta de Cocina',
  description: 'Ajusta las cantidades de cualquier receta al número de comensales que necesitas. Multiplica o divide ingredientes automáticamente para 2, 4, 6 personas o las que quieras.',
  icon: '👨‍🍳', category: 'math',
  keywords: ['escalar receta calculadora', 'ajustar cantidades receta', 'receta para mas personas calculadora', 'multiplicar ingredientes receta', 'calculadora raciones receta'],
  tags: ['receta', 'cocina', 'ingredientes', 'raciones'],
  component: () => import('./component').then(m => ({ default: m.default })),
};
