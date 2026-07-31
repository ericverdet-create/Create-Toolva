'use client';
import { useState } from 'react';

interface Row { label: string; value: string; weight: string; }

const DEFAULT_ROWS: Row[] = [
  { label: 'Examen parcial', value: '7.5', weight: '30' },
  { label: 'Examen final', value: '8.0', weight: '50' },
  { label: 'Trabajos', value: '9.0', weight: '20' },
];

export default function WeightedAverage() {
  const [rows, setRows] = useState<Row[]>(DEFAULT_ROWS);
  const [mode, setMode] = useState<'weighted' | 'simple'>('weighted');

  const updateRow = (i: number, key: keyof Row, val: string) => {
    setRows(r => r.map((row, idx) => idx === i ? { ...row, [key]: val } : row));
  };
  const addRow = () => setRows(r => [...r, { label: `Elemento ${r.length + 1}`, value: '', weight: '' }]);
  const removeRow = (i: number) => setRows(r => r.filter((_, idx) => idx !== i));

  const parsed = rows.map(r => ({ v: parseFloat(r.value), w: parseFloat(r.weight) }));
  const valid = parsed.filter(r => !isNaN(r.v) && (mode === 'simple' || !isNaN(r.w)));

  const sumW = valid.reduce((s, r) => s + (mode === 'weighted' ? r.w : 1), 0);
  const weighted = sumW > 0 ? valid.reduce((s, r) => s + r.v * (mode === 'weighted' ? r.w : 1), 0) / sumW : null;
  const simple = valid.length > 0 ? valid.reduce((s, r) => s + r.v, 0) / valid.length : null;
  const result = mode === 'weighted' ? weighted : simple;

  const min = valid.length > 0 ? Math.min(...valid.map(r => r.v)) : null;
  const max = valid.length > 0 ? Math.max(...valid.map(r => r.v)) : null;

  return (
    <div className="space-y-4">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {['weighted', 'simple'].map(m => (
          <button key={m} onClick={() => setMode(m as 'weighted' | 'simple')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {m === 'weighted' ? 'Media Ponderada' : 'Media Simple'}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <div className={`grid gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-1 ${mode === 'weighted' ? 'grid-cols-[1fr_80px_80px_32px]' : 'grid-cols-[1fr_80px_32px]'}`}>
          <span>Etiqueta</span>
          <span className="text-center">Valor</span>
          {mode === 'weighted' && <span className="text-center">Peso (%)</span>}
          <span />
        </div>

        {rows.map((row, i) => (
          <div key={i} className={`grid gap-2 items-center ${mode === 'weighted' ? 'grid-cols-[1fr_80px_80px_32px]' : 'grid-cols-[1fr_80px_32px]'}`}>
            <input value={row.label} onChange={e => updateRow(i, 'label', e.target.value)}
              placeholder="Nombre"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <input type="number" value={row.value} onChange={e => updateRow(i, 'value', e.target.value)}
              placeholder="0"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
            {mode === 'weighted' && (
              <input type="number" value={row.weight} onChange={e => updateRow(i, 'weight', e.target.value)}
                placeholder="0"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
            )}
            <button onClick={() => removeRow(i)} disabled={rows.length <= 1}
              className="text-gray-400 hover:text-red-500 disabled:opacity-30 text-lg leading-none">×</button>
          </div>
        ))}

        <button onClick={addRow}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          + Añadir fila
        </button>
      </div>

      {mode === 'weighted' && sumW > 0 && Math.abs(sumW - 100) > 0.1 && (
        <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2">
          ⚠️ Los pesos suman {sumW.toFixed(1)}% (recomendado: 100%)
        </div>
      )}

      {result !== null && valid.length > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">{mode === 'weighted' ? 'Media ponderada' : 'Media simple'}</div>
            <div className="text-5xl font-bold">{result.toFixed(2)}</div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Mínimo', value: min?.toFixed(2) },
              { label: 'Máximo', value: max?.toFixed(2) },
              { label: 'Elementos', value: valid.length },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
