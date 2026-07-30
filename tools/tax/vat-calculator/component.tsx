'use client'
import { useState } from 'react'
import { EU_RATES, calcVat, fmt } from './index'

export default function VatCalculator() {
  const [base, setBase] = useState('')
  const [country, setCountry] = useState('ES')
  const [useRed, setUseRed] = useState(false)

  const rate = useRed && EU_RATES[country].red ? EU_RATES[country].red! : EU_RATES[country].std
  const num = parseFloat(base.replace(',', '.'))
  const result = !isNaN(num) && num > 0 ? calcVat(num, rate) : null

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Base imponible (€)</label>
        <input type="number" value={base} onChange={e => setBase(e.target.value)} placeholder="100,00"
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
          <select value={country} onChange={e => { setCountry(e.target.value); setUseRed(false) }}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none">
            {Object.entries(EU_RATES).map(([k, v]) => (
              <option key={k} value={k}>{v.country} ({v.std}%)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select value={useRed ? 'red' : 'std'} onChange={e => setUseRed(e.target.value === 'red')}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none">
            <option value="std">General ({EU_RATES[country].std}%)</option>
            {EU_RATES[country].red && <option value="red">Reducido ({EU_RATES[country].red}%)</option>}
          </select>
        </div>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[
            { label: 'Base', value: fmt(result.base) + ' €' },
            { label: 'IVA ' + rate + '%', value: fmt(result.vat) + ' €' },
            { label: 'Total', value: fmt(result.total) + ' €' },
          ].map(r => (
            <div key={r.label} className="rounded-xl bg-brand-50 border border-brand-100 p-3 text-center">
              <p className="text-xs text-brand-600 font-medium mb-1">{r.label}</p>
              <p className="text-lg font-bold text-brand-700">{r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
