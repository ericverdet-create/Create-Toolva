'use client'
import { useState } from 'react'
import { MODES } from './index'

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copy = (key: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Texto de entrada</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder="Escribe o pega tu texto..."
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-none" />
      </div>

      {input && (
        <div className="space-y-2">
          {Object.entries(MODES).map(([key, { label, fn }]) => {
            const out = fn(input)
            return (
              <div key={key} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                <span className="w-32 shrink-0 text-xs text-gray-500 font-medium">{label}</span>
                <span className="flex-1 text-sm font-mono text-gray-800 truncate">{out}</span>
                <button onClick={() => copy(key, out)}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium whitespace-nowrap shrink-0">
                  {copied === key ? '✓' : 'Copiar'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
