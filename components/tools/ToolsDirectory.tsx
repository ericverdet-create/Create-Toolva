'use client'
import { useState } from 'react'
import type { ToolDefinition } from '@/lib/tools/types'
import { CATEGORY_LABELS, categoryPath } from '@/lib/seo'
import ToolCard from './ToolCard'
import Link from 'next/link'

interface Props {
  tools: Omit<ToolDefinition, 'component'>[]
  categories: string[]
}

export default function ToolsDirectory({ tools, categories }: Props) {
  const [query, setQuery] = useState('')
  const q = query.toLowerCase().trim()

  const filtered = q
    ? tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.keywords.some(kw => kw.toLowerCase().includes(q))
      )
    : null

  return (
    <div>
      {/* Buscador */}
      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={"Buscar entre " + tools.length + " herramientas..."}
          className="w-full rounded-2xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg">✕</button>
        )}
      </div>

      {/* Filtros de categoría */}
      {!q && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <Link key={cat} href={categoryPath(cat)}
              className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 hover:border-brand-400 hover:text-brand-600 transition-colors">
              {CATEGORY_LABELS[cat] ?? cat}
            </Link>
          ))}
        </div>
      )}

      {/* Resultados de búsqueda */}
      {filtered !== null ? (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length === 0
              ? 'No se encontraron herramientas para "' + query + '"'
              : filtered.length + ' herramienta' + (filtered.length !== 1 ? 's' : '') + ' encontrada' + (filtered.length !== 1 ? 's' : '') + ' para "' + query + '"'}
          </p>
          {filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(tool => <ToolCard key={tool.id} tool={tool as ToolDefinition} showCategory />)}
            </div>
          )}
        </div>
      ) : (
        /* Vista por categoría */
        <div className="space-y-12">
          {categories.map(category => {
            const catTools = tools.filter(t => t.category === category)
            return (
              <section key={category}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">{CATEGORY_LABELS[category] ?? category}</h2>
                  <Link href={categoryPath(category)} className="text-sm text-brand-600 hover:underline">Ver categoría</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map(tool => <ToolCard key={tool.id} tool={tool as ToolDefinition} />)}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
