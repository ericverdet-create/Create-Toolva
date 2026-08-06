import { ToolDefinition } from '@/lib/tools/registry';

export const precioVentaCocheTool: ToolDefinition = {
  id: 'precio-venta-coche',
  slug: 'calculadora-precio-venta-coche',
  name: 'Calculadora Precio Venta Coche Segunda Mano',
  description: 'Calcula el precio justo para vender tu coche de segunda mano en España. Estima la depreciación por año, kilometraje y estado, y compara con el valor de mercado actual.',
  icon: '🚙',
  category: 'math',
  keywords: ['precio venta coche segunda mano calculadora', 'cuanto vale mi coche', 'depreciacion coche calculadora', 'valor coche segunda mano españa', 'como calcular precio venta coche usado', 'calculadora depreciacion vehiculo'],
  tags: ['coche', 'segunda mano', 'depreciación', 'venta'],
  faq: [
    { question: '¿Cuánto se deprecia un coche por año en España?', answer: 'Un coche nuevo pierde aproximadamente el 20-25% de su valor en el primer año. Del segundo al quinto año pierde entre un 10-15% anual. A partir del quinto año, la depreciación se ralentiza hasta un 5-8% anual. En total, a los 5 años un coche vale entre el 40-50% de su precio de nuevo.' },
    { question: '¿Cómo calcular el precio de venta de mi coche?', answer: 'Toma el precio de nuevo del coche, aplica la depreciación acumulada según los años y el kilometraje, y ajusta según el estado de conservación. También puedes consultar portales como Coches.net, Milanuncios o Autoscout24 para ver precios reales de tu modelo.' },
    { question: '¿Cuánto afecta el kilometraje al precio de un coche?', answer: 'La referencia estándar es 15.000-20.000 km anuales. Un coche con más km de los esperados vale menos: aproximadamente 0,05-0,10€ menos por km adicional dependiendo del modelo. Un coche con pocos km puede cotizar un 5-15% por encima del valor estándar.' },
    { question: '¿Dónde puedo vender mi coche al mejor precio en España?', answer: 'Para venta entre particulares: Coches.net, Milanuncios, Wallapop y Vibbo. Para venta rápida a concesionarios: We Buy Any Car, Clunker, o concesionarios de tu marca. La venta directa entre particulares suele obtener un 10-20% más que la venta a un concesionario.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
