'use client'
import { useState } from 'react'
import { solveOhm, fmt } from './index'
export default function OhmCalculator() {
  const [V, setV] = useState(''); const [I, setI] = useState('')
  const [R, setR] = useState(''); const [P, setP] = useState('')
  const parse = (s: string) => s.trim() === '' ? null : parseFloat(s.replace(',', '.'))
  const vv = parse(V), iv = parse(I), rv = parse(R), pv = parse(P)
  const filled = [V, I, R, P].filter(s => s.trim() !== '').length
  const result = filled === 2 ? solveOhm(vv, iv, rv, pv) : null
  const inp = (label: string, val: string, set: (s:string)=>void, unit: string) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label} <span className="text-gray-400">({unit})</span></label>
      <input type="number" value={val} onChange={e => set(e.target.value)} placeholder="?"
        className={"w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-400 " +
          (val.trim() === '' ? 'border-gray-200 bg-white' : 'border-brand-300 bg-brand-50')} />
    </div>
  )
  const stat = (label: string, val: number | undefined, unit: string) => val !== undefined ? (
    <div className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
      <p className="text-lg font-bold text-gray-900">{fmt(val)} <span className="text-sm font-normal text-gray-500">{unit}</span></p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  ) : null
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">Introduce exactamente 2 valores para calcular los demas</p>
      <div className="grid grid-cols-2 gap-3">
        {inp('Voltaje (V)', V, setV, 'V')}
        {inp('Intensidad (I)', I, setI, 'A')}
        {inp('Resistencia (R)', R, setR, 'Ω')}
        {inp('Potencia (P)', P, setP, 'W')}
      </div>
      {result && Object.keys(result).length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {stat('Voltaje', result.V, 'V')}
          {stat('Intensidad', result.I, 'A')}
          {stat('Resistencia', result.R, 'Ω')}
          {stat('Potencia', result.P, 'W')}
        </div>
      )}
    </div>
  )
}
