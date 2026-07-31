'use client';
import { useState } from 'react';

const UNITS = [
  { key: 'b',   label: 'Bit (b)',             toBytes: 0.125 },
  { key: 'B',   label: 'Byte (B)',            toBytes: 1 },
  { key: 'KB',  label: 'Kilobyte (KB)',       toBytes: 1024 },
  { key: 'MB',  label: 'Megabyte (MB)',       toBytes: 1024**2 },
  { key: 'GB',  label: 'Gigabyte (GB)',       toBytes: 1024**3 },
  { key: 'TB',  label: 'Terabyte (TB)',       toBytes: 1024**4 },
  { key: 'PB',  label: 'Petabyte (PB)',       toBytes: 1024**5 },
  { key: 'Kb',  label: 'Kilobit (Kb)',        toBytes: 125 },
  { key: 'Mb',  label: 'Megabit (Mb)',        toBytes: 125000 },
  { key: 'Gb',  label: 'Gigabit (Gb)',        toBytes: 125000000 },
  { key: 'kB',  label: 'Kilobyte SI (kB)',    toBytes: 1000 },
  { key: 'mB',  label: 'Megabyte SI (MB)',    toBytes: 1000000 },
  { key: 'gB',  label: 'Gigabyte SI (GB)',    toBytes: 1000000000 },
  { key: 'tB',  label: 'Terabyte SI (TB)',    toBytes: 1000000000000 },
];

export default function DataStorageConverter() {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('GB');

  const num = parseFloat(value.replace(',', '.'));
  const fromUnit = UNITS.find(u => u.key === from)!;
  const bytes = isNaN(num) ? null : num * fromUnit.toBytes;

  const fmt = (n: number) => {
    if (n === 0) return '0';
    if (n >= 0.001 && n < 1e15) {
      const s = n.toPrecision(8);
      return parseFloat(s).toString();
    }
    return n.toExponential(3);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unidad</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {bytes !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {UNITS.filter(u => u.key !== from).map(u => (
            <div key={u.key} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-600 dark:text-gray-400">{u.label}</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">{fmt(bytes / u.toBytes)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
