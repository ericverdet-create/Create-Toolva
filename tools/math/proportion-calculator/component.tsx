'use client'
import { useState } from 'react'
import { solveProportion } from './index'
export default function ProportionCalculator() {
  const [a,setA] = useState(''); const [b,setB] = useState('')
  const [c,setC] = useState(''); const [d,setD] = useState('')
  const parse = (s: string) => s.trim() === '' ? null : parseFloat(s.replace(',','.'))
  const av = parse(a), bv = parse(b), cv = parse(c), dv = parse(d)
  const blanks = [a,b,c,d].filter(v => v.trim() === '').length
  const result = blanks === 1 ? solveProportion(av, bv, cv, dv) : null
  const inp = (v: string, set: (s:string)=>void) => (
    <input type="number" value={v} onChange={e => set(e.target.value)} placeholder="?"
      className={"w-full rounded-lg border px-3 py-3 text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-brand-400 " +
        (v.trim() === '' ? 'border-brand-300 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white text-gray-900')} />
  )
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500 text-center">Deja en blanco el valor a calcular (A / B = C / D)</p>
      <div className="flex items-center gap-2">
        <div className="flex-1">{inp(a, setA)}</div>
        <span className="text-gray-400 font-bold">/</span>
        <div className="flex-1">{inp(b, setB)}</div>
        <span className="text-gray-400 font-bold">=</span>
        <div className="flex-1">{inp(c, setC)}</div>
        <span className="text-gray-400 font-bold">/</span>
        <div className="flex-1">{inp(d, setD)}</div>
      </div>
      {result !== null && !isNaN(result) && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
          <p className="text-3xl font-bold text-brand-700">{parseFloat(result.toPrecision(8)).toLocaleString('es-ES')}</p>
        </div>
      )}
    </div>
  )
}
