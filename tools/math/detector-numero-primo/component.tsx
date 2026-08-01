'use client';
import { useState } from 'react';

function esPrimo(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function factorizar(n: number): { factor: number; exp: number }[] {
  if (n <= 1) return [];
  const factores: { factor: number; exp: number }[] = [];
  let num = n;
  for (let d = 2; d * d <= num; d++) {
    if (num % d === 0) {
      let exp = 0;
      while (num % d === 0) { exp++; num = Math.floor(num / d); }
      factores.push({ factor: d, exp });
    }
  }
  if (num > 1) factores.push({ factor: num, exp: 1 });
  return factores;
}

function primoEnRango(desde: number, hasta: number): number[] {
  const limite = Math.min(hasta, desde + 500);
  const result: number[] = [];
  for (let i = Math.max(2, desde); i <= limite; i++) {
    if (esPrimo(i)) result.push(i);
    if (result.length >= 100) break;
  }
  return result;
}

function getDivisores(n: number): number[] {
  if (n > 100000) return [];
  const d: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) { d.push(i); if (i !== n / i) d.push(n / i); }
  }
  return d.sort((a, b) => a - b);
}

export default function DetectorNumeroPrimo() {
  const [numero, setNumero] = useState('97');
  const [desde, setDesde] = useState('1');
  const [hasta, setHasta] = useState('100');
  const [modo, setModo] = useState<'verificar' | 'rango'>('verificar');

  const n = parseInt(numero) || 0;
  const primo = n >= 2 ? esPrimo(n) : false;
  const factores = n > 1 ? factorizar(n) : [];
  const divisores = getDivisores(n);
  const primosEnRango = primoEnRango(parseInt(desde) || 1, parseInt(hasta) || 100);

  const NUMS_RAPIDOS = [2, 7, 13, 17, 23, 97, 101, 997, 9973];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {[{ id: 'verificar', label: '🔍 Verificar número' }, { id: 'rango', label: '📋 Primos en rango' }].map(m => (
          <button key={m.id} onClick={() => setModo(m.id as 'verificar' | 'rango')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${modo === m.id ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {modo === 'verificar' ? (
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Número a verificar</label>
            <input type="number" value={numero} onChange={e => setNumero(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center text-lg font-mono" />
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {NUMS_RAPIDOS.map(q => (
              <button key={q} onClick={() => setNumero(String(q))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono ${esPrimo(q) ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                {q}
              </button>
            ))}
          </div>

          {n >= 2 && (
            <div className={`rounded-2xl p-4 text-center border-2 ${primo ? 'bg-green-50 dark:bg-green-900/20 border-green-400 dark:border-green-700' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-400 dark:border-orange-700'}`}>
              <div className="text-4xl mb-1">{primo ? '✅' : '❌'}</div>
              <div className={`text-xl font-bold ${primo ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'}`}>
                {n.toLocaleString('es-ES')} {primo ? 'ES primo' : 'NO es primo'}
              </div>
              {primo && <div className="text-xs text-green-600 dark:text-green-400 mt-1">Solo divisible por 1 y por sí mismo</div>}
            </div>
          )}

          {n === 1 && <div className="text-center text-gray-500 text-sm py-2">El 1 no se considera primo ni compuesto</div>}
          {n === 0 && <div className="text-center text-gray-500 text-sm py-2">Introduce un número mayor que 0</div>}

          {!primo && factores.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Factorización en primos</div>
              <div className="font-mono text-sm text-gray-800 dark:text-gray-200">
                {n.toLocaleString('es-ES')} = {factores.map((f, i) => (
                  <span key={f.factor}>
                    {i > 0 && ' × '}
                    <span className="text-indigo-600 dark:text-indigo-400">{f.factor}</span>
                    {f.exp > 1 && <sup>{f.exp}</sup>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {divisores.length > 0 && divisores.length <= 30 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Divisores ({divisores.length})
              </div>
              <div className="flex flex-wrap gap-1">
                {divisores.map(d => (
                  <span key={d} onClick={() => setNumero(String(d))}
                    className={`px-2 py-0.5 rounded text-xs font-mono cursor-pointer ${esPrimo(d) ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                    {d}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400">Los azules son primos. Haz clic para verificarlos.</div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Desde</label>
              <input type="number" value={desde} onChange={e => setDesde(e.target.value)} min="1"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Hasta</label>
              <input type="number" value={hasta} onChange={e => setHasta(e.target.value)} min="1"
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {[[1,50],[1,100],[1,1000],[100,200]].map(([d, h]) => (
              <button key={`${d}-${h}`} onClick={() => { setDesde(String(d)); setHasta(String(h)); }}
                className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {d}–{h}
              </button>
            ))}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
            <div className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
              {primosEnRango.length} primos encontrados
            </div>
            <div className="flex flex-wrap gap-1.5">
              {primosEnRango.map(p => (
                <span key={p} onClick={() => { setModo('verificar'); setNumero(String(p)); }}
                  className="px-2 py-0.5 bg-indigo-600 text-white rounded text-xs font-mono cursor-pointer hover:bg-indigo-700">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
