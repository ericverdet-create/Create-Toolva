'use client';
import { useState } from 'react';

const RATE = 166.386; // pesetas per euro (official fixed rate)

export default function EurosPesetas() {
  const [euros, setEuros] = useState('100');
  const [pesetas, setPesetas] = useState(String((100 * RATE).toFixed(0)));
  const [direction, setDirection] = useState<'ep' | 'pe'>('ep');

  const handleEuros = (val: string) => {
    setEuros(val);
    setDirection('ep');
    const n = parseFloat(val);
    if (!isNaN(n)) setPesetas(Math.round(n * RATE).toString());
    else setPesetas('');
  };

  const handlePesetas = (val: string) => {
    setPesetas(val);
    setDirection('pe');
    const n = parseFloat(val);
    if (!isNaN(n)) setEuros((n / RATE).toFixed(2));
    else setEuros('');
  };

  const fmtE = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtP = (n: number) => Math.round(n).toLocaleString('es-ES');

  const eVal = parseFloat(euros) || 0;
  const pVal = parseFloat(pesetas) || 0;

  const EJEMPLOS = [
    { label: 'Café', euros: 1.5 },
    { label: 'Menú', euros: 12 },
    { label: 'Alquiler medio', euros: 900 },
    { label: 'Salario mínimo', euros: 1134 },
    { label: 'Coche mediano', euros: 20000 },
    { label: 'Piso en Madrid', euros: 350000 },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 text-sm text-yellow-800 dark:text-yellow-300 text-center">
        Tipo de cambio oficial: <strong>1 € = 166,386 ₧</strong> (fijo desde 1999)
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Euros (€)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">€</span>
            <input type="number" value={euros} onChange={e => handleEuros(e.target.value)} min="0" step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl pl-8 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg" />
          </div>
        </div>

        <div className="flex items-center justify-center text-2xl text-gray-400">⇅</div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pesetas (₧)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₧</span>
            <input type="number" value={pesetas} onChange={e => handlePesetas(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl pl-8 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg" />
          </div>
        </div>
      </div>

      {eVal > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center text-sm text-gray-600 dark:text-gray-400">
          {fmtE(eVal)} € = <strong className="text-indigo-700 dark:text-indigo-300">{fmtP(eVal * RATE)} pesetas</strong>
          <span className="block text-xs mt-0.5">{fmtP(pVal)} ₧ = {fmtE(pVal / RATE)} €</span>
        </div>
      )}

      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Ejemplos de precios actuales en pesetas</div>
        <div className="space-y-1">
          {EJEMPLOS.map(e => (
            <button key={e.label} onClick={() => handleEuros(String(e.euros))}
              className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-sm transition-colors">
              <span className="text-gray-600 dark:text-gray-400">{e.label} ({fmtE(e.euros)} €)</span>
              <span className="font-medium text-indigo-700 dark:text-indigo-300">{fmtP(e.euros * RATE)} ₧</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
