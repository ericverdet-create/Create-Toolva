'use client';
import { useState, useCallback } from 'react';

export default function RandomNumber() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('1');
  const [unique, setUnique] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);
  const [animated, setAnimated] = useState(false);

  const generate = useCallback(() => {
    const minN = parseInt(min) || 0;
    const maxN = parseInt(max) || 100;
    const countN = Math.min(Math.max(1, parseInt(count) || 1), 100);
    if (minN > maxN) return;

    setAnimated(true);
    setTimeout(() => setAnimated(false), 400);

    if (unique) {
      const pool: number[] = [];
      for (let i = minN; i <= maxN; i++) pool.push(i);
      const picked: number[] = [];
      const available = Math.min(countN, pool.length);
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      for (let i = 0; i < available; i++) picked.push(shuffled[i]);
      setResults(picked.sort((a, b) => a - b));
      setHistory(h => [picked, ...h].slice(0, 5));
    } else {
      const nums = Array.from({ length: countN }, () => Math.floor(Math.random() * (maxN - minN + 1)) + minN);
      setResults(nums);
      setHistory(h => [nums, ...h].slice(0, 5));
    }
  }, [min, max, count, unique]);

  const PRESETS = [
    { label: 'Dado (1–6)', min: 1, max: 6, count: 1 },
    { label: '2 dados', min: 1, max: 6, count: 2 },
    { label: 'Lotería primitiva', min: 1, max: 49, count: 6 },
    { label: 'EuroMillones', min: 1, max: 50, count: 5 },
    { label: 'Coin flip (0–1)', min: 0, max: 1, count: 1 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map(p => (
          <button key={p.label} onClick={() => { setMin(String(p.min)); setMax(String(p.max)); setCount(String(p.count)); setResults([]); }}
            className="px-3 py-1.5 rounded-lg text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[['Mínimo', min, setMin], ['Máximo', max, setMax], ['Cantidad', count, setCount]].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label as string}</label>
            <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setUnique(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${unique ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${unique ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Sin repetición</span>
      </div>

      <button onClick={generate}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-colors shadow-lg">
        🎲 Generar
      </button>

      {results.length > 0 && (
        <div className={`transition-all duration-300 ${animated ? 'scale-105' : 'scale-100'}`}>
          <div className="flex flex-wrap gap-3 justify-center">
            {results.map((n, i) => (
              <div key={i} className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                {n}
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length > 1 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs">
          <div className="font-medium text-gray-500 dark:text-gray-400 mb-1">Historial reciente</div>
          {history.slice(1).map((h, i) => (
            <div key={i} className="text-gray-400 dark:text-gray-500">{h.join(', ')}</div>
          ))}
        </div>
      )}
    </div>
  );
}
