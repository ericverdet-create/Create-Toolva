'use client';
import { useState } from 'react';

const BEAUFORT = [
  { grado: 0, nombre: 'Calma', kmh: [0, 1], mar: 'Mar como espejo', tierra: 'Humo sube vertical' },
  { grado: 1, nombre: 'Ventolina', kmh: [1, 6], mar: 'Rizos sin espuma', tierra: 'Indica la dirección el humo' },
  { grado: 2, nombre: 'Brisa muy débil', kmh: [6, 12], mar: 'Olas pequeñas sin romper', tierra: 'Mueve hojas levemente' },
  { grado: 3, nombre: 'Flojo', kmh: [12, 20], mar: 'Olas con crestas', tierra: 'Hojas y ramitas en movimiento' },
  { grado: 4, nombre: 'Bonancible', kmh: [20, 29], mar: 'Olas pequeñas con espuma', tierra: 'Levanta polvo y papeles' },
  { grado: 5, nombre: 'Fresquito', kmh: [29, 39], mar: 'Olas moderadas', tierra: 'Arbolitos se balancean' },
  { grado: 6, nombre: 'Fresco', kmh: [39, 50], mar: 'Olas grandes con crestas espumosas', tierra: 'Ramas gruesas en movimiento' },
  { grado: 7, nombre: 'Frescachón', kmh: [50, 62], mar: 'El mar comienza a encresparse', tierra: 'Árboles en movimiento, dificultad al caminar' },
  { grado: 8, nombre: 'Temporal', kmh: [62, 75], mar: 'Olas altas, espuma en rayas', tierra: 'Ramas se rompen' },
  { grado: 9, nombre: 'Temporal fuerte', kmh: [75, 89], mar: 'Olas muy altas', tierra: 'Daños en estructuras' },
  { grado: 10, nombre: 'Temporal duro', kmh: [89, 103], mar: 'Olas enormes', tierra: 'Árboles arrancados' },
  { grado: 11, nombre: 'Borrasca', kmh: [103, 118], mar: 'Mar completamente blanco', tierra: 'Daños generalizados' },
  { grado: 12, nombre: 'Huracán', kmh: [118, 500], mar: 'El aire lleno de espuma', tierra: 'Devastación' },
];

type Unit = 'kmh' | 'ms' | 'knots' | 'mph';

const convert = (val: number, from: Unit): Record<Unit, number> => {
  let ms: number;
  switch (from) {
    case 'kmh': ms = val / 3.6; break;
    case 'ms': ms = val; break;
    case 'knots': ms = val * 0.514444; break;
    case 'mph': ms = val * 0.44704; break;
  }
  return {
    kmh: ms * 3.6,
    ms,
    knots: ms / 0.514444,
    mph: ms / 0.44704,
  };
};

export default function VelocidadViento() {
  const [valor, setValor] = useState('30');
  const [unidad, setUnidad] = useState<Unit>('kmh');

  const v = parseFloat(valor) || 0;
  const converted = convert(v, unidad);
  const beaufort = BEAUFORT.find(b => converted.kmh >= b.kmh[0] && converted.kmh < b.kmh[1]) || BEAUFORT[12];

  const UNITS: { key: Unit; label: string }[] = [
    { key: 'kmh', label: 'km/h' },
    { key: 'ms', label: 'm/s' },
    { key: 'knots', label: 'nudos' },
    { key: 'mph', label: 'mph' },
  ];

  const fmt = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 2 });
  const gradoColor = beaufort.grado <= 3 ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    : beaufort.grado <= 6 ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
    : beaufort.grado <= 9 ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
    : 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {UNITS.map(u => (
          <button key={u.key} onClick={() => { setUnidad(u.key); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${unidad === u.key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {u.label}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Velocidad del viento ({UNITS.find(u => u.key === unidad)?.label})</label>
        <input type="number" value={valor} onChange={e => setValor(e.target.value)} min="0"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-2xl font-bold text-center" />
        <input type="range" min="0" max="200" value={Math.min(200, v)} onChange={e => setValor(e.target.value)}
          className="w-full mt-2 accent-indigo-600" />
      </div>

      {v > 0 && (
        <div className="space-y-3">
          <div className={`border-2 rounded-2xl p-4 text-center ${gradoColor}`}>
            <div className="text-xs font-medium opacity-70">Escala Beaufort</div>
            <div className="text-5xl font-bold">{beaufort.grado}</div>
            <div className="text-lg font-semibold">{beaufort.nombre}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            {UNITS.filter(u => u.key !== unidad).map(u => (
              <div key={u.key} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{u.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{fmt(converted[u.key])}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
            <div>🌊 <strong>Mar:</strong> {beaufort.mar}</div>
            <div>🌳 <strong>Tierra:</strong> {beaufort.tierra}</div>
            <div className="text-gray-400">Rango B{beaufort.grado}: {beaufort.kmh[0]}–{beaufort.kmh[1] === 500 ? '≥118' : beaufort.kmh[1]} km/h</div>
          </div>
        </div>
      )}

      {/* Mini tabla Beaufort */}
      <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📋 Tabla escala Beaufort completa</summary>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {BEAUFORT.map(b => (
            <div key={b.grado} className={`flex gap-2 px-3 py-1.5 text-xs ${b.grado === beaufort.grado ? 'bg-indigo-50 dark:bg-indigo-900/20 font-semibold' : ''}`}>
              <span className="w-6 text-center font-bold text-indigo-600 dark:text-indigo-400">{b.grado}</span>
              <span className="w-28 text-gray-700 dark:text-gray-300">{b.nombre}</span>
              <span className="text-gray-400">{b.kmh[0]}–{b.kmh[1] === 500 ? '≥118' : b.kmh[1]} km/h</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
