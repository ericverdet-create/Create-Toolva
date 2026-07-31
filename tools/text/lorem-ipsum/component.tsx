'use client';
import { useState } from 'react';

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum','curabitur','pretium','tincidunt','lacus','nunc','purus','accumsan','libero','vitae','lacinia','sem','diam','sodales','nisl','vel','mi','blandit','turpis','ornare','leo','volutpat','ac','eros','neque'];

function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }

function sentence() {
  const len = Math.floor(Math.random() * 10) + 8;
  const words = Array.from({ length: len }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function paragraph() {
  const len = Math.floor(Math.random() * 4) + 4;
  return Array.from({ length: len }, sentence).join(' ');
}

function generateLorem(type: 'paragraphs' | 'sentences' | 'words', count: number): string {
  if (type === 'paragraphs') return Array.from({ length: count }, paragraph).join('\n\n');
  if (type === 'sentences') return Array.from({ length: count }, sentence).join(' ');
  return Array.from({ length: count }, randomWord).join(' ');
}

export default function LoremIpsum() {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startLorem, setStartLorem] = useState(true);
  const [copied, setCopied] = useState(false);

  const generated = (() => {
    const text = generateLorem(type, count);
    if (!startLorem) return text;
    const prefix = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
    return prefix + text;
  })();

  const copy = async () => {
    await navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tipo</label>
          <select value={type} onChange={e => setType(e.target.value as typeof type)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            <option value="paragraphs">Párrafos</option>
            <option value="sentences">Frases</option>
            <option value="words">Palabras</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cantidad</label>
          <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(20, parseInt(e.target.value)||1)))} min="1" max="20"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={startLorem} onChange={e => setStartLorem(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Empezar con "Lorem ipsum"</span>
          </label>
        </div>
      </div>

      <div className="relative">
        <textarea readOnly value={generated} rows={8}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm resize-none focus:outline-none" />
        <button onClick={copy}
          className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${copied?'bg-green-500 text-white':'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>
      <p className="text-xs text-gray-400">{generated.split(/\s+/).length} palabras · {generated.length} caracteres</p>
    </div>
  );
}
