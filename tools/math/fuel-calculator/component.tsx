'use client'
import { useState } from 'react'
import { calcFuel, calcConsumption, calcDistance, calcCost } from './index'
type Mode = 'litros' | 'consumo' | 'distancia'
export default function FuelCalculator() {
  const [mode, setMode] = useState<Mode>('litros')
  const [distance, setDistance] = useState('')
  const [consumption, setConsumption] = useState('')
  const [liters, setLiters] = useState('')
  const [price, setPrice] = useState('')
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const n = (s: string) => parseFloat(s.replace(',', '.'))
  const btnCls = (m: Mode) => 'flex-1 py-2 rounded-lg text-xs font-medium transition-colors ' +
    (mode === m ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
  const d = n(distance), c = n(consumption), l = n(liters), p = n(price)
  let result: number | null = null
  let resultLabel = ''
  if (mode === 'litros' && !isNaN(d) && !isNaN(c)) {
    result = calcFuel(d, c); resultLabel = 'litros necesarios'
  } else if (mode === 'consumo' && !isNaN(l) && !isNaN(d)) {
    result = calcConsumption(l, d); resultLabel = 'L/100km'
  } else if (mode === 'distancia' && !isNaN(l) && !isNaN(c)) {
    result = calcDistance(l, c); resultLabel = 'km posibles'
  }
  const costResult = result !== null && mode === 'litros' && !isNaN(p) ? calcCost(result, p) : null
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={btnCls('litros')} onClick={() => setMode('litros')}>Litros necesarios</button>
        <button className={btnCls('consumo')} onClick={() => setMode('consumo')}>Consumo</button>
        <button className={btnCls('distancia')} onClick={() => setMode('distancia')}>Distancia</button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {(mode === 'litros' || mode === 'consumo') && (
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Distancia (km)</label>
            <input type="number" value={distance} onChange={e => setDistance(e.target.value)} placeholder="500" className={inp} /></div>
        )}
        {(mode === 'litros' || mode === 'distancia') && (
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Consumo (L/100km)</label>
            <input type="number" value={consumption} onChange={e => setConsumption(e.target.value)} placeholder="6.5" className={inp} /></div>
        )}
        {(mode === 'consumo' || mode === 'distancia') && (
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Litros</label>
            <input type="number" value={liters} onChange={e => setLiters(e.target.value)} placeholder="40" className={inp} /></div>
        )}
        {mode === 'litros' && (
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Precio/litro (€, opcional)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="1.75" className={inp} /></div>
        )}
      </div>
      {result !== null && (
        <div className="space-y-2">
          <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
            <p className="text-3xl font-bold text-brand-700">{result.toLocaleString('es-ES', {maximumFractionDigits: 2})}</p>
            <p className="text-brand-600 text-sm mt-1">{resultLabel}</p>
          </div>
          {costResult !== null && (
            <div className="rounded-xl bg-green-50 border border-green-100 p-3 text-center">
              <p className="text-xl font-bold text-green-700">{costResult.toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2})} €</p>
              <p className="text-green-600 text-xs mt-0.5">coste estimado del viaje</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
