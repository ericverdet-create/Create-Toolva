import { ToolDefinition } from '@/lib/tools/registry';

export const calculadoraCostoKmTool: ToolDefinition = {
  id: 'calculadora-coste-km',
  slug: 'calculadora-coste-por-kilometro',
  name: 'Calculadora Coste por Kilómetro',
  description: 'Calcula el coste real de cada kilómetro recorrido en tu vehículo. Incluye combustible, seguro, amortización, ITV, neumáticos y mantenimiento. Imprescindible para autónomos y profesionales.',
  icon: '🚗',
  category: 'math',
  keywords: ['cuanto me cuesta el kilometro en coche', 'calculadora coste por km', 'gasto por kilometro coche', 'dietas kilometraje autonomo 2026', 'precio kilometro hacienda', 'calcular coste km vehiculo'],
  tags: ['coche', 'km', 'kilometraje', 'autónomo', 'dietas'],
  faq: [
    { question: '¿Cuánto cuesta el kilómetro en coche en España en 2026?', answer: 'El coste medio por kilómetro en España varía entre 0,15€ y 0,45€ dependiendo del vehículo, el combustible y el uso. Un coche de gasolina mediano recorre unos 100 km con 7 litros, a 1,75€/litro = 0,12€ solo en combustible. Sumando todos los costes fijos, el coste real suele estar entre 0,25€ y 0,40€/km.' },
    { question: '¿Cuánto paga Hacienda por kilómetro a autónomos en 2026?', answer: 'Hacienda establece la exención de 0,26€ por kilómetro para los desplazamientos en vehículo propio por motivos laborales, sin necesidad de justificar el gasto. Este importe no tributa como renta del trabajo si se justifica el desplazamiento.' },
    { question: '¿Qué gastos incluye el coste real por kilómetro?', answer: 'El coste real por km incluye combustible, seguro del vehículo, amortización del precio de compra, ITV y tasas, neumáticos, revisiones y mantenimiento, y aparcamiento habitual. El combustible es solo una parte del coste total.' },
    { question: '¿Cómo justificar los gastos de kilometraje ante Hacienda?', answer: 'Debes llevar un registro de desplazamientos con fecha, origen, destino, motivo y kilómetros. Puedes usar apps de registro de viajes o una hoja de cálculo. Hacienda puede solicitar esta documentación en una inspección.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
