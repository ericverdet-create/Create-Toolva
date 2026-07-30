'use client'
import { useState } from 'react'
import { formatJSON, minifyJSON } from './index'
export default function JSONFormatter() {
  const [input, setInput] = useState('')
  const [indent, setIndent] = useState(2)
  const [copied, setCopied] = useState<'fmt'|'min'|null>(null)
  const fmt = input ? formatJSON(input, indent) : null
  const min = input ? minifyJSON(input) : null
  const copy = (text: string, which: 'fmt'|'min') => {
    navigator.clipboard.writeText(text)
    setCopied(which)
    setTimeout(() => setCopied(null), 1500)
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">JSON de entrada</label>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          placeholder='{"nombre": "Toolva", "version": 1}'
          rows={5}
          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-mono focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-none" />
      </div>
      {fmt && (
        fmt.error ? (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 font-mono">
            Error: {fmt.error}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Sangria:</label>
                {[2,4].map(n => (
                  <button key={n} onClick={() => setIndent(n)}
                    className={"rounded px-2 py-0.5 text-xs font-medium " + (indent === n ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600')}>
                    {n} espacios
                  </button>
                ))}
              </div>
              <button onClick={() => fmt.result && copy(fmt.result, 'fmt')}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                {copied === 'fmt' ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
            <pre className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2 text-sm font-mono text-gray-800 overflow-auto max-h-64 whitespace-pre-wrap break-all">
              {fmt.result}
            </pre>
            {min && min.result && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Minificado ({min.result.length} chars):</span>
                <button onClick={() => copy(min.result, 'min')}
                  className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                  {copied === 'min' ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}
