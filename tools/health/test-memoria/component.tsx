'use client';
import { useState, useEffect, useCallback } from 'react';

type Fase = 'inicio' | 'mostrando' | 'esperando' | 'correcto' | 'incorrecto' | 'record';

export default function TestMemoria() {
  const [fase, setFase] = useState<Fase>('inicio');
  const [nivel, setNivel] = useState(3);
  const [secuencia, setSecuencia] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [mejor, setMejor] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [mostrandoIdx, setMostrandoIdx] = useState(-1);

  const generarSecuencia = useCallback((n: number) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10));
  }, []);

  const iniciarRonda = useCallback((n: number) => {
    const seq = generarSecuencia(n);
    setSecuencia(seq);
    setInput('');
    setFase('mostrando');
    setMostrandoIdx(0);
  }, [generarSecuencia]);

  useEffect(() => {
    if (fase !== 'mostrando' || mostrandoIdx < 0) return;
    if (mostrandoIdx >= secuencia.length) {
      setTimeout(() => { setFase('esperando'); setMostrandoIdx(-1); }, 600);
      return;
    }
    const timer = setTimeout(() => setMostrandoIdx(i => i + 1), 800);
    return () => clearTimeout(timer);
  }, [fase, mostrandoIdx, secuencia.length]);

  const comprobar = () => {
    const correcto = input === secuencia.join('');
    setIntentos(i => i + 1);
    if (correcto) {
      const nuevoNivel = nivel + 1;
      if (nuevoNivel > mejor) { setMejor(nuevoNivel - 1); }
      if (nuevoNivel > mejor + 1 || nuevoNivel > 12) { setFase('record'); }
      else { setNivel(nuevoNivel); setFase('correcto'); setTimeout(() => iniciarRonda(nuevoNivel), 1200); }
    } else {
      if (nivel - 1 > mejor) setMejor(nivel - 1);
      setFase('incorrecto');
    }
  };

  const empezar = () => { setNivel(3); setIntentos(0); iniciarRonda(3); };
  const reiniciar = () => { setFase('inicio'); setNivel(3); setSecuencia([]); setInput(''); };

  const nivelLabel = (n: number) => n <= 4 ? '🐣 Básico' : n <= 6 ? '🧠 Intermedio' : n <= 8 ? '🚀 Avanzado' : '⚡ Genio';

  return (
    <div className="space-y-4">
      {fase === 'inicio' && (
        <div className="text-center space-y-4">
          <div className="text-4xl">🧠</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Memoriza la secuencia de números y repítela. Empieza con 3 dígitos y va aumentando.</div>
          {mejor > 0 && <div className="text-xs text-indigo-600 dark:text-indigo-400">Tu récord: {mejor} dígitos — {nivelLabel(mejor)}</div>}
          <button onClick={empezar} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-colors">
            ▶ Empezar
          </button>
        </div>
      )}

      {(fase === 'mostrando' || fase === 'esperando' || fase === 'correcto' || fase === 'incorrecto') && (
        <div className="space-y-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Nivel {nivel} · {nivel} dígitos</span>
            <span>Récord: {mejor}</span>
          </div>

          {/* Secuencia */}
          <div className="flex gap-2 justify-center flex-wrap min-h-16 items-center">
            {fase === 'mostrando' ? secuencia.map((n, i) => (
              <div key={i} className={`w-12 h-12 rounded-xl text-2xl font-bold flex items-center justify-center transition-all duration-200
                ${i < mostrandoIdx ? 'bg-gray-100 dark:bg-gray-700 text-transparent' :
                  i === mostrandoIdx ? 'bg-indigo-600 text-white scale-110 shadow-lg' :
                  'bg-gray-100 dark:bg-gray-700 text-transparent'}`}>
                {n}
              </div>
            )) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {fase === 'esperando' ? '✍️ ¿Recuerdas la secuencia? Escríbela abajo' :
                 fase === 'correcto' ? '✅ ¡Correcto! Siguiente nivel...' :
                 `❌ Era: ${secuencia.join('')}`}
              </div>
            )}
          </div>

          {fase === 'esperando' && (
            <div className="space-y-2">
              <input type="tel" value={input} onChange={e => { setInput(e.target.value.replace(/\D/g, '')); }}
                onKeyDown={e => e.key === 'Enter' && input.length === nivel && comprobar()}
                placeholder="Escribe la secuencia aquí..." maxLength={nivel} autoFocus
                className="w-full border-2 border-indigo-300 dark:border-indigo-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-2xl font-mono text-center tracking-widest" />
              <button onClick={comprobar} disabled={input.length !== nivel}
                className="w-full py-2.5 bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                Comprobar ({input.length}/{nivel})
              </button>
            </div>
          )}

          {fase === 'incorrecto' && (
            <div className="space-y-2 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Has llegado hasta {nivel - 1} dígitos</div>
              <div className={`text-lg font-bold ${nivelLabel(nivel - 1).includes('Genio') ? 'text-purple-600' : 'text-indigo-600 dark:text-indigo-400'}`}>
                {nivelLabel(nivel - 1)}
              </div>
              <div className="text-xs text-gray-400">Media adultos: 7 dígitos (Miller, 1956)</div>
              <div className="flex gap-2">
                <button onClick={empezar} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold">🔄 Reintentar</button>
                <button onClick={reiniciar} className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm">Inicio</button>
              </div>
            </div>
          )}
        </div>
      )}

      {fase === 'record' && (
        <div className="text-center space-y-4">
          <div className="text-5xl">🏆</div>
          <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">¡Récord: {mejor} dígitos!</div>
          <div className="text-indigo-600 dark:text-indigo-400 font-semibold">{nivelLabel(mejor)}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Solo el 1% de la población memoriza más de 10 dígitos</div>
          <button onClick={empezar} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-colors">
            🔄 Jugar de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
