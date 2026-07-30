'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchAndFilter() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full" role="search">
      <label htmlFor="search-main" className="sr-only">Buscar herramientas</label>
      <input
        id="search-main"
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar herramientas... (calculadora, conversor, IVA...)"
        className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-14 text-base shadow-sm placeholder:text-gray-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        autoComplete="off"
        aria-label="Buscar herramientas"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-brand-600 p-2.5 text-white hover:bg-brand-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </button>
    </form>
  );
}
