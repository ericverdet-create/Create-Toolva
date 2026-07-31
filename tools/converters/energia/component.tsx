'use client';
import { useState } from 'react';

interface Unit { key: string; label: string; toJ: number; }

const UNITS: Unit[] = [
  { key: 'J',    label: 'Julio (J)',           toJ: 1 },
  { key: 'kJ',   label: 'Kilojulio (kJ)',       toJ: 1000 },
  { key: 'MJ',   label: 'Megajulio (MJ)',       toJ: 1e6 },
  { key: 'cal',  label: 'Caloría (cal)',        toJ: 4.184 },
  { key: 'kcal', label: 'Kilocaloría (kcal)',   toJ: 4184 },
  { key: 'Wh',   label: 'Vatio-hora (Wh)',      toJ: 3600 },
  { key: 'kWh',  label: 'Kilovatio-hora (kWh)', toJ: 3.6e6 },
  { key: 'BTU',  label: 'BTU (British)',        toJ: 1055.06 },
  { key: 'eV',   label: 'Electronvoltio (eV)',  toJ: 1.602176634e-19 },
  { key: 'therm',label: 'Therm (EE.UU.)',       toJ: 105480400 },
];

function fmtVal(n: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e12 || (abs < 1e-6 && abs > 0)) return n.toExponential(4);
  if (abs >= 1000) return n.toLocaleString('es-ES', { maximumSignificantDigits: 6 });
  return n.toPrecision(6).replace(/\.?0+$/, '');
}

export default function EnergiaConverter() {
  const [from, setFrom] = useState('kcal');
  const [value, setValue] = useState('100');

  const fromUnit = UNITS.find(u => u.key === from)!;
  const num = parseFloat(value);
  const inJoules = isNaN(num) ? null : num * fromUnit.toJ;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Unidad de entrada</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Valor</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {inJoules !== null && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {UNITS.filter(u => u.key !== from).map((u, i) => {
            const converted = inJoules / u.toJ;
            return (
              <div key={u.key} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-gray-100 dark:border-gray-700' : ''} hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer`}
                onClick={() => { setFrom(u.key); setValue(fmtVal(converted)); }}>
                <span className="text-sm text-gray-600 dark:text-gray-400">{u.label}</span>
                <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{fmtVal(converted)}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        💡 Pulsa cualquier resultado para usarlo como nueva entrada.
      </div>
    </div>
  );
}
