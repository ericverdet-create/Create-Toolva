'use client';
import { useState } from 'react';

const fmt2 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 3 });
const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export default function CalculadoraCostoKm() {
  const [kmAnuales, setKmAnuales] = useState('15000');
  const [precioCombustible, setPrecioCombustible] = useState('1.75');
  const [consumo, setConsumo] = useState('7');
  const [seguro, setSeguro] = useState('600');
  const [amortizacion, setAmortizacion] = useState('1500');
  const [mantenimiento, setMantenimiento] = useState('400');
  const [neumaticos, setNeumaticos] = useState('200');
  const [itv, setItv] = useState('60');

  const km = parseFloat(kmAnuales) || 1;
  const pc = parseFloat(precioCombustible) || 0;
  const cons = parseFloat(consumo) || 0;
  const seg = parseFloat(seguro) || 0;
  const amor = parseFloat(amortizacion) || 0;
  const mant = parseFloat(mantenimiento) || 0;
  const neum = parseFloat(neumaticos) || 0;
  const itvN = parseFloat(itv) || 0;

  const gastoCombustibleAnual = (cons / 100) * km * pc;
  const totalAnual = gastoCombustibleAnual + seg + amor + mant + neum + itvN;
  const costeKm = totalAnual / km;
  const hacienda = 0.26;
  const difHacienda = hacienda - costeKm;

  const partidas = [
    { label: 'Combustible', valor: gastoCombustibleAnual, pct: gastoCombustibleAnual / totalAnual * 100 },
    { label: 'Seguro', valor: seg, pct: seg / totalAnual * 100 },
    { label: 'Amortización', valor: amor, pct: amor / totalAnual * 100 },
    { label: 'Mantenimiento', valor: mant, pct: mant / totalAnual * 100 },
    { label: 'Neumáticos', valor: neum, pct: neum / totalAnual * 100 },
    { label: 'ITV y tasas', valor: itvN, pct: itvN / totalAnual * 100 },
  ];

  const INPUT = 'w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Km anuales</label>
          <input type="number" value={kmAnuales} onChange={e => setKmAnuales(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Precio combustible (€/L)</label>
          <input type="number" step="0.01" value={precioCombustible} onChange={e => setPrecioCombustible(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Consumo (L/100km)</label>
          <input type="number" step="0.1" value={consumo} onChange={e => setConsumo(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Seguro anual (€)</label>
          <input type="number" value={seguro} onChange={e => setSeguro(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Amortización anual (€)</label>
          <input type="number" value={amortizacion} onChange={e => setAmortizacion(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mantenimiento anual (€)</label>
          <input type="number" value={mantenimiento} onChange={e => setMantenimiento(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Neumáticos anuales (€)</label>
          <input type="number" value={neumaticos} onChange={e => setNeumaticos(e.target.value)} className={INPUT} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">ITV y tasas (€/año)</label>
          <input type="number" value={itv} onChange={e => setItv(e.target.value)} className={INPUT} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-center">
          <div className="text-xs text-indigo-500 dark:text-indigo-400 mb-1">Coste por km</div>
          <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt2(costeKm)}€</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Gasto anual total</div>
          <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{fmt0(totalAnual)}</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2">
        {partidas.map(p => (
          <div key={p.label}>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-0.5">
              <span>{p.label}</span>
              <span>{fmt0(p.valor)}/año ({p.pct.toFixed(0)}%)</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${p.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-xl p-3 text-sm border ${difHacienda >= 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'}`}>
        <strong>Tarifa Hacienda 2026: 0,26€/km</strong><br />
        Tu coste real: {fmt2(costeKm)}€/km → {difHacienda >= 0 ? `Hacienda cubre tu gasto real (${fmt2(difHacienda)}€/km de margen)` : `Tu coste es ${fmt2(Math.abs(difHacienda))}€/km superior a la exención`}
      </div>
    </div>
  );
}
