'use client';
import { useState } from 'react';

interface Gasto { nombre: string; importe: string; tipo: 'necesidad' | 'deseo' | 'ahorro'; }

export default function PresupuestoPersonal() {
  const [ingresos, setIngresos] = useState('2000');
  const [gastos, setGastos] = useState<Gasto[]>([
    { nombre: 'Alquiler / hipoteca', importe: '600', tipo: 'necesidad' },
    { nombre: 'Supermercado', importe: '300', tipo: 'necesidad' },
    { nombre: 'Transporte', importe: '100', tipo: 'necesidad' },
    { nombre: 'Restaurantes / ocio', importe: '150', tipo: 'deseo' },
    { nombre: 'Suscripciones', importe: '30', tipo: 'deseo' },
    { nombre: 'Ahorro / inversión', importe: '200', tipo: 'ahorro' },
  ]);

  const add = () => setGastos(p => [...p, { nombre: '', importe: '0', tipo: 'necesidad' }]);
  const remove = (i: number) => setGastos(p => p.filter((_, idx) => idx !== i));
  const upd = (i: number, f: keyof Gasto, v: string) => setGastos(p => p.map((a, idx) => idx === i ? { ...a, [f]: v } : a));

  const ing = parseFloat(ingresos) || 0;
  const totNecesidad = gastos.filter(g => g.tipo === 'necesidad').reduce((s, g) => s + (parseFloat(g.importe) || 0), 0);
  const totDeseo = gastos.filter(g => g.tipo === 'deseo').reduce((s, g) => s + (parseFloat(g.importe) || 0), 0);
  const totAhorro = gastos.filter(g => g.tipo === 'ahorro').reduce((s, g) => s + (parseFloat(g.importe) || 0), 0);
  const totalGastos = totNecesidad + totDeseo + totAhorro;
  const saldo = ing - totalGastos;

  const pctN = ing > 0 ? (totNecesidad / ing) * 100 : 0;
  const pctD = ing > 0 ? (totDeseo / ing) * 100 : 0;
  const pctA = ing > 0 ? (totAhorro / ing) * 100 : 0;

  const idealN = ing * 0.50, idealD = ing * 0.30, idealA = ing * 0.20;

  const fmt = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 0 });
  const fmt1 = (n: number) => n.toFixed(1);

  const TIPOS = [
    { val: 'necesidad', label: '🏠 Necesidad', color: 'bg-blue-500' },
    { val: 'deseo', label: '🎉 Deseo', color: 'bg-purple-500' },
    { val: 'ahorro', label: '💰 Ahorro', color: 'bg-green-500' },
  ] as const;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ingresos netos mensuales (€)</label>
        <input type="number" value={ingresos} onChange={e => setIngresos(e.target.value)} min="0"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold" />
      </div>

      {ing > 0 && (
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { label: '50% Necesidades', ideal: idealN, real: totNecesidad, pct: pctN, color: 'blue' },
            { label: '30% Deseos', ideal: idealD, real: totDeseo, pct: pctD, color: 'purple' },
            { label: '20% Ahorro', ideal: idealA, real: totAhorro, pct: pctA, color: 'green' },
          ].map(r => (
            <div key={r.label} className={`rounded-xl p-2 ${Math.abs(r.pct - parseFloat(r.label)) < 10 ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{r.label}</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(r.real)} €</div>
              <div className={`text-xs ${r.pct > parseFloat(r.label.split('%')[0]) + 5 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>{fmt1(r.pct)}%</div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="grid text-xs font-medium text-gray-500 dark:text-gray-400 px-1" style={{ gridTemplateColumns: '1fr 85px 110px 24px' }}>
          <span>Concepto</span><span className="text-center">€</span><span className="text-center">Tipo</span><span></span>
        </div>
        {gastos.map((g, i) => (
          <div key={i} className="grid gap-1.5 items-center" style={{ gridTemplateColumns: '1fr 85px 110px 24px' }}>
            <input value={g.nombre} onChange={e => upd(i, 'nombre', e.target.value)} placeholder="Concepto"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-xs" />
            <input type="number" value={g.importe} onChange={e => upd(i, 'importe', e.target.value)} min="0"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            <select value={g.tipo} onChange={e => upd(i, 'tipo', e.target.value as Gasto['tipo'])}
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-1 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-xs">
              {TIPOS.map(t => <option key={t.val} value={t.val}>{t.label}</option>)}
            </select>
            {gastos.length > 1 && <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold">×</button>}
          </div>
        ))}
        <button onClick={add} className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400">+ Añadir gasto</button>
      </div>

      <div className={`rounded-2xl p-4 text-center border-2 ${saldo >= 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'}`}>
        <div className="text-xs text-gray-600 dark:text-gray-400">Saldo mensual</div>
        <div className={`text-4xl font-bold ${saldo >= 0 ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{saldo >= 0 ? '+' : ''}{fmt(saldo)} €</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gastos: {fmt(totalGastos)} € de {fmt(ing)} € ingresos</div>
      </div>
    </div>
  );
}
