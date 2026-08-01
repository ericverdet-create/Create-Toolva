'use client';
import { useState } from 'react';

type Tipo = 'simple-directa' | 'simple-inversa' | 'compuesta';

export default function CalculadoraReglaTres() {
  const [tipo, setTipo] = useState<Tipo>('simple-directa');
  // Simple: A es a B como C es a X
  const [a, setA] = useState('2');
  const [b, setB] = useState('6');
  const [c, setC] = useState('5');
  // Compuesta: (A1/A2) * (B1/B2) = C/X
  const [a1, setA1] = useState('3');
  const [a2, setA2] = useState('6');
  const [b1, setB1] = useState('4');
  const [b2, setB2] = useState('8');
  const [cComp, setCComp] = useState('12');

  const av = parseFloat(a) || 0;
  const bv = parseFloat(b) || 0;
  const cv = parseFloat(c) || 0;

  let resultado: number | null = null;
  let formula = '';
  let explicacion = '';

  if (tipo === 'simple-directa') {
    if (av !== 0) {
      resultado = (bv * cv) / av;
      formula = `X = (${bv} × ${cv}) / ${av}`;
      explicacion = `Si ${av} corresponde a ${bv}, entonces ${cv} corresponde a ${resultado.toFixed(4)}`;
    }
  } else if (tipo === 'simple-inversa') {
    if (cv !== 0) {
      resultado = (av * bv) / cv;
      formula = `X = (${av} × ${bv}) / ${cv}`;
      explicacion = `Relación inversa: cuando A aumenta, X disminuye proporcionalmente`;
    }
  } else {
    // Compuesta: A1 trabajadores en A2 días hacen B1 piezas; B2 trabajadores en ¿? días hacen cComp piezas
    const a1v = parseFloat(a1) || 1;
    const a2v = parseFloat(a2) || 1;
    const b1v = parseFloat(b1) || 1;
    const b2v = parseFloat(b2) || 1;
    const cCompV = parseFloat(cComp) || 1;
    if (a1v !== 0 && b1v !== 0 && b2v !== 0) {
      resultado = (a1v * a2v * cCompV) / (b1v * b2v);
      formula = `X = (${a1v} × ${a2v} × ${cCompV}) / (${b1v} × ${b2v})`;
      explicacion = 'Regla de tres compuesta con dos variables';
    }
  }

  const INPUT = 'w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center';

  return (
    <div className="space-y-4">
      {/* Selector tipo */}
      <div className="flex flex-col gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {([
          { id: 'simple-directa', label: '📈 Simple directa', desc: 'A más X, más Y' },
          { id: 'simple-inversa', label: '📉 Simple inversa', desc: 'A más X, menos Y' },
          { id: 'compuesta', label: '🔢 Compuesta', desc: 'Dos variables' },
        ] as { id: Tipo; label: string; desc: string }[]).map(t => (
          <button key={t.id} onClick={() => setTipo(t.id)}
            className={`w-full py-2 px-3 rounded-lg text-xs font-medium text-left transition-colors flex justify-between items-center ${tipo === t.id ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            <span>{t.label}</span>
            <span className="text-gray-400 text-xs">{t.desc}</span>
          </button>
        ))}
      </div>

      {tipo !== 'compuesta' ? (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">A → B = C → X</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {tipo === 'simple-directa' ? 'Si A corresponde a B, ¿cuánto corresponde a C?' : 'Relación inversa entre las magnitudes'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">A (conocido)</label>
              <input type="number" value={a} onChange={e => setA(e.target.value)} className={INPUT} placeholder="ej: 3" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">B (resultado de A)</label>
              <input type="number" value={b} onChange={e => setB(e.target.value)} className={INPUT} placeholder="ej: 9" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">C (nuevo valor)</label>
              <input type="number" value={c} onChange={e => setC(e.target.value)} className={INPUT} placeholder="ej: 7" />
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-400 rounded-xl flex flex-col items-center justify-center p-2">
              <div className="text-xs text-indigo-500">X =</div>
              <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                {resultado !== null ? resultado.toLocaleString('es-ES', { maximumFractionDigits: 4 }) : '—'}
              </div>
            </div>
          </div>

          {resultado !== null && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-1">
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400">{formula}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{explicacion}</div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                {tipo === 'simple-directa'
                  ? `${av} / ${bv} = ${cv} / ${resultado.toFixed(4)}`
                  : `${av} × ${bv} = ${cv} × ${resultado.toFixed(4)}`
                }
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-center text-xs text-amber-700 dark:text-amber-300">
            Ejemplo: <strong>A1</strong> obreros en <strong>A2</strong> días hacen <strong>B1</strong> piezas.<br/>
            ¿Cuántos días necesitan <strong>B2</strong> obreros para <strong>C</strong> piezas?
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'A1 (cantidad 1)', val: a1, set: setA1 },
              { label: 'A2 (días/tiempo)', val: a2, set: setA2 },
              { label: 'B1 (resultado 1)', val: b1, set: setB1 },
              { label: 'B2 (nueva cant.)', val: b2, set: setB2 },
              { label: 'C (nuevo result.)', val: cComp, set: setCComp },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
                <input type="number" value={f.val} onChange={e => f.set(e.target.value)} className={INPUT} />
              </div>
            ))}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-400 rounded-xl flex flex-col items-center justify-center p-1">
              <div className="text-xs text-indigo-500">X =</div>
              <div className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
                {resultado !== null ? resultado.toLocaleString('es-ES', { maximumFractionDigits: 4 }) : '—'}
              </div>
            </div>
          </div>
          {resultado !== null && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs font-mono text-gray-600 dark:text-gray-400">{formula}</div>
              <div className="text-xs text-gray-500 mt-1">{explicacion}</div>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2">Ejemplos rápidos</div>
        <div className="grid grid-cols-1 gap-1">
          {[
            { label: 'Receta: 4 personas → 8 porciones, ¿para 6?', a: '4', b: '8', c: '6', t: 'simple-directa' as Tipo },
            { label: 'Velocidad: 60km/h en 3h, ¿a 90km/h?', a: '60', b: '3', c: '90', t: 'simple-inversa' as Tipo },
            { label: 'Escala 1:100, 5cm → ¿metros reales?', a: '1', b: '100', c: '5', t: 'simple-directa' as Tipo },
          ].map(ej => (
            <button key={ej.label} onClick={() => { setTipo(ej.t); setA(ej.a); setB(ej.b); setC(ej.c); }}
              className="text-left text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg text-gray-600 dark:text-gray-400 transition-colors">
              {ej.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
