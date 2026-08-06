'use client';
import { useState, useMemo } from 'react';

export default function AmortizacionHipoteca() {
  const [capital, setCapital] = useState('150000');
  const [tasa, setTasa] = useState('3.5');
  const [anios, setAnios] = useState('25');
  const [verTodo, setVerTodo] = useState(false);

  const cap = parseFloat(capital) || 0;
  const tasaAnual = parseFloat(tasa) || 0;
  const plazo = parseInt(anios) || 0;

  const tabla = useMemo(() => {
    if (cap <= 0 || tasaAnual <= 0 || plazo <= 0) return [];
    const r = tasaAnual / 100 / 12;
    const n = plazo * 12;
    const cuota = cap * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const rows: { mes: number; cuota: number; interes: number; amortiz: number; pendiente: number }[] = [];
    let pendiente = cap;
    for (let i = 1; i <= n; i++) {
      const interes = pendiente * r;
      const amortiz = cuota - interes;
      pendiente = Math.max(0, pendiente - amortiz);
      rows.push({ mes: i, cuota, interes, amortiz, pendiente });
    }
    return rows;
  }, [cap, tasaAnual, plazo]);

  const cuota = tabla[0]?.cuota ?? 0;
  const totalPagado = cuota * tabla.length;
  const totalIntereses = totalPagado - cap;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const visible = verTodo ? tabla : tabla.slice(0, 24);

  // Yearly summary
  const resumenAnual = [];
  for (let y = 1; y <= plazo; y++) {
    const rows = tabla.slice((y - 1) * 12, y * 12);
    if (rows.length === 0) break;
    resumenAnual.push({
      anio: y,
      intereses: rows.reduce((s, r) => s + r.interes, 0),
      amortizado: rows.reduce((s, r) => s + r.amortiz, 0),
      pendiente: rows[rows.length - 1].pendiente,
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital (€)</label>
          <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo (%)</label>
          <input type="number" value={tasa} onChange={e => setTasa(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años</label>
          <input type="number" value={anios} onChange={e => setAnios(e.target.value)} min="1" max="40"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {cuota > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Cuota mensual</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(cuota)} €</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Total pagado', val: fmt0(totalPagado) + ' €' },
              { label: 'Total intereses', val: fmt0(totalIntereses) + ' €' },
              { label: '% intereses', val: (totalIntereses / totalPagado * 100).toFixed(1) + '%' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <details className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📅 Resumen anual</summary>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[340px]">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-3 py-2 text-left text-gray-500 dark:text-gray-400">Año</th>
                    <th className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">Intereses</th>
                    <th className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">Amortizado</th>
                    <th className="px-3 py-2 text-right text-gray-500 dark:text-gray-400">Pendiente</th>
                  </tr>
                </thead>
                <tbody>
                  {resumenAnual.map(r => (
                    <tr key={r.anio} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="px-3 py-1.5 text-gray-700 dark:text-gray-300">Año {r.anio}</td>
                      <td className="px-3 py-1.5 text-right text-red-600 dark:text-red-400">{fmt0(r.intereses)} €</td>
                      <td className="px-3 py-1.5 text-right text-green-600 dark:text-green-400">{fmt0(r.amortizado)} €</td>
                      <td className="px-3 py-1.5 text-right text-gray-700 dark:text-gray-300">{fmt0(r.pendiente)} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>

          <details className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📋 Cuadro mensual detallado</summary>
            <div className="overflow-x-auto max-h-64">
              <table className="w-full text-xs min-w-[400px]">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                  <tr>
                    <th className="px-2 py-2 text-left text-gray-500 dark:text-gray-400">Mes</th>
                    <th className="px-2 py-2 text-right text-gray-500 dark:text-gray-400">Cuota</th>
                    <th className="px-2 py-2 text-right text-gray-500 dark:text-gray-400">Interés</th>
                    <th className="px-2 py-2 text-right text-gray-500 dark:text-gray-400">Capital</th>
                    <th className="px-2 py-2 text-right text-gray-500 dark:text-gray-400">Pendiente</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map(r => (
                    <tr key={r.mes} className="border-t border-gray-100 dark:border-gray-700">
                      <td className="px-2 py-1 text-gray-500 dark:text-gray-400">{r.mes}</td>
                      <td className="px-2 py-1 text-right text-gray-700 dark:text-gray-300">{fmt(r.cuota)}</td>
                      <td className="px-2 py-1 text-right text-red-500">{fmt(r.interes)}</td>
                      <td className="px-2 py-1 text-right text-green-600 dark:text-green-400">{fmt(r.amortiz)}</td>
                      <td className="px-2 py-1 text-right text-gray-700 dark:text-gray-300">{fmt(r.pendiente)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {tabla.length > 24 && (
                <button onClick={() => setVerTodo(!verTodo)}
                  className="w-full py-2 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                  {verTodo ? '▲ Mostrar menos' : `▼ Ver todos los ${tabla.length} meses`}
                </button>
              )}
            </div>
          </details>
        </div>
      )}

      {/* CTA Afiliado — Hipotecas */}
      <div className="mt-4 rounded-2xl border border-blue-100 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-900/10 p-4">
        <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-2 uppercase tracking-wide">¿Buscas la mejor hipoteca?</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Compara hipotecas variables, fijas y mixtas de los principales bancos españoles y elige la que más te ahorra.</p>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.helpmycash.com/hipotecas/" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
            Comparar hipotecas →
          </a>
          <a href="https://www.iahorro.com/hipotecas/" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-800 hover:border-blue-400 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg transition-colors">
            iAhorro hipotecas →
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Enlace patrocinado. Sin coste para ti.</p>
      </div>
    </div>
  );
}
