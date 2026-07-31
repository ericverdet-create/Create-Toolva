'use client';
import { useState } from 'react';

// Mix ratios (cement:sand:gravel) and w/c ratio for common uses
const MIX_TYPES = [
  { label: 'Hormigón en masa (1:3:6)', cement: 1, sand: 3, gravel: 6, water: 0.6, density: 2200 },
  { label: 'Hormigón estructural (1:2:4)', cement: 1, sand: 2, gravel: 4, water: 0.5, density: 2300 },
  { label: 'Hormigón resistente (1:1.5:3)', cement: 1, sand: 1.5, gravel: 3, water: 0.45, density: 2350 },
  { label: 'Mortero de albañilería (1:4)', cement: 1, sand: 4, gravel: 0, water: 0.5, density: 1900 },
  { label: 'Mortero de enlucido (1:3)', cement: 1, sand: 3, gravel: 0, water: 0.55, density: 1850 },
  { label: 'Solera (1:2:4) + fibra', cement: 1, sand: 2, gravel: 4, water: 0.5, density: 2300 },
];

const CEMENT_DENSITY = 1500; // kg/m³ bulk
const BAG_WEIGHT = 25; // kg

type ShapeType = 'slab' | 'column' | 'volume';

export default function CementCalculator() {
  const [mixIdx, setMixIdx] = useState(1);
  const [shape, setShape] = useState<ShapeType>('slab');
  const [dim1, setDim1] = useState('5');   // length
  const [dim2, setDim2] = useState('3');   // width
  const [dim3, setDim3] = useState('0.15'); // thickness/depth
  const [waste, setWaste] = useState('10');

  const mix = MIX_TYPES[mixIdx];
  const wasteFactor = 1 + (parseFloat(waste) || 0) / 100;

  let volume = 0;
  const d1 = parseFloat(dim1) || 0;
  const d2 = parseFloat(dim2) || 0;
  const d3 = parseFloat(dim3) || 0;

  if (shape === 'slab') volume = d1 * d2 * d3;
  else if (shape === 'column') volume = Math.PI * (d1 / 2) ** 2 * d2;
  else volume = d1;

  const totalVol = volume * wasteFactor;
  const parts = mix.cement + mix.sand + mix.gravel;
  const cementVol = (mix.cement / parts) * totalVol;
  const sandVol = (mix.sand / parts) * totalVol;
  const gravelVol = mix.gravel > 0 ? (mix.gravel / parts) * totalVol : 0;

  const cementKg = cementVol * CEMENT_DENSITY;
  const sandKg = sandVol * 1600;
  const gravelKg = gravelVol * 1650;
  const waterL = cementKg * mix.water;
  const bags = Math.ceil(cementKg / BAG_WEIGHT);

  const fmt = (n: number, dec = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de mezcla</label>
        <select value={mixIdx} onChange={e => setMixIdx(parseInt(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {MIX_TYPES.map((m, i) => <option key={i} value={i}>{m.label}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Forma del elemento</label>
        <div className="grid grid-cols-3 gap-2">
          {([['slab', '📐 Losa/Solera'], ['column', '⬤ Columna (cilindro)'], ['volume', '📦 Volumen directo']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setShape(key)}
              className={`py-2 px-2 rounded-xl text-xs font-medium transition-colors ${shape === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {shape === 'slab' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Largo (m)</label>
              <input type="number" value={dim1} onChange={e => setDim1(e.target.value)} min="0" step="0.1"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ancho (m)</label>
              <input type="number" value={dim2} onChange={e => setDim2(e.target.value)} min="0" step="0.1"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Espesor (m)</label>
              <input type="number" value={dim3} onChange={e => setDim3(e.target.value)} min="0" step="0.01"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
          </>
        )}
        {shape === 'column' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Diámetro (m)</label>
              <input type="number" value={dim1} onChange={e => setDim1(e.target.value)} min="0" step="0.01"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Altura (m)</label>
              <input type="number" value={dim2} onChange={e => setDim2(e.target.value)} min="0" step="0.1"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
          </>
        )}
        {shape === 'volume' && (
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Volumen total (m³)</label>
            <input type="number" value={dim1} onChange={e => setDim1(e.target.value)} min="0" step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Desperdicio (%)</label>
          <input type="number" value={waste} onChange={e => setWaste(e.target.value)} min="0" max="50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {volume > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Volumen base</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(volume, 3)} m³</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Con desperdicio</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(totalVol, 3)} m³</div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 space-y-2 text-sm">
            <div className="font-semibold text-indigo-800 dark:text-indigo-300 mb-3 text-center">📦 Materiales necesarios</div>
            {[
              { label: '🏗️ Cemento', val: `${fmt(cementKg)} kg`, sub: `= ${bags} sacos de 25kg` },
              { label: '🏖️ Arena', val: `${fmt(sandKg)} kg`, sub: `≈ ${fmt(sandVol, 2)} m³` },
              ...(mix.gravel > 0 ? [{ label: '🪨 Grava', val: `${fmt(gravelKg)} kg`, sub: `≈ ${fmt(gravelVol, 2)} m³` }] : []),
              { label: '💧 Agua', val: `${fmt(waterL)} litros`, sub: '' },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-start border-b border-indigo-100 dark:border-indigo-800 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-700 dark:text-gray-300">{r.label}</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
                  {r.sub && <div className="text-xs text-gray-500 dark:text-gray-400">{r.sub}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">{bags} sacos de cemento</div>
            <div className="text-xs text-green-600 dark:text-green-400">de 25 kg (con {waste}% desperdicio)</div>
          </div>
        </div>
      )}
    </div>
  );
}
