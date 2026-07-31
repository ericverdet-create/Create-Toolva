'use client';
import { useState } from 'react';

// Tipos de interés legal del dinero y demora en España (art. 1 Ley Presupuestos cada año)
const TIPOS: Record<string, { legal: number; demora: number }> = {
  '2025': { legal: 3.25, demora: 6.25 },
  '2024': { legal: 3.25, demora: 6.25 },
  '2023': { legal: 3.25, demora: 6.25 },
  '2022': { legal: 3.00, demora: 4.00 },
  '2021': { legal: 3.00, demora: 4.00 },
  '2020': { legal: 3.00, demora: 4.00 },
  '2019': { legal: 3.00, demora: 4.00 },
  '2018': { legal: 3.00, demora: 4.00 },
  '2017': { legal: 3.00, demora: 4.00 },
  '2016': { legal: 3.00, demora: 4.00 },
};

export default function InteresDemora() {
  const [capital, setCapital] = useState('5000');
  const [fechaInicio, setFechaInicio] = useState('2024-01-01');
  const [fechaFin, setFechaFin] = useState(new Date().toISOString().slice(0, 10));
  const [tipo, setTipo] = useState<'demora' | 'legal'>('demora');
  const [anio, setAnio] = useState('2025');

  const cap = parseFloat(capital) || 0;
  const d1 = new Date(fechaInicio);
  const d2 = new Date(fechaFin);
  const dias = Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));

  const tasaAnual = TIPOS[anio]?.[tipo] ?? TIPOS['2025'][tipo];
  const intereses = cap * (tasaAnual / 100) * (dias / 365);
  const total = cap + intereses;

  const fmt = (n: number, dec = 2) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de interés</label>
        <div className="flex gap-2">
          {([['demora', 'Demora (mora)'], ['legal', 'Legal del dinero']] as const).map(([v, l]) => (
            <button key={v} onClick={() => setTipo(v)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${tipo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital (€)</label>
          <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Año aplicable</label>
          <select value={anio} onChange={e => setAnio(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {Object.keys(TIPOS).sort((a, b) => parseInt(b) - parseInt(a)).map(y => (
              <option key={y} value={y}>{y} — {tipo === 'demora' ? TIPOS[y].demora : TIPOS[y].legal}%</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha inicio impago</label>
          <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha fin (cobro)</label>
          <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {cap > 0 && dias > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Intereses de demora</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(intereses)} €</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">Total a reclamar: <span className="font-bold">{fmt(total)} €</span></div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Días de mora', val: String(dias) },
              { label: 'Tasa anual', val: tasaAnual + '%' },
              { label: 'Capital inicial', val: fmt(cap) + ' €' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
            Fórmula: Capital × (tipo% / 100) × (días / 365). Interés de demora = tipo legal + 2 puntos (art. 1108 CC y Ley 3/2004 morosidad comercial).
          </div>
        </div>
      )}
    </div>
  );
}
