import { tools } from '@/lib/tools/registry';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Todas las herramientas',
  description: 'Catálogo completo de más de 40 herramientas online gratuitas: calculadoras, conversores, utilidades de texto y más.',
};

const CATEGORY_LABELS: Record<string, string> = {
  math: 'Matemáticas y cálculo',
  converters: 'Conversores',
  text: 'Texto',
  crypto: 'Utilidades',
  tax: 'Impuestos y finanzas',
  health: 'Salud',
};

const CATEGORY_ICONS: Record<string, string> = {
  math: '🔢',
  converters: '🔄',
  text: '📝',
  crypto: '⚙️',
  tax: '💰',
  health: '❤️',
};

export default function HerramientasPage() {
  const byCategory: Record<string, typeof tools> = {};
  tools.forEach(tool => {
    if (!byCategory[tool.category]) byCategory[tool.category] = [];
    byCategory[tool.category].push(tool);
  });

  const categories = Object.keys(byCategory);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Todas las herramientas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {tools.length} herramientas gratuitas, sin registro, listas para usar.
        </p>
      </div>

      <nav aria-label="Categorías" className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <a
            key={cat}
            href={`#${cat}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <span>{CATEGORY_ICONS[cat] ?? '🔧'}</span>
            <span>{CATEGORY_LABELS[cat] ?? cat}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">({byCategory[cat].length})</span>
          </a>
        ))}
      </nav>

      <div className="space-y-12">
        {categories.map(cat => (
          <section key={cat} id={cat} aria-labelledby={`heading-${cat}`}>
            <h2
              id={`heading-${cat}`}
              className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4"
            >
              <span>{CATEGORY_ICONS[cat] ?? '🔧'}</span>
              {CATEGORY_LABELS[cat] ?? cat}
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500 ml-1">
                ({byCategory[cat].length})
              </span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {byCategory[cat].map(tool => (
                <Link
                  key={tool.id}
                  href={`/herramientas/${tool.slug}`}
                  className="group card p-3 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col items-center text-center gap-2"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-tight">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
