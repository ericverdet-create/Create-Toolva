'use client'
import { useState } from 'react'
import { calcStats, parseNumbers } from './index'
export default function Statistics() {
  const [input, setInput] = useState('')
  const nums = parseNumbers(input)
  const r = nums.length > 0 ? calcStats(nums) : null
  const fmt = (n: number) => parseFloat(n.toPrecision(6)).toLocaleString('es-ES')
  const stat = (label: string, val: string | number) => (
    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900 mt-0.5">{val}</p>
    </div>
  )
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Datos (separados por coma, espacio o nueva linea)
        </label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder="1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-none" />
        {nums.length > 0 && <p className="text-xs text-gray-400 mt-1">{nums.length} valores detectados</p>}
      </div>
      {r && (
        <div className="grid grid-cols-2 gap-2">
          {stat('Cantidad (n)', r.count)}
          {stat('Suma', fmt(r.sum))}
          {stat('Media', fmt(r.mean))}
          {stat('Mediana', fmt(r.median))}
          {stat('Minimo', fmt(r.min))}
          {stat('Maximo', fmt(r.max))}
          {stat('Rango', fmt(r.range))}
          {stat('Desv. tipica', fmt(r.stddev))}
          {stat('Varianza', fmt(r.variance))}
          {r.mode.length > 0 && stat('Moda', r.mode.map(n => fmt(n)).join(', '))}
        </div>
      )}
    </div>
  )
}
