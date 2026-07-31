'use client';
import { useState, useMemo } from 'react';

export default function AnalizadorTexto() {
  const [texto, setTexto] = useState('');
  const [topN, setTopN] = useState(10);

  const stats = useMemo(() => {
    if (!texto.trim()) return null;
    const palabras = texto.trim().split(/\s+/).filter(Boolean);
    const oraciones = texto.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const parrafos = texto.split(/\n{2,}/).filter(s => s.trim().length > 0);
    const chars = texto.length;
    const charsSinEspacios = texto.replace(/\s/g, '').length;
    const tiempoLectura = Math.max(1, Math.round(palabras.length / 200)); // 200 ppm promedio
    const tiempoLecturaVoz = Math.max(1, Math.round(palabras.length / 130)); // 130 ppm promedio voz

    // Frecuencia de palabras (stopwords básicas excluidas)
    const STOPWORDS = new Set(['de', 'la', 'el', 'en', 'y', 'a', 'los', 'las', 'del', 'que', 'se', 'un', 'una', 'por', 'con', 'no', 'es', 'al', 'lo', 'su', 'para', 'más', 'como', 'pero', 'sus', 'le', 'ya', 'fue', 'o', 'este', 'si', 'me', 'ni', 'están', 'están', 'the', 'of', 'and', 'to', 'in', 'is', 'it', 'that', 'was', 'for', 'on', 'are', 'with', 'as', 'at', 'be', 'this', 'have', 'from', 'or', 'an', 'by', 'not']);
    const freq: Record<string, number> = {};
    for (const p of palabras) {
      const limpia = p.toLowerCase().replace(/[^a-záéíóúüñ]/gi, '');
      if (limpia.length >= 3 && !STOPWORDS.has(limpia)) {
        freq[limpia] = (freq[limpia] || 0) + 1;
      }
    }
    const topPalabras = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, topN);
    const maxFreq = topPalabras[0]?.[1] || 1;

    // Densidad de keyword principal
    const keyword = topPalabras[0]?.[0] || '';
    const densidad = palabras.length > 0 && keyword ? ((freq[keyword] / palabras.length) * 100).toFixed(2) : '0';

    return { palabras: palabras.length, oraciones: oraciones.length, parrafos: parrafos.length, chars, charsSinEspacios, tiempoLectura, tiempoLecturaVoz, topPalabras, maxFreq, densidad, keyword };
  }, [texto, topN]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Pega o escribe tu texto aquí</label>
        <textarea value={texto} onChange={e => setTexto(e.target.value)} rows={6} placeholder="Escribe o pega tu texto para analizar..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm resize-none" />
      </div>

      {stats && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: '📝 Palabras', val: stats.palabras },
              { label: '🔤 Caracteres', val: stats.chars },
              { label: '🔤 Sin espacios', val: stats.charsSinEspacios },
              { label: '💬 Oraciones', val: stats.oraciones },
              { label: '¶ Párrafos', val: stats.parrafos },
              { label: '⌀ Palabras/oración', val: stats.oraciones > 0 ? Math.round(stats.palabras / stats.oraciones) : 0 },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white text-base">{r.val.toLocaleString('es-ES')}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3">
              <div className="text-blue-600 dark:text-blue-400">⏱️ Tiempo lectura silenciosa</div>
              <div className="font-bold text-blue-700 dark:text-blue-300 text-lg">{stats.tiempoLectura} min</div>
              <div className="text-blue-500 dark:text-blue-400">~200 palabras/min</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-3">
              <div className="text-purple-600 dark:text-purple-400">🎙️ Tiempo lectura en voz</div>
              <div className="font-bold text-purple-700 dark:text-purple-300 text-lg">{stats.tiempoLecturaVoz} min</div>
              <div className="text-purple-500 dark:text-purple-400">~130 palabras/min</div>
            </div>
          </div>

          {stats.topPalabras.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Palabras más frecuentes (densidad de keywords)</div>
                <select value={topN} onChange={e => setTopN(parseInt(e.target.value))}
                  className="text-xs border border-gray-200 dark:border-gray-700 rounded-lg px-1 py-0.5 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 focus:outline-none">
                  {[5, 10, 15, 20].map(n => <option key={n} value={n}>Top {n}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                {stats.topPalabras.map(([palabra, count]) => {
                  const pct = Math.round((count / stats.maxFreq) * 100);
                  const density = ((count / stats.palabras) * 100).toFixed(2);
                  return (
                    <div key={palabra} className="flex items-center gap-2 text-xs">
                      <span className="w-24 text-gray-700 dark:text-gray-300 font-medium truncate">{palabra}</span>
                      <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="w-6 text-right text-gray-500">{count}x</span>
                      <span className="w-12 text-right text-indigo-600 dark:text-indigo-400">{density}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500">
                Keyword principal: <strong>"{stats.keyword}"</strong> — densidad {stats.densidad}%
                {parseFloat(stats.densidad) > 3 && <span className="text-orange-500 ml-1">⚠️ Alta densidad (puede penalizar SEO)</span>}
                {parseFloat(stats.densidad) < 0.5 && stats.keyword && <span className="text-blue-500 ml-1">ℹ️ Baja densidad</span>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
