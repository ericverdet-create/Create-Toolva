'use client';
import { useState, useEffect, useRef } from 'react';

type Mode = 'countdown' | 'stopwatch';

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function CountdownTimer() {
  const [mode, setMode] = useState<Mode>('countdown');
  // Countdown
  const [inputH, setInputH] = useState('0');
  const [inputM, setInputM] = useState('5');
  const [inputS, setInputS] = useState('0');
  const [remaining, setRemaining] = useState(300);
  const [cdRunning, setCdRunning] = useState(false);
  const [cdFinished, setCdFinished] = useState(false);
  // Stopwatch
  const [swElapsed, setSwElapsed] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Countdown effect
  useEffect(() => {
    if (mode !== 'countdown') return;
    if (cdRunning && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining(r => {
          if (r <= 1) { setCdRunning(false); setCdFinished(true); return 0; }
          return r - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [cdRunning, mode]);

  // Stopwatch effect
  useEffect(() => {
    if (mode !== 'stopwatch') return;
    if (swRunning) {
      intervalRef.current = setInterval(() => setSwElapsed(e => e + 10), 10);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [swRunning, mode]);

  const startCountdown = () => {
    const total = (parseInt(inputH)||0)*3600 + (parseInt(inputM)||0)*60 + (parseInt(inputS)||0);
    if (total <= 0) return;
    setRemaining(total);
    setCdFinished(false);
    setCdRunning(true);
  };

  const resetCountdown = () => {
    setCdRunning(false);
    setCdFinished(false);
    const total = (parseInt(inputH)||0)*3600 + (parseInt(inputM)||0)*60 + (parseInt(inputS)||0);
    setRemaining(total);
  };

  const swMs = swElapsed % 1000;
  const swS = Math.floor(swElapsed / 1000) % 60;
  const swM = Math.floor(swElapsed / 60000) % 60;
  const swH = Math.floor(swElapsed / 3600000);

  const cdH = Math.floor(remaining / 3600);
  const cdM = Math.floor((remaining % 3600) / 60);
  const cdS = remaining % 60;

  const PRESETS = [
    { label: '1 min', s: 60 }, { label: '5 min', s: 300 }, { label: '10 min', s: 600 },
    { label: '25 min', s: 1500 }, { label: '30 min', s: 1800 }, { label: '1 h', s: 3600 },
  ];

  return (
    <div className="space-y-5">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {(['countdown', 'stopwatch'] as Mode[]).map(m => (
          <button key={m} onClick={() => { setMode(m); setCdRunning(false); setSwRunning(false); }}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {m === 'countdown' ? '⏳ Cuenta Atrás' : '⏱️ Cronómetro'}
          </button>
        ))}
      </div>

      {mode === 'countdown' ? (
        <div className="space-y-4">
          <div className={`text-6xl font-mono font-bold text-center py-6 rounded-2xl transition-colors ${cdFinished ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white'}`}>
            {pad(cdH)}:{pad(cdM)}:{pad(cdS)}
            {cdFinished && <div className="text-lg font-sans text-red-500 mt-1">¡Tiempo!</div>}
          </div>

          {!cdRunning && (
            <>
              <div className="grid grid-cols-3 gap-2">
                {[['Horas', inputH, setInputH], ['Minutos', inputM, setInputM], ['Segundos', inputS, setInputS]].map(([label, val, setter]) => (
                  <div key={label as string} className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label as string}</div>
                    <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map(p => (
                  <button key={p.label} onClick={() => { setInputH('0'); setInputM(String(Math.floor(p.s/60))); setInputS(String(p.s%60)); setRemaining(p.s); setCdFinished(false); }}
                    className="px-3 py-1.5 rounded-lg text-xs border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="flex gap-3">
            <button onClick={cdRunning ? () => setCdRunning(false) : startCountdown}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${cdRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              {cdRunning ? '⏸ Pausar' : cdFinished ? '🔄 Reiniciar' : '▶ Iniciar'}
            </button>
            <button onClick={resetCountdown}
              className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              ⏹
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-6xl font-mono font-bold text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-gray-900 dark:text-white">
            {swH > 0 && <>{pad(swH)}:</>}{pad(swM)}:{pad(swS)}<span className="text-3xl text-gray-400">.{pad(Math.floor(swMs/10))}</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setSwRunning(r => !r)}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${swRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
              {swRunning ? '⏸ Pausar' : '▶ Iniciar'}
            </button>
            {swRunning ? (
              <button onClick={() => setLaps(l => [...l, swElapsed])}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors text-sm font-medium">
                Vuelta
              </button>
            ) : (
              <button onClick={() => { setSwElapsed(0); setLaps([]); }}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-colors">
                ⏹
              </button>
            )}
          </div>

          {laps.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 max-h-32 overflow-y-auto space-y-1">
              {[...laps].reverse().map((lap, i) => {
                const lapMs = lap % 1000; const lapS = Math.floor(lap/1000)%60; const lapM = Math.floor(lap/60000)%60;
                const prev = laps[laps.length-1-i-1] || 0;
                const split = lap - prev;
                const sMs = split%1000; const sS = Math.floor(split/1000)%60; const sM = Math.floor(split/60000)%60;
                return (
                  <div key={i} className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Vuelta {laps.length - i}</span>
                    <span className="font-mono">{pad(lapM)}:{pad(lapS)}.{pad(Math.floor(lapMs/10))}</span>
                    <span className="font-mono text-gray-400">+{pad(sM)}:{pad(sS)}.{pad(Math.floor(sMs/10))}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
