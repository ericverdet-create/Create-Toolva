import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>¿Cuánta hipoteca puedo pagar? La regla del 30-35%</h2>
      <p>
        El Banco de España y la mayoría de entidades financieras recomiendan que la cuota mensual de tu hipoteca <strong>no supere el 30-35% de tus ingresos netos</strong>. Si ganas 2.000€ netos al mes, tu cuota máxima recomendada sería de entre 600€ y 700€.
      </p>
      <p>
        Pero hay un matiz importante: ese 30-35% incluye <em>todas tus deudas</em>, no solo la hipoteca. Si tienes un préstamo de coche de 200€/mes, el margen disponible para la hipoteca se reduce.
      </p>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🧮 Calcula tu cuota exacta</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce importe, plazo e interés y obtén la cuota mensual al instante.</p>
        <Link href="/herramientas/calculadora-hipoteca"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Usar calculadora de hipoteca →
        </Link>
      </div>

      <h2>¿Cuánto dinero necesito ahorrado?</h2>
      <p>
        Los bancos en España financian como máximo el <strong>80% del valor de tasación</strong> de la vivienda (o del precio de compra, el menor de los dos). Esto significa que necesitas aportar al menos el 20% del precio más los gastos de compraventa.
      </p>
      <p>Los gastos de compraventa en España suponen aproximadamente un <strong>10-12% adicional</strong>:</p>
      <ul>
        <li><strong>ITP (Impuesto de Transmisiones Patrimoniales)</strong>: 6-10% según la comunidad autónoma (para vivienda de segunda mano)</li>
        <li><strong>IVA</strong>: 10% para vivienda nueva (4% para VPO)</li>
        <li><strong>Notaría, registro e gestoría</strong>: 1.000-2.000€</li>
        <li><strong>Tasación</strong>: 300-600€</li>
      </ul>
      <p>
        Ejemplo: para una vivienda de 200.000€ necesitarías tener ahorrados al menos <strong>40.000€ (20%) + 20.000-24.000€ de gastos = 60.000-64.000€</strong>.
      </p>

      <h2>Tabla: cuota hipotecaria según importe y plazo</h2>
      <p>Con un tipo de interés medio del 3,5% (dato orientativo 2026):</p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Importe hipoteca</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">15 años</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">20 años</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">30 años</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['100.000€', '715€', '580€', '449€'],
              ['150.000€', '1.072€', '870€', '673€'],
              ['200.000€', '1.430€', '1.160€', '898€'],
              ['250.000€', '1.787€', '1.450€', '1.122€'],
              ['300.000€', '2.145€', '1.740€', '1.347€'],
            ].map(([imp, q15, q20, q30]) => (
              <tr key={imp} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-medium">{imp}</td>
                <td className="px-3 py-2 text-center">{q15}</td>
                <td className="px-3 py-2 text-center">{q20}</td>
                <td className="px-3 py-2 text-center">{q30}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>¿Cuánto me cuesta la hipoteca en total?</h2>
      <p>
        La cuota mensual es solo una parte. A lo largo de la vida del préstamo pagarás <strong>mucho más que el capital prestado</strong> en concepto de intereses. Con una hipoteca de 200.000€ a 30 años al 3,5%, el coste total de intereses supera los 123.000€.
      </p>
      <p>
        La amortización anticipada puede ahorrarte decenas de miles de euros. Cada 10.000€ que amortizas antes de tiempo en los primeros años te ahorra mucho más que 10.000€ en intereses.
      </p>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">📊 Simula la amortización completa</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Ve cuánto pagarás en intereses y el efecto de amortizar anticipadamente.</p>
        <Link href="/herramientas/amortizacion-hipoteca"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calcular amortización →
        </Link>
      </div>

      <h2>¿Mejor comprar o alquilar?</h2>
      <p>
        No siempre comprar es mejor que alquilar. Depende del precio de compra, del alquiler de mercado en esa zona, del plazo que vayas a vivir allí y de la evolución del precio de la vivienda. En términos generales, si vas a estar menos de 5-7 años en el mismo lugar, alquilar suele ser más rentable.
      </p>

      <div className="not-prose my-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">🏠 Compara alquiler vs compra</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Calcula el punto de equilibrio y qué opción te sale más rentable en tu caso concreto.</p>
        <Link href="/herramientas/alquiler-vs-compra"
          className="inline-block text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Comparar alquiler vs compra →
        </Link>
      </div>

      <h2>Conclusión</h2>
      <p>
        Antes de pedir una hipoteca, calcula tu capacidad de endeudamiento (máximo 30-35% de ingresos netos), asegúrate de tener el 20% + gastos ahorrados, y simula el coste total a lo largo de la vida del préstamo. No te fijes solo en la cuota mensual.
      </p>
    </>
  );
}
