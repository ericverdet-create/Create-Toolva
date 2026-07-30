'use client'
import { useState, useCallback } from 'react'
import { generateMultiple } from './index'
export default function UUIDGenerator() {
  const [count, setCount] = useState(1)
  const [uuids, setUuids] = useState<string[]>([])
  const [copied, setCopied] = useState<number|'all'|null>(null)
  const generate = useCallback(() => { setUuids(generateMultiple(count)); setCopied(null) }, [count])
  const copy = (text: string, idx: number|'all') => {
    navigator.clipboard.writeText(text)
    setCopied(idx)
    setTimeout(() => setCopied(null), 1500)
  }
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad (max 20)</label>
          <input type="number" value={count} min={1} max={20}
            onChange={e => setCount(Math.min(20, Math.max(1, parseInt(e.target.value)||1)))}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400" />
        </div>
        <button onClick={generate}
          className="rounded-lg bg-brand-600 text-white px-5 py-2 text-sm font-medium hover:bg-brand-700 transition-colors">
          Generar
        </button>
      </div>
      {uuids.length > 0 && (
        <div className="space-y-2">
          {uuids.length > 1 && (
            <div className="flex justify-end">
              <button onClick={() => copy(uuids.join('\n'), 'all')}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium">
                {copied === 'all' ? 'Copiados!' : 'Copiar todos'}
              </button>
            </div>
          )}
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              <span className="flex-1 text-sm font-mono text-gray-800 select-all">{uuid}</span>
              <button onClick={() => copy(uuid, i)}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium whitespace-nowrap">
                {copied === i ? 'OK' : 'Copiar'}
              </button>
            </div>
          ))}
        </div>
      )}
      {uuids.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Pulsa Generar para crear UUIDs</p>}
    </div>
  )
}
