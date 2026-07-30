import type { ToolDefinition } from '@/lib/tools/types'
import { CATEGORY_LABELS, toolUrl, categoryPath, SITE_NAME } from '@/lib/seo'
import Breadcrumb from '@/components/ui/Breadcrumb'

interface Props {
  tool: Omit<ToolDefinition, 'component'>
  children: React.ReactNode
}

export default function ToolShell({ tool, children }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: toolUrl(tool.category, tool.slug),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    inLanguage: 'es',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    provider: { '@type': 'Organization', name: SITE_NAME, url: 'https://toolva.com' },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://toolva.com' },
      { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://toolva.com/tools' },
      { '@type': 'ListItem', position: 3, name: CATEGORY_LABELS[tool.category] ?? tool.category, item: 'https://toolva.com' + categoryPath(tool.category) },
      { '@type': 'ListItem', position: 4, name: tool.name, item: toolUrl(tool.category, tool.slug) },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Breadcrumb crumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Herramientas', href: '/tools' },
          { label: CATEGORY_LABELS[tool.category] ?? tool.category, href: categoryPath(tool.category) },
          { label: tool.name },
        ]} />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{tool.icon}</span>
            <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
          </div>
          <p className="text-gray-500">{tool.description}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          {children}
        </div>
        {tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tool.tags.map(tag => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
