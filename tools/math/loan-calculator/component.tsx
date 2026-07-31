'use client';
import { useState, useMemo } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState('8.5');
  const [termMonths, setTermMonths] = useState('36');
  const [showTable, setShowTable] = useState(false);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const result = useMemo(() => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const n = parseInt(termMonths) || 1;
    const r = annualRate / 100 / 12;

    if (P <= 0 || n <= 0) return null;

    let monthlyPayment: number;
    if (r === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - P;

    // Amortization table (first 12 rows + last)
    const table: { month: number; payment: number; principal: number; interest: number; balance: number }[] = [];
    let balance = P;
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance = Math.max(0, balance - principalPayment);
      if (i <= 6 || i === n || (i > n - 3 && i <= n)) {
        table.push({ month: i, payment: monthlyPayment, principal: principalPayment, interest: interestPayment, balance });
      } else if (i === 7) {
        table.push({ month: -1, payment: 0, principal: 0, interest: 0, balance: 0 }); // separator
      }
    }

    return { monthlyPayment, totalPaid, totalInterest, table };
  }, [amount, rate, termMonths]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Importe del préstamo (€)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">TIN anual (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Plazo (meses)</label>
          <input type="number" value={termMonths} onChange={e => setTermMonths(e.target.value)} min="1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-indigo-600 text-white rounded-2xl p-4 text-center">
              <div className="text-xs opacity-80 mb-1">Cuota mensual</div>
              <div className="text-2xl font-bold">{fmt(result.monthlyPayment)}</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total a pagar</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white">{fmt(result.totalPaid)}</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total intereses</div>
              <div className="text-xl font-bold text-red-600 dark:text-red-400">{fmt(result.totalInterest)}</div>
            </div>
          </div>

          <div>
            <button onClick={() => setShowTable(t => !t)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {showTable ? '▲ Ocultar tabla de amortización' : '▼ Ver tabla de amortización'}
            </button>
            {showTable && (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-2 pr-4">Mes</th>
                      <th className="pb-2 pr-4">Cuota</th>
                      <th className="pb-2 pr-4">Capital</th>
                      <th className="pb-2 pr-4">Intereses</th>
                      <th className="pb-2">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.table.map((row, i) =>
                      row.month === -1 ? (
                        <tr key={i}><td colSpan={5} className="py-1 text-center text-gray-400">···</td></tr>
                      ) : (
                        <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-1.5 pr-4 text-gray-600 dark:text-gray-400">{row.month}</td>
                          <td className="py-1.5 pr-4">{fmt(row.payment)}</td>
                          <td className="py-1.5 pr-4 text-green-600 dark:text-green-400">{fmt(row.principal)}</td>
                          <td className="py-1.5 pr-4 text-red-500">{fmt(row.interest)}</td>
                          <td className="py-1.5">{fmt(row.balance)}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
