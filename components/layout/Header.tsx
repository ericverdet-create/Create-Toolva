import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-600 hover:text-brand-700 transition-colors">
          <span className="text-xl">⚡</span>
          <span>Toolva</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-brand-600 transition-colors">Inicio</Link>
          <Link href="/tools" className="hover:text-brand-600 transition-colors">Herramientas</Link>
        </nav>
      </div>
    </header>
  )
}
