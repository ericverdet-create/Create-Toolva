import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog/registry';

export const metadata: Metadata = {
  title: 'Blog de Finanzas y Calculadoras — Toolva',
  description: 'Guías prácticas de finanzas personales, impuestos y economía doméstica. Con calculadoras interactivas para que puedas aplicarlo a tu caso concreto.',
  alternates: { canonical: 'https://create-toolva.vercel.app/blog' },
  openGraph: {
    title: 'Blog de Finanzas — Toolva',
    description: 'Guías prácticas con calculadoras integradas. IRPF, hipotecas, herencias, paro y más.',
    url: 'https://create-toolva.vercel.app/blog',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Finanzas: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Impuestos: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Trabajo: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <Link href="/" className="hover:text-indigo-600">Toolva</Link>
          <span>›</span>
          <span>Blog</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Blog de finanzas personales
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Guías prácticas con calculadoras integradas. Sin teoría vacía — solo lo que puedes aplicar hoy.
        </p>
      </div>

      {/* Posts grid */}
      <div className="space-y-6">
        {sorted.map(post => (
          <Link key={post.slug} href={`/blog/${post.slug}`}
            className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                {post.category}
              </span>
              <span className="text-xs text-gray-400">{post.readingTime} min de lectura</span>
              <span className="text-xs text-gray-400">·</span>
              <time className="text-xs text-gray-400" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              {post.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1.5 flex-wrap">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-1 transition-transform inline-block">
                Leer →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA tools */}
      <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300 mb-3 font-medium">¿Prefieres ir directo al cálculo?</p>
        <Link href="/herramientas"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
          Ver las 175 herramientas gratuitas →
        </Link>
      </div>
    </main>
  );
}
