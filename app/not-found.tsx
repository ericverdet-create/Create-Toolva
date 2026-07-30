import Link from 'next/link';
import { toolRegistry } from '@/lib/tools/registry';

export default function NotFound() {
  const popular = toolRegistry.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-4">🔧</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Página no encontrada</h2>
        <p className="text-gray-500 mb-8">
          La herramienta o página que buscas no existe. Prueba con una de estas:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {popular.map(tool => (
            <Link
              key={tool.id}
              href={`/herramientas/${tool.slug}`}
              className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-xl hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <span className="text-2xl mb-1">{tool.icon}</span>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{tool.name}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-xl hover:bg-brand-700 font-medium transition-colors"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
