'use client';
import { useState } from 'react';

const DISTRIBUCIONES = [
  { label: '📉 Perder grasa', prot: 35, carb: 35, fat: 30 },
  { label: '⚖️ Mantenimiento', prot: 25, carb: 45, fat: 30 },
  { label: '💪 Ganar músculo', prot: 30, carb: 50, fat: 20 },
  { label: '🥑 Low carb / Keto', prot: 30, carb: 10, fat: 60 },
  { label: '🏃 Resistencia', prot: 20, carb: 60, fat: 20 },
  { label: '🔧 Personalizado', prot: 0, carb: 0, fat: 0 },
];

export default function CalculoMacros() {
  const [calorias, setCalorias] = useState('2000');
  const [distIdx, setDistIdx] = useState(0);
  const [custom, setCustom] = useState({ prot: '30', carb: '40', fat: '30' });

  const kcal = parseFloat(calorias) || 0;
  const dist = distIdx < 5 ? DISTRIBUCIONES[distIdx] : {
    label: 'Personalizado',
    prot: parseFloat(custom.prot) || 0,
    carb: parseFloat(custom.carb) || 0,
    fat: parseFloat(custom.fat) || 0,
  };

  const totalPct = dist.prot + dist.carb + dist.fat;
  const protG = kcal * (dist.prot / 100) / 4;
  const carbG = kcal * (dist.carb / 100) / 4;
  const fatG = kcal * (dist.fat / 100) / 9;

  const fmt = (n: number) => Math.round(n);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Calorías diarias objetivo (kcal)</label>
        <input type="number" value={calorias} onChange={e => setCalorias(e.target.value)} min="500" max="10000"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        {DISTRIBUCIONES.map((d, i) => (
          <button key={i} onClick={() => setDistIdx(i)}
            className={`py-2 px-3 rounded-xl text-xs font-medium text-left transition-colors ${distIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {d.label}
            {i < 5 && <div className={`text-xs ${distIdx === i ? 'text-indigo-200' : 'text-gray-400'}`}>P:{d.prot}% C:{d.carb}% G:{d.fat}%</div>}
          </button>
        ))}
      </div>

      {distIdx === 5 && (
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Proteínas %', key: 'prot' },
            { label: 'Carbos %', key: 'carb' },
            { label: 'Grasas %', key: 'fat' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
              <input type="number" value={custom[f.key as keyof typeof custom]}
                onChange={e => setCustom(p => ({ ...p, [f.key]: e.target.value }))} min="0" max="100"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-sm text-center" />
            </div>
          ))}
          {Math.abs(totalPct - 100) > 1 && <div className="col-span-3 text-xs text-red-500">Total: {totalPct}% (debe sumar 100%)</div>}
        </div>
      )}

      {kcal > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: '🥩 Proteínas', g: protG, pct: dist.prot, color: 'bg-blue-500', kcalPer: 4 },
              { label: '🍞 Carbohidratos', g: carbG, pct: dist.carb, color: 'bg-yellow-500', kcalPer: 4 },
              { label: '🧈 Grasas', g: fatG, pct: dist.fat, color: 'bg-orange-500', kcalPer: 9 },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{fmt(r.g)}g</div>
                <div className="text-xs text-gray-400">{r.pct}% · {fmt(r.g * r.kcalPer)} kcal</div>
                <div className="mt-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div>📌 Proteínas y carbohidratos aportan 4 kcal/g · Grasas aportan 9 kcal/g</div>
            <div>📌 Para calcular tus calorías de mantenimiento, usa nuestra calculadora de TMB</div>
          </div>
        </div>
      )}
    </div>
  );
}
