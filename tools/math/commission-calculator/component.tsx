'use client';
import { useState } from 'react';

export default function CommissionCalculator() {
  const [salePrice, setSalePrice] = useState('200000');
  const [commissionRate, setCommissionRate] = useState('3');
  const [includeVat, setIncludeVat] = useState(false);
  const [vatRate, setVatRate] = useState(21);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const price = parseFloat(salePrice) || 0;
  const rate = parseFloat(commissionRate) || 0;

  const commission = price * (rate / 100);
  const commissionWithVat = includeVat ? commission * (1 + vatRate / 100) : commission;
  const netToSeller = price - commissionWithVat;

  const PRESETS = [
    { label: 'Inmobiliaria típica', rate: 3 },
    { label: 'Inmobiliaria premium', rate: 5 },
    { label: 'Agente comercial', rate: 10 },
    { label: 'Plataforma online', rate: 15 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio de venta (€)</label>
          <input type="number" value={salePrice} onChange={e => setSalePrice(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">% de comisión</label>
          <input type="number" value={commissionRate} onChange={e => setCommissionRate(e.target.value)} min="0" max="100" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Tarifas comunes</div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(p => (
            <button key={p.rate} onClick={() => setCommissionRate(String(p.rate))}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${parseFloat(commissionRate) === p.rate ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              {p.label} ({p.rate}%)
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setIncludeVat(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${includeVat ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${includeVat ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Incluir IVA en la comisión</span>
        {includeVat && (
          <select value={vatRate} onChange={e => setVatRate(Number(e.target.value))}
            className="ml-2 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value={21}>21%</option>
            <option value={10}>10%</option>
            <option value={4}>4%</option>
          </select>
        )}
      </div>

      {price > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-2">
          {[
            { label: 'Precio de venta', value: fmt(price) },
            { label: `Comisión (${rate}%)`, value: fmt(commission) },
            ...(includeVat ? [{ label: `IVA comisión (${vatRate}%)`, value: fmt(commissionWithVat - commission) }] : []),
            { label: 'Comisión total', value: fmt(commissionWithVat), bold: true },
            { label: 'Neto para el vendedor', value: fmt(netToSeller), highlight: true },
          ].map((r, i) => (
            <div key={i} className={`flex justify-between ${r.highlight ? 'border-t border-indigo-200 dark:border-indigo-700 pt-2 font-bold text-lg' : r.bold ? 'font-semibold' : 'text-sm text-gray-600 dark:text-gray-400'}`}>
              <span className={r.highlight ? 'text-gray-900 dark:text-white' : ''}>{r.label}</span>
              <span className={r.highlight ? 'text-indigo-700 dark:text-indigo-300 text-xl' : r.bold ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'}>{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
