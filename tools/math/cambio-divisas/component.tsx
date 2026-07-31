'use client';
import { useState } from 'react';

// Tasas aproximadas respecto al EUR (actualizar periódicamente)
const RATES: Record<string, { name: string; symbol: string; rate: number }> = {
  EUR: { name: 'Euro', symbol: '€', rate: 1 },
  USD: { name: 'Dólar estadounidense', symbol: '$', rate: 1.08 },
  GBP: { name: 'Libra esterlina', symbol: '£', rate: 0.856 },
  JPY: { name: 'Yen japonés', symbol: '¥', rate: 162.5 },
  CHF: { name: 'Franco suizo', symbol: 'Fr', rate: 0.957 },
  CAD: { name: 'Dólar canadiense', symbol: 'C$', rate: 1.48 },
  AUD: { name: 'Dólar australiano', symbol: 'A$', rate: 1.66 },
  MXN: { name: 'Peso mexicano', symbol: '$', rate: 19.8 },
  BRL: { name: 'Real brasileño', symbol: 'R$', rate: 6.1 },
  CNY: { name: 'Yuan chino', symbol: '¥', rate: 7.82 },
  INR: { name: 'Rupia india', symbol: '₹', rate: 90.2 },
  RUB: { name: 'Rublo ruso', symbol: '₽', rate: 101.5 },
  KRW: { name: 'Won surcoreano', symbol: '₩', rate: 1450 },
  ARS: { name: 'Peso argentino', symbol: '$', rate: 1050 },
  CLP: { name: 'Peso chileno', symbol: '$', rate: 1020 },
  COP: { name: 'Peso colombiano', symbol: '$', rate: 4450 },
  SEK: { name: 'Corona sueca', symbol: 'kr', rate: 11.3 },
  NOK: { name: 'Corona noruega', symbol: 'kr', rate: 11.7 },
  DKK: { name: 'Corona danesa', symbol: 'kr', rate: 7.46 },
  PLN: { name: 'Złoty polaco', symbol: 'zł', rate: 4.27 },
};

const MONEDAS = Object.keys(RATES);

export default function CambioDivisas() {
  const [cantidad, setCantidad] = useState('100');
  const [de, setDe] = useState('EUR');
  const [a, setA] = useState('USD');

  const v = parseFloat(cantidad) || 0;
  const inEur = v / RATES[de].rate;
  const resultado = inEur * RATES[a].rate;
  const tasaDirect = RATES[a].rate / RATES[de].rate;

  const swap = () => { setDe(a); setA(de); };
  const fmt = (n: number, code: string) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: code === 'JPY' || code === 'KRW' || code === 'CLP' ? 0 : 4 });

  // Tabla de conversión rápida: múltiplos
  const MULTIPLES = [1, 5, 10, 50, 100, 500, 1000];

  return (
    <div className="space-y-4">
      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
        ⚠️ Tasas de referencia orientativas. Para transacciones usa tu banco o una plataforma de cambio oficial.
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cantidad</label>
          <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} min="0" step="any"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">De</label>
            <select value={de} onChange={e => setDe(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
              {MONEDAS.map(m => <option key={m} value={m}>{m} — {RATES[m].name}</option>)}
            </select>
          </div>
          <button onClick={swap} className="mt-4 p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-lg">⇄</button>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">A</label>
            <select value={a} onChange={e => setA(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
              {MONEDAS.map(m => <option key={m} value={m}>{m} — {RATES[m].name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {v > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-sm text-indigo-600 dark:text-indigo-400">{fmt(v, de)} {de} =</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(resultado, a)}</div>
            <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{a}</div>
          </div>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            1 {de} = {fmt(tasaDirect, a)} {a} · 1 {a} = {fmt(1 / tasaDirect, de)} {de}
          </div>

          {/* Tabla de conversión rápida */}
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">Tabla rápida</div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {MULTIPLES.map(m => (
                <div key={m} className="flex justify-between px-3 py-2 text-xs">
                  <span className="text-gray-500">{m} {de}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{fmt(m * tasaDirect, a)} {a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
