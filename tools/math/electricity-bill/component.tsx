'use client';
import { useState } from 'react';

// Spain PVPC average 2024 ~0.18 €/kWh (variable; shown as reference)
const PVPC_REF = 0.18;
const POWER_TAX = 0.05; // Impuesto Electricidad 5.11%
const VAT_RATE = 0.21;
const BONO_SOCIAL_DISCOUNT = 0.25;

interface Appliance { name: string; watts: string; hoursPerDay: string; }

const DEFAULT_APPLIANCES: Appliance[] = [
  { name: 'Frigorífico', watts: '150', hoursPerDay: '24' },
  { name: 'TV 55"', watts: '100', hoursPerDay: '4' },
  { name: 'Lavadora (ciclo)', watts: '2000', hoursPerDay: '1' },
  { name: 'Aire acondicionado', watts: '1500', hoursPerDay: '4' },
];

export default function ElectricityBill() {
  const [mode, setMode] = useState<'manual' | 'appliances'>('manual');
  const [kwh, setKwh] = useState('300');
  const [priceKwh, setPriceKwh] = useState(String(PVPC_REF));
  const [powerKw, setPowerKw] = useState('3.3');
  const [days, setDays] = useState('30');
  const [bonoSocial, setBonoSocial] = useState(false);
  const [appliances, setAppliances] = useState<Appliance[]>(DEFAULT_APPLIANCES);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const addAppliance = () => setAppliances(a => [...a, { name: '', watts: '100', hoursPerDay: '2' }]);
  const updateA = (i: number, k: keyof Appliance, v: string) => setAppliances(a => a.map((row, idx) => idx === i ? { ...row, [k]: v } : row));
  const removeA = (i: number) => setAppliances(a => a.filter((_, idx) => idx !== i));

  const applianceKwh = appliances.reduce((sum, a) => {
    return sum + (parseFloat(a.watts)||0) / 1000 * (parseFloat(a.hoursPerDay)||0) * (parseFloat(days)||30);
  }, 0);

  const totalKwh = mode === 'manual' ? (parseFloat(kwh)||0) : applianceKwh;
  const price = parseFloat(priceKwh) || PVPC_REF;
  const daysVal = parseFloat(days) || 30;
  const powerVal = parseFloat(powerKw) || 3.3;

  // Power term: ~0.1244 €/kW/day (2024 ref)
  const POWER_TERM_DAY = 0.1244;
  const powerTerm = powerVal * POWER_TERM_DAY * daysVal;

  let energyTerm = totalKwh * price;
  if (bonoSocial) energyTerm *= (1 - BONO_SOCIAL_DISCOUNT);

  const subtotal = powerTerm + energyTerm;
  const taxElec = subtotal * POWER_TAX;
  const vat = (subtotal + taxElec) * VAT_RATE;
  const total = subtotal + taxElec + vat;

  return (
    <div className="space-y-5">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {(['manual', 'appliances'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {m === 'manual' ? 'Por kWh totales' : 'Por aparatos'}
          </button>
        ))}
      </div>

      {mode === 'manual' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consumo mensual (kWh)</label>
          <input type="number" value={kwh} onChange={e => setKwh(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          <p className="text-xs text-gray-400 mt-0.5">Media española: ~250–350 kWh/mes</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_70px_70px_32px] gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
            <span>Aparato</span><span className="text-center">W</span><span className="text-center">h/día</span><span />
          </div>
          {appliances.map((a, i) => (
            <div key={i} className="grid grid-cols-[1fr_70px_70px_32px] gap-1 items-center">
              <input value={a.name} onChange={e => updateA(i, 'name', e.target.value)} placeholder="Aparato"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              <input type="number" value={a.watts} onChange={e => updateA(i, 'watts', e.target.value)} min="0"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              <input type="number" value={a.hoursPerDay} onChange={e => updateA(i, 'hoursPerDay', e.target.value)} min="0" max="24"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              <button onClick={() => removeA(i)} className="text-gray-400 hover:text-red-500 text-lg leading-none">×</button>
            </div>
          ))}
          <button onClick={addAppliance} className="w-full py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-xs text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">+ Añadir aparato</button>
          <div className="text-xs text-right text-indigo-600 dark:text-indigo-400 font-medium">Total: {applianceKwh.toFixed(1)} kWh en {days} días</div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">€/kWh</label>
          <input type="number" value={priceKwh} onChange={e => setPriceKwh(e.target.value)} min="0" step="0.01"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm text-center" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Potencia (kW)</label>
          <input type="number" value={powerKw} onChange={e => setPowerKw(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm text-center" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Días</label>
          <input type="number" value={days} onChange={e => setDays(e.target.value)} min="1" max="31"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm text-center" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setBonoSocial(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${bonoSocial ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${bonoSocial ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Bono Social (−25%)</span>
      </div>

      {totalKwh > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-1.5 text-sm">
          {[
            { label: `Término energía (${totalKwh.toFixed(0)} kWh × ${price} €)`, val: fmt(energyTerm) },
            { label: `Término potencia (${powerVal} kW × ${daysVal} días)`, val: fmt(powerTerm) },
            { label: `Impuesto electricidad (${(POWER_TAX*100).toFixed(0)}%)`, val: fmt(taxElec) },
            { label: `IVA (21%)`, val: fmt(vat) },
          ].map(r => (
            <div key={r.label} className="flex justify-between text-gray-600 dark:text-gray-400">
              <span className="text-xs">{r.label}</span><span>{r.val}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-indigo-200 dark:border-indigo-700 pt-2">
            <span>Total estimado</span>
            <span className="text-indigo-700 dark:text-indigo-300">{fmt(total)}</span>
          </div>
          <div className="text-xs text-center text-gray-400">{fmt(total/daysVal)}/día · {fmt(total/totalKwh)}/kWh real</div>
        </div>
      )}
    </div>
  );
}
