'use client';
import { useState } from 'react';

interface Vecino { nombre: string; coeficiente: string; }

export default function CuotaComunidad() {
  const [gastoTotal, setGastoTotal] = useState('12000');
  const [periodicidad, setPeriodicidad] = useState<'anual' | 'mensual'>('anual');
  const [vecinos, setVecinos] = useState<Vecino[]>([
    { nombre: '1º A', coeficiente: '8.5' },
    { nombre: '1º B', coeficiente: '7.2' },
    { nombre: '2º A', coeficiente: '9.1' },
    { nombre: '2º B', coeficiente: '7.8' },
    { nombre: 'Bajo comercial', coeficiente: '15.2' },
  ]);
  const [miCoef, setMiCoef] = useState('8.5');

  const add = () => setVecinos(p => [...p, { nombre: `Piso ${p.length + 1}`, coeficiente: '5' }]);
  const remove = (i: number) => setVecinos(p => p.filter((_, idx) => idx !== i));
  const upd = (i: number, f: keyof Vecino, v: string) => setVecinos(p => p.map((a, idx) => idx === i ? { ...a, [f]: v } : a));

  const gasto = parseFloat(gastoTotal) || 0;
  const gastoAnual = periodicidad === 'mensual' ? gasto * 12 : gasto;
  const totalCoef = vecinos.reduce((s, v) => s + (parseFloat(v.coeficiente) || 0), 0);
  const miCoefNum = parseFloat(miCoef) || 0;

  const miCuotaAnual = totalCoef > 0 ? (gastoAnual * miCoefNum) / totalCoef : 0;
  const miCuotaMensual = miCuotaAnual / 12;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Presupuesto total (€)</label>
          <input type="number" value={gastoTotal} onChange={e => setGastoTotal(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Periodicidad</label>
          <select value={periodicidad} onChange={e => setPeriodicidad(e.target.value as typeof periodicidad)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            <option value="anual">Anual</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Mi coeficiente de participación (%)</label>
        <input type="number" value={miCoef} onChange={e => setMiCoef(e.target.value)} min="0" max="100" step="0.1"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        <div className="text-xs text-gray-400 mt-1">Lo encontrarás en tu escritura o en el catastro</div>
      </div>

      {gasto > 0 && miCoefNum > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">Cuota mensual</div>
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(miCuotaMensual)} €</div>
            </div>
            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400">Cuota anual</div>
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt0(miCuotaAnual)} €</div>
            </div>
          </div>
          <div className="text-center text-xs text-indigo-500 dark:text-indigo-400 mt-2">
            Coeficiente: {miCoefNum}% · Gasto anual total: {fmt0(gastoAnual)} €
          </div>
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Reparto entre vecinos (opcional)</div>
          <div className="text-xs text-gray-400">Total coef: {totalCoef.toFixed(1)}%</div>
        </div>
        {vecinos.map((v, i) => (
          <div key={i} className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 90px 70px 24px' }}>
            <input value={v.nombre} onChange={e => upd(i, 'nombre', e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
            <input type="number" value={v.coeficiente} onChange={e => upd(i, 'coeficiente', e.target.value)} step="0.1"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            {totalCoef > 0 && gasto > 0 ? (
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 text-right">
                {fmt((gastoAnual * (parseFloat(v.coeficiente) || 0)) / totalCoef / 12)} €/mes
              </span>
            ) : <span></span>}
            {vecinos.length > 1 && <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold text-base">×</button>}
          </div>
        ))}
        <button onClick={add}
          className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-colors">
          + Añadir vecino
        </button>
      </div>
    </div>
  );
}
