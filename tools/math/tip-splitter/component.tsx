'use client';
import { useState } from 'react';

export default function TipSplitter() {
  const [bill, setBill] = useState('85');
  const [tipPct, setTipPct] = useState('10');
  const [people, setPeople] = useState('4');
  const [customTip, setCustomTip] = useState(false);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const billVal = parseFloat(bill) || 0;
  const tip = parseFloat(tipPct) || 0;
  const peopleVal = Math.max(1, parseInt(people) || 1);

  const tipAmt = billVal * tip / 100;
  const total = billVal + tipAmt;
  const perPerson = total / peopleVal;
  const tipPerPerson = tipAmt / peopleVal;

  const PRESETS = [0, 5, 10, 15, 20];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total de la cuenta (€)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)} min="0" step="0.01"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xl" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Propina</label>
        <div className="flex gap-2 mb-2">
          {PRESETS.map(p => (
            <button key={p} onClick={() => { setTipPct(String(p)); setCustomTip(false); }}
              className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${!customTip && parseInt(tipPct) === p ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
              {p}%
            </button>
          ))}
          <button onClick={() => setCustomTip(true)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${customTip ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
            Otro
          </button>
        </div>
        {customTip && (
          <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)} min="0" max="100" placeholder="% propina"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de personas</label>
        <div className="flex items-center gap-4">
          <button onClick={() => setPeople(String(Math.max(1, peopleVal - 1)))}
            className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-indigo-100 transition-colors">−</button>
          <span className="text-3xl font-bold text-center flex-1 text-gray-900 dark:text-white">{peopleVal}</span>
          <button onClick={() => setPeople(String(peopleVal + 1))}
            className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xl font-bold hover:bg-indigo-100 transition-colors">+</button>
        </div>
      </div>

      {billVal > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Cada persona paga</div>
            <div className="text-5xl font-bold">{fmt(perPerson)}</div>
            {tip > 0 && <div className="text-sm opacity-70 mt-1">Incluye {fmt(tipPerPerson)} de propina</div>}
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Subtotal', val: fmt(billVal) },
              { label: `Propina (${tip}%)`, val: fmt(tipAmt) },
              { label: 'Total', val: fmt(total) },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          {peopleVal > 1 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              {peopleVal} personas × {fmt(perPerson)} = {fmt(total)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
