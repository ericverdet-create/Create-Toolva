'use client';
import { useState } from 'react';

// Spain 2024 IRPF brackets (state + regional average)
const IRPF_BRACKETS = [
  { up: 12450, rate: 0.19 },
  { up: 20200, rate: 0.24 },
  { up: 35200, rate: 0.30 },
  { up: 60000, rate: 0.37 },
  { up: 300000, rate: 0.45 },
  { up: Infinity, rate: 0.47 },
];

// SS employee contribution 2024: 6.35% (4.7 contingencias + 1.55 desempleo + 0.1 formacion)
const SS_RATE = 0.0635;
const SS_MAX_BASE = 4720.5 * 12; // max annual base 2024

function calcIRPF(taxableBase: number): number {
  let tax = 0;
  let prev = 0;
  for (const b of IRPF_BRACKETS) {
    if (taxableBase <= prev) break;
    const tranche = Math.min(taxableBase, b.up) - prev;
    tax += tranche * b.rate;
    prev = b.up;
    if (taxableBase <= b.up) break;
  }
  return tax;
}

// Minimum personal allowance 2024: 5550€
const PERSONAL_ALLOWANCE = 5550;

export default function NetSalary() {
  const [gross, setGross] = useState('30000');
  const [situation, setSituation] = useState<'single' | 'married' | 'family'>('single');
  const [children, setChildren] = useState('0');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const grossVal = parseFloat(gross) || 0;
  const childrenVal = parseInt(children) || 0;

  // SS contribution
  const ssBase = Math.min(grossVal, SS_MAX_BASE);
  const ssContrib = ssBase * SS_RATE;

  // Personal allowance
  let allowance = PERSONAL_ALLOWANCE;
  if (situation === 'married') allowance += 3400;
  // Children allowance (simplified)
  const childAllowances = [2400, 2700, 4000, 4500];
  for (let i = 0; i < Math.min(childrenVal, 4); i++) allowance += childAllowances[i];

  const taxableBase = Math.max(0, grossVal - ssContrib - allowance);
  const irpf = calcIRPF(taxableBase);
  const irpfRate = grossVal > 0 ? (irpf / grossVal) * 100 : 0;
  const netAnnual = grossVal - ssContrib - irpf;
  const netMonthly = netAnnual / 12;
  const netMonthly14 = netAnnual / 14;

  const situations = [
    { key: 'single', label: 'Soltero/a' },
    { key: 'married', label: 'Casado/a' },
    { key: 'family', label: 'Familia numerosa' },
  ];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salario bruto anual (€)</label>
        <input type="number" value={gross} onChange={e => setGross(e.target.value)} min="0" step="100"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Situación familiar</label>
          <select value={situation} onChange={e => setSituation(e.target.value as 'single' | 'married' | 'family')}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {situations.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hijos a cargo</label>
          <select value={children} onChange={e => setChildren(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {grossVal > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5">
            <div className="text-center mb-4">
              <div className="text-sm opacity-80">Neto mensual (12 pagas)</div>
              <div className="text-4xl font-bold">{fmt(netMonthly)}</div>
              <div className="text-sm opacity-60 mt-1">o {fmt(netMonthly14)} con 14 pagas</div>
            </div>
            <div className="border-t border-white/20 pt-3 text-center">
              <div className="text-sm opacity-80">Neto anual</div>
              <div className="text-2xl font-bold">{fmt(netAnnual)}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
            {[
              { label: 'Bruto anual', value: fmt(grossVal), cls: 'font-semibold text-gray-900 dark:text-white' },
              { label: `Cotización SS (${(SS_RATE * 100).toFixed(2)}%)`, value: `− ${fmt(ssContrib)}`, cls: 'text-red-500' },
              { label: `IRPF (${irpfRate.toFixed(1)}% efectivo)`, value: `− ${fmt(irpf)}`, cls: 'text-red-500' },
              { label: 'Neto anual', value: fmt(netAnnual), cls: 'font-bold text-green-600 border-t border-gray-200 dark:border-gray-700 pt-2' },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.cls}`}>
                <span>{r.label}</span>
                <span>{r.value}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
            ⚠️ Estimación orientativa 2024. El IRPF real depende de otras deducciones, comunidad autónoma y circunstancias personales.
          </div>
        </div>
      )}
    </div>
  );
}
