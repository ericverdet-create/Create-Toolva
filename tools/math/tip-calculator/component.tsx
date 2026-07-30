'use client'
import { useState } from 'react'
import { calcTip } from './index'
export default function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPct, setTipPct] = useState('10')
  const [people, setPeople] = useState('1')
  const PRESETS = [5, 10, 15, 20]
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const b = parseFloat(bill.replace(',', '.')), t = parseFloat(tipPct), p = parseInt(people) || 1
  const canCalc = !isNaN(b) && !isNaN(t) && b > 0
  const result = canCalc ? calcTip(b, t, p) : null
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Importe de la cuenta (€)</label>
        <input type="number" value={bill} onChange={e => setBill(e.target.value)} placeholder="45.00" className={inp} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Propina (%)</label>
        <div className="flex gap-2 mb-2">
          {PRESETS.map(p => (
            <button key={p} onClick={() => setTipPct(p.toString())}
              className={"flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors " +
                (tipPct === p.toString() ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
              {p}%
            </button>
          ))}
        </div>
        <input type="number" value={tipPct} onChange={e => setTipPct(e.target.value)}
          placeholder="10" className={inp} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Numero de personas</label>
        <input type="number" min="1" value={people} onChange={e => setPeople(e.target.value)} placeholder="1" className={inp} />
      </div>
      {result && (
        <div className="space-y-2">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-xs text-brand-600 font-medium mb-1">Total a pagar</p>
            <p className="text-3xl font-bold text-brand-700">{fmt(result.totalAmount)} €</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-xs text-gray-500">Propina</p>
              <p className="text-lg font-bold text-gray-900">{fmt(result.tipAmount)} €</p>
            </div>
            {p > 1 && <>
              <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-center">
                <p className="text-xs text-green-600">Por persona</p>
                <p className="text-lg font-bold text-green-700">{fmt(result.perPerson)} €</p>
              </div>
            </>}
          </div>
        </div>
      )}
    </div>
  )
}
