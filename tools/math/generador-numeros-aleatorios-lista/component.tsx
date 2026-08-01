'use client';
import { useState } from 'react';

type Modo = 'numeros' | 'sorteo' | 'lista';

export default function GeneradorListaAleatoria() {
  const [modo, setModo] = useState<Modo>('sorteo');
  const [participantes, setParticipantes] = useState('Ana\nBruno\nCarlos\nDiana\nEric\nFiona');
  const [numGanadores, setNumGanadores] = useState('1');
  const [minNum, setMinNum] = useState('1');
  const [maxNum, setMaxNum] = useState('100');
  const [cuantos, setCuantos] = useState('10');
  const [listaTexto, setListaTexto] = useState('Opción A\nOpción B\nOpción C\nOpción D\nOpción E');
  const [resultado, setResultado] = useState<string[]>([]);
  const [animando, setAnimando] = useState(false);
  const [historial, setHistorial] = useState<string[][]>([]);

  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const generar = () => {
    setAnimando(true);
    setTimeout(() => {
      let res: string[] = [];
      if (modo === 'sorteo') {
        const lista = participantes.split('\n').map(p => p.trim()).filter(Boolean);
        const n = Math.min(parseInt(numGanadores) || 1, lista.length);
        res = shuffle(lista).slice(0, n);
      } else if (modo === 'numeros') {
        const min = parseInt(minNum) || 1;
        const max = parseInt(maxNum) || 100;
        const n = Math.min(parseInt(cuantos) || 10, max - min + 1);
        const pool = Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
        res = shuffle(pool).slice(0, n).sort((a, b) => parseInt(a) - parseInt(b));
      } else {
        const lista = listaTexto.split('\n').map(p => p.trim()).filter(Boolean);
        res = shuffle(lista);
      }
      setResultado(res);
      setHistorial(h => [res, ...h].slice(0, 5));
      setAnimando(false);
    }, 400);
  };

  const EMOJIS_TROFEO = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {([
          { id: 'sorteo', label: '🎉 Sorteo' },
          { id: 'numeros', label: '🔢 Números' },
          { id: 'lista', label: '📝 Lista' },
        ] as { id: Modo; label: string }[]).map(m => (
          <button key={m.id} onClick={() => { setModo(m.id); setResultado([]); }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${modo === m.id ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {modo === 'sorteo' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Participantes (uno por línea)</label>
            <textarea value={participantes} onChange={e => setParticipantes(e.target.value)} rows={5}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none" />
            <div className="text-xs text-gray-400 mt-0.5">{participantes.split('\n').filter(p => p.trim()).length} participantes</div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Número de ganadores</label>
            <div className="flex gap-1">
              {[1, 2, 3, 5].map(n => (
                <button key={n} onClick={() => setNumGanadores(String(n))}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${numGanadores === String(n) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {modo === 'numeros' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Mínimo</label>
              <input type="number" value={minNum} onChange={e => setMinNum(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Máximo</label>
              <input type="number" value={maxNum} onChange={e => setMaxNum(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Cuántos</label>
              <input type="number" value={cuantos} onChange={e => setCuantos(e.target.value)}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-2 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {[[1,10,5], [1,49,6], [1,100,10], [1,1000,20]].map(([min, max, n]) => (
              <button key={`${min}-${max}-${n}`} onClick={() => { setMinNum(String(min)); setMaxNum(String(max)); setCuantos(String(n)); }}
                className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {n} de {min}-{max}
              </button>
            ))}
          </div>
        </div>
      )}

      {modo === 'lista' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Lista a ordenar (uno por línea)</label>
          <textarea value={listaTexto} onChange={e => setListaTexto(e.target.value)} rows={5}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none" />
        </div>
      )}

      <button onClick={generar} disabled={animando}
        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg">
        {animando ? '⏳ Generando...' : modo === 'sorteo' ? '🎉 ¡Realizar sorteo!' : modo === 'numeros' ? '🔢 Generar números' : '🔀 Mezclar lista'}
      </button>

      {resultado.length > 0 && (
        <div className="space-y-2">
          {modo === 'sorteo' ? (
            <div className="space-y-2">
              {resultado.map((r, i) => (
                <div key={r} className="flex items-center gap-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-3">
                  <span className="text-2xl">{EMOJIS_TROFEO[i] || '🏅'}</span>
                  <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{r}</span>
                </div>
              ))}
            </div>
          ) : modo === 'numeros' ? (
            <div className="flex flex-wrap gap-2 justify-center">
              {resultado.map(n => (
                <div key={n} className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow">{n}</div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {resultado.map((r, i) => (
                <div key={r} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 text-xs">
                  <span className="text-gray-400 w-5 text-right">{i + 1}.</span>
                  <span className="text-gray-700 dark:text-gray-300">{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
