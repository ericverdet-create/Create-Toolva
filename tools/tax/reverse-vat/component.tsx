'use client';
import { useState } from 'react';

const RATES = [4, 10, 21];

export default function ReverseVat() {
  const [total, setTotal] = useState('121');
  const [rate, setRate] = useState(21);
  const [mode, setMode] = useState<'extract' | 'add'>('extract');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const totalN = parseFloat(total) || 0;
  const rateDecimal = rate / 100;

  let base = 0, vatAmount = 0, withVat = 0;

  if (mode === 'extract') {
    // Total includes VAT → extract base
    base = totalN / (1 + rateDecimal);
    vatAmount = totalN - base;
    withVat = totalN;
  } else {
    // Base → add VAT
    base = totalN;
    vatAmount = totalN * rateDecimal;
    withVat = totalN + vatAmount;
  }

  const rows = [
    { label: 'Base imponible (sin IVA)', value: fmt(base), highlight: mode === 'extract' },
    { label: `IVA (${rate}%)`, value: fmt(vatAmount), highlight: false },
    { label: 'Total (con IVA)', value: fmt(withVat), highlight: mode === 'add' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {([['extract', 'Extraer IVA del total'], ['add', 'Añadir IVA a la base']] as const).map(([m, label]) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${mode === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {mode === 'extract' ? 'Precio total con IVA (€)' : 'Base imponible / precio sin IVA (€)'}
          </label>
          <input type="number" value={total} onChange={e => setTotal(e.target.value)} min="0" step="0.01"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de IVA</label>
          <div className="flex gap-2">
            {RATES.map(r => (
              <button key={r} onClick={() => setRate(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${rate === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>
                {r}%
              </button>
            ))}
          </div>
          <div className="mt-1">
            <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} min="0" max="100" step="0.5"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
              placeholder="Tipo personalizado..." />
          </div>
        </div>
      </div>

      {totalN > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-2">
          {rows.map((r, i) => (
            <div key={i} className={`flex justify-between items-center ${r.highlight ? 'font-bold text-lg border-t border-indigo-200 dark:border-indigo-700 pt-2 mt-1' : 'text-sm'}`}>
              <span className={r.highlight ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}>{r.label}</span>
              <span className={r.highlight ? 'text-indigo-700 dark:text-indigo-300 text-xl' : 'text-gray-900 dark:text-white'}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
