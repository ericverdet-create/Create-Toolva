import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { tools, getToolBySlug, getToolsByCategory } from '@/lib/tools/registry';
import { toolJsonLd, breadcrumbJsonLd } from '@/lib/structured-data';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Herramienta no encontrada' };
  return {
    title: tool.name,
    description: tool.description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.name,
      description: tool.description,
      type: 'website',
      locale: 'es_ES',
    },
    twitter: { card: 'summary_large_image', title: tool.name, description: tool.description },
  };
}

export default async function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const { default: ToolComponent } = await tool.component();
  const related = getToolsByCategory(tool.category)
    .filter(t => t.id !== tool.id)
    .slice(0, 4);

  const jsonLd = toolJsonLd(tool);
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Inicio', url: 'https://toolva.com' },
    { name: 'Herramientas', url: 'https://toolva.com/herramientas' },
    { name: tool.name, url: `https://toolva.com/herramientas/${tool.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6" id="main-content">
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" itemProp="item">
                <span itemProp="name">Inicio</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/herramientas" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" itemProp="item">
                <span itemProp="name">Herramientas</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li aria-hidden="true" className="text-gray-300 dark:text-gray-600">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-900 dark:text-white font-medium" itemProp="name">{tool.name}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        <header className="mb-6" aria-label="Información de la herramienta">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl" role="img" aria-label={tool.name}>{tool.icon}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3" aria-label="Etiquetas">
              {tool.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <section aria-label={`Herramienta: ${tool.name}`} className="card p-4 sm:p-6 mb-8">
          <Suspense fallback={<div className="flex items-center justify-center h-40 text-gray-400 text-sm">Cargando...</div>}>
            <ToolComponent />
          </Suspense>
        </section>

        {related.length > 0 && (
          <aside aria-label="Herramientas relacionadas">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Más herramientas de {tool.category}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {related.map(t => (
                <Link
                  key={t.id}
                  href={`/herramientas/${t.slug}`}
                  className="card p-3 text-center hover:border-indigo-300 dark:hover:border-indigo-600 transition-all group"
                >
                  <div className="text-2xl mb-1">{t.icon}</div>
                  <div className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {t.name}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </main>
    </>
  );
}
