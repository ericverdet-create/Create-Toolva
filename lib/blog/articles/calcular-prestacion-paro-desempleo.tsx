import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>¿Tengo derecho a cobrar el paro?</h2>
      <p>
        Para cobrar la prestación por desempleo en España necesitas cumplir varios requisitos:
      </p>
      <ul>
        <li>Haber cotizado al menos <strong>360 días</strong> en los últimos 6 años</li>
        <li>Estar en situación legal de desempleo (despido, fin de contrato, ERE...)</li>
        <li>No haber cumplido la edad de jubilación</li>
        <li>Estar inscrito como demandante de empleo en el SEPE</li>
        <li>No haber rechazado una oferta de empleo adecuada en los últimos meses</li>
      </ul>
      <p>
        Importante: si renuncias voluntariamente al trabajo, <strong>no tienes derecho al paro</strong>. Solo se cobra en situaciones de cese involuntario.
      </p>

      <h2>¿Cuánto tiempo puedo cobrar el paro?</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Meses cotizados</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Duración prestación</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['360 – 539 días (12-17 meses)', '4 meses'],
              ['540 – 719 días (18-23 meses)', '6 meses'],
              ['720 – 899 días (24-29 meses)', '8 meses'],
              ['900 – 1.079 días (30-35 meses)', '10 meses'],
              ['1.080 – 1.259 días (36-41 meses)', '12 meses'],
              ['1.260 – 1.439 días (42-47 meses)', '16 meses'],
              ['1.440 – 1.619 días (48-53 meses)', '20 meses'],
              ['1.620 – 1.799 días (54-59 meses)', '22 meses'],
              ['1.800 o más días (60+ meses)', '24 meses (máximo)'],
            ].map(([m, d]) => (
              <tr key={m} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{m}</td>
                <td className="px-3 py-2 text-center font-medium text-indigo-600 dark:text-indigo-400">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>¿Cuánto dinero cobro de paro?</h2>
      <p>
        La cuantía se calcula sobre tu <strong>base reguladora</strong>, que es el promedio de las bases de cotización de los últimos 180 días trabajados, dividido entre 180 y multiplicado por 30.
      </p>
      <ul>
        <li><strong>Primeros 180 días</strong>: cobras el 70% de la base reguladora</li>
        <li><strong>A partir del día 181</strong>: cobras el 50% de la base reguladora</li>
      </ul>
      <p>Hay límites máximos y mínimos (datos 2026):</p>
      <ul>
        <li><strong>Mínimo sin hijos</strong>: ~570€/mes</li>
        <li><strong>Mínimo con hijos</strong>: ~680-750€/mes</li>
        <li><strong>Máximo sin hijos</strong>: ~1.250€/mes</li>
        <li><strong>Máximo con hijos</strong>: ~1.400-1.575€/mes</li>
      </ul>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🧮 Calcula tu prestación de paro</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce tu salario y los meses cotizados para obtener cuánto cobrarías y durante cuánto tiempo.</p>
        <Link href="/herramientas/calculadora-paro"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calcular mi prestación de paro →
        </Link>
      </div>

      <h2>Ejemplo práctico: 3 años cotizados, sueldo de 1.800€ brutos</h2>
      <p>Con 1.800€ brutos/mes y 36 meses cotizados en los últimos 6 años:</p>
      <ul>
        <li><strong>Duración</strong>: 12 meses</li>
        <li><strong>Base reguladora</strong>: ~1.300€ (base de cotización sin extras)</li>
        <li><strong>Primeros 6 meses</strong>: 70% × 1.300€ = 910€/mes</li>
        <li><strong>Meses 7-12</strong>: 50% × 1.300€ = 650€/mes (mínimo garantizado)</li>
      </ul>

      <h2>¿El paro tributa en la renta?</h2>
      <p>
        Sí. La prestación por desempleo <strong>tributa en el IRPF</strong> como rendimiento del trabajo. El SEPE aplica una retención en el pago mensual, pero si has cobrado paro y trabajado en el mismo año, es posible que en la declaración de la renta te salga a pagar.
      </p>
      <p>
        Puedes solicitar al SEPE que aumente la retención mensual para evitar sorpresas en la renta.
      </p>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💶 Calcula tu sueldo neto</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">¿Vuelves a trabajar? Calcula cuánto cobrarás neto de tu nuevo salario.</p>
        <Link href="/herramientas/sueldo-neto"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calcular sueldo neto →
        </Link>
      </div>

      <h2>¿Qué pasa cuando se acaba el paro?</h2>
      <p>
        Si agotás la prestación y sigues desempleado, puedes solicitar el <strong>subsidio por desempleo</strong> (ayuda inferior, condicionada a situación económica y familiar). En casos extremos existe la Renta Activa de Inserción (RAI) y las rentas mínimas autonómicas.
      </p>
    </>
  );
}
