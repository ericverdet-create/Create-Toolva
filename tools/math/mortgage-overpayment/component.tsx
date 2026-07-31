'use client';
import { useState } from 'react';

function calcMortgage(principal: number, annualRate: number, months: number) {
  if (annualRate === 0) return { payment: principal / months, totalInterest: 0, totalPaid: principal };
  const r = annualRate / 100 / 12;
  const payment = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const totalPaid = payment * months;
  return { payment, totalInterest: totalPaid - principal, totalPaid };
}

function calcWithOverpayment(principal: number, annualRate: number, months: number, extra: number, mode: 'reduce_time' | 'reduce_payment') {
  const r = annualRate / 100 / 12;
  if (r === 0) return { months: Math.max(1, months - Math.floor(extra/principal * months)), totalInterest: 0 };

  let balance = principal;
  let m = 0;
  const basePayment = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  let totalInterest = 0;
  let totalMonths = 0;
  let currentPayment = basePayment;

  while (balance > 0.01 && m < 1200) {
    const interest = balance * r;
    totalInterest += interest;
    const principalPaid = currentPayment - interest + extra;
    balance -= principalPaid;
    if (balance < 0) balance = 0;
    m++;

    if (mode === 'reduce_payment' && balance > 0 && m % 12 === 0) {
      // Recalculate payment every year
      const remaining = months - m;
      if (remaining > 0) {
        currentPayment = balance * r * Math.pow(1 + r, remaining) / (Math.pow(1 + r, remaining) - 1);
      }
    }
  }
  return { months: m, totalInterest };
}

export default function MortgageOverpayment() {
  const [principal, setPrincipal] = useState('180000');
  const [rate, setRate] = useState('3.5');
  const [years, setYears] = useState('30');
  const [extra, setExtra] = useState('200');
  const [mode, setMode] = useState<'reduce_time' | 'reduce_payment'>('reduce_time');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) || 0;
  const m = parseInt(years) * 12 || 0;
  const ex = parseFloat(extra) || 0;

  const base = calcMortgage(p, r, m);
  const over = p > 0 && m > 0 ? calcWithOverpayment(p, r, m, ex, mode) : null;

  const savedInterest = over ? base.totalInterest - over.totalInterest : 0;
  const savedMonths = over ? m - over.months : 0;
  const savedYears = Math.floor(savedMonths / 12);
  const savedMo = savedMonths % 12;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Capital pendiente (€)', val: principal, set: setPrincipal },
          { label: 'Tipo de interés (%)', val: rate, set: setRate, step: '0.1' },
          { label: 'Años restantes', val: years, set: setYears },
          { label: 'Amortización extra/mes (€)', val: extra, set: setExtra },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0" step={f.step}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">La amortización extra sirve para:</label>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {([['reduce_time', 'Reducir plazo'], ['reduce_payment', 'Reducir cuota']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setMode(key)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {p > 0 && m > 0 && over && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            {[
              { label: 'Cuota actual', val: fmt(base.payment) + '/mes' },
              { label: 'Con amortización', val: fmt(base.payment + ex) + '/mes' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 space-y-2">
            <div className="text-sm font-medium text-green-800 dark:text-green-300 text-center mb-3">✅ Ahorro con amortización anticipada</div>
            {[
              { label: 'Intereses ahorrados', val: fmt(savedInterest), big: true },
              { label: 'Tiempo ahorrado', val: `${savedYears}a ${savedMo}m`, big: true },
              { label: 'Intereses sin amortizar', val: fmt(base.totalInterest) },
              { label: 'Intereses con amortización', val: fmt(over.totalInterest) },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.big ? 'font-bold text-green-700 dark:text-green-300 text-base' : 'text-sm text-gray-600 dark:text-gray-400'}`}>
                <span>{r.label}</span><span>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
