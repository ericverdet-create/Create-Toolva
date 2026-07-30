'use client'
import { useState } from 'react'
import { count } from './index'

export default function CharCounter() {
  const [text, setText] = useState('')
  const stats = count(text)

  const items = [
    { label: 'Caracteres', value: stats.chars },
    { label: 'Sin espacios', value: stats.charsNoSpaces },
    { label: 'Palabras', value: stats.words },
    { label: 'Líneas', value: stats.lines },
    { label: 'Frases', value: stats.sentences },
    { label: 'Párrafos', value: stats.paragraphs },
  ]

  return (
    <div className="space-y-4">
      <textarea
        value={text} onChange={e => setText(e.target.value)}
        placeholder="Pega o escribe tu texto aquí..."
        rows={6}
        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 resize-none"
      />
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => (
          <div key={item.label} className="rounded-xl bg-gray-50 border border-gray-100 p-3 text-center">
            <p className="text-lg font-bold text-gray-900">{item.value.toLocaleString('es-ES')}</p>
            <p className="text-xs text-gray-500 mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
      {stats.words > 0 && (
        <p className="text-center text-sm text-gray-500">
          Tiempo de lectura estimado: <strong className="text-gray-700">~{stats.readTime} min</strong>
        </p>
      )}
    </div>
  )
}
