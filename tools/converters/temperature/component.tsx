'use client'
import { useState } from 'react'
import { convert, fmt } from './index'
import type { TempUnit } from './index'
const UNITS: { key: TempUnit; label: string; symbol: string }[] = [
  { key: 'C', label: 'Celsius', symbol: '°C' },
  { key: 'F', label: 'Fahrenheit', symbol: '°F' },
  { key: 'K', label: 'Kelvin', symbol: 'K' },
]
export default function TemperatureConverter() {
  const [value, setValue] = useState('')
  const [from, setFrom] = useState<TempUnit>('C')
  const num = parseFloat(value.replace(',', '.'))
  const result = !isNaN(num) ? convert(num, from) : null
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {UNITS.map(u => (
          <button key={u.key} onClick={() => setFrom(u.key)} className={from === u.key ? 'flex-1 py-2 rounded-lg border text-sm font-semibold bg-brand-600 text-white border-brand-600' : 'flex-1 py-2 rounded-lg border text-sm font-semibold bg-white text-gray-700 border-gray-300 hover:border-brand-400'}>{u.label}</button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Temperatura en {UNITS.find(u => u.key === from)?.label}</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="0" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      {result && (
        <div className="rounded-xl border border-gray-200 divide-y divide-gray-200">
          {UNITS.filter(u => u.key !== from).map(u => (
            <div key={u.key} className="flex justify-between items-center px-5 py-4">
              <span className="text-sm text-gray-600">{u.label}</span>
              <span className="font-semibold text-gray-900">{fmt(result[u.key])} {u.symbol}</span>
            </div>
          ))}
          <div className="flex justify-between items-center px-5 py-4 bg-brand-50">
            <span className="text-sm font-semibold text-brand-700">{UNITS.find(u => u.key === from)?.label}</span>
            <span className="font-semibold text-brand-700 text-lg">{fmt(num)} {UNITS.find(u => u.key === from)?.symbol}</span>
          </div>
        </div>
      )}
    </div>
  )
}
