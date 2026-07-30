'use client'
import { useState } from 'react'
import { calcAge } from './index'

export default function AgeCalculator() {
  const [birth, setBirth] = useState('')

  const today = new Date()
  const maxDate = today.toISOString().split('T')[0]
  const bd = birth ? new Date(birth + 'T00:00:00') : null
  const valid = bd && !isNaN(bd.getTime()) && bd < today
  const result = valid ? calcAge(bd) : null

  const stat = (label: string, value: string | number) => (
    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
      <p className="text-xl font-bold text-gray-900">{value.toLocaleString('es-ES')}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  )

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de nacimiento</label>
        <input type="date" value={birth} onChange={e => setBirth(e.target.value)} max={maxDate}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
      </div>

      {result && (
        <div className="space-y-4">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-4xl font-bold text-brand-700">{result.years} años</p>
            <p className="text-brand-600 mt-1">{result.months} meses y {result.days} días</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stat('Días vividos', result.totalDays)}
            {result.isBirthdayToday
              ? <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-3 text-center">
                  <p className="text-xl">🎉</p>
                  <p className="text-xs text-yellow-700 font-medium mt-0.5">¡Feliz cumpleaños!</p>
                </div>
              : stat('Días para cumpleaños', result.daysUntilBirthday)
            }
          </div>
        </div>
      )}
    </div>
  )
}
