import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>¿Cuánto paga un autónomo a la Seguridad Social en 2026?</h2>
      <p>
        Desde 2023, España tiene un nuevo sistema de cotización para autónomos basado en los <strong>ingresos reales</strong>. Ya no existe una cuota fija única: cada autónomo cotiza según lo que gana de verdad, con 15 tramos que van desde los 200€/mes hasta los 590€/mes.
      </p>
      <p>
        Este cambio beneficia a los autónomos con ingresos bajos (que antes pagaban la tarifa plana y luego saltaban a la base mínima) y supone un aumento progresivo para los de ingresos altos.
      </p>

      <h2>Tabla de cuotas por tramos de rendimientos netos (2026)</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Rendimientos netos mensuales</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Cuota mensual 2026</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Menos de 670€', '~200€/mes'],
              ['670€ – 900€', '~220€/mes'],
              ['900€ – 1.166,70€', '~260€/mes'],
              ['1.166,70€ – 1.300€', '~280€/mes'],
              ['1.300€ – 1.500€', '~294€/mes'],
              ['1.500€ – 1.700€', '~310€/mes'],
              ['1.700€ – 1.850€', '~340€/mes'],
              ['1.850€ – 2.030€', '~370€/mes'],
              ['2.030€ – 2.330€', '~400€/mes'],
              ['2.330€ – 2.760€', '~440€/mes'],
              ['2.760€ – 3.190€', '~490€/mes'],
              ['3.190€ – 3.620€', '~530€/mes'],
              ['3.620€ – 4.050€', '~560€/mes'],
              ['4.050€ – 6.000€', '~590€/mes'],
              ['Más de 6.000€', '~590€/mes'],
            ].map(([r, c]) => (
              <tr key={r} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2">{r}</td>
                <td className="px-3 py-2 text-center font-medium text-indigo-600 dark:text-indigo-400">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-gray-500">* Datos orientativos 2026. Los rendimientos netos = ingresos - gastos deducibles - 7% de gastos difícil justificación (o 3% si eres autónomo societario).</p>

      <h2>¿Qué son los "rendimientos netos" para elegir tramo?</h2>
      <p>
        Los rendimientos netos que determinan tu tramo son: <strong>ingresos - gastos deducibles</strong>. A ese resultado se le aplica una reducción del 7% (autónomos personas físicas) o 3% (societarios) en concepto de gastos de difícil justificación.
      </p>
      <p>
        Si tus ingresos anuales son 30.000€ y tienes 8.000€ de gastos, tus rendimientos son 22.000€ anuales → 1.833€/mes → tramo de 1.700-1.850€ → cuota de ~340€/mes.
      </p>

      <h2>Tarifa plana para nuevos autónomos 2026</h2>
      <p>
        Los autónomos que se dan de alta por primera vez (o que lleven más de 2 años sin cotizar) tienen derecho a una <strong>tarifa plana de 80€/mes durante el primer año</strong>. En el segundo año, si los rendimientos no superan el SMI, pueden prorrogar la tarifa reducida.
      </p>
      <p>
        Esta tarifa plana convive con el nuevo sistema de tramos — durante el primer año siempre pagas 80€ independientemente de lo que ganes.
      </p>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🧮 Calcula tu cuota exacta</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce tus ingresos y gastos para ver en qué tramo estás y cuánto pagas.</p>
        <Link href="/herramientas/calculadora-autonomos"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calculadora autónomos →
        </Link>
      </div>

      <h2>¿Qué gastos puedo deducir como autónomo?</h2>
      <p>Los principales gastos deducibles para autónomos en estimación directa:</p>
      <ul>
        <li><strong>Local y suministros</strong>: alquiler, luz, internet si trabaja en local propio. En casa: solo el % de la superficie afecta a la actividad.</li>
        <li><strong>Vehículo</strong>: solo si está afecto exclusivamente a la actividad (muy difícil de justificar en la práctica).</li>
        <li><strong>Seguridad Social</strong>: la cuota de autónomo es deducible al 100%.</li>
        <li><strong>Material y herramientas</strong>: equipos informáticos, software, material de oficina.</li>
        <li><strong>Formación</strong>: cursos y libros relacionados con la actividad.</li>
        <li><strong>Gestoría y asesoría</strong>: honorarios de gestor o asesor fiscal.</li>
        <li><strong>Publicidad y marketing</strong>: web, redes sociales, publicidad.</li>
      </ul>

      <h2>¿Qué pasa si declaro un tramo incorrecto?</h2>
      <p>
        Al final del año, la Seguridad Social compara tu tramo declarado con tus rendimientos reales según la declaración de renta. Si has cotizado de menos, te pedirán la diferencia. Si has cotizado de más, te devolverán el exceso.
      </p>
      <p>
        Puedes cambiar de tramo hasta <strong>6 veces al año</strong> si tus ingresos varían, para ajustarlo a tu situación real en cada momento.
      </p>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">🧾 Calcula tu retención en facturas</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">¿Cuánto IRPF aplicas en tus facturas? ¿Qué pagas en el modelo 130? Calculadoras para autónomos.</p>
        <Link href="/herramientas/calculadora-retencion-irpf-autonomo"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calculadora retención autónomo →
        </Link>
      </div>
    </>
  );
}
