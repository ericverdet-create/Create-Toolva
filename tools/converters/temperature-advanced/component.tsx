'use client';
import { useState } from 'react';
import { convertTemp, TEMP_UNITS, TEMP_SYMBOLS, TempUnit } from './index';

const UNITS = Object.keys(TEMP_UNITS) as TempUnit[];

export default function TemperatureAdvancedComponent() {
  const [value, setValue] = useState('');
  const [from, setFrom] = useState<TempUnit>('C');
  const [results, setResults] = useState<Record<TempUnit, number> | null>(null);

  function convert(val: string, unit: TempUnit) {
    const n = parseFloat(val.replace(',', '.'));
    if (!isNaN(n)) setResults(convertTemp(n, unit));
    else setResults(null);
  }

  const fmt = (n: number) => {
    const rounded = Math.round(n * 10000) / 10000;
    return rounded.toLocaleString('es-ES', { maximumFractionDigits: 4 });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Escala de origen</label>
        <div className="flex flex-wrap gap-2">
          {UNITS.map(u => (
            <button key={u} onClick={() => { setFrom(u); convert(value, u); }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${from === u ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {TEMP_SYMBOLS[u]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Temperatura en {TEMP_UNITS[from]}
        </label>
        <input type="text" value={value}
          onChange={e => { setValue(e.target.value); convert(e.target.value, from); }}
          placeholder="Introduce un valor"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg" />
      </div>

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {UNITS.map(u => (
            <div key={u} className={`p-4 rounded-xl border ${u === from ? 'bg-brand-50 border-brand-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="text-sm text-gray-500 mb-1">{TEMP_UNITS[u]}</div>
              <div className="text-2xl font-bold text-gray-900">{fmt(results[u])} <span className="text-brand-600 text-lg">{TEMP_SYMBOLS[u]}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
