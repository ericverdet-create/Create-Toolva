import Link from 'next/link';

export default function Article() {
  return (
    <>
      <h2>¿Qué es el finiquito y qué debe incluir?</h2>
      <p>
        El finiquito es el documento que el trabajador firma al terminar una relación laboral con su empresa. Recoge el pago de todo lo que la empresa le debe: salario pendiente, vacaciones no disfrutadas, partes proporcionales de pagas extra y, en algunos casos, la indemnización por despido.
      </p>
      <p>
        <strong>Importante:</strong> el finiquito y la indemnización son cosas distintas. El finiquito siempre se cobra (es lo que te deben por trabajar). La indemnización solo se cobra en ciertos tipos de fin de contrato.
      </p>

      <h2>Conceptos que incluye siempre el finiquito</h2>
      <ul>
        <li><strong>Salario pendiente</strong>: los días del mes actual trabajados y no cobrados todavía.</li>
        <li><strong>Vacaciones no disfrutadas</strong>: si tienes días de vacaciones del año en curso que no hayas tomado, te los pagan en el finiquito.</li>
        <li><strong>Parte proporcional de pagas extra</strong>: si las pagas extra se cobran en junio/diciembre, la parte proporcional de la extra del periodo no cobrado se incluye en el finiquito.</li>
      </ul>

      <h2>¿Cuándo hay indemnización y cuánto es?</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="text-left px-3 py-2 border border-gray-200 dark:border-gray-700">Tipo de despido</th>
              <th className="px-3 py-2 border border-gray-200 dark:border-gray-700">Indemnización</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Despido improcedente', '33 días/año trabajado (máx. 24 meses de salario)'],
              ['Despido objetivo (causas económicas, etc.)', '20 días/año trabajado (máx. 12 meses de salario)'],
              ['Fin de contrato temporal', '12 días/año trabajado'],
              ['ERE / ERTE con extinción', '20 días/año (puede variar por acuerdo)'],
              ['Baja voluntaria del trabajador', 'Sin indemnización'],
              ['Mutuo acuerdo', 'Lo que se pacte (puede ser 0€)'],
            ].map(([t, i]) => (
              <tr key={t} className="border border-gray-200 dark:border-gray-700">
                <td className="px-3 py-2 font-medium">{t}</td>
                <td className="px-3 py-2">{i}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="not-prose my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl">
        <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">🧮 Calcula tu finiquito e indemnización</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Introduce tu salario, años trabajados y tipo de despido para ver exactamente cuánto te corresponde.</p>
        <Link href="/herramientas/finiquito"
          className="inline-block text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          Calcular finiquito →
        </Link>
      </div>

      <h2>Ejemplo práctico: despido improcedente tras 5 años</h2>
      <p>
        Trabajador con salario bruto de 2.000€/mes, 5 años trabajados, despedido de forma improcedente en agosto:
      </p>
      <ul>
        <li><strong>Salario agosto</strong> (hasta el día del despido): proporcional</li>
        <li><strong>Vacaciones no disfrutadas</strong>: si quedan 15 días = 1.000€</li>
        <li><strong>Parte proporcional paga diciembre</strong>: 8 meses × (2.000€/12) = 1.333€</li>
        <li><strong>Indemnización</strong>: 33 días × 5 años = 165 días × (2.000€/30) = 11.000€</li>
      </ul>
      <p>
        Total aproximado: <strong>~13.500€</strong> (más el salario proporcional de agosto).
      </p>

      <h2>¿Hay que pagar IRPF por el finiquito?</h2>
      <p>
        El finiquito (salario, vacaciones, pagas) tributa como rendimiento del trabajo normal. La indemnización por despido tiene un tratamiento especial:
      </p>
      <ul>
        <li>La indemnización <strong>obligatoria por despido improcedente está exenta de IRPF</strong> hasta el límite legal (33 días/año × años trabajados × salario diario, máximo 180.000€).</li>
        <li>La parte que supere ese límite o que sea pactada voluntariamente sí tributa.</li>
        <li>Las vacaciones e indemnizaciones por fin de contrato temporal tributan normalmente.</li>
      </ul>

      <h2>¿Puedo negarme a firmar el finiquito?</h2>
      <p>
        Sí. Tienes derecho a no firmar si no estás de acuerdo con las cantidades. Puedes firmarlo con la nota "no conforme" o simplemente no firmarlo. En ese caso, podrías reclamar en el SMAC (conciliación previa) o ante el juzgado de lo social.
      </p>
      <p>
        <strong>Truco:</strong> tienes 60 días hábiles desde el despido para reclamar por despido improcedente, y 1 año para reclamar cantidades del finiquito.
      </p>

      <div className="not-prose my-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">💼 ¿Cuánto paro te corresponde después?</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Si te han despedido, calcula también cuánto tiempo y cuánto dinero de paro puedes cobrar.</p>
        <Link href="/herramientas/calculadora-paro"
          className="inline-block text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          Calcular prestación de paro →
        </Link>
      </div>
    </>
  );
}
