'use client';
import { useState } from 'react';

const PAINT_TYPES = [
  { label: 'Plástica mate interior', yield: 12 },
  { label: 'Plástica satinada interior', yield: 10 },
  { label: 'Exterior (acrílica)', yield: 8 },
  { label: 'Esmalte / barniz', yield: 10 },
  { label: 'Imprimación', yield: 8 },
];

export default function PaintCalculator() {
  const [length, setLength] = useState('5');
  const [width, setWidth] = useState('4');
  const [height, setHeight] = useState('2.5');
  const [doors, setDoors] = useState('1');
  const [windows, setWindows] = useState('1');
  const [coats, setCoats] = useState('2');
  const [paintType, setPaintType] = useState(0);
  const [wastePct, setWastePct] = useState('10');

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const d = parseInt(doors) || 0;
  const win = parseInt(windows) || 0;
  const c = parseInt(coats) || 1;
  const waste = parseFloat(wastePct) || 0;

  const wallArea = 2 * (l + w) * h;
  const doorArea = d * 2.0;    // avg door 1×2m
  const windowArea = win * 1.5; // avg window 1×1.5m
  const netArea = Math.max(0, wallArea - doorArea - windowArea);
  const totalArea = netArea * c;
  const yieldPerLitre = PAINT_TYPES[paintType].yield;
  const litresNeeded = totalArea / yieldPerLitre;
  const litresWithWaste = litresNeeded * (1 + waste / 100);

  const can5 = Math.ceil(litresWithWaste / 5);
  const can10 = Math.ceil(litresWithWaste / 10);
  const can15 = Math.ceil(litresWithWaste / 15);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Largo habitación (m)', val: length, set: setLength },
          { label: 'Ancho habitación (m)', val: width, set: setWidth },
          { label: 'Altura paredes (m)', val: height, set: setHeight },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0" step="0.1"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Puertas', val: doors, set: setDoors },
          { label: 'Ventanas', val: windows, set: setWindows },
          { label: 'Número de manos', val: coats, set: setCoats },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de pintura</label>
          <select value={paintType} onChange={e => setPaintType(parseInt(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {PAINT_TYPES.map((p, i) => <option key={i} value={i}>{p.label} ({p.yield} m²/L)</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Desperdicio (%)</label>
          <input type="number" value={wastePct} onChange={e => setWastePct(e.target.value)} min="0" max="50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {l > 0 && w > 0 && h > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            {[
              { label: 'Área bruta', val: wallArea.toFixed(1) + ' m²' },
              { label: 'Área neta', val: netArea.toFixed(1) + ' m²' },
              { label: 'Área total (×manos)', val: totalArea.toFixed(1) + ' m²' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{litresWithWaste.toFixed(1)} L</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">litros necesarios (con {wastePct}% desperdicio)</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">📦 Cubos recomendados</div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              {[
                { size: '5 L', count: can5 },
                { size: '10 L', count: can10 },
                { size: '15 L', count: can15 },
              ].map(r => (
                <div key={r.size} className="bg-white dark:bg-gray-700 rounded-xl p-3 border border-gray-200 dark:border-gray-600">
                  <div className="text-xs text-gray-500 dark:text-gray-400">Cubos de {r.size}</div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">{r.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
