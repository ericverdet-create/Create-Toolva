import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getToolsByCategory, getAllCategories } from '@/lib/tools/registry'
import { SITE_NAME, SITE_URL, CATEGORY_LABELS } from '@/lib/seo'
import ToolCard from '@/components/tools/ToolCard'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

interface Props { params: { category: string } }

export function generateStaticParams() {
  return getAllCategories().map(category => ({ category }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const label = CATEGORY_LABELS[params.category]
  if (!label) return {}
  return {
    title: 'Herramientas de ' + label + ' gratuitas',
    description: 'Herramientas online de ' + label.toLowerCase() + ' gratuitas. Sin registro, sin publicidad.',
    alternates: { canonical: SITE_URL + '/tools/' + params.category },
    openGraph: {
      title: label + ' | ' + SITE_NAME,
      description: 'Herramientas de ' + label.toLowerCase() + ' gratuitas y online.',
    },
  }
}

export default function CategoryPage({ params }: Props) {
  const tools = getToolsByCategory(params.category)
  if (tools.length === 0) notFound()
  const label = CATEGORY_LABELS[params.category] ?? params.category

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: label + ' — ' + SITE_NAME,
    description: 'Herramientas de ' + label.toLowerCase() + ' gratuitas.',
    url: SITE_URL + '/tools/' + params.category,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumb crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/tools' },
          { label: label },
        ]} />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Herramientas de {label}</h1>
          <p className="text-gray-500">{tools.length} herramienta{tools.length !== 1 ? 's' : ''} gratuita{tools.length !== 1 ? 's' : ''} sin registro.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/tools" className="text-sm text-brand-600 hover:underline">← Ver todas las herramientas</Link>
        </div>
      </div>
    </>
  )
}
