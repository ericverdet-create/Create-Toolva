'use client';
import { useState } from 'react';

// Spain 2024 pension rules (simplified)
// Base reguladora = average of last 25 years (300 months)
// % applied to base reguladora depends on years contributed:
// 15 years = 50%, each additional year adds:
//   years 16-25: +0.19% per month (2.28%/year)
//   years 26-35: +0.18% per month (2.16%/year)
//   years 36+:  +0.17% per month (2.04%/year) up to 100%

function calcPercent(years: number): number {
  if (years < 15) return 0;
  let pct = 50;
  const extra = years - 15;
  const y1 = Math.min(extra, 10); // years 16-25
  const y2 = Math.min(Math.max(extra - 10, 0), 10); // years 26-35
  const y3 = Math.max(extra - 20, 0); // years 36+
  pct += y1 * 2.28 + y2 * 2.16 + y3 * 2.04;
  return Math.min(pct, 100);
}

// Early/late retirement penalty/bonus (2024)
// Penalty for retiring before 67: -7.5% per year if <38.5 years, -6.5% if 38.5-44.5, -5% if ≥45 years
// Bonus for retiring after 67: +4% per year
function retirementFactor(retireAge: number, yearsContrib: number): number {
  const normalAge = yearsContrib >= 38.5 ? 65 : 67;
  if (retireAge === normalAge) return 1;
  if (retireAge < normalAge) {
    const yearsBefore = normalAge - retireAge;
    const penaltyPct = yearsContrib >= 45 ? 5 : yearsContrib >= 38.5 ? 6.5 : 7.5;
    return Math.max(0, 1 - (penaltyPct / 100) * yearsBefore);
  }
  // after normal age
  const yearsAfter = retireAge - normalAge;
  return 1 + 0.04 * yearsAfter;
}

const MIN_PENSION_2024 = 784.68; // €/month (with spouse, 14 pays → monthly equiv approx)
const MAX_PENSION_2024 = 3175.04; // €/month

export default function PensionCalculator() {
  const [baseReg, setBaseReg] = useState('2000');
  const [years, setYears] = useState('35');
  const [retireAge, setRetireAge] = useState('67');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const baseVal = parseFloat(baseReg) || 0;
  const yearsVal = parseFloat(years) || 0;
  const ageVal = parseInt(retireAge) || 67;

  const pct = calcPercent(yearsVal);
  const factor = retirementFactor(ageVal, yearsVal);
  const raw = baseVal * (pct / 100) * factor;
  const pension = Math.min(Math.max(raw, yearsVal >= 15 ? MIN_PENSION_2024 : 0), MAX_PENSION_2024);
  const annual = pension * 14;

  const normalRetireAge = yearsVal >= 38.5 ? 65 : 67;
  const earlyLate = ageVal < normalRetireAge ? 'anticipada' : ageVal > normalRetireAge ? 'demorada' : 'ordinaria';

  return (
    <div className="space-y-5">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
        📌 Estimación orientativa según normativa 2024. La pensión real la calcula la Seguridad Social.
      </div>

      {[
        { label: 'Base reguladora mensual (€)', hint: 'Media últimos 25 años cotizados', val: baseReg, set: setBaseReg, step: '10' },
        { label: 'Años cotizados', hint: 'Mínimo 15 para tener derecho', val: years, set: setYears, step: '1' },
        { label: 'Edad de jubilación', hint: 'Normal: 67 (o 65 con ≥38.5 años cotizados)', val: retireAge, set: setRetireAge, step: '1' },
      ].map(f => (
        <div key={f.label}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
          <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0" step={f.step}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          <p className="text-xs text-gray-400 mt-0.5">{f.hint}</p>
        </div>
      ))}

      {yearsVal >= 15 && baseVal > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Pensión estimada mensual</div>
            <div className="text-4xl font-bold">{fmt(pension)}</div>
            <div className="text-sm opacity-70 mt-1">{fmt(annual)} al año (14 pagas)</div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: '% base reguladora', value: `${pct.toFixed(2)}%` },
              { label: 'Factor jubilación', value: earlyLate === 'anticipada' ? `−${((1 - factor) * 100).toFixed(1)}%` : earlyLate === 'demorada' ? `+${((factor - 1) * 100).toFixed(1)}%` : 'Normal' },
              { label: 'Tipo jubilación', value: earlyLate },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.value}</div>
              </div>
            ))}
          </div>

          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-xs text-center text-gray-400">{pct.toFixed(2)}% de la base reguladora</p>
        </div>
      )}

      {yearsVal > 0 && yearsVal < 15 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-sm text-red-600 dark:text-red-400 text-center">
          Con menos de 15 años cotizados no hay derecho a pensión contributiva.
          Te faltan <strong>{(15 - yearsVal).toFixed(0)} años</strong>.
        </div>
      )}
    </div>
  );
}
