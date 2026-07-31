'use client';
import { useState } from 'react';

type Tab = 'rentabilidad' | 'esfuerzo';

export default function RentalCalculator() {
  const [tab, setTab] = useState<Tab>('esfuerzo');
  // Esfuerzo
  const [monthlyRent, setMonthlyRent] = useState('900');
  const [monthlyIncome, setMonthlyIncome] = useState('2000');
  // Rentabilidad
  const [purchasePrice, setPurchasePrice] = useState('200000');
  const [annualRent, setAnnualRent] = useState('10800');
  const [annualCosts, setAnnualCosts] = useState('1500');
  const [buyExpenses, setBuyExpenses] = useState('13');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Esfuerzo calc
  const rent = parseFloat(monthlyRent) || 0;
  const income = parseFloat(monthlyIncome) || 1;
  const effortPct = (rent / income) * 100;
  const effortStatus = effortPct <= 30 ? 'asequible' : effortPct <= 40 ? 'ajustado' : 'excesivo';
  const effortColor = effortPct <= 30 ? 'text-green-600' : effortPct <= 40 ? 'text-amber-500' : 'text-red-500';
  const maxAffordable = income * 0.3;

  // Rentabilidad calc
  const price = parseFloat(purchasePrice) || 1;
  const expenses = parseFloat(buyExpenses) || 0;
  const totalInvestment = price * (1 + expenses / 100);
  const yearRent = parseFloat(annualRent) || 0;
  const yearCosts = parseFloat(annualCosts) || 0;
  const netRent = yearRent - yearCosts;
  const grossYield = (yearRent / totalInvestment) * 100;
  const netYield = (netRent / totalInvestment) * 100;
  const payback = netYield > 0 ? 100 / netYield : 0;

  return (
    <div className="space-y-5">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {(['esfuerzo', 'rentabilidad'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {t === 'esfuerzo' ? '¿Puedo pagarlo?' : 'Rentabilidad'}
          </button>
        ))}
      </div>

      {tab === 'esfuerzo' ? (
        <div className="space-y-4">
          {[['Alquiler mensual (€)', monthlyRent, setMonthlyRent], ['Ingresos netos mensuales (€)', monthlyIncome, setMonthlyIncome]].map(([label, val, setter]) => (
            <div key={label as string}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label as string}</label>
              <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          ))}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-5 text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Esfuerzo económico</div>
            <div className={`text-5xl font-bold ${effortColor}`}>{effortPct.toFixed(1)}%</div>
            <div className={`text-sm font-medium mt-1 ${effortColor} uppercase tracking-wide`}>{effortStatus}</div>
            <div className="text-xs text-gray-400 mt-2">
              Recomendado: máximo 30% de los ingresos → <strong>{fmt(maxAffordable)} €/mes</strong>
            </div>
          </div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${effortPct <= 30 ? 'bg-green-500' : effortPct <= 40 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(effortPct, 100)}%` }} />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {[
            ['Precio de compra (€)', purchasePrice, setPurchasePrice],
            ['Gastos compra + impuestos (%)', buyExpenses, setBuyExpenses],
            ['Alquiler anual bruto (€)', annualRent, setAnnualRent],
            ['Gastos anuales (IBI, comunidad, seguros…) (€)', annualCosts, setAnnualCosts],
          ].map(([label, val, setter]) => (
            <div key={label as string}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label as string}</label>
              <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Rentabilidad bruta', value: `${grossYield.toFixed(2)}%`, color: 'text-gray-900 dark:text-white' },
              { label: 'Rentabilidad neta', value: `${netYield.toFixed(2)}%`, color: netYield >= 5 ? 'text-green-600' : netYield >= 3 ? 'text-amber-500' : 'text-red-500' },
              { label: 'Inversión total', value: `${fmt(totalInvestment)} €`, color: 'text-gray-900 dark:text-white' },
              { label: 'Años recuperación', value: payback > 0 ? `${payback.toFixed(1)} años` : '—', color: 'text-gray-900 dark:text-white' },
            ].map(r => (
              <div key={r.label} className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className={`font-bold text-lg ${r.color}`}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
