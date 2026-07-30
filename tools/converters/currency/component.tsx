'use client'
import { useState } from 'react'
import { CURRENCIES, convert, fmt } from './index'
export default function CurrencyConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('EUR')
  const [to, setTo]     = useState('USD')
  const num = parseFloat(value.replace(',','.'))
  const result = !isNaN(num) ? convert(num, from, to) : null
  const cls = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
  const swap = () => { setFrom(to); setTo(from) }
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="100"
          className={cls + " focus:ring-1 focus:ring-brand-400"} />
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className={cls}>
            {Object.entries(CURRENCIES).map(([k,c]) => <option key={k} value={k}>{c.label}</option>)}
          </select>
        </div>
        <button onClick={swap} className="mb-0.5 rounded-lg border border-gray-200 px-3 py-2 text-gray-500 hover:text-brand-600 transition-colors">swap</button>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">A</label>
          <select value={to} onChange={e => setTo(e.target.value)} className={cls}>
            {Object.entries(CURRENCIES).map(([k,c]) => <option key={k} value={k}>{c.label}</option>)}
          </select>
        </div>
      </div>
      {result !== null && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
          <p className="text-xs text-brand-600 font-medium mb-1">{value} {CURRENCIES[from].label} =</p>
          <p className="text-2xl font-bold text-brand-700">{CURRENCIES[to].symbol} {fmt(result)}</p>
          <p className="text-xs text-gray-400 mt-2">Tasas orientativas. No usar para transacciones financieras.</p>
        </div>
      )}
    </div>
  )
}
