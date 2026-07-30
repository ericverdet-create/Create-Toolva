'use client'
import { useState } from 'react'
import { percentageChange, applyChange } from './index'
export default function PercentageChange() {
  const [mode, setMode] = useState<'calc'|'apply'>('calc')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [base, setBase] = useState('')
  const [pct, setPct] = useState('')
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const f = parseFloat(from.replace(',','.')), t = parseFloat(to.replace(',','.'))
  const b = parseFloat(base.replace(',','.')), p = parseFloat(pct.replace(',','.'))
  const changeResult = !isNaN(f) && !isNaN(t) ? percentageChange(f, t) : null
  const applyResult  = !isNaN(b) && !isNaN(p) ? applyChange(b, p) : null
  const btnCls = (a: boolean) => 'flex-1 py-2 rounded-lg text-sm font-medium transition-colors ' +
    (a ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={btnCls(mode==='calc')} onClick={() => setMode('calc')}>Calcular variacion</button>
        <button className={btnCls(mode==='apply')} onClick={() => setMode('apply')}>Aplicar porcentaje</button>
      </div>
      {mode === 'calc' ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Valor inicial</label>
              <input type="number" value={from} onChange={e => setFrom(e.target.value)} placeholder="100" className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Valor final</label>
              <input type="number" value={to} onChange={e => setTo(e.target.value)} placeholder="120" className={inp} /></div>
          </div>
          {changeResult !== null && (
            <div className={"rounded-xl border p-4 text-center " + (changeResult >= 0 ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100')}>
              <p className={"text-3xl font-bold " + (changeResult >= 0 ? 'text-green-700' : 'text-red-700')}>
                {changeResult >= 0 ? '+' : ''}{changeResult.toFixed(2)}%
              </p>
              <p className={"text-sm mt-1 " + (changeResult >= 0 ? 'text-green-600' : 'text-red-600')}>
                {changeResult >= 0 ? 'Incremento' : 'Decremento'}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Valor base</label>
              <input type="number" value={base} onChange={e => setBase(e.target.value)} placeholder="100" className={inp} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje (%)</label>
              <input type="number" value={pct} onChange={e => setPct(e.target.value)} placeholder="15" className={inp} /></div>
          </div>
          {applyResult !== null && (
            <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
              <p className="text-3xl font-bold text-brand-700">{applyResult.toLocaleString('es-ES', {maximumFractionDigits: 4})}</p>
              <p className="text-brand-600 text-sm mt-1">{base} {parseFloat(pct) >= 0 ? '+' : ''}{pct}%</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
