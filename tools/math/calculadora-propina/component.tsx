'use client';
import { useState } from 'react';

const PORCENTAJES = [5, 10, 15, 18, 20, 25];

export default function CalculadoraPropina() {
  const [cuenta, setCuenta] = useState('45');
  const [pctIdx, setPctIdx] = useState(2); // 15%
  const [personas, setPersonas] = useState('3');
  const [customPct, setCustomPct] = useState('');
  const [useCustom, setUseCustom] = useState(false);

  const total = parseFloat(cuenta) || 0;
  const pct = useCustom ? (parseFloat(customPct) || 0) : PORCENTAJES[pctIdx];
  const n = Math.max(1, parseInt(personas) || 1);

  const propina = total * pct / 100;
  const totalConPropina = total + propina;
  const porPersona = totalConPropina / n;
  const propinaPersona = propina / n;

  const fmt = (v: number) => v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Total de la cuenta</label>
          <div className="relative">
            <input type="number" value={cuenta} onChange={e => setCuenta(e.target.value)} min="0" step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Número de personas</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setPersonas(p => String(Math.max(1, parseInt(p) - 1)))}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg flex items-center justify-center">−</button>
            <span className="flex-1 text-center font-bold text-xl text-gray-900 dark:text-white">{personas}</span>
            <button onClick={() => setPersonas(p => String(parseInt(p) + 1))}
              className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg flex items-center justify-center">+</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Porcentaje de propina</label>
        <div className="grid grid-cols-6 gap-1.5">
          {PORCENTAJES.map((p, i) => (
            <button key={p} onClick={() => { setPctIdx(i); setUseCustom(false); }}
              className={`py-2 rounded-xl text-xs font-bold transition-colors ${!useCustom && pctIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {p}%
            </button>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={() => setUseCustom(v => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${useCustom ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
            Personalizado
          </button>
          {useCustom && (
            <div className="relative flex-1">
              <input type="number" value={customPct} onChange={e => setCustomPct(e.target.value)} min="0" max="100" placeholder="Ej: 12"
                className="w-full border border-indigo-300 dark:border-indigo-600 rounded-lg px-2 py-1.5 pr-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-sm" autoFocus />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
            </div>
          )}
        </div>
      </div>

      {total > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400">Por persona</div>
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(porPersona)}</div>
                <div className="text-xs text-indigo-500 dark:text-indigo-400">propina: {fmt(propinaPersona)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total entre todos</div>
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">{fmt(totalConPropina)}</div>
                <div className="text-xs text-gray-400">propina: {fmt(propina)}</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {[
              { label: 'Cuenta original', val: fmt(total) },
              { label: `Propina ${pct}%`, val: fmt(propina) },
              { label: 'Total con propina', val: fmt(totalConPropina) },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>
          {n > 1 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-1">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Desglose por persona</div>
              {Array.from({ length: Math.min(n, 8) }, (_, i) => (
                <div key={i} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Persona {i + 1}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{fmt(porPersona)} (propina: {fmt(propinaPersona)})</span>
                </div>
              ))}
              {n > 8 && <div className="text-xs text-gray-400 text-center">... y {n - 8} personas más</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
