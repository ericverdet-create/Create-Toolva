'use client'
import { useState } from 'react'
import { encode, decode } from './index'

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const output = input ? (mode === 'encode' ? encode(input) : decode(input)) : ''

  const copy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => {
    setInput(output)
    setMode(m => m === 'encode' ? 'decode' : 'encode')
    setCopied(false)
  }

  const btnCls = (active: boolean) =>
    'flex-1 py-2 rounded-lg text-sm font-medium transition-colors ' +
    (active ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={btnCls(mode === 'encode')} onClick={() => setMode('encode')}>Codificar</button>
        <button className={btnCls(mode === 'decode')} onClick={() => setMode('decode')}>Decodificar</button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {mode === 'encode' ? 'Texto a codificar' : 'Base64 a decodificar'}
        </label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Escribe o pega tu texto...' : 'Pega el código Base64...'}
          rows={4}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-none" />
      </div>

      {output && (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">
              {mode === 'encode' ? 'Resultado Base64' : 'Texto decodificado'}
            </label>
            <div className="flex gap-2">
              <button onClick={swap} className="text-xs text-gray-500 hover:text-brand-600">⇄ Invertir</button>
              <button onClick={copy} className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                {copied ? '¡Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>
          <div className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-mono text-gray-800 break-all min-h-[4rem]">
            {output}
          </div>
        </div>
      )}
    </div>
  )
}
