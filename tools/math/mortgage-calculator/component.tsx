'use client'
import { useState } from 'react'
import { calcMortgage, fmt } from './index'

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')

  const p = parseFloat(principal.replace(',', '.'))
  const r = parseFloat(rate.replace(',', '.'))
  const y = parseInt(years)
  const valid = !isNaN(p) && !isNaN(r) && !isNaN(y) && p > 0 && r >= 0 && y > 0 && y <= 50
  const result = valid ? calcMortgage(p, r, y) : null

  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capital (€)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} placeholder="150.000" className={inp} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo interés anual (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="3,5" step="0.1" className={inp} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plazo (años)</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} placeholder="30" min="1" max="50" className={inp} />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-xs text-brand-600 font-medium mb-1">Cuota mensual</p>
            <p className="text-3xl font-bold text-brand-700">{fmt(result.monthlyPayment)} €</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
              <p className="text-sm font-bold text-gray-900">{fmt(result.totalPaid)} €</p>
              <p className="text-xs text-gray-500 mt-0.5">Total pagado</p>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-3 text-center">
              <p className="text-sm font-bold text-red-700">{fmt(result.totalInterest)} €</p>
              <p className="text-xs text-red-500 mt-0.5">Total intereses</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">Cálculo orientativo. Consulta con tu entidad bancaria.</p>
        </div>
      )}
    </div>
  )
}
