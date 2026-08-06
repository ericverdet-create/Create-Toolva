import Link from 'next/link';
import type { Metadata } from 'next';
import { toolRegistry } from '@/lib/tools/registry';
import { blogPosts } from '@/lib/blog/registry';
import SearchAndFilter from '@/components/SearchAndFilter';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

const CATEGORIES = [
  { id: 'math',       label: 'Finanzas y cálculo', icon: '💰' },
  { id: 'health',     label: 'Salud',        icon: '❤️' },
  { id: 'converters', label: 'Conversores',  icon: '🔄' },
  { id: 'text',       label: 'Texto',        icon: '📝' },
  { id: 'tax',        label: 'Impuestos',    icon: '🧾' },
  { id: 'crypto',     label: 'Utilidades',   icon: '🔧' },
];

// Herramientas destacadas curadas por volumen de búsqueda
const FEATURED_SLUGS = [
  'calculadora-hipoteca',
  'sueldo-neto',
  'calculadora-irpf',
  'calculadora-paro',
  'amortizacion-hipoteca',
  'calculadora-imc',
  'calculadora-porcentaje',
  'calculadora-autonomos',
];

export default function Home() {
  const featuredTools = FEATURED_SLUGS
    .map(slug => toolRegistry.find(t => t.slug === slug))
    .filter(Boolean);

  const latestPosts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Hero */}
      <section className="py-12 text-center" aria-label="Herramientas online gratuitas">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
          Herramientas online<br />
          <span className="text-indigo-600 dark:text-indigo-400">gratuitas y sin registro</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 max-w-2xl mx-auto">
          {toolRegistry.length}+ calculadoras y conversores para finanzas, salud, impuestos y más.
          Resultados al instante, sin instalar nada.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          Calculadora de hipoteca · Sueldo neto · IRPF 2026 · IMC · Paro · Herencia · y mucho más
        </p>
        <div className="max-w-xl mx-auto mb-10">
          <SearchAndFilter />
        </div>
        <nav aria-label="Categorías" className="flex flex-wrap justify-center gap-2 mb-4">
          {CATEGORIES.map(cat => (
            <Link key={cat.id} href={`/herramientas?categoria=${cat.id}`}
              className="flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-700 hover:shadow-sm transition-all">
              <span aria-hidden="true">{cat.icon}</span>{cat.label}
            </Link>
          ))}
        </nav>
      </section>

      {/* Herramientas más buscadas */}
      <section aria-label="Herramientas más usadas" className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Las más buscadas</h2>
          <Link href="/herramientas" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Ver todas las {toolRegistry.length} →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featuredTools.map(tool => tool && (
            <Link key={tool.id} href={`/herramientas/${tool.slug}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all group">
              <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">{tool.icon}</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-tight">{tool.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section aria-label="Últimos artículos del blog" className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Guías y artículos</h2>
          <Link href="/blog" className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Ver todos →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {latestPosts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-indigo-400 hover:shadow-md transition-all">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-2 block">{post.category}</span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{post.description}</p>
              <span className="text-xs text-indigo-500 mt-3 block">Leer →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Todas las herramientas por categoría */}
      {CATEGORIES.map(cat => {
        const tools = toolRegistry.filter(t => t.category === cat.id);
        if (!tools.length) return null;
        const visible = tools.slice(0, 10);
        return (
          <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 id={`cat-${cat.id}`} className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
                <span className="text-sm font-normal text-gray-400">({tools.length})</span>
              </h2>
              {tools.length > 10 && (
                <Link href={`/herramientas?categoria=${cat.id}`} className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  Ver todas →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {visible.map(tool => (
                <Link key={tool.id} href={`/herramientas/${tool.slug}`}
                  className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all group">
                  <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true">{tool.icon}</span>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-tight">{tool.name}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* SEO footer text */}
      <section className="py-10 border-t border-gray-100 dark:border-gray-800 mt-4" aria-label="Sobre Toolva">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            La calculadora online gratuita para cada necesidad
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
            Toolva reúne más de {toolRegistry.length} herramientas online gratuitas para España: calculadoras de finanzas personales
            (hipotecas, sueldo neto, IRPF, paro, herencias), calculadoras de salud (IMC, calorías, embarazo),
            conversores de unidades, utilidades de texto y mucho más. Todo funciona directamente en tu navegador,
            sin registro, sin instalar nada y compatible con móvil, tablet y ordenador.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-500 dark:text-gray-400">
            {[
              { icon: '🆓', text: 'Totalmente gratuito' },
              { icon: '📱', text: 'Funciona en móvil' },
              { icon: '⚡', text: 'Resultados al instante' },
              { icon: '🔒', text: 'Sin registro ni datos' },
            ].map(f => (
              <div key={f.text} className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <span className="text-2xl">{f.icon}</span>
                <span className="text-xs font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
