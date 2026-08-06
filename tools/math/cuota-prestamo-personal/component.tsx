'use client';
import { useState } from 'react';

export default function CuotaPrestamoPersonal() {
  const [capital, setCapital] = useState('10000');
  const [tae, setTae] = useState('6.5');
  const [plazo, setPlazo] = useState('36');
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const C = parseFloat(capital) || 0;
  const r = (parseFloat(tae) || 0) / 100 / 12;
  const n = parseInt(plazo) || 1;

  const cuota = r === 0 ? C / n : (C * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPagar = cuota * n;
  const totalIntereses = totalPagar - C;

  const fmt = (v: number) => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  // Tabla de amortización (primeras 12 + últimas 3 filas)
  const tabla: { mes: number; cuota: number; interes: number; amort: number; pendiente: number }[] = [];
  let pendiente = C;
  for (let i = 1; i <= n; i++) {
    const int = pendiente * r;
    const amort = cuota - int;
    pendiente = Math.max(0, pendiente - amort);
    tabla.push({ mes: i, cuota, interes: int, amort, pendiente });
  }

  const plazos = [12, 24, 36, 48, 60, 72, 84];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital solicitado</label>
          <div className="relative">
            <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="100" step="100"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">TIN / Interés anual (%)</label>
          <div className="relative">
            <input type="number" value={tae} onChange={e => setTae(e.target.value)} min="0" max="100" step="0.1"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Plazo</label>
          <div className="grid grid-cols-7 gap-1">
            {plazos.map(p => (
              <button key={p} onClick={() => setPlazo(String(p))}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors ${plazo === String(p) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {p}m
              </button>
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <input type="range" min="1" max="120" value={plazo} onChange={e => setPlazo(e.target.value)}
              className="flex-1 accent-indigo-600" />
            <span className="text-xs text-gray-500 w-16">{plazo} meses</span>
          </div>
        </div>
      </div>

      {C > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Cuota mensual</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(cuota)}</div>
            <div className="text-xs text-indigo-500 dark:text-indigo-400">durante {plazo} meses</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-gray-500 dark:text-gray-400">Total a pagar</div>
              <div className="font-bold text-gray-900 dark:text-white text-base">{fmt(totalPagar)}</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
              <div className="text-red-500 dark:text-red-400">Total intereses</div>
              <div className="font-bold text-red-700 dark:text-red-400 text-base">{fmt(totalIntereses)}</div>
            </div>
          </div>

          {/* Comparativa de plazos */}
          <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📊 Comparar plazos</summary>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {plazos.map(p => {
                const rr = (parseFloat(tae) || 0) / 100 / 12;
                const c2 = rr === 0 ? C / p : (C * rr * Math.pow(1 + rr, p)) / (Math.pow(1 + rr, p) - 1);
                const t2 = c2 * p - C;
                const isActive = plazo === String(p);
                return (
                  <div key={p} className={`flex justify-between px-3 py-2 text-xs ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/20 font-semibold' : ''}`}>
                    <span className="text-gray-500 dark:text-gray-400">{p} meses</span>
                    <span className="text-gray-900 dark:text-white">{c2.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €/mes</span>
                    <span className="text-red-500">+{t2.toLocaleString('es-ES', { maximumFractionDigits: 0 })} € intereses</span>
                  </div>
                );
              })}
            </div>
          </details>

          {/* Tabla de amortización */}
          <button onClick={() => setMostrarTabla(v => !v)}
            className="w-full py-2 text-xs text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            {mostrarTabla ? '▲ Ocultar tabla' : '▼ Ver tabla de amortización'}
          </button>

          {mostrarTabla && (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>{['Mes', 'Cuota', 'Interés', 'Amort.', 'Pendiente'].map(h => (
                    <th key={h} className="px-2 py-1.5 text-left text-gray-500 dark:text-gray-400 font-medium">{h}</th>
                  ))}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {tabla.slice(0, 12).map(r => (
                    <tr key={r.mes} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-2 py-1 text-gray-500">{r.mes}</td>
                      <td className="px-2 py-1">{r.cuota.toFixed(2)}</td>
                      <td className="px-2 py-1 text-red-500">{r.interes.toFixed(2)}</td>
                      <td className="px-2 py-1 text-green-600">{r.amort.toFixed(2)}</td>
                      <td className="px-2 py-1 font-medium">{r.pendiente.toFixed(2)}</td>
                    </tr>
                  ))}
                  {tabla.length > 12 && <tr><td colSpan={5} className="px-2 py-1 text-center text-gray-400">... {tabla.length - 15} meses ...</td></tr>}
                  {tabla.length > 12 && tabla.slice(-3).map(r => (
                    <tr key={r.mes} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-2 py-1 text-gray-500">{r.mes}</td>
                      <td className="px-2 py-1">{r.cuota.toFixed(2)}</td>
                      <td className="px-2 py-1 text-red-500">{r.interes.toFixed(2)}</td>
                      <td className="px-2 py-1 text-green-600">{r.amort.toFixed(2)}</td>
                      <td className="px-2 py-1 font-medium">{r.pendiente.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* CTA Afiliado — Préstamos personales */}
      <div className="mt-4 rounded-2xl border border-green-100 dark:border-green-900/40 bg-green-50 dark:bg-green-900/10 p-4">
        <p className="text-xs font-semibold text-green-700 dark:text-green-400 mb-2 uppercase tracking-wide">¿Necesitas financiación?</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Compara préstamos personales con las mejores condiciones del mercado. Respuesta en minutos, sin papeleos.</p>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.helpmycash.com/prestamos/" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors">
            Comparar préstamos →
          </a>
          <a href="https://www.cofidis.es/es/prestamos/prestamo-personal.html" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 hover:border-green-400 text-green-700 dark:text-green-300 text-xs font-medium rounded-lg transition-colors">
            Cofidis →
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Enlace patrocinado. Sin coste para ti.</p>
      </div>
    </div>
  );
}
