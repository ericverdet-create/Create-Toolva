'use client';
import { useState } from 'react';

const FIGURAS = [
  {
    nombre: 'Cuadrado', icon: '⬛', campos: [{ key: 'lado', label: 'Lado (a)' }],
    area: (v: Record<string, number>) => v.lado ** 2,
    perimetro: (v: Record<string, number>) => 4 * v.lado,
    formula: 'A = a²',
  },
  {
    nombre: 'Rectángulo', icon: '▬', campos: [{ key: 'base', label: 'Base (b)' }, { key: 'altura', label: 'Altura (h)' }],
    area: (v: Record<string, number>) => v.base * v.altura,
    perimetro: (v: Record<string, number>) => 2 * (v.base + v.altura),
    formula: 'A = b × h',
  },
  {
    nombre: 'Círculo', icon: '⭕', campos: [{ key: 'radio', label: 'Radio (r)' }],
    area: (v: Record<string, number>) => Math.PI * v.radio ** 2,
    perimetro: (v: Record<string, number>) => 2 * Math.PI * v.radio,
    formula: 'A = π × r²',
  },
  {
    nombre: 'Triángulo', icon: '🔺', campos: [{ key: 'base', label: 'Base (b)' }, { key: 'altura', label: 'Altura (h)' }],
    area: (v: Record<string, number>) => (v.base * v.altura) / 2,
    perimetro: () => NaN,
    formula: 'A = (b × h) / 2',
  },
  {
    nombre: 'Trapecio', icon: '⏫', campos: [{ key: 'b1', label: 'Base mayor (b₁)' }, { key: 'b2', label: 'Base menor (b₂)' }, { key: 'altura', label: 'Altura (h)' }],
    area: (v: Record<string, number>) => ((v.b1 + v.b2) * v.altura) / 2,
    perimetro: () => NaN,
    formula: 'A = (b₁ + b₂) × h / 2',
  },
  {
    nombre: 'Rombo', icon: '♦️', campos: [{ key: 'd1', label: 'Diagonal mayor (d₁)' }, { key: 'd2', label: 'Diagonal menor (d₂)' }],
    area: (v: Record<string, number>) => (v.d1 * v.d2) / 2,
    perimetro: (v: Record<string, number>) => 2 * Math.sqrt(v.d1 ** 2 + v.d2 ** 2),
    formula: 'A = (d₁ × d₂) / 2',
  },
  {
    nombre: 'Elipse', icon: '🥚', campos: [{ key: 'a', label: 'Semieje mayor (a)' }, { key: 'b', label: 'Semieje menor (b)' }],
    area: (v: Record<string, number>) => Math.PI * v.a * v.b,
    perimetro: (v: Record<string, number>) => 2 * Math.PI * Math.sqrt((v.a ** 2 + v.b ** 2) / 2),
    formula: 'A = π × a × b',
  },
  {
    nombre: 'Triángulo equilátero', icon: '🔻', campos: [{ key: 'lado', label: 'Lado (a)' }],
    area: (v: Record<string, number>) => (Math.sqrt(3) / 4) * v.lado ** 2,
    perimetro: (v: Record<string, number>) => 3 * v.lado,
    formula: 'A = (√3 / 4) × a²',
  },
];

export default function AreaFiguras() {
  const [figIdx, setFigIdx] = useState(1);
  const [valores, setValores] = useState<Record<string, string>>({});

  const fig = FIGURAS[figIdx];
  const vals: Record<string, number> = {};
  let allFilled = true;
  for (const c of fig.campos) {
    const n = parseFloat(valores[c.key] || '');
    if (isNaN(n) || n <= 0) { allFilled = false; break; }
    vals[c.key] = n;
  }

  const area = allFilled ? fig.area(vals) : null;
  const perim = allFilled ? fig.perimetro(vals) : null;

  const fmt = (n: number) => isNaN(n) ? '—' : n.toLocaleString('es-ES', { maximumFractionDigits: 4 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-1.5">
        {FIGURAS.map((f, i) => (
          <button key={i} onClick={() => { setFigIdx(i); setValores({}); }}
            className={`py-2 rounded-xl text-xs font-medium transition-colors text-center ${figIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
            <div className="text-lg">{f.icon}</div>
            <div className="truncate px-1">{f.nombre.split(' ')[0]}</div>
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

      {area !== null && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Área</div>
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(area)}</div>
            <div className="text-xs text-indigo-500 dark:text-indigo-400">unidades²</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
            <div className="text-xs text-gray-500 dark:text-gray-400">Perímetro</div>
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{perim !== null ? fmt(perim) : '—'}</div>
            <div className="text-xs text-gray-400">unidades</div>
          </div>
        </div>
      )}
    </div>
  );
}
