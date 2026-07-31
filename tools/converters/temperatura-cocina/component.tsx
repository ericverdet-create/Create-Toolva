'use client';
import { useState } from 'react';

const GAS_TABLE = [
  { gas: 1, c: 140, f: 284 }, { gas: 2, c: 150, f: 302 }, { gas: 3, c: 160, f: 320 },
  { gas: 4, c: 180, f: 356 }, { gas: 5, c: 190, f: 374 }, { gas: 6, c: 200, f: 392 },
  { gas: 7, c: 220, f: 428 }, { gas: 8, c: 230, f: 446 }, { gas: 9, c: 240, f: 464 },
];

const GUIA = [
  { temp: '50-60', label: '🥩 Carne poco hecha / sous vide', color: 'text-red-600 dark:text-red-400' },
  { temp: '65-70', label: '🥩 Carne al punto', color: 'text-orange-600 dark:text-orange-400' },
  { temp: '70-75', label: '🐓 Pollo / aves (interior seguro)', color: 'text-yellow-600 dark:text-yellow-400' },
  { temp: '80-90', label: '🍖 Cerdo y carnes bien hechas', color: 'text-green-600 dark:text-green-400' },
  { temp: '150-160', label: '🧁 Bizcocho / magdalenas / tartas', color: 'text-blue-600 dark:text-blue-400' },
  { temp: '170-180', label: '🍪 Galletas / soufflé / masa quebrada', color: 'text-indigo-600 dark:text-indigo-400' },
  { temp: '190-200', label: '🍕 Pan / pizza / hojaldre', color: 'text-purple-600 dark:text-purple-400' },
  { temp: '200-220', label: '🥦 Verduras asadas', color: 'text-green-700 dark:text-green-300' },
  { temp: '220-240', label: '🐟 Pescado al horno', color: 'text-cyan-600 dark:text-cyan-400' },
  { temp: '250+', label: '🔥 Pizza napolitana / pan artesano', color: 'text-red-700 dark:text-red-300' },
];

type FromUnit = 'celsius' | 'fahrenheit' | 'gas';

export default function TemperaturaCocina() {
  const [valor, setValor] = useState('180');
  const [desde, setDesde] = useState<FromUnit>('celsius');

  const v = parseFloat(valor) || 0;

  let celsius: number;
  switch (desde) {
    case 'fahrenheit': celsius = (v - 32) * 5 / 9; break;
    case 'gas': { const found = GAS_TABLE.find(g => g.gas === Math.round(v)); celsius = found ? found.c : v * 28 + 112; break; }
    default: celsius = v;
  }
  const fahrenheit = celsius * 9 / 5 + 32;
  const gasNum = GAS_TABLE.find(g => Math.abs(g.c - celsius) < 15)?.gas;

  // Temperatura más cercana en horno convector (suele ser -20°C)
  const convector = celsius - 20;

  const fmt = (n: number) => Math.round(n);

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {[['celsius', '°C'], ['fahrenheit', '°F'], ['gas', '🔥 Gas']].map(([v, l]) => (
          <button key={v} onClick={() => setDesde(v as FromUnit)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${desde === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {desde === 'celsius' ? 'Temperatura en °C' : desde === 'fahrenheit' ? 'Temperatura en °F' : 'Número de gas (1-9)'}
        </label>
        <input type="number" value={valor} onChange={e => setValor(e.target.value)}
          min={desde === 'gas' ? '1' : '0'} max={desde === 'gas' ? '9' : '500'}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-2xl font-bold text-center" />
        {desde === 'gas' && (
          <div className="flex gap-1 mt-2">
            {GAS_TABLE.map(g => (
              <button key={g.gas} onClick={() => setValor(String(g.gas))}
                className={`flex-1 py-1 rounded-lg text-xs font-bold ${valor === String(g.gas) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{g.gas}</button>
            ))}
          </div>
        )}
      </div>

      {v > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: '°C', val: `${fmt(celsius)}°`, active: desde === 'celsius' },
              { label: '°F', val: `${fmt(fahrenheit)}°`, active: desde === 'fahrenheit' },
              { label: 'Gas', val: gasNum ? `Nº ${gasNum}` : '—', active: desde === 'gas' },
            ].map(r => (
              <div key={r.label} className={`rounded-xl p-3 border ${r.active ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                <div className={r.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}>{r.label}</div>
                <div className={`font-bold text-xl ${r.active ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>{r.val}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-600 dark:text-gray-400">
            🌀 Horno convector (ventilación): <strong className="text-gray-900 dark:text-white">{fmt(convector)}°C</strong> — equivalente al convencional
          </div>
        </div>
      )}

      {/* Tabla de gas */}
      <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📋 Tabla completa de gas</summary>
        <div className="grid grid-cols-3 divide-x divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">Gas</div>
          <div className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">°C</div>
          <div className="px-2 py-1 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">°F</div>
          {GAS_TABLE.map(g => (<>
            <div key={`g${g.gas}`} className="px-2 py-1.5 text-xs text-center font-bold text-indigo-600 dark:text-indigo-400">{g.gas}</div>
            <div key={`c${g.gas}`} className="px-2 py-1.5 text-xs text-center text-gray-900 dark:text-white">{g.c}°</div>
            <div key={`f${g.gas}`} className="px-2 py-1.5 text-xs text-center text-gray-500 dark:text-gray-400">{g.f}°</div>
          </>))}
        </div>
      </details>

      {/* Guía de temperaturas */}
      <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">🍳 Guía de temperaturas por alimento</summary>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {GUIA.map(g => (
            <div key={g.temp} className="flex gap-3 px-3 py-2 text-xs">
              <span className="font-bold text-gray-400 w-16 flex-shrink-0">{g.temp}°C</span>
              <span className={g.color}>{g.label}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
