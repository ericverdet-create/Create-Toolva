'use client';
import { useState } from 'react';

const UNITS: { key: string; label: string; toLiters: number }[] = [
  { key: 'ml',   label: 'Mililitro (ml)',       toLiters: 0.001 },
  { key: 'cl',   label: 'Centilitro (cl)',       toLiters: 0.01 },
  { key: 'dl',   label: 'Decilitro (dl)',        toLiters: 0.1 },
  { key: 'l',    label: 'Litro (l)',             toLiters: 1 },
  { key: 'm3',   label: 'Metro cúbico (m³)',     toLiters: 1000 },
  { key: 'cm3',  label: 'Centímetro³ (cm³)',     toLiters: 0.001 },
  { key: 'gal',  label: 'Galón US (gal)',        toLiters: 3.78541 },
  { key: 'gal_uk', label: 'Galón UK (gal)',      toLiters: 4.54609 },
  { key: 'fl_oz', label: 'Onza líquida US (fl oz)', toLiters: 0.0295735 },
  { key: 'cup',  label: 'Taza US (cup)',         toLiters: 0.236588 },
  { key: 'pt',   label: 'Pinta US (pt)',         toLiters: 0.473176 },
  { key: 'qt',   label: 'Cuarto US (qt)',        toLiters: 0.946353 },
  { key: 'ft3',  label: 'Pie cúbico (ft³)',      toLiters: 28.3168 },
  { key: 'in3',  label: 'Pulgada cúbica (in³)', toLiters: 0.0163871 },
];

export default function VolumeConverter() {
  const [value, setValue] = useState('1');
  const [from, setFrom] = useState('l');

  const num = parseFloat(value.replace(',', '.'));
  const fromUnit = UNITS.find(u => u.key === from)!;
  const liters = isNaN(num) ? null : num * fromUnit.toLiters;

  const fmt = (n: number) => {
    if (n === 0) return '0';
    if (Math.abs(n) >= 0.001 && Math.abs(n) < 1e9) return n.toPrecision(7).replace(/\.?0+$/, '');
    return n.toExponential(4);
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unidad de origen</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
          </select>
        </div>
      </div>

      {liters !== null && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {UNITS.filter(u => u.key !== from).map(u => (
            <div key={u.key} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2.5">
              <span className="text-sm text-gray-600 dark:text-gray-400">{u.label}</span>
              <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">
                {fmt(liters / u.toLiters)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
