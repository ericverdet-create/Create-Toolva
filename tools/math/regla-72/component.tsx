'use client';
import { useState } from 'react';

export default function Regla72() {
  const [tasa, setTasa] = useState('6');
  const [capital, setCapital] = useState('10000');

  const t = parseFloat(tasa) || 0;
  const cap = parseFloat(capital) || 0;

  const anios72 = t > 0 ? 72 / t : null;
  const aniosExacto = t > 0 ? Math.log(2) / Math.log(1 + t / 100) : null;
  const tasaParaDoblarEn = (anios: number) => anios > 0 ? 72 / anios : null;

  const fmt1 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Proyección: capital en el tiempo
  const proyeccion = aniosExacto ? [1, 2, 3, 4, 5].map(mult => ({
    mult,
    anios: Math.round(aniosExacto * mult * 10) / 10,
    capital: cap * Math.pow(2, mult),
  })) : [];

  // Tabla comparativa de tasas
  const tasas = [2, 3, 4, 5, 6, 7, 8, 10, 12];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tasa de interés anual (%)</label>
          <input type="number" value={tasa} onChange={e => setTasa(e.target.value)} min="0.1" max="100" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital inicial (€)</label>
          <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {anios72 && aniosExacto && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
              <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Regla del 72</div>
              <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt1(anios72)}</div>
              <div className="text-xs text-indigo-500 dark:text-indigo-400">años para doblar</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Cálculo exacto</div>
              <div className="text-4xl font-bold text-gray-800 dark:text-gray-200">{fmt1(aniosExacto)}</div>
              <div className="text-xs text-gray-400">años (log)</div>
            </div>
          </div>

          {cap > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Proyección de tu capital</div>
              {proyeccion.map(p => (
                <div key={p.mult} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">x{p.mult} (×{Math.pow(2, p.mult)})</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">en {fmt1(p.anios)} años</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{fmt(p.capital)} €</span>
                </div>
              ))}
            </div>
          )}

          <details className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer">📊 Tabla de tasas vs años para doblar</summary>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {tasas.map(t2 => {
                const a = 72 / t2;
                const isActive = Math.abs(t2 - parseFloat(tasa)) < 0.5;
                return (
                  <div key={t2} className={`flex justify-between px-3 py-1.5 text-xs ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 font-bold text-indigo-700 dark:text-indigo-300' : 'text-gray-600 dark:text-gray-400'}`}>
                    <span>{t2}% anual</span>
                    <span>{fmt1(a)} años</span>
                  </div>
                );
              })}
            </div>
          </details>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Regla del 72: divide 72 entre la tasa anual para estimar los años necesarios para doblar capital con interés compuesto. Precisa para tasas entre 2% y 20%.
          </div>
        </div>
      )}
    </div>
  );
}
