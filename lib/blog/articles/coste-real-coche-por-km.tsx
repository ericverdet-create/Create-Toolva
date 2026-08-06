import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>El error más común al calcular lo que cuesta el coche</h2>
      <p>
        La mayoría de conductores calcula el coste de su coche sumando solo lo que pagan en gasolineras. Pero la gasolina representa <strong>menos del 40% del coste total</strong> de tener un coche. El resto se esconde en gastos fijos que siguen corriendo aunque el coche no se mueva.
      </p>
      <p>
        El coste real por kilómetro incluye: combustible, seguro, amortización (pérdida de valor), mantenimiento, ITV, seguro de responsabilidad civil, neumáticos, aparcamiento y financiación si la hay.
      </p>

      <h2>Desglose real de costes por km</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Concepto</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Coste anual (€)</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">€/km (15.000km)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Combustible (7L/100km · 1,7€/L)', '1.785€', '0,119€'],
              ['Seguro (todo riesgo, 800€)', '800€', '0,053€'],
              ['Amortización (20.000€ → 10 años)', '2.000€', '0,133€'],
              ['Mantenimiento (revisión, frenos...)', '600€', '0,040€'],
              ['Neumáticos (cada 40.000km)', '150€', '0,010€'],
              ['ITV, impuesto circulación', '150€', '0,010€'],
              ['Parking, peajes (estimado)', '600€', '0,040€'],
            ].map(([c, a, k]) => (
              <tr key={c} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{c}</td>
                <td className="px-3 py-2 text-center">{a}</td>
                <td className="px-3 py-2 text-center">{k}</td>
              </tr>
            ))}
            <tr className="bg-indigo-50 dark:bg-indigo-900/20 font-bold border border-gray-200 dark:border-gray-700">
              <td className="px-3 py-2">TOTAL</td>
              <td className="px-3 py-2 text-center">6.085€/año</td>
              <td className="px-3 py-2 text-center text-indigo-600 dark:text-indigo-400">0,406€/km</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Hacienda establece en <strong>0,26€/km</strong> la compensación de kilometraje exenta de IRPF. Como puedes ver, en muchos casos el coste real supera esa cantidad.
      </p>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🚗 Calcula el coste real de tu coche</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce tus datos reales (combustible, seguro, amortización...) y obtén el coste exacto por km.</p>
        <Link href="/herramientas/calculadora-coste-km"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calcular mi coste por km →
        </Link>
      </div>

      <h2>¿Cuánto vale tu coche ahora?</h2>
      <p>
        La amortización es el coste más invisible pero uno de los más grandes. Un coche pierde aproximadamente el <strong>22% de su valor en el primer año</strong>, el 15% en el segundo y va desacelerando progresivamente. A los 5 años, un coche habrá perdido cerca del 55-60% de su valor original.
      </p>
      <p>
        Si compraste un coche de 25.000€ hace 4 años con 60.000km, puedes estimar su valor de venta actual antes de ponerte a negociar.
      </p>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💰 ¿Cuánto vale tu coche de segunda mano?</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Calcula el precio de venta estimado según antigüedad, kilómetros y estado de conservación.</p>
        <Link href="/herramientas/precio-venta-coche"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calcular precio de venta →
        </Link>
      </div>

      <h2>Coste por km en coche eléctrico vs gasolina</h2>
      <p>
        En energía, el eléctrico es claramente más barato: cargar en casa cuesta aproximadamente <strong>0,02-0,03€/km</strong> frente a 0,09-0,12€/km de la gasolina. Pero hay que considerar:
      </p>
      <ul>
        <li>El precio de compra suele ser 8.000-15.000€ más alto → mayor amortización</li>
        <li>El seguro de un eléctrico puede ser un 20-30% más caro</li>
        <li>Menor mantenimiento mecánico (sin cambios de aceite, embrague...)</li>
        <li>La batería puede necesitar sustitución a los 10-15 años (coste alto)</li>
      </ul>
      <p>
        En términos de coste total por km, la diferencia entre gasolina y eléctrico se reduce bastante. El eléctrico compensa especialmente si se hace mucho km al año.
      </p>

      <h2>¿Compensa ir en transporte público?</h2>
      <p>
        Si un coche te cuesta 500€/mes (fijos + variables), con ese dinero puedes pagarte un abono mensual de transporte en cualquier ciudad española y aún te sobra. El cálculo sencillo: si vives en ciudad y haces menos de 15.000km/año, el transporte público suele ser más económico.
      </p>
    </>
  );
}
