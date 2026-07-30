'use client'
import { useState } from 'react'
import { calcCompound } from './index'
export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [freq, setFreq] = useState('12')
  const [contribution, setContribution] = useState('')
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const n = (s: string) => parseFloat(s.replace(',', '.'))
  const p = n(principal), r = n(rate), y = n(years), c = n(contribution) || 0
  const canCalc = !isNaN(p) && !isNaN(r) && !isNaN(y) && p > 0 && r > 0 && y > 0
  const result = canCalc ? calcCompound(p, r, y, parseInt(freq), c) : null
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Capital inicial (€)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="10000" className={inp} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Tasa anual (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="7" className={inp} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Anos</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="10" className={inp} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Frecuencia</label>
          <select value={freq} onChange={e => setFreq(e.target.value)} className={inp}>
            <option value="1">Anual</option>
            <option value="4">Trimestral</option>
            <option value="12">Mensual</option>
            <option value="365">Diario</option>
          </select></div>
        <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Aportacion periodica (€, opcional)</label>
          <input type="number" value={contribution} onChange={e => setContribution(e.target.value)} placeholder="100" className={inp} /></div>
      </div>
      {result && (
        <div className="space-y-2">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-xs text-brand-600 font-medium mb-1">Capital final tras {years} anos</p>
            <p className="text-3xl font-bold text-brand-700">{fmt(result.finalAmount)} €</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-xs text-gray-500">Capital inicial</p>
              <p className="text-lg font-bold text-gray-900">{fmt(result.initialCapital)} €</p>
            </div>
            <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-center">
              <p className="text-xs text-green-600">Intereses ganados</p>
              <p className="text-lg font-bold text-green-700">{fmt(result.totalInterest)} €</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
