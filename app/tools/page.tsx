import type { Metadata } from 'next'
import { toolRegistry, getAllCategories } from '@/lib/tools/registry'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import ToolsDirectory from '@/components/tools/ToolsDirectory'

export const metadata: Metadata = {
  title: 'Todas las herramientas gratuitas',
  description: 'Directorio completo de herramientas online gratuitas de ' + SITE_NAME + '. Calculadoras, conversores, utilidades de texto y más.',
  alternates: { canonical: SITE_URL + '/tools' },
  openGraph: { title: 'Herramientas | ' + SITE_NAME, description: 'Directorio de herramientas online gratuitas.' },
}

export default function ToolsPage() {
  const categories = getAllCategories()
  const tools = toolRegistry.map(({ component, ...rest }) => rest)

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Todas las herramientas</h1>
        <p className="text-gray-500">{toolRegistry.length} herramientas gratuitas sin registro ni publicidad.</p>
      </div>
      <ToolsDirectory tools={tools} categories={categories} />
    </div>
  )
}
