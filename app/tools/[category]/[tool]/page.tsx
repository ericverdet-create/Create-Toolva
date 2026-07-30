import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { getToolBySlug, toolRegistry } from '@/lib/tools/registry'
import ToolShell from '@/components/tools/ToolShell'
import { SITE_NAME, SITE_URL, CATEGORY_LABELS, toolUrl } from '@/lib/seo'

interface Props { params: { category: string; tool: string } }

export function generateStaticParams() {
  return toolRegistry.map(tool => ({ category: tool.category, tool: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.tool)
  if (!tool) return {}
  const catLabel = CATEGORY_LABELS[tool.category] ?? tool.category
  const title = tool.name + ' gratuito online'
  const description = tool.description + ' Gratis, sin registro y sin publicidad.'
  const url = toolUrl(tool.category, tool.slug)
  return {
    title,
    description,
    keywords: tool.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: title + ' | ' + SITE_NAME,
      description,
      url,
      type: 'website',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary',
      title: title + ' | ' + SITE_NAME,
      description,
    },
  }
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.tool)
  if (!tool || tool.category !== params.category) notFound()

  const ToolComponent = dynamic(tool.component, {
    loading: () => (
      <div className="flex items-center justify-center h-40 text-gray-400 text-sm">Cargando...</div>
    ),
  })

  return (
    <ToolShell tool={tool}>
      <ToolComponent />
    </ToolShell>
  )
}
