import Link from 'next/link'
import type { ToolDefinition } from '@/lib/tools/types'
import { CATEGORY_LABELS } from '@/lib/seo'

interface Props {
  tool: ToolDefinition
  showCategory?: boolean
}

export default function ToolCard({ tool, showCategory = false }: Props) {
  return (
    <Link
      href={'/tools/' + tool.category + '/' + tool.slug}
      className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-brand-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl leading-none" aria-hidden="true">{tool.icon}</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-500 text-sm font-medium">→</span>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors leading-snug">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">{tool.description}</p>
      </div>
      {showCategory && (
        <span className="self-start rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 font-medium">
          {CATEGORY_LABELS[tool.category] ?? tool.category}
        </span>
      )}
    </Link>
  )
}
