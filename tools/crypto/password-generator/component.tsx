'use client'
import { useState, useCallback } from 'react'
import { generate, strength } from './index'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [lowercase, setLowercase] = useState(true)
  const [uppercase, setUppercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [pwd, setPwd] = useState('')
  const [copied, setCopied] = useState(false)

  const gen = useCallback(() => {
    setPwd(generate({ length, lowercase, uppercase, numbers, symbols }))
    setCopied(false)
  }, [length, lowercase, uppercase, numbers, symbols])

  const copy = () => {
    if (!pwd) return
    navigator.clipboard.writeText(pwd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const s = pwd ? strength(pwd) : null

  const Toggle = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full transition-colors ${value ? 'bg-brand-500' : 'bg-gray-200'} relative`}
      >
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium text-gray-700">Longitud: {length}</label>
        </div>
        <input type="range" min={4} max={64} value={length} onChange={e => setLength(+e.target.value)}
          className="w-full accent-brand-600" />
        <div className="flex justify-between text-xs text-gray-400"><span>4</span><span>64</span></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Toggle label="Minúsculas (a-z)" value={lowercase} onChange={setLowercase} />
        <Toggle label="Mayúsculas (A-Z)" value={uppercase} onChange={setUppercase} />
        <Toggle label="Números (0-9)" value={numbers} onChange={setNumbers} />
        <Toggle label="Símbolos (!@#…)" value={symbols} onChange={setSymbols} />
      </div>

      <button onClick={gen}
        className="w-full py-2.5 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors text-sm">
        Generar contraseña
      </button>

      {pwd && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
            <code className="flex-1 text-sm break-all font-mono text-gray-800">{pwd}</code>
            <button onClick={copy} className="text-xs text-brand-600 hover:text-brand-700 font-medium whitespace-nowrap">
              {copied ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
          {s && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Fortaleza</span><span className="font-medium">{s.label}</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} transition-all`} style={{ width: s.pct + '%' }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
