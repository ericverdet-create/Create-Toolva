'use client';
import { useState } from 'react';
import { toScientific, fromScientific, parseDecimal, SciResult } from './index';

export default function ScientificNotationComponent() {
  const [mode, setMode] = useState<'toSci' | 'fromSci'>('toSci');
  const [decimal, setDecimal] = useState('');
  const [coef, setCoef] = useState('');
  const [exp, setExp] = useState('');
  const [result, setResult] = useState<SciResult | null>(null);
  const [error, setError] = useState('');

  function convertDecimal() {
    const n = parseDecimal(decimal);
    if (n === null) { setError('Número inválido'); return; }
    setError('');
    setResult(toScientific(n));
  }

  function convertFromSci() {
    const c = parseDecimal(coef), e = parseInt(exp);
    if (c === null || isNaN(e)) { setError('Introduce coeficiente y exponente válidos'); return; }
    setError('');
    setResult(fromScientific(c, e));
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[['toSci', 'Decimal → Científica'], ['fromSci', 'Científica → Decimal']].map(([v, l]) => (
          <button key={v} onClick={() => { setMode(v as typeof mode); setResult(null); setError(''); }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${mode === v ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {l}
          </button>
        ))}
      </div>

      {mode === 'toSci' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Número decimal</label>
          <div className="flex gap-2">
            <input value={decimal} onChange={e => setDecimal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && convertDecimal()}
              placeholder="Ej: 0,000000123 o 6020000000000000000000000"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
            <button onClick={convertDecimal}
              className="px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors">
              Convertir
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">Notación: coeficiente × 10^exponente</label>
          <div className="flex gap-2 items-center">
            <input value={coef} onChange={e => setCoef(e.target.value)}
              placeholder="Coeficiente (ej: 6,022)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
            <span className="text-gray-500 font-mono text-lg">× 10^</span>
            <input value={exp} onChange={e => setExp(e.target.value)} type="number"
              placeholder="Exp"
              className="w-24 px-3 py-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
          </div>
          <button onClick={convertFromSci}
            className="w-full py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors">
            Convertir
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Notación científica</p>
            <p className="text-2xl font-bold text-brand-700 font-mono">{result.scientific}</p>
          </div>
          <div className="border-t border-brand-100 pt-4">
            <p className="text-sm text-gray-500 mb-1">Número decimal</p>
            <p className="text-lg font-semibold text-gray-900 font-mono break-all">{result.decimal}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-brand-100 pt-4">
            <div>
              <p className="text-xs text-gray-400">Coeficiente</p>
              <p className="font-semibold">{result.coefficient}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Exponente</p>
              <p className="font-semibold">10^{result.exponent}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
        <p className="font-medium text-gray-700">Ejemplos rápidos</p>
        {[
          ['Número de Avogadro', '6,022 × 10²³'],
          ['Velocidad de la luz', '3 × 10⁸ m/s'],
          ['Carga del electrón', '1,602 × 10⁻¹⁹ C'],
        ].map(([name, val]) => (
          <p key={name}><span className="text-gray-500">{name}:</span> <span className="font-mono">{val}</span></p>
        ))}
      </div>
    </div>
  );
}
