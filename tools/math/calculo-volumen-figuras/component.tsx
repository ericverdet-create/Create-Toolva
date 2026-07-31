'use client';
import { useState } from 'react';

const CUERPOS = [
  { nombre: 'Cubo', icon: '🟫', campos: [{ key: 'a', label: 'Arista (a)' }],
    volumen: (v: Record<string, number>) => v.a ** 3,
    superficie: (v: Record<string, number>) => 6 * v.a ** 2,
    formula: 'V = a³',
  },
  { nombre: 'Esfera', icon: '🌍', campos: [{ key: 'r', label: 'Radio (r)' }],
    volumen: (v: Record<string, number>) => (4 / 3) * Math.PI * v.r ** 3,
    superficie: (v: Record<string, number>) => 4 * Math.PI * v.r ** 2,
    formula: 'V = (4/3)πr³',
  },
  { nombre: 'Cilindro', icon: '🥫', campos: [{ key: 'r', label: 'Radio (r)' }, { key: 'h', label: 'Altura (h)' }],
    volumen: (v: Record<string, number>) => Math.PI * v.r ** 2 * v.h,
    superficie: (v: Record<string, number>) => 2 * Math.PI * v.r * (v.r + v.h),
    formula: 'V = π r² h',
  },
  { nombre: 'Cono', icon: '🍦', campos: [{ key: 'r', label: 'Radio (r)' }, { key: 'h', label: 'Altura (h)' }],
    volumen: (v: Record<string, number>) => (1 / 3) * Math.PI * v.r ** 2 * v.h,
    superficie: (v: Record<string, number>) => Math.PI * v.r * (v.r + Math.sqrt(v.r ** 2 + v.h ** 2)),
    formula: 'V = (1/3)πr²h',
  },
  { nombre: 'Pirámide', icon: '🏔️', campos: [{ key: 'b', label: 'Base (b)' }, { key: 'l', label: 'Largo (l)' }, { key: 'h', label: 'Altura (h)' }],
    volumen: (v: Record<string, number>) => (1 / 3) * v.b * v.l * v.h,
    superficie: (v: Record<string, number>) => v.b * v.l + v.b * Math.sqrt((v.h ** 2 + (v.l / 2) ** 2)) + v.l * Math.sqrt((v.h ** 2 + (v.b / 2) ** 2)),
    formula: 'V = (1/3) × base × h',
  },
  { nombre: 'Prisma rect.', icon: '📦', campos: [{ key: 'a', label: 'Ancho (a)' }, { key: 'b', label: 'Alto (b)' }, { key: 'c', label: 'Largo (c)' }],
    volumen: (v: Record<string, number>) => v.a * v.b * v.c,
    superficie: (v: Record<string, number>) => 2 * (v.a * v.b + v.b * v.c + v.a * v.c),
    formula: 'V = a × b × c',
  },
];

export default function VolumenFiguras() {
  const [idx, setIdx] = useState(2);
  const [valores, setValores] = useState<Record<string, string>>({});
  const fig = CUERPOS[idx];
  const vals: Record<string, number> = {};
  let ok = true;
  for (const c of fig.campos) { const n = parseFloat(valores[c.key] || ''); if (isNaN(n) || n <= 0) { ok = false; break; } vals[c.key] = n; }
  const vol = ok ? fig.volumen(vals) : null;
  const sup = ok ? fig.superficie(vals) : null;
  const fmt = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 4 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-1.5">
        {CUERPOS.map((c, i) => (
          <button key={i} onClick={() => { setIdx(i); setValores({}); }}
            className={`py-2 rounded-xl text-xs font-medium text-center transition-colors ${idx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            <div className="text-xl">{c.icon}</div><div>{c.nombre}</div>
          </button>
        ))}
      </div>
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-2 text-center text-xs font-mono text-indigo-700 dark:text-indigo-300">{fig.formula}</div>
      <div className="grid grid-cols-2 gap-3">
        {fig.campos.map(c => (
          <div key={c.key}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{c.label}</label>
            <input type="number" value={valores[c.key] || ''} onChange={e => setValores(p => ({ ...p, [c.key]: e.target.value }))} placeholder="0" min="0" step="any"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>
      {vol !== null && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Volumen</div>
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(vol)}</div>
            <div className="text-xs text-indigo-500 dark:text-indigo-400">unidades³</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Superficie total</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{sup !== null ? fmt(sup) : '—'}</div>
            <div className="text-xs text-gray-400">unidades²</div>
          </div>
        </div>
      )}
    </div>
  );
}
