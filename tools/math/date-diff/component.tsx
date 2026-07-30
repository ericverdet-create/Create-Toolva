'use client'
import { useState } from 'react'
import { dateDiff } from './index'
export default function DateDiff() {
  const today = new Date().toISOString().split('T')[0]
  const [from, setFrom] = useState(today)
  const [to, setTo]     = useState(today)
  const r = from && to ? dateDiff(new Date(from + 'T00:00:00'), new Date(to + 'T00:00:00')) : null
  const stat = (label: string, val: number) => (
    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
      <p className="text-xl font-bold text-gray-900">{Math.abs(val).toLocaleString('es-ES')}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} className={inp} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} className={inp} />
        </div>
      </div>
      {r !== null && (
        <div className="space-y-3">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-4xl font-bold text-brand-700">{Math.abs(r.days).toLocaleString('es-ES')}</p>
            <p className="text-brand-600 mt-1">dias totales</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stat('Semanas completas', r.weeks)}
            {stat('Meses aprox.', r.months)}
            {stat('Dias laborables', r.workdays)}
            {stat('Fines de semana', r.weekends)}
          </div>
        </div>
      )}
    </div>
  )
}
