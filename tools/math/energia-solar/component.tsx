'use client';
import { useState } from 'react';

// Average peak sun hours by Spanish region
const REGIONS = [
  { label: 'Andalucía (Sevilla, Málaga)', hsp: 5.5 },
  { label: 'Murcia / Valencia', hsp: 5.2 },
  { label: 'Castilla-La Mancha / Extremadura', hsp: 5.3 },
  { label: 'Canarias', hsp: 6.0 },
  { label: 'Cataluña (Barcelona)', hsp: 4.8 },
  { label: 'Madrid / Castilla y León', hsp: 5.0 },
  { label: 'Aragón / La Rioja', hsp: 4.9 },
  { label: 'Galicia / Asturias', hsp: 3.8 },
  { label: 'País Vasco / Cantabria', hsp: 3.5 },
  { label: 'Baleares', hsp: 5.2 },
];

export default function EnergiaSolar() {
  const [consumption, setConsumption] = useState('350'); // kWh/month
  const [regionIdx, setRegionIdx] = useState(0);
  const [panelWatts, setPanelWatts] = useState('400'); // W per panel
  const [installCost, setInstallCost] = useState('6000'); // euros
  const [tariff, setTariff] = useState('0.20'); // €/kWh

  const monthlyKwh = parseFloat(consumption) || 0;
  const hsp = REGIONS[regionIdx].hsp;
  const pw = parseFloat(panelWatts) || 400;
  const cost = parseFloat(installCost) || 0;
  const price = parseFloat(tariff) || 0.20;

  // Panel production per day (kWh) = Watts * HSP / 1000
  const panelDailyKwh = (pw * hsp) / 1000;
  const panelMonthlyKwh = panelDailyKwh * 30;

  // Panels needed
  const panelsNeeded = Math.ceil(monthlyKwh / panelMonthlyKwh);
  const systemKw = (panelsNeeded * pw) / 1000;

  // Production
  const monthlyProduction = panelsNeeded * panelMonthlyKwh;
  const annualProduction = monthlyProduction * 12;
  const annualConsumption = monthlyKwh * 12;
  const coverPct = Math.min(100, (monthlyProduction / monthlyKwh) * 100);

  // Savings (assume 80% self-consumption, 20% export at 0.06€)
  const selfConsumePct = 0.80;
  const exportPrice = 0.06;
  const annualSavings = annualProduction * selfConsumePct * price + annualProduction * (1 - selfConsumePct) * exportPrice;

  // ROI
  const paybackYears = cost > 0 && annualSavings > 0 ? cost / annualSavings : null;

  const fmt = (n: number, dec = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Consumo mensual (kWh)</label>
          <input type="number" value={consumption} onChange={e => setConsumption(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio electricidad (€/kWh)</label>
          <input type="number" value={tariff} onChange={e => setTariff(e.target.value)} min="0" step="0.01"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Potencia del panel (W)</label>
          <select value={panelWatts} onChange={e => setPanelWatts(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {[300, 350, 400, 450, 500, 550, 600].map(w => <option key={w} value={w}>{w}W</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Coste instalación (€)</label>
          <input type="number" value={installCost} onChange={e => setInstallCost(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Región</label>
        <select value={regionIdx} onChange={e => setRegionIdx(parseInt(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {REGIONS.map((r, i) => <option key={i} value={i}>{r.label} ({r.hsp} h/día)</option>)}
        </select>
      </div>

      {monthlyKwh > 0 && (
        <div className="space-y-3">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 text-center">
            <div className="text-4xl font-bold text-yellow-700 dark:text-yellow-300">{panelsNeeded}</div>
            <div className="text-sm text-yellow-600 dark:text-yellow-400">paneles necesarios ({fmt(systemKw, 1)} kWp)</div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: '⚡ Producción anual', val: fmt(annualProduction) + ' kWh' },
              { label: '🏠 Consumo anual', val: fmt(annualConsumption) + ' kWh' },
              { label: '📊 Cobertura estimada', val: fmt(coverPct) + '%' },
              { label: '💰 Ahorro anual', val: fmt(annualSavings) + ' €' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          {paybackYears !== null && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{fmt(paybackYears, 1)} años</div>
              <div className="text-sm text-green-600 dark:text-green-400">retorno de la inversión (payback)</div>
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Estimación basada en {hsp} HSP (horas sol pico). Se asume 80% autoconsumo y 20% vertido a red a 0,06€/kWh. Solicita presupuesto a instaladores certificados.
          </div>
        </div>
      )}
    </div>
  );
}
