import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>¿Qué es el IRPF y quién lo paga?</h2>
      <p>
        El IRPF (Impuesto sobre la Renta de las Personas Físicas) es el impuesto que grava los ingresos de los residentes en España. Lo pagan tanto los trabajadores por cuenta ajena (a través de retenciones en nómina) como los autónomos (mediante retenciones en factura y pagos fraccionados trimestrales).
      </p>
      <p>
        Es un impuesto <strong>progresivo</strong>: a más ingresos, mayor porcentaje pagas. Pero no sobre toda tu renta, sino por tramos: solo pagas el tipo más alto por la parte que supera cada umbral.
      </p>

      <h2>Tramos del IRPF estatal 2026</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Base liquidable</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Tipo estatal</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Tipo autonómico (medio)</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Tipo total</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['0 — 12.450€', '9,50%', '9,50%', '~19%'],
              ['12.450 — 20.200€', '12,00%', '12,00%', '~24%'],
              ['20.200 — 35.200€', '15,00%', '13,30%', '~28,3%'],
              ['35.200 — 60.000€', '18,50%', '17,50%', '~37%'],
              ['60.000 — 300.000€', '22,50%', '21,00%', '~43,5%'],
              ['Más de 300.000€', '24,50%', '22,50%', '~47%'],
            ].map(([base, est, aut, tot]) => (
              <tr key={base} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-medium">{base}</td>
                <td className="px-3 py-2 text-center">{est}</td>
                <td className="px-3 py-2 text-center">{aut}</td>
                <td className="px-3 py-2 text-center font-semibold text-indigo-600 dark:text-indigo-400">{tot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">
        * El tipo autonómico varía según la comunidad. La tabla muestra una media orientativa. El tipo total es la suma de ambos.
      </p>

      <h2>¿Cuánto me retienen en nómina?</h2>
      <p>
        La retención en nómina es un pago anticipado del IRPF que hace tu empresa en tu nombre. No es el impuesto definitivo: al hacer la declaración de la renta, si te han retenido de más te devuelven dinero, y si te han retenido de menos tienes que pagar la diferencia.
      </p>
      <p>El porcentaje de retención depende de:</p>
      <ul>
        <li>Tu salario bruto anual</li>
        <li>Situación familiar (hijos, discapacidad, cónyuge sin ingresos...)</li>
        <li>Tipo de contrato</li>
        <li>Deducciones personales</li>
      </ul>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🧮 Calcula tu IRPF exacto</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce tu salario y situación personal para ver cuánto pagas y cuánto te retienen.</p>
        <Link href="/herramientas/calculadora-irpf"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calcular mi IRPF 2026 →
        </Link>
      </div>

      <h2>Ejemplo práctico: sueldo de 30.000€ brutos</h2>
      <p>
        Con un salario bruto de 30.000€ y situación estándar (soltero, sin hijos), el cálculo aproximado sería:
      </p>
      <ul>
        <li><strong>Reducción por trabajo</strong>: ~2.000€ (para rendimientos del trabajo)</li>
        <li><strong>Cotizaciones Seguridad Social</strong>: ~1.950€ (6,5% del bruto)</li>
        <li><strong>Base liquidable aproximada</strong>: ~26.050€</li>
        <li><strong>Cuota IRPF estatal + autonómica</strong>: ~5.500-6.000€</li>
        <li><strong>Retención mensual en nómina</strong>: ~460-500€/mes</li>
      </ul>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💶 ¿Cuánto cobro neto?</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Calcula tu sueldo neto mensual y anual después de IRPF y Seguridad Social.</p>
        <Link href="/herramientas/sueldo-neto"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calcular sueldo neto →
        </Link>
      </div>

      <h2>IRPF para autónomos: retención en factura y modelo 130</h2>
      <p>
        Los autónomos en estimación directa aplican una <strong>retención del 15%</strong> en sus facturas a otras empresas o profesionales. Los nuevos autónomos (primer año y dos siguientes) pueden aplicar el <strong>7%</strong>.
      </p>
      <p>
        Además, si más del 70% de sus ingresos no llevan retención, deben presentar el <strong>Modelo 130</strong> trimestralmente: un pago fraccionado del 20% sobre el beneficio neto del trimestre.
      </p>

      <div className="not-prose my-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl">
        <p className="text-sm font-medium text-orange-700 dark:text-orange-300 mb-2">🧾 ¿Eres autónomo?</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Calcula la retención de tus facturas y el importe del modelo 130 trimestral.</p>
        <Link href="/herramientas/calculadora-retencion-irpf-autonomo"
          className="inline-block text-sm bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
          Calculadora retención autónomo →
        </Link>
      </div>

      <h2>Preguntas frecuentes sobre el IRPF</h2>
      <p><strong>¿Cuándo hay que pagar el IRPF?</strong> La declaración de la renta se presenta entre abril y junio del año siguiente. Las retenciones en nómina se van pagando mes a mes durante todo el año.</p>
      <p><strong>¿Qué pasa si me sale a pagar en la renta?</strong> Significa que te han retenido menos de lo que te corresponde pagar. Puedes domiciliarlo y pagarlo en dos plazos (junio y noviembre).</p>
      <p><strong>¿Puedo reducir el IRPF a pagar?</strong> Sí, existen deducciones por plan de pensiones, vivienda habitual (para hipotecas anteriores a 2013), hijos, discapacidad, donativos y muchas más.</p>
    </>
  );
}
