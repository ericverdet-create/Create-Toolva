'use client';
import { useState } from 'react';

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
}

function formatShort(d: Date): string {
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
}

export default function OvulationCalculator() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const [lmp, setLmp] = useState(todayStr);
  const [cycleLen, setCycleLen] = useState('28');
  const [cycles, setCycles] = useState(3);

  const lmpDate = new Date(lmp + 'T12:00:00');
  const cl = Math.max(21, Math.min(35, parseInt(cycleLen) || 28));

  // Ovulation is typically 14 days before end of cycle
  const ovulationDay = cl - 14;
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay + 1;

  const cycleData = Array.from({ length: cycles }, (_, i) => {
    const cycleStart = addDays(lmpDate, cl * i);
    const ovDate = addDays(cycleStart, ovulationDay);
    const fsDate = addDays(cycleStart, fertileStart);
    const feDate = addDays(cycleStart, fertileEnd);
    const nextPeriod = addDays(cycleStart, cl);
    const isPast = ovDate < today;
    return { cycleStart, ovDate, fsDate, feDate, nextPeriod, isPast };
  });

  const isValid = !isNaN(lmpDate.getTime());

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Primer día del último período</label>
          <input type="date" value={lmp} onChange={e => setLmp(e.target.value)} max={todayStr}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duración del ciclo (días)</label>
          <input type="number" value={cycleLen} onChange={e => setCycleLen(e.target.value)} min="21" max="35"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Ciclos a mostrar</label>
        <div className="flex gap-2">
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => setCycles(n)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${cycles === n ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {n} {n === 1 ? 'ciclo' : 'ciclos'}
            </button>
          ))}
        </div>
      </div>

      {isValid && (
        <div className="space-y-3">
          {cycleData.map((c, i) => (
            <div key={i} className={`rounded-2xl border p-4 space-y-2 ${c.isPast ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-70' : 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/20'}`}>
              <div className={`text-sm font-bold ${c.isPast ? 'text-gray-500 dark:text-gray-400' : 'text-pink-700 dark:text-pink-300'}`}>
                Ciclo {i + 1} {c.isPast ? '(pasado)' : i === 0 ? '(actual)' : ''}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: '🩸 Inicio período', val: formatShort(c.cycleStart) },
                  { label: '🌸 Ovulación', val: formatShort(c.ovDate) },
                  { label: '✨ Inicio días fértiles', val: formatShort(c.fsDate) },
                  { label: '✨ Fin días fértiles', val: formatShort(c.feDate) },
                ].map(r => (
                  <div key={r.label} className="bg-white dark:bg-gray-700 rounded-xl p-2">
                    <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                    <div className="font-semibold text-gray-900 dark:text-white capitalize">{r.val}</div>
                  </div>
                ))}
              </div>
              {!c.isPast && i === 0 && (
                <div className="text-xs text-pink-600 dark:text-pink-400 text-center pt-1">
                  🌡️ Días fértiles: del {formatShort(c.fsDate)} al {formatShort(c.feDate)} — Pico de fertilidad: {formatDate(c.ovDate)}
                </div>
              )}
            </div>
          ))}

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Esta calculadora es orientativa. Los ciclos pueden variar. No uses esto como método anticonceptivo. Consulta a tu ginecólogo/a para una orientación profesional.
          </div>
        </div>
      )}
    </div>
  );
}
