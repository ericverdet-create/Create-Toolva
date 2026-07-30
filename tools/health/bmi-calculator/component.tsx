'use client'
import { useState } from 'react'
import { calcBMI } from './index'

export default function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')

  const w = parseFloat(weight.replace(',', '.'))
  const h = parseFloat(height.replace(',', '.'))
  const valid = !isNaN(w) && !isNaN(h) && w > 0 && h > 0 && w < 500 && h < 300
  const result = valid ? calcBMI(w, h) : null

  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"

  const pct = result ? Math.min(100, Math.max(0, (result.bmi - 10) / (45 - 10) * 100)) : 0

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="70" className={inp} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="175" className={inp} />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className={"rounded-xl border p-4 text-center " + result.bgColor}>
            <p className="text-xs font-medium mb-1 text-gray-600">IMC</p>
            <p className={"text-4xl font-bold " + result.color}>{result.bmi.toFixed(1)}</p>
            <p className={"font-semibold mt-1 " + result.color}>{result.category}</p>
            <p className="text-xs text-gray-500 mt-1">{result.description}</p>
          </div>
          <div>
            <div className="h-3 bg-gradient-to-r from-blue-300 via-green-400 via-yellow-400 to-red-500 rounded-full relative">
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-gray-700 rounded-full shadow"
                style={{ left: pct + '%' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Bajo peso</span><span>Normal</span><span>Sobrepeso</span><span>Obesidad</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">Peso ideal: {result.idealMin}–{result.idealMax} kg para tu altura.</p>
        </div>
      )}
    </div>
  )
}
