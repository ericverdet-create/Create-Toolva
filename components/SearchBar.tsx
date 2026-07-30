'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tools } from '@/lib/tools/registry';
import { fuzzySearch } from '@/lib/fuzzy';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof tools>([]);
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    const found = fuzzySearch(tools, query).slice(0, 6);
    setResults(found);
    setOpen(found.length > 0);
    setIdx(-1);
  }, [query]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, -1)); }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (idx >= 0 && results[idx]) {
        router.push('/herramientas/' + results[idx].slug);
        setOpen(false); setQuery('');
      } else if (query.trim()) {
        router.push('/buscar?q=' + encodeURIComponent(query));
        setOpen(false);
      }
    }
    if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => results.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Buscar herramienta..."
          aria-label="Buscar herramienta"
          aria-autocomplete="list"
          aria-expanded={open}
          className="w-full pl-9 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-indigo-300 dark:focus:border-indigo-600 focus:bg-white dark:focus:bg-gray-900 rounded-lg outline-none transition-colors text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      {open && (
        <div
          role="listbox"
          className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden"
        >
          {results.map((tool, i) => (
            <Link
              key={tool.id}
              href={'/herramientas/' + tool.slug}
              role="option"
              aria-selected={i === idx}
              onClick={() => { setOpen(false); setQuery(''); }}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                i === idx
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className="text-xl leading-none">{tool.icon}</span>
              <span className="font-medium">{tool.name}</span>
              <span className="text-gray-400 dark:text-gray-500 text-xs ml-auto capitalize">{tool.category}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
