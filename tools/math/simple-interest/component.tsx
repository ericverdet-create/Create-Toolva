'use client';
import { useState } from 'react';

export default function SimpleInterest() {
  const [principal, setPrincipal] = useState('5000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('3');
  const [unit, setUnit] = useState<'years' | 'months' | 'days'>('years');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const P = parseFloat(principal) || 0;
  const R = parseFloat(rate) || 0;
  const T = parseFloat(time) || 0;

  // Convert time to years
  const timeInYears = unit === 'years' ? T : unit === 'months' ? T / 12 : T / 365;
  const interest = P * (R / 100) * timeInYears;
  const total = P + interest;
  const effectiveRate = P > 0 ? (interest / P) * 100 : 0;

  const UNITS = [
    { key: 'years' as const, label: 'Años' },
    { key: 'months' as const, label: 'Meses' },
    { key: 'days' as const, label: 'Días' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capital inicial (€)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tasa de interés anual (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Período</label>
          <div className="flex gap-1 mb-1">
            {UNITS.map(u => (
              <button key={u.key} onClick={() => setUnit(u.key)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition-colors ${unit === u.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>
                {u.label}
              </button>
            ))}
          </div>
          <input type="number" value={time} onChange={e => setTime(e.target.value)} min="0" step="0.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-2">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
          Fórmula: I = P × r × t &nbsp;|&nbsp; I = {fmt(P)} × {R}% × {timeInYears.toFixed(4)} años
        </div>
        {[
          { label: 'Capital inicial (P)', value: fmt(P) },
          { label: `Interés simple (I)`, value: fmt(interest), bold: true },
          { label: 'Tasa efectiva total', value: effectiveRate.toFixed(2) + '%' },
        ].map((r, i) => (
          <div key={i} className={`flex justify-between ${r.bold ? 'font-semibold text-indigo-700 dark:text-indigo-300' : 'text-sm text-gray-600 dark:text-gray-400'}`}>
            <span>{r.label}</span><span>{r.value}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-indigo-200 dark:border-indigo-700 pt-2 font-bold text-lg">
          <span className="text-gray-900 dark:text-white">Monto total (P + I)</span>
          <span className="text-indigo-700 dark:text-indigo-300">{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}
