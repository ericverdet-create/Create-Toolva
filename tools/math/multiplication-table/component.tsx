'use client';
import { useState } from 'react';

export default function MultiplicationTable() {
  const [number, setNumber] = useState(7);
  const [upTo, setUpTo] = useState(10);
  const [showGrid, setShowGrid] = useState(false);

  const rows = Array.from({ length: upTo }, (_, i) => i + 1);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número</label>
          <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value) || 1)} min="1" max="999"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hasta</label>
          <select value={upTo} onChange={e => setUpTo(Number(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {[10, 12, 15, 20, 25, 50, 100].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        {[1,2,3,4,5,6,7,8,9,10].map(n => (
          <button key={n} onClick={() => setNumber(n)}
            className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${number === n ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900'}`}>
            {n}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setShowGrid(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${showGrid ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${showGrid ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Vista cuadrícula (1–10)</span>
      </div>

      {!showGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {rows.map(i => (
            <div key={i} className={`flex items-center justify-between rounded-xl px-4 py-2.5 ${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700'}`}>
              <span className="text-gray-600 dark:text-gray-400 font-mono text-sm">{number} × {i} =</span>
              <span className="text-indigo-700 dark:text-indigo-300 font-bold text-lg">{number * i}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="text-xs border-collapse w-full">
            <thead>
              <tr>
                <th className="p-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">×</th>
                {Array.from({length: 10}, (_, i) => i+1).map(i => (
                  <th key={i} className="p-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">{i}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({length: 10}, (_, ri) => ri+1).map(row => (
                <tr key={row}>
                  <td className="p-1 font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-center">{row}</td>
                  {Array.from({length: 10}, (_, ci) => ci+1).map(col => (
                    <td key={col} className={`p-1 text-center ${row === number || col === number ? 'bg-indigo-200 dark:bg-indigo-800 font-bold text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'}`}>
                      {row * col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
