'use client';
import { useSearchParams } from 'next/navigation';
import { tools } from '@/lib/tools/registry';
import { fuzzySearch } from '@/lib/fuzzy';
import Link from 'next/link';

export default function SearchResults() {
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const results = q ? fuzzySearch(tools, q) : [];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {q ? `Resultados para "${q}"` : 'Buscar herramientas'}
      </h1>
      {q && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          {results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrados
        </p>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(tool => (
            <Link
              key={tool.id}
              href={`/herramientas/${tool.slug}`}
              className="group card p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{tool.icon}</span>
                <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{tool.description}</p>
            </Link>
          ))}
        </div>
      ) : q ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">No se encontraron herramientas para "{q}"</p>
          <Link href="/herramientas" className="btn-primary">Ver todas las herramientas</Link>
        </div>
      ) : null}
    </main>
  );
}
