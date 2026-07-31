'use client';
import { useState } from 'react';

const CYCLE_MIN = 90;
const FALL_ASLEEP_MIN = 14; // avg time to fall asleep

function addMinutes(base: Date, mins: number): Date {
  return new Date(base.getTime() + mins * 60 * 1000);
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

function fmtHM(totalMin: number): string {
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
}

export default function CalculadoraSueno() {
  const [mode, setMode] = useState<'despertar' | 'acostar'>('despertar');
  const [hora, setHora] = useState('07:00');

  const [hh, mm] = hora.split(':').map(Number);
  const base = new Date();
  base.setHours(hh, mm, 0, 0);

  const cycles = [6, 5, 4, 3]; // preferred: 6 cycles = 9h, down to 3 = 4.5h

  const results = cycles.map(n => {
    const totalMin = n * CYCLE_MIN + FALL_ASLEEP_MIN;
    if (mode === 'despertar') {
      // Quiero despertar a X → cuándo acostarme
      const acostar = new Date(base.getTime() - totalMin * 60 * 1000);
      return { cycles: n, tiempo: fmtHM(n * CYCLE_MIN), hora: fmtTime(acostar) };
    } else {
      // Me acuesto a X → cuándo despertarme
      const despertar = addMinutes(base, totalMin);
      return { cycles: n, tiempo: fmtHM(n * CYCLE_MIN), hora: fmtTime(despertar) };
    }
  });

  const quality = (n: number) => {
    if (n >= 6) return { label: 'Óptimo', color: 'text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' };
    if (n === 5) return { label: 'Bueno', color: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' };
    if (n === 4) return { label: 'Justo', color: 'text-yellow-700 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' };
    return { label: 'Mínimo', color: 'text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' };
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([['despertar', '⏰ Quiero despertar a...'], ['acostar', '🛏️ Me acuesto a...']] as const).map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${mode === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {mode === 'despertar' ? 'Hora de despertar' : 'Hora de acostarse'}
        </label>
        <input type="time" value={hora} onChange={e => setHora(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xl font-bold text-center" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
          {mode === 'despertar' ? 'Acuéstate a estas horas:' : 'Despierta a estas horas:'}
        </div>
        {results.map(r => {
          const q = quality(r.cycles);
          return (
            <div key={r.cycles} className={`border rounded-xl p-3 flex items-center justify-between ${q.color}`}>
              <div>
                <div className="text-2xl font-bold">{r.hora}</div>
                <div className="text-xs opacity-80">{r.cycles} ciclos · {r.tiempo} de sueño</div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-xs font-semibold ${q.color}`}>{q.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <div>🔄 Cada ciclo dura ~90 min (fases ligero → profundo → REM)</div>
        <div>⏱️ Se incluyen ~14 min para quedarse dormido</div>
        <div>✅ Los adultos necesitan 5–6 ciclos (7,5–9 horas) para un descanso óptimo</div>
      </div>
    </div>
  );
}
