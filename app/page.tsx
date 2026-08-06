import Link from 'next/link';
import { toolRegistry } from '@/lib/tools/registry';
import { siteJsonLd } from '@/lib/structured-data';
import SearchAndFilter from '@/components/SearchAndFilter';

const CATEGORIES = [
  { id: 'math',       label: 'Matemáticas', icon: '🔢' },
  { id: 'converters', label: 'Conversores',  icon: '🔄' },
  { id: 'text',       label: 'Texto',        icon: '📝' },
  { id: 'tax',        label: 'Impuestos',    icon: '🧾' },
  { id: 'health',     label: 'Salud',        icon: '❤️' },
  { id: 'crypto',     label: 'Utilidades',   icon: '🔧' },
];

export default function Home() {
  const jsonLd = siteJsonLd();
  const featuredTools = toolRegistry.slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-14 text-center" aria-label="Introducción">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Herramientas online<br />
            <span className="text-brand-600">gratuitas y sin registro</span>
          </h1>
          <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            {toolRegistry.length}+ herramientas para calcular, convertir y resolver tareas del día a día. Gratis, sin registro, sin instalación.
          </p>
          <div className="max-w-xl mx-auto mb-12">
            <SearchAndFilter />
          </div>
          <nav aria-label="Categorías de herramientas" className="flex flex-wrap justify-center gap-2 mb-12">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/herramientas?categoria=${cat.id}`}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-brand-400 hover:text-brand-700 hover:shadow-sm transition-all">
                <span aria-hidden="true">{cat.icon}</span>
                {cat.label}
              </Link>
            ))}
          </nav>
        </section>

        <section aria-label="Herramientas destacadas" className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Herramientas populares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredTools.map(tool => (
              <Link key={tool.id} href={`/herramientas/${tool.slug}`}
                className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-2xl hover:border-brand-300 hover:shadow-md transition-all text-center group">
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform" role="img" aria-hidden="true">{tool.icon}</span>
                <span className="text-xs font-semibold text-gray-800 leading-tight">{tool.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {CATEGORIES.map(cat => {
          const tools = toolRegistry.filter(t => t.category === cat.id);
          if (!tools.length) return null;
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 id={`cat-${cat.id}`} className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <span aria-hidden="true">{cat.icon}</span>
                  {cat.label}
                  <span className="ml-1 text-sm font-normal text-gray-400">({tools.length})</span>
                </h2>
                <Link href={`/herramientas?categoria=${cat.id}`} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Ver todas →</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {tools.map(tool => (
                  <Link key={tool.id} href={`/herramientas/${tool.slug}`}
                    className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-sm transition-all group">
                    <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform" role="img" aria-hidden="true">{tool.icon}</span>
                    <span className="text-sm font-medium text-gray-800 leading-tight">{tool.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <section className="py-12 text-center" aria-label="Información adicional">
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{toolRegistry.length} herramientas gratuitas</h2>
            <p className="text-gray-600 mb-4">Sin registro. Sin instalación. Resultados al instante.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>✓ Funciona sin internet (PWA)</span>
              <span>✓ Compatible con todos los dispositivos</span>
              <span>✓ Resultados instantáneos</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
