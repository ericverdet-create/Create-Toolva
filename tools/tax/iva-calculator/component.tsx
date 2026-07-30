'use client';
import { useState } from 'react';
import { calcIva, IvaMode } from './index';

const RATES = [4, 10, 21];

export default function IvaCalculatorComponent() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(21);
  const [mode, setMode] = useState<IvaMode>('base');
  const [result, setResult] = useState<ReturnType<typeof calcIva> | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    const n = parseFloat(amount.replace(',', '.'));
    if (isNaN(n) || n < 0) { setError('Introduce un importe válido'); return; }
    setError('');
    setResult(calcIva(n, rate, mode));
  }

  const fmt = (n: number) => n.toFixed(2).replace('.', ',') + ' €';

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de IVA</label>
        <div className="flex gap-2">
          {RATES.map(r => (
            <button key={r} onClick={() => setRate(r)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${rate === r ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {r}%
            </button>
          ))}
          <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} min={0} max={100}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="Otro" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Modo de cálculo</label>
        <div className="flex gap-2">
          {[['base', 'Precio sin IVA'], ['total', 'Precio con IVA']].map(([v, l]) => (
            <button key={v} onClick={() => setMode(v as IvaMode)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${mode === v ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {mode === 'base' ? 'Precio sin IVA (€)' : 'Precio con IVA (€)'}
        </label>
        <div className="flex gap-2">
          <input type="text" value={amount} onChange={e => setAmount(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && calculate()}
            placeholder="0,00"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg" />
          <button onClick={calculate}
            className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors">
            Calcular
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>

      {result && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Base imponible</span>
            <span className="font-semibold">{fmt(result.base)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>IVA ({result.rate}%)</span>
            <span className="font-semibold text-brand-700">{fmt(result.iva)}</span>
          </div>
          <div className="border-t border-brand-200 pt-3 flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span className="text-brand-700">{fmt(result.total)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
