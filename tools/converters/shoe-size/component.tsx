'use client';
import { useState } from 'react';

// EU, UK, US Men, US Women, CM
const SIZES = [
  [35, 2.5, 4, 5, 22.5],
  [35.5, 3, 4.5, 5.5, 23],
  [36, 3.5, 5, 6, 23.5],
  [37, 4, 5.5, 6.5, 24],
  [37.5, 4.5, 6, 7, 24.5],
  [38, 5, 6.5, 7.5, 25],
  [39, 5.5, 7, 8, 25.5],
  [40, 6, 7.5, 8.5, 26],
  [40.5, 6.5, 8, 9, 26.5],
  [41, 7, 8.5, 9.5, 27],
  [42, 7.5, 9, 10, 27.5],
  [42.5, 8, 9.5, 10.5, 28],
  [43, 8.5, 10, 11, 28.5],
  [44, 9, 10.5, 11.5, 29],
  [44.5, 9.5, 11, 12, 29.5],
  [45, 10, 11.5, 12.5, 30],
  [46, 10.5, 12, 13, 30.5],
  [46.5, 11, 12.5, 13.5, 31],
  [47, 11.5, 13, 14, 31.5],
  [48, 12, 13.5, 14.5, 32],
];

type System = 'EU' | 'UK' | 'USH' | 'USM' | 'CM';
const SYSTEMS: { key: System; label: string }[] = [
  { key: 'EU', label: 'EU' },
  { key: 'UK', label: 'UK' },
  { key: 'USH', label: 'US Hombre' },
  { key: 'USM', label: 'US Mujer' },
  { key: 'CM', label: 'cm' },
];
const IDX: Record<System, number> = { EU: 0, UK: 1, USH: 2, USM: 3, CM: 4 };

export default function ShoeSize() {
  const [from, setFrom] = useState<System>('EU');
  const [value, setValue] = useState('42');

  const num = parseFloat(value);
  const idx = IDX[from];
  const row = SIZES.find(r => r[idx] === num) || SIZES.reduce((best, r) => Math.abs(r[idx] - num) < Math.abs(best[idx] - num) ? r : best, SIZES[0]);

  const found = row[idx] === num;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sistema de entrada</label>
          <select value={from} onChange={e => setFrom(e.target.value as System)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {SYSTEMS.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Talla</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} step="0.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {!isNaN(num) && (
        <>
          {!found && (
            <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
              Talla exacta no encontrada. Mostrando la más cercana ({row[idx]} {from === 'CM' ? 'cm' : ''}).
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {SYSTEMS.filter(s => s.key !== from).map(s => (
              <div key={s.key} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4 text-center">
                <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">{s.label}</div>
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                  {s.key === 'CM' ? row[IDX[s.key]] + ' cm' : row[IDX[s.key]]}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="overflow-auto max-h-52 rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-xs min-w-[340px]">
          <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
            <tr>
              {SYSTEMS.map(s => (
                <th key={s.key} className={`px-3 py-2 font-medium text-center ${s.key === from ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'}`}>{s.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SIZES.map((r, i) => {
              const isActive = r === row;
              return (
                <tr key={i} className={`border-t border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40' : ''}`}
                  onClick={() => setValue(String(r[IDX[from]]))}>
                  {r.map((val, j) => (
                    <td key={j} className={`px-3 py-2 text-center ${isActive ? 'font-bold text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'} ${j === IDX[from] ? 'font-semibold' : ''}`}>
                      {j === 4 ? val + ' cm' : val}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
