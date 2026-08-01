'use client';
import { useState } from 'react';

function mcd(a: number, b: number): number { return b === 0 ? a : mcd(b, a % b); }

function decimalAFraccion(decimal: number): { num: number; den: number; str: string } {
  if (Number.isInteger(decimal)) return { num: decimal, den: 1, str: `${decimal}/1` };
  const str = decimal.toString();
  const decimales = (str.split('.')[1] || '').length;
  const den = Math.pow(10, decimales);
  const num = Math.round(decimal * den);
  const divisor = mcd(Math.abs(num), den);
  return { num: num / divisor, den: den / divisor, str: `${num / divisor}/${den / divisor}` };
}

function simplificarFraccion(num: number, den: number): { num: number; den: number } {
  if (den === 0) return { num, den };
  const divisor = mcd(Math.abs(num), Math.abs(den));
  return { num: num / divisor, den: den / divisor };
}

type Operacion = '+' | '-' | '×' | '÷';

export default function FraccionesDecimales() {
  const [modo, setModo] = useState<'convertir' | 'operar' | 'simplificar'>('convertir');
  const [decimal, setDecimal] = useState('0.75');
  const [frac, setFrac] = useState({ num: '3', den: '4' });
  const [op, setOp] = useState<Operacion>('+');
  const [frac2, setFrac2] = useState({ num: '1', den: '2' });
  const [simpFrac, setSimpFrac] = useState({ num: '12', den: '18' });

  // Conversión decimal → fracción
  const d = parseFloat(decimal) || 0;
  const fracResult = decimalAFraccion(d);

  // Fracción → decimal
  const n1 = parseInt(frac.num) || 0, d1 = parseInt(frac.den) || 1;
  const decResult = d1 !== 0 ? n1 / d1 : 0;

  // Operación entre fracciones
  const n2 = parseInt(frac2.num) || 0, d2 = parseInt(frac2.den) || 1;
  let opNum = 0, opDen = 1;
  if (op === '+') { opNum = n1 * d2 + n2 * d1; opDen = d1 * d2; }
  else if (op === '-') { opNum = n1 * d2 - n2 * d1; opDen = d1 * d2; }
  else if (op === '×') { opNum = n1 * n2; opDen = d1 * d2; }
  else if (op === '÷' && d2 !== 0) { opNum = n1 * d2; opDen = d1 * n2; }
  const opSimp = simplificarFraccion(opNum, opDen);

  // Simplificación
  const sn = parseInt(simpFrac.num) || 0, sd = parseInt(simpFrac.den) || 1;
  const simpResult = simplificarFraccion(sn, sd);

  const FracDisplay = ({ num, den, small = false }: { num: number; den: number; small?: boolean }) => (
    <div className={`inline-flex flex-col items-center ${small ? 'text-base' : 'text-xl'} font-bold`}>
      <span className="border-b-2 border-current px-1">{num}</span>
      <span className="px-1">{den}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {(['convertir', 'operar', 'simplificar'] as const).map(m => (
          <button key={m} onClick={() => setModo(m)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${modo === m ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            {m === 'convertir' ? 'Convertir' : m === 'operar' ? 'Operar' : 'Simplificar'}
          </button>
        ))}
      </div>

      {modo === 'convertir' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Decimal → Fracción</label>
            <div className="flex items-center gap-2">
              <input type="number" value={decimal} onChange={e => setDecimal(e.target.value)} step="0.01"
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              <span className="text-gray-400 text-xl">=</span>
              <div className="flex-1 text-center">
                <FracDisplay num={fracResult.num} den={fracResult.den} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-2">
              {[0.25, 0.5, 0.75, 0.333, 0.666, 0.125].map(v => (
                <button key={v} onClick={() => setDecimal(String(v))} className="py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">{v}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Fracción → Decimal</label>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex flex-col items-center gap-1">
                <input type="number" value={frac.num} onChange={e => setFrac(f => ({ ...f, num: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-t-xl px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500" />
                <input type="number" value={frac.den} onChange={e => setFrac(f => ({ ...f, den: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-b-xl px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <span className="text-gray-400 text-xl">=</span>
              <div className="flex-1 text-center text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {decResult.toFixed(decResult % 1 === 0 ? 0 : 6).replace(/0+$/, '').replace(/\.$/, '')}
              </div>
            </div>
          </div>
        </div>
      )}

      {modo === 'operar' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {[{ state: frac, set: (v: any) => setFrac(v) }, { state: frac2, set: (v: any) => setFrac2(v) }].map((f, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <input type="number" value={f.state.num} onChange={e => f.set((p: any) => ({ ...p, num: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-t-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                <div className="w-full h-px bg-gray-400" />
                <input type="number" value={f.state.den} onChange={e => f.set((p: any) => ({ ...p, den: e.target.value }))}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-b-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            )).reduce((acc, el, i) => i === 1 ? [...acc, (
              <div key="op" className="flex flex-col gap-1">
                {(['+', '-', '×', '÷'] as Operacion[]).map(o => (
                  <button key={o} onClick={() => setOp(o)} className={`w-8 h-8 rounded-lg text-sm font-bold ${op === o ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>{o}</button>
                ))}
              </div>
            ), el] : [...acc, el], [] as any[])}
          </div>
          <div className="text-center text-gray-400">=</div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 text-center space-y-2">
            <FracDisplay num={opNum} den={opDen} />
            {(opSimp.num !== opNum || opSimp.den !== opDen) && (
              <div className="text-xs text-indigo-500">= <span className="font-bold">{opSimp.num}/{opSimp.den}</span> (simplificado)</div>
            )}
            <div className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">{opDen !== 0 ? (opSimp.num / opSimp.den).toFixed(6).replace(/0+$/, '').replace(/\.$/, '') : '∞'}</div>
          </div>
        </div>
      )}

      {modo === 'simplificar' && (
        <div className="space-y-3">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Fracción a simplificar</label>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col items-center gap-1">
              <input type="number" value={simpFrac.num} onChange={e => setSimpFrac(f => ({ ...f, num: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-t-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <div className="w-full h-0.5 bg-gray-400" />
              <input type="number" value={simpFrac.den} onChange={e => setSimpFrac(f => ({ ...f, den: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-b-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            </div>
            <span className="text-2xl text-gray-400">=</span>
            <div className="flex-1 bg-green-50 dark:bg-green-900/20 rounded-2xl p-4 text-center">
              <FracDisplay num={simpResult.num} den={simpResult.den} />
              <div className="text-xs text-green-600 dark:text-green-400 mt-2">MCD: {mcd(Math.abs(sn), Math.abs(sd))}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[[6,4], [12,18], [15,25], [8,12], [100,75], [21,14]].map(([n,d]) => (
              <button key={`${n}/${d}`} onClick={() => setSimpFrac({ num: String(n), den: String(d) })} className="py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30">{n}/{d}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
