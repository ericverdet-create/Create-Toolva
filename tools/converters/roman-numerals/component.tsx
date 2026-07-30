'use client'
import { useState } from 'react'
import { toRoman, fromRoman, isValidRoman } from './index'
export default function RomanNumerals() {
  const [mode, setMode] = useState<'toRoman'|'fromRoman'>('toRoman')
  const [input, setInput] = useState('')
  const inp = "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
  const btnCls = (m: 'toRoman'|'fromRoman') => 'flex-1 py-2 rounded-lg text-sm font-medium transition-colors ' +
    (mode === m ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
  let result: string | null = null
  let error: string | null = null
  if (input.trim()) {
    if (mode === 'toRoman') {
      const n = parseInt(input)
      if (isNaN(n) || n < 1 || n > 3999) error = 'Introduce un numero entre 1 y 3999'
      else result = toRoman(n)
    } else {
      if (!isValidRoman(input)) error = 'Numero romano no valido'
      else { const n = fromRoman(input); result = n > 0 ? n.toString() : null }
    }
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={btnCls('toRoman')} onClick={() => { setMode('toRoman'); setInput('') }}>
          Arabigo → Romano
        </button>
        <button className={btnCls('fromRoman')} onClick={() => { setMode('fromRoman'); setInput('') }}>
          Romano → Arabigo
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {mode === 'toRoman' ? 'Numero (1-3999)' : 'Numero romano'}
        </label>
        <input type={mode === 'toRoman' ? 'number' : 'text'}
          value={input} onChange={e => setInput(e.target.value)}
          placeholder={mode === 'toRoman' ? '2024' : 'MMXXIV'}
          className={inp} />
      </div>
      {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
      {result && (
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-center">
          <p className="text-4xl font-bold text-brand-700 font-mono">{result}</p>
        </div>
      )}
    </div>
  )
}
