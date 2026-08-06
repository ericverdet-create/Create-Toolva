import { ToolDefinition } from '@/lib/tools/registry';

export const retencionIrpfAutonomoTool: ToolDefinition = {
  id: 'retencion-irpf-autonomo',
  slug: 'calculadora-retencion-irpf-autonomo',
  name: 'Calculadora Retención IRPF Autónomos',
  description: 'Calcula qué porcentaje de retención de IRPF debes aplicar en tus facturas como autónomo en España. Incluye el tipo general (15%), el reducido para nuevos autónomos (7%) y el cálculo del pago fraccionado modelo 130.',
  icon: '🧾',
  category: 'math',
  keywords: ['cuanto retengo de irpf autonomo', 'retencion irpf facturas autonomo 2026', 'porcentaje retencion autonomo españa', 'modelo 130 autonomo calculadora', 'irpf factura autonomo 7 o 15', 'calculo pago fraccionado autonomo'],
  tags: ['autónomo', 'IRPF', 'retención', 'factura', 'modelo 130'],
  faq: [
    { question: '¿Qué porcentaje de IRPF retiene un autónomo en 2026?', answer: 'El tipo general de retención de IRPF para autónomos es el 15%. Los nuevos autónomos aplican el 7% durante el año de alta y los dos siguientes. La retención aparece en la factura como un descuento que el cliente ingresa a Hacienda en tu nombre.' },
    { question: '¿Cuándo aplica el 7% de retención para autónomos?', answer: 'El tipo reducido del 7% aplica a autónomos que se den de alta por primera vez en el RETA y cuyos ingresos del año anterior no superaran cierto umbral. Se aplica en el año de inicio de actividad y en los dos ejercicios siguientes.' },
    { question: '¿Qué es el modelo 130 de autónomos?', answer: 'El modelo 130 es el pago fraccionado trimestral del IRPF para autónomos en estimación directa. Se paga el 20% del beneficio neto del trimestre (ingresos menos gastos), descontando retenciones ya soportadas y pagos anteriores.' },
    { question: '¿Qué autónomos no tienen que presentar el modelo 130?', answer: 'Están exentos de presentar el modelo 130 los autónomos cuyos clientes son mayoritariamente empresas o profesionales que ya les retienen el IRPF (al menos el 70% de sus ingresos son con retención). En ese caso, los clientes ya ingresan el IRPF.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
