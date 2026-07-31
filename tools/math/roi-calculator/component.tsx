'use client';
import { useState } from 'react';

export default function RoiCalculator() {
  const [invested, setInvested] = useState('10000');
  const [returned, setReturned] = useState('13500');
  const [months, setMonths] = useState('18');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const inv = parseFloat(invested) || 0;
  const ret = parseFloat(returned) || 0;
  const mon = parseFloat(months) || 0;

  const gain = ret - inv;
  const roi = inv > 0 ? (gain / inv) * 100 : 0;
  const years = mon / 12;
  const roiAnnualized = inv > 0 && years > 0 ? (Math.pow(ret / inv, 1 / years) - 1) * 100 : 0;

  const isPositive = gain >= 0;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Inversión inicial (€)</label>
          <input type="number" value={invested} onChange={e => setInvested(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Valor final / retorno (€)</label>
          <input type="number" value={returned} onChange={e => setReturned(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duración (meses)</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} min="1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      {inv > 0 && (
        <div className="space-y-3">
          <div className={`rounded-2xl p-5 text-center ${isPositive ? 'bg-green-600' : 'bg-red-500'} text-white`}>
            <div className="text-sm opacity-80 mb-1">ROI total</div>
            <div className="text-4xl font-bold">{isPositive ? '+' : ''}{fmt(roi)}%</div>
            <div className="text-sm opacity-80 mt-1">
              {isPositive ? 'Ganancia' : 'Pérdida'} de {fmt(Math.abs(gain))} €
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-sm">
            {[
              { label: 'Inversión', value: fmt(inv) + ' €', color: 'text-gray-900 dark:text-white' },
              { label: 'Retorno', value: fmt(ret) + ' €', color: 'text-gray-900 dark:text-white' },
              { label: isPositive ? 'Ganancia neta' : 'Pérdida neta', value: (isPositive ? '+' : '') + fmt(gain) + ' €', color: isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500' },
              { label: 'ROI anualizado', value: (roiAnnualized >= 0 ? '+' : '') + fmt(roiAnnualized) + '%', color: roiAnnualized >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-500' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{item.label}</div>
                <div className={`font-bold ${item.color}`}>{item.value}</div>
              </div>
            ))}
          </div>

          {/* Visual bar */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Inversión</span><span className="flex-1 border-t border-dashed border-gray-300 dark:border-gray-600" /><span>Retorno</span>
            </div>
            <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-indigo-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, (inv / Math.max(inv, ret)) * 100)}%` }} />
              <div className="absolute left-0 top-0 h-full bg-green-400 opacity-70 rounded-full transition-all"
                style={{ width: `${Math.min(100, (ret / Math.max(inv, ret)) * 100)}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
