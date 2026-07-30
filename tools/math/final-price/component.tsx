'use client'
import { useState } from 'react'
import { calcFinalPrice } from './index'
export default function FinalPrice() {
  const [original, setOriginal] = useState('')
  const [discounts, setDiscounts] = useState(['', ''])
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const orig = parseFloat(original.replace(',', '.'))
  const dList = discounts.map(d => parseFloat(d.replace(',', '.'))).filter(n => !isNaN(n) && n > 0 && n < 100)
  const canCalc = !isNaN(orig) && orig > 0 && dList.length > 0
  const result = canCalc ? calcFinalPrice(orig, dList) : null
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const updateDiscount = (i: number, v: string) => setDiscounts(prev => prev.map((d, idx) => idx === i ? v : d))
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Precio original (€)</label>
        <input type="number" value={original} onChange={e => setOriginal(e.target.value)} placeholder="100" className={inp} />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Descuentos (%)</label>
        {discounts.map((d, i) => (
          <input key={i} type="number" value={d} onChange={e => updateDiscount(i, e.target.value)}
            placeholder={"Descuento " + (i+1)} className={inp} />
        ))}
        {discounts.length < 5 && (
          <button onClick={() => setDiscounts(prev => [...prev, ''])}
            className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            + Anadir descuento
          </button>
        )}
      </div>
      {result && (
        <div className="space-y-2">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-xs text-brand-600 font-medium mb-1">Precio final</p>
            <p className="text-3xl font-bold text-brand-700">{fmt(result.prices[result.prices.length - 1])} €</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-center">
              <p className="text-xs text-green-600">Ahorro total</p>
              <p className="text-lg font-bold text-green-700">{fmt(result.savings)} €</p>
            </div>
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-xs text-gray-500">Descuento efectivo</p>
              <p className="text-lg font-bold text-gray-900">{result.totalDiscount.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
