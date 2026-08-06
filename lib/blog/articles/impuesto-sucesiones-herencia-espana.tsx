import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>El impuesto más odiado de España — y por qué varía tanto</h2>
      <p>
        El impuesto de sucesiones es competencia de las comunidades autónomas, lo que significa que pagar por heredar en España puede ir desde prácticamente <strong>0€ en Madrid o Andalucía</strong> hasta un porcentaje significativo en otras comunidades. La diferencia puede ser de miles de euros por exactamente la misma herencia.
      </p>

      <h2>¿Quién paga el impuesto de sucesiones?</h2>
      <p>
        Lo paga el <strong>heredero</strong>, no el fallecido. Se presenta en la comunidad autónoma donde residía el fallecido (no donde vive el heredero), en un plazo de <strong>6 meses desde el fallecimiento</strong> (prorrogable otros 6 meses si se solicita a tiempo).
      </p>

      <h2>Los grupos de parentesco: clave para entender cuánto se paga</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Grupo</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Quién incluye</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Reducción estatal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Grupo I', 'Hijos y adoptados menores de 21 años', '47.859€'],
              ['Grupo II', 'Hijos ≥21, cónyuge, padres, abuelos', '15.957€'],
              ['Grupo III', 'Hermanos, tíos, sobrinos, cuñados', '7.993€'],
              ['Grupo IV', 'Primos, extraños, parejas no casadas', '0€'],
            ].map(([g, q, r]) => (
              <tr key={g} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-medium text-indigo-600 dark:text-indigo-400">{g}</td>
                <td className="px-3 py-2">{q}</td>
                <td className="px-3 py-2 text-center text-green-600 dark:text-green-400 font-medium">{r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        La reducción se resta de la base imponible antes de aplicar los tipos. Cuanto mayor es el parentesco, mayor es la reducción y menor el impuesto.
      </p>

      <h2>¿Cuánto se paga por comunidades? (herencia de 200.000€ entre padre e hijo)</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Comunidad</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Impuesto a pagar</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Bonificación</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Madrid', '~280€', '99%'],
              ['Andalucía', '~280€', '99%'],
              ['Canarias', '~280€', '99,9%'],
              ['Galicia', '~280€', '99%'],
              ['Extremadura', '~280€', '99%'],
              ['C. Valenciana', '~4.300€', '75%'],
              ['Cataluña', '~17.000€', 'Sin bonificación'],
              ['Aragón', '~5.000€', '65%'],
            ].map(([c, i, b]) => (
              <tr key={c} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-medium">{c}</td>
                <td className="px-3 py-2 text-center">{i}</td>
                <td className="px-3 py-2 text-center">{b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">⚖️ Calcula cuánto pagarías tú</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Selecciona tu parentesco, comunidad autónoma y el valor de la herencia para obtener una estimación personalizada.</p>
        <Link href="/herramientas/calculadora-impuesto-sucesiones-herencia"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calcular impuesto de herencias →
        </Link>
      </div>

      <h2>¿Se puede no pagar el impuesto de sucesiones?</h2>
      <p>
        En muchas comunidades autónomas, la respuesta es prácticamente sí para herencias directas (hijos, cónyuge). Pero hay que tener cuidado: <strong>aunque el impuesto sea 0€, hay que presentar la autoliquidación igualmente</strong> dentro del plazo de 6 meses.
      </p>
      <p>
        Renunciar a la herencia también es una opción si las deudas del fallecido superan los activos. En ese caso no se paga nada, pero tampoco se hereda nada.
      </p>

      <h2>Bienes que tienen reducciones adicionales</h2>
      <ul>
        <li><strong>Vivienda habitual</strong>: reducción del 95% del valor (hasta cierto límite) en muchas comunidades</li>
        <li><strong>Empresa familiar</strong>: reducción del 95% si se mantiene durante al menos 5-10 años</li>
        <li><strong>Seguros de vida</strong>: reducción de hasta 9.195€ por beneficiario (grupos I y II)</li>
      </ul>

      <h2>Conclusión</h2>
      <p>
        El impuesto de sucesiones en España depende enormemente de dónde vivía el fallecido, tu parentesco y el tipo de bien heredado. Antes de hacer cualquier planificación, calcula la estimación con tu caso concreto y consulta con un asesor fiscal si la herencia es significativa.
      </p>
    </>
  );
}
