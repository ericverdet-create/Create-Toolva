'use client';
import { useState } from 'react';

interface Entry { start: string; end: string; breakMin: string; }

export default function HoursWorked() {
  const [entries, setEntries] = useState<Entry[]>([
    { start: '09:00', end: '14:00', breakMin: '0' },
    { start: '15:00', end: '18:00', breakMin: '0' },
  ]);
  const [rate, setRate] = useState('25');

  const addEntry = () => setEntries(e => [...e, { start: '09:00', end: '17:00', breakMin: '30' }]);
  const removeEntry = (i: number) => setEntries(e => e.filter((_, idx) => idx !== i));
  const update = (i: number, k: keyof Entry, v: string) => setEntries(e => e.map((row, idx) => idx === i ? { ...row, [k]: v } : row));

  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const totalMin = entries.reduce((sum, e) => {
    const start = toMin(e.start);
    const end = toMin(e.end);
    const brk = parseInt(e.breakMin) || 0;
    const diff = end - start - brk;
    return sum + Math.max(0, diff);
  }, 0);

  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const totalHours = totalMin / 60;
  const rateVal = parseFloat(rate) || 0;
  const total = totalHours * rateVal;
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
          <span>Inicio</span><span>Fin</span><span className="text-center">Descanso</span><span />
        </div>
        {entries.map((e, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-center">
            <input type="time" value={e.start} onChange={ev => update(i, 'start', ev.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <input type="time" value={e.end} onChange={ev => update(i, 'end', ev.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <div className="relative">
              <input type="number" value={e.breakMin} onChange={ev => update(i, 'breakMin', ev.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg pl-2 pr-6 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">m</span>
            </div>
            <button onClick={() => removeEntry(i)} disabled={entries.length <= 1}
              className="text-gray-400 hover:text-red-500 disabled:opacity-30 text-lg leading-none">×</button>
          </div>
        ))}
        <button onClick={addEntry}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          + Añadir franja horaria
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Precio por hora (€)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} min="0" step="0.5"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
      </div>

      <div className="bg-indigo-600 text-white rounded-2xl p-5">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm opacity-80">Horas trabajadas</div>
            <div className="text-3xl font-bold">{hours}h {mins > 0 ? `${mins}m` : ''}</div>
          </div>
          {rateVal > 0 && (
            <div>
              <div className="text-sm opacity-80">Total a cobrar</div>
              <div className="text-3xl font-bold">{fmt(total)}</div>
            </div>
          )}
        </div>
      </div>

      {entries.length > 1 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm space-y-1">
          {entries.map((e, i) => {
            const start = toMin(e.start);
            const end = toMin(e.end);
            const brk = parseInt(e.breakMin) || 0;
            const mins = Math.max(0, end - start - brk);
            const h = Math.floor(mins / 60);
            const m = mins % 60;
            return (
              <div key={i} className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Franja {i + 1}: {e.start} – {e.end}{brk > 0 ? ` (−${brk}m descanso)` : ''}</span>
                <span className="font-medium">{h}h{m > 0 ? ` ${m}m` : ''}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
