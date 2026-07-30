import Link from 'next/link'
import { CATEGORY_LABELS, categoryPath } from '@/lib/seo'
import { getAllCategories } from '@/lib/tools/registry'

export default function Footer() {
  const categories = getAllCategories()
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-brand-600 text-lg mb-2">⚡ Toolva</p>
          <p className="text-sm text-gray-500">Herramientas online gratuitas.<br />Sin registro. Sin publicidad.</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Categorias</p>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat}>
                <Link href={categoryPath(cat)} className="text-sm text-gray-500 hover:text-brand-600 transition-colors">
                  {CATEGORY_LABELS[cat] ?? cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Legal</p>
          <ul className="space-y-2">
            <li><span className="text-sm text-gray-400">Privacidad (proxímamente)</span></li>
            <li><span className="text-sm text-gray-400">Terminos (proxímamente)</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Toolva. Todos los derechos reservados.
      </div>
    </footer>
  )
}
