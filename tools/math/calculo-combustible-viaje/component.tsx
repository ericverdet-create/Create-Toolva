'use client';
import { useState } from 'react';

export default function CombustibleViaje() {
  const [km, setKm] = useState('500');
  const [consumo, setConsumo] = useState('6.5');
  const [precioComb, setPrecioComb] = useState('1.65');
  const [personas, setPersonas] = useState('2');
  const [tipo, setTipo] = useState<'gasolina' | 'diesel' | 'electrico'>('gasolina');
  const [idaVuelta, setIdaVuelta] = useState(false);

  const distancia = (parseFloat(km) || 0) * (idaVuelta ? 2 : 1);
  const cons = parseFloat(consumo) || 0;
  const precio = parseFloat(precioComb) || 0;
  const n = Math.max(1, parseInt(personas) || 1);

  const litros = tipo === 'electrico' ? 0 : distancia * cons / 100;
  const kwh = tipo === 'electrico' ? distancia * cons / 100 : 0;
  const costeTotal = tipo === 'electrico' ? kwh * precio : litros * precio;
  const costePorPersona = costeTotal / n;
  const costePor100km = distancia > 0 ? (costeTotal / distancia) * 100 : 0;

  const fmt = (v: number) => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const PRECIOS_REF = [
    { tipo: 'gasolina', precio: 1.65, label: 'Gasolina 95' },
    { tipo: 'diesel', precio: 1.55, label: 'Diésel' },
    { tipo: 'electrico', precio: 0.22, label: 'Electricidad' },
  ] as const;

  const CONSUMOS_REF = [
    { label: 'Eléctrico eficiente', val: '15', unidad: 'kWh/100km', tipo: 'electrico' },
    { label: 'Gasolina eco', val: '5', unidad: 'L/100km', tipo: 'gasolina' },
    { label: 'Gasolina media', val: '7', unidad: 'L/100km', tipo: 'gasolina' },
    { label: 'Diésel eco', val: '5', unidad: 'L/100km', tipo: 'diesel' },
    { label: '4x4 / SUV', val: '10', unidad: 'L/100km', tipo: 'gasolina' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {PRECIOS_REF.map(ref => (
          <button key={ref.tipo} onClick={() => { setTipo(ref.tipo); setPrecioComb(String(ref.precio)); if (ref.tipo === 'electrico') setConsumo('15'); else if (ref.tipo === 'gasolina') setConsumo('6.5'); else setConsumo('5.5'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-medium ${tipo === ref.tipo ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {ref.tipo === 'gasolina' ? '⛽' : ref.tipo === 'diesel' ? '🛢️' : '⚡'} {ref.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Distancia (km)</label>
          <input type="number" value={km} onChange={e => setKm(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {tipo === 'electrico' ? 'Consumo (kWh/100km)' : 'Consumo (L/100km)'}
          </label>
          <input type="number" value={consumo} onChange={e => setConsumo(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            {tipo === 'electrico' ? 'Precio electricidad (€/kWh)' : 'Precio combustible (€/L)'}
          </label>
          <div className="relative">
            <input type="number" value={precioComb} onChange={e => setPrecioComb(e.target.value)} min="0" step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Personas</label>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setPersonas(p => String(Math.max(1, parseInt(p) - 1)))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300">−</button>
            <span className="flex-1 text-center font-bold text-gray-900 dark:text-white">{personas}</span>
            <button onClick={() => setPersonas(p => String(parseInt(p) + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300">+</button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setIdaVuelta(v => !v)}
          className={`relative w-10 h-5 rounded-full transition-colors ${idaVuelta ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform shadow ${idaVuelta ? 'left-5' : 'left-0.5'}`}></span>
        </button>
        <span className="text-xs text-gray-600 dark:text-gray-400">Ida y vuelta ({distancia} km totales)</span>
      </div>

      {distancia > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Coste total del viaje</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(costeTotal)} €</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">Por persona</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(costePorPersona)} €</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">{tipo === 'electrico' ? 'kWh totales' : 'Litros totales'}</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(tipo === 'electrico' ? kwh : litros)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">€/100 km</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(costePor100km)} €</div>
            </div>
          </div>

          {/* Consumos referencia */}
          <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📊 Consumos de referencia</summary>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {CONSUMOS_REF.filter(c => c.tipo === tipo).map(c => {
                const l2 = distancia * parseFloat(c.val) / 100;
                const coste2 = l2 * precio;
                return (
                  <div key={c.label} className="flex justify-between px-3 py-2 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{c.label} ({c.val} {c.unidad})</span>
                    <span className="font-medium text-gray-900 dark:text-white">{fmt(coste2)} €</span>
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}
