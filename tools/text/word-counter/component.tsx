'use client'
import { useState } from 'react'
import { count } from './index'
export default function WordCounter() {
  const [text, setText] = useState('')
  const stats = count(text)
  const metrics = [
    { label: 'Palabras', value: stats.words },
    { label: 'Caracteres', value: stats.chars },
    { label: 'Sin espacios', value: stats.charsNoSpaces },
    { label: 'Frases', value: stats.sentences },
    { label: 'Parrafos', value: stats.paragraphs },
    { label: 'Lectura (min)', value: stats.readingTime },
  ]
  return (
    <div className="space-y-4">
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Pega o escribe tu texto aqui..." rows={8} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map(m => (
          <div key={m.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
