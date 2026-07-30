'use client'
import { useState } from 'react'
import { UNITS, convert, fmt } from './index'

export default function LengthConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')

  const num = parseFloat(value.replace(',', '.'))
  const result = !isNaN(num) ? convert(num, from, to) : null

  const selectClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
  const inputClass = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)}
          placeholder="Introduce un valor" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className={selectClass}>
            {Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">A</label>
          <select value={to} onChange={e => setTo(e.target.value)} className={selectClass}>
            {Object.entries(UNITS).map(([k, u]) => <option key={k} value={k}>{u.label}</option>)}
          </select>
        </div>
      </div>
      {result !== null && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
          <p className="text-xs text-brand-600 font-medium mb-1">{value} {UNITS[from].label} =</p>
          <p className="text-2xl font-bold text-brand-700">{fmt(result)} <span className="text-lg">{UNITS[to].label}</span></p>
        </div>
      )}
    </div>
  )
}
