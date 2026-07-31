'use client';
import { useState } from 'react';

// 2024 Spanish self-employed quota by net income bracket
const TRAMOS = [
  { max: 670, base: 735.29, cuota: 230 },
  { max: 900, base: 816.98, cuota: 260 },
  { max: 1166.70, base: 872.55, cuota: 275 },
  { max: 1300, base: 950.98, cuota: 291 },
  { max: 1500, base: 960.78, cuota: 294 },
  { max: 1700, base: 960.78, cuota: 294 },
  { max: 1850, base: 1013.07, cuota: 310 },
  { max: 2030, base: 1029.41, cuota: 315 },
  { max: 2330, base: 1045.75, cuota: 320 },
  { max: 2760, base: 1078.43, cuota: 330 },
  { max: 3190, base: 1143.79, cuota: 350 },
  { max: 3620, base: 1209.15, cuota: 370 },
  { max: 4050, base: 1274.51, cuota: 390 },
  { max: 6000, base: 1372.55, cuota: 420 },
  { max: Infinity, base: 1633.99, cuota: 500 },
];

export default function AutonomosCalculator() {
  const [monthlyNet, setMonthlyNet] = useState('2000');
  const [isNew, setIsNew] = useState(false);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const net = parseFloat(monthlyNet) || 0;
  const tramo = TRAMOS.find(t => net <= t.max) || TRAMOS[TRAMOS.length - 1];

  const cuotaMensual = isNew ? 80 : tramo.cuota;
  const cuotaAnual = cuotaMensual * 12;
  const baseAnual = tramo.base * 12;

  return (
    <div className="space-y-5">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-sm text-amber-800 dark:text-amber-300">
        ⚠️ Cuotas del sistema de cotización por ingresos reales 2024. Sujetas a regularización anual.
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Ingresos netos mensuales estimados (€)
        </label>
        <input type="number" value={monthlyNet} onChange={e => setMonthlyNet(e.target.value)} min="0"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        <p className="text-xs text-gray-400 mt-1">Ingresos - gastos deducibles (sin IVA, sin cuota SS)</p>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setIsNew(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${isNew ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${isNew ? 'translate-x-4' : ''}`} />
        </button>
        <div>
          <span className="text-sm text-gray-700 dark:text-gray-300">Tarifa plana nuevos autónomos</span>
          <span className="text-xs text-gray-400 block">80€/mes durante 12 meses (ampliable)</span>
        </div>
      </div>

      {net > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Cuota mensual Seguridad Social</div>
            <div className="text-4xl font-bold">{fmt(cuotaMensual)}</div>
            {isNew && <div className="text-sm opacity-70 mt-1">Tarifa plana (primeros 12 meses)</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center text-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Cuota anual</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(cuotaAnual)}</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center text-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Base cotización</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(tramo.base)}/mes</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm">
            <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Tu tramo de ingresos</div>
            <div className="space-y-1">
              {TRAMOS.slice(0, 6).map((t, i) => {
                const prev = i === 0 ? 0 : TRAMOS[i-1].max;
                const isActive = t === tramo;
                return (
                  <div key={i} className={`flex justify-between text-xs rounded px-2 py-1 ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40 font-bold text-indigo-700 dark:text-indigo-300' : 'text-gray-500 dark:text-gray-400'}`}>
                    <span>{prev === 0 ? 'Hasta' : `${prev.toLocaleString('es-ES')} —`} {t.max === Infinity ? '>' : t.max.toLocaleString('es-ES')} €/mes</span>
                    <span>{t.cuota} €/mes</span>
                  </div>
                );
              })}
              <div className="text-xs text-gray-400 text-center">... y más tramos hasta 6.000+ €</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
