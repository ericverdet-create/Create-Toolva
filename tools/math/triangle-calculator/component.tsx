'use client';
import { useState } from 'react';

type Mode = 'sides' | 'base-height' | 'right';

export default function TriangleCalculator() {
  const [mode, setMode] = useState<Mode>('sides');
  const [a, setA] = useState('3');
  const [b, setB] = useState('4');
  const [c, setC] = useState('5');
  const [base, setBase] = useState('6');
  const [height, setHeight] = useState('4');

  const fmt = (n: number) => isNaN(n) || !isFinite(n) ? '—' : n.toFixed(4).replace(/\.?0+$/, '');
  const deg = (r: number) => fmt(r * 180 / Math.PI) + '°';

  let result: Record<string, string> = {};

  if (mode === 'sides') {
    const av = parseFloat(a), bv = parseFloat(b), cv = parseFloat(c);
    if (av > 0 && bv > 0 && cv > 0 && av + bv > cv && av + cv > bv && bv + cv > av) {
      const s = (av + bv + cv) / 2;
      const area = Math.sqrt(s * (s - av) * (s - bv) * (s - cv));
      const A = Math.acos((bv**2 + cv**2 - av**2) / (2 * bv * cv));
      const B = Math.acos((av**2 + cv**2 - bv**2) / (2 * av * cv));
      const C = Math.PI - A - B;
      result = {
        'Área': fmt(area) + ' u²',
        'Perímetro': fmt(av + bv + cv) + ' u',
        'Ángulo A': deg(A), 'Ángulo B': deg(B), 'Ángulo C': deg(C),
        'Altura sobre a': fmt(2 * area / av) + ' u',
        'Radio circunscrito': fmt((av * bv * cv) / (4 * area)) + ' u',
        'Radio inscrito': fmt(area / s) + ' u',
      };
    }
  } else if (mode === 'base-height') {
    const bv = parseFloat(base), hv = parseFloat(height);
    if (bv > 0 && hv > 0) {
      result = { 'Área': fmt(0.5 * bv * hv) + ' u²' };
    }
  } else {
    const av = parseFloat(a), bv = parseFloat(b);
    if (av > 0 && bv > 0) {
      const hip = Math.sqrt(av**2 + bv**2);
      const A = Math.atan(av / bv);
      const B = Math.PI / 2 - A;
      result = {
        'Hipotenusa': fmt(hip) + ' u',
        'Área': fmt(0.5 * av * bv) + ' u²',
        'Perímetro': fmt(av + bv + hip) + ' u',
        'Ángulo A': deg(A), 'Ángulo B': deg(B), 'Ángulo C': '90°',
      };
    }
  }

  const MODES: { key: Mode; label: string }[] = [
    { key: 'sides', label: 'Tres lados (SSS)' },
    { key: 'base-height', label: 'Base y altura' },
    { key: 'right', label: 'Triángulo rectángulo' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {MODES.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${mode===m.key?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {mode === 'sides' && (
          <>
            {[['Lado a', a, setA], ['Lado b', b, setB], ['Lado c', c, setC]].map(([lbl, val, setter]) => (
              <div key={lbl as string}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{lbl as string}</label>
                <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              </div>
            ))}
          </>
        )}
        {mode === 'base-height' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base</label>
              <input type="number" value={base} onChange={e => setBase(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Altura</label>
              <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          </>
        )}
        {mode === 'right' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cateto a</label>
              <input type="number" value={a} onChange={e => setA(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cateto b</label>
              <input type="number" value={b} onChange={e => setB(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          </>
        )}
      </div>

      {Object.keys(result).length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(result).map(([k, v]) => (
            <div key={k} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{k}</div>
              <div className="font-bold text-indigo-700 dark:text-indigo-300">{v}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
