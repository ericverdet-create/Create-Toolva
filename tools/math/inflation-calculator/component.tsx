'use client';
import { useState } from 'react';

// Spain CPI annual average (INE data, base 2021=100 approx)
// IPC general España variación anual media
const IPC_SPAIN: Record<number, number> = {
  2000: 3.5, 2001: 2.8, 2002: 3.6, 2003: 3.0, 2004: 3.0,
  2005: 3.4, 2006: 3.5, 2007: 2.8, 2008: 4.1, 2009: -0.3,
  2010: 1.8, 2011: 3.2, 2012: 2.4, 2013: 1.4, 2014: -0.2,
  2015: -0.5, 2016: -0.2, 2017: 2.0, 2018: 1.7, 2019: 0.7,
  2020: -0.3, 2021: 3.1, 2022: 8.4, 2023: 3.5, 2024: 2.8,
};

function getEquivalent(amount: number, fromYear: number, toYear: number): number {
  let value = amount;
  if (fromYear < toYear) {
    for (let y = fromYear + 1; y <= toYear; y++) {
      value *= 1 + (IPC_SPAIN[y] || 2.5) / 100;
    }
  } else {
    for (let y = fromYear; y > toYear; y--) {
      value /= 1 + (IPC_SPAIN[y] || 2.5) / 100;
    }
  }
  return value;
}

const YEARS = Object.keys(IPC_SPAIN).map(Number).sort();

export default function InflationCalculator() {
  const [amount, setAmount] = useState('1000');
  const [fromYear, setFromYear] = useState(2010);
  const [toYear, setToYear] = useState(2024);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const base = parseFloat(amount) || 0;
  const result = base > 0 ? getEquivalent(base, fromYear, toYear) : 0;
  const diff = result - base;
  const pct = base > 0 ? ((result - base) / base) * 100 : 0;
  const lost = fromYear < toYear ? base - getEquivalent(base, toYear, fromYear) : 0;

  const selectClass = "border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none w-full";

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cantidad (€)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Año de origen</label>
          <select value={fromYear} onChange={e => setFromYear(Number(e.target.value))} className={selectClass}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Año destino</label>
          <select value={toYear} onChange={e => setToYear(Number(e.target.value))} className={selectClass}>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {base > 0 && fromYear !== toYear && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">
              {fmt(base)} en {fromYear} equivalen a
            </div>
            <div className="text-4xl font-bold">{fmt(result)}</div>
            <div className="text-sm opacity-70 mt-1">en {toYear}</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Diferencia</div>
              <div className={`font-bold text-lg ${diff >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                {diff >= 0 ? '+' : ''}{fmt(diff)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Variación IPC acumulada</div>
              <div className={`font-bold text-lg ${pct >= 0 ? 'text-red-500' : 'text-green-600'}`}>
                {pct >= 0 ? '+' : ''}{pct.toFixed(1)}%
              </div>
            </div>
          </div>

          {fromYear < toYear && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-sm text-amber-800 dark:text-amber-300">
              💡 {fmt(base)} de {fromYear} han perdido <strong>{fmt(Math.abs(diff))} de poder adquisitivo</strong> hasta {toYear}.
              <span className="block mt-1 text-xs text-amber-600 dark:text-amber-400">
                Fuente: IPC general España (INE). Datos anuales medios.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
