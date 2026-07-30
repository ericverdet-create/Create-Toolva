'use client'
import { useState } from 'react'
import { calcDiscount, fmt } from './index'

export default function DiscountCalculator() {
  const [original, setOriginal] = useState('')
  const [pct, setPct] = useState('')

  const orig = parseFloat(original.replace(',', '.'))
  const p = parseFloat(pct.replace(',', '.'))
  const valid = !isNaN(orig) && !isNaN(p) && orig > 0 && p >= 0 && p <= 100
  const result = valid ? calcDiscount(orig, p) : null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio original (€)</label>
          <input
            type="number" value={original} onChange={e => setOriginal(e.target.value)}
            placeholder="100,00"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descuento (%)</label>
          <input
            type="number" value={pct} onChange={e => setPct(e.target.value)}
            placeholder="20"
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
          />
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="rounded-xl bg-brand-50 p-4 text-center border border-brand-100">
            <p className="text-xs text-brand-600 font-medium mb-1">Precio final</p>
            <p className="text-2xl font-bold text-brand-700">{fmt(result.final)} €</p>
          </div>
          <div className="rounded-xl bg-green-50 p-4 text-center border border-green-100">
            <p className="text-xs text-green-600 font-medium mb-1">Ahorras</p>
            <p className="text-2xl font-bold text-green-700">{fmt(result.saving)} €</p>
          </div>
        </div>
      )}
    </div>
  )
}
