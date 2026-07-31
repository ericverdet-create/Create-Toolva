'use client';
import { useState, useMemo } from 'react';

export default function SavingsCalculator() {
  const [goal, setGoal] = useState('10000');
  const [initial, setInitial] = useState('1000');
  const [monthly, setMonthly] = useState('200');
  const [rate, setRate] = useState('3');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const result = useMemo(() => {
    const G = parseFloat(goal) || 0;
    const P = parseFloat(initial) || 0;
    const M = parseFloat(monthly) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;

    if (G <= 0 || (P >= G && M === 0)) return null;
    if (M <= 0 && r === 0) return null;

    // Find months until goal
    let balance = P;
    let months = 0;
    const MAX_MONTHS = 600; // 50 years max
    while (balance < G && months < MAX_MONTHS) {
      balance = balance * (1 + r) + M;
      months++;
    }

    if (months >= MAX_MONTHS) return null;

    const totalContributed = P + M * months;
    const totalInterest = balance - totalContributed;

    // Timeline for chart (yearly snapshots)
    const snapshots: { year: number; balance: number; contributed: number }[] = [{ year: 0, balance: P, contributed: P }];
    let b = P, c = P;
    for (let m = 1; m <= months; m++) {
      b = b * (1 + r) + M;
      c += M;
      if (m % 12 === 0 || m === months) {
        snapshots.push({ year: m / 12, balance: b, contributed: c });
      }
    }

    return { months, years: Math.floor(months / 12), remMonths: months % 12, totalContributed, totalInterest, finalBalance: balance, snapshots };
  }, [goal, initial, monthly, rate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Objetivo de ahorro (€)</label>
          <input type="number" value={goal} onChange={e => setGoal(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ahorro inicial (€)</label>
          <input type="number" value={initial} onChange={e => setInitial(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Aportación mensual (€)</label>
          <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentabilidad anual (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      {result === null && (
        <div className="text-center text-gray-400 text-sm py-4">
          Introduce valores válidos para calcular
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="bg-indigo-600 text-white rounded-2xl p-4 text-center">
            <div className="text-sm opacity-80 mb-1">Tiempo para alcanzar el objetivo</div>
            <div className="text-3xl font-bold">
              {result.years > 0 ? `${result.years} año${result.years !== 1 ? 's' : ''}` : ''}{' '}
              {result.remMonths > 0 ? `${result.remMonths} mes${result.remMonths !== 1 ? 'es' : ''}` : ''}
            </div>
            <div className="text-sm opacity-70 mt-1">({result.months} meses en total)</div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Aportado</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(result.totalContributed)}</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Intereses</div>
              <div className="font-bold text-green-600 dark:text-green-400">{fmt(result.totalInterest)}</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Saldo final</div>
              <div className="font-bold text-indigo-700 dark:text-indigo-300">{fmt(result.finalBalance)}</div>
            </div>
          </div>

          {/* Simple bar chart */}
          <div className="space-y-1">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Evolución del ahorro</div>
            {result.snapshots.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-14 text-right text-gray-500">{s.year === 0 ? 'Inicio' : `Año ${s.year.toFixed(1)}`}</span>
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-indigo-200 dark:bg-indigo-800 rounded-full"
                    style={{ width: `${Math.min(100, (s.contributed / result.finalBalance) * 100)}%` }} />
                  <div className="absolute left-0 top-0 h-full bg-indigo-500 dark:bg-indigo-500 rounded-full opacity-70"
                    style={{ width: `${Math.min(100, (s.balance / result.finalBalance) * 100)}%` }} />
                </div>
                <span className="w-24 text-gray-700 dark:text-gray-300">{fmt(s.balance)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
