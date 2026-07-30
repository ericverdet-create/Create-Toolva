'use client'
import { useState } from 'react'
import { valueToPercent, percentToValue, fmt } from './index'
type Mode = 'valueToPercent' | 'percentToValue'
export default function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('valueToPercent')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const numA = parseFloat(a.replace(',', '.'))
  const numB = parseFloat(b.replace(',', '.'))
  const valid = !isNaN(numA) && !isNaN(numB) && numB !== 0
  const result = valid ? (mode === 'valueToPercent' ? valueToPercent(numA, numB) : percentToValue(numA, numB)) : null
  return (
    <div className="space-y-6">
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        <button onClick={() => setMode('valueToPercent')} className={mode === 'valueToPercent' ? 'flex-1 py-2 text-sm font-medium bg-brand-600 text-white' : 'flex-1 py-2 text-sm font-medium bg-white text-gray-600 hover:bg-gray-50'}>X es que % de Y</button>
        <button onClick={() => setMode('percentToValue')} className={mode === 'percentToValue' ? 'flex-1 py-2 text-sm font-medium bg-brand-600 text-white' : 'flex-1 py-2 text-sm font-medium bg-white text-gray-600 hover:bg-gray-50'}>X% de Y es...</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{mode === 'valueToPercent' ? 'Valor (X)' : 'Porcentaje (X%)'}</label>
          <input type="number" value={a} onChange={e => setA(e.target.value)} placeholder="0" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total (Y)</label>
          <input type="number" value={b} onChange={e => setB(e.target.value)} placeholder="0" className="w-full rounded-lg border border-gray-300 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>
      {result && (
        <div className="rounded-xl bg-brand-50 border border-brand-200 p-5 text-center">
          <p className="text-4xl font-bold text-brand-700">{mode === 'valueToPercent' ? fmt(result.percentage) + '%' : fmt(result.value)}</p>
          <p className="text-sm text-brand-600 mt-1">{mode === 'valueToPercent' ? fmt(result.value) + ' es el ' + fmt(result.percentage) + '% de ' + fmt(result.total) : 'El ' + fmt(result.percentage) + '% de ' + fmt(result.total) + ' es ' + fmt(result.value)}</p>
        </div>
      )}
    </div>
  )
}
