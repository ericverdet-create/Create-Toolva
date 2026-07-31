'use client';
import { useState } from 'react';

function pick(min: number, max: number, count: number, noRepeat = true): number[] {
  const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const result: number[] = [];
  const used = new Set<number>();
  while (result.length < count) {
    const idx = Math.floor(Math.random() * pool.length);
    const n = pool[idx];
    if (!noRepeat || !used.has(n)) { result.push(n); used.add(n); }
  }
  return result.sort((a, b) => a - b);
}

const JUEGOS = [
  {
    nombre: 'Primitiva', emoji: '🎱',
    generar: () => ({ principales: pick(1, 49, 6), extra: pick(0, 9, 1), extraLabel: 'Complementario' }),
  },
  {
    nombre: 'Bonoloto', emoji: '🎰',
    generar: () => ({ principales: pick(1, 49, 6), extra: pick(0, 9, 1), extraLabel: 'Complementario' }),
  },
  {
    nombre: 'Euromillones', emoji: '⭐',
    generar: () => ({ principales: pick(1, 50, 5), extra: pick(1, 12, 2), extraLabel: 'Estrellas' }),
  },
  {
    nombre: 'El Gordo', emoji: '🐷',
    generar: () => ({ principales: pick(1, 54, 5), extra: pick(0, 9, 1), extraLabel: 'Clave' }),
  },
  {
    nombre: 'Personalizado', emoji: '🔧',
    generar: () => ({ principales: [], extra: [], extraLabel: '' }),
  },
];

export default function NumeroSuerte() {
  const [juegoIdx, setJuegoIdx] = useState(0);
  const [resultado, setResultado] = useState<{ principales: number[]; extra: number[]; extraLabel: string } | null>(null);
  const [historial, setHistorial] = useState<typeof resultado[]>([]);
  const [customMin, setCustomMin] = useState('1');
  const [customMax, setCustomMax] = useState('49');
  const [customCount, setCustomCount] = useState('6');

  const generar = () => {
    let res;
    if (juegoIdx === 4) {
      const min = parseInt(customMin) || 1;
      const max = parseInt(customMax) || 49;
      const count = Math.min(parseInt(customCount) || 6, max - min + 1);
      res = { principales: pick(min, max, count), extra: [], extraLabel: '' };
    } else {
      res = JUEGOS[juegoIdx].generar();
    }
    setResultado(res);
    setHistorial(p => [res, ...p.slice(0, 4)]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-1.5">
        {JUEGOS.map((j, i) => (
          <button key={i} onClick={() => { setJuegoIdx(i); setResultado(null); }}
            className={`py-2 rounded-xl text-xs font-medium transition-colors ${juegoIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {j.emoji} {j.nombre}
          </button>
        ))}
      </div>

      {juegoIdx === 4 && (
        <div className="grid grid-cols-3 gap-2">
          {[{ label: 'Mínimo', val: customMin, set: setCustomMin }, { label: 'Máximo', val: customMax, set: setCustomMax }, { label: 'Cantidad', val: customCount, set: setCustomCount }].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="1"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs text-center focus:ring-1 focus:ring-indigo-400 focus:outline-none" />
            </div>
          ))}
        </div>
      )}

      <button onClick={generar}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg active:scale-95">
        🍀 ¡Generar combinación!
      </button>

      {resultado && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {resultado.principales.map(n => (
              <div key={n} className="w-11 h-11 rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">{n}</div>
            ))}
          </div>
          {resultado.extra.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-center text-indigo-600 dark:text-indigo-400 mb-2">{resultado.extraLabel}</div>
              <div className="flex gap-2 justify-center">
                {resultado.extra.map(n => (
                  <div key={n} className="w-11 h-11 rounded-full bg-yellow-400 text-yellow-900 font-bold text-lg flex items-center justify-center shadow-md">{n}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {historial.length > 1 && (
        <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📋 Últimas combinaciones</summary>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {historial.slice(1).map((h, i) => h && (
              <div key={i} className="flex gap-1.5 px-3 py-2 flex-wrap">
                {h.principales.map(n => <span key={n} className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-bold flex items-center justify-center">{n}</span>)}
                {h.extra.map(n => <span key={'e'+n} className="w-7 h-7 rounded-full bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs font-bold flex items-center justify-center">{n}</span>)}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
