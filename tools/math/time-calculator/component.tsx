'use client';
import { useState } from 'react';

type Mode = 'between' | 'add' | 'subtract';

function parseTime(s: string): number | null {
  const match = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1]), m = parseInt(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function minsToHM(mins: number): string {
  const sign = mins < 0 ? '-' : '';
  const abs = Math.abs(mins);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${sign}${h}h ${m.toString().padStart(2, '0')}min`;
}

function minsToDecimal(mins: number): string {
  return (mins / 60).toFixed(2) + ' h';
}

export default function TimeCalculator() {
  const [mode, setMode] = useState<Mode>('between');

  // Between mode
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:30');
  const [breakMins, setBreakMins] = useState('30');

  // Add/subtract mode
  const [baseTime, setBaseTime] = useState('08:00');
  const [addH, setAddH] = useState('2');
  const [addM, setAddM] = useState('30');

  // Accumulator
  const [entries, setEntries] = useState<string[]>(['08:00', '01:30', '02:15']);
  const [newEntry, setNewEntry] = useState('');

  const MODES = [
    { key: 'between' as Mode, label: 'Entre dos horas' },
    { key: 'add' as Mode, label: 'Sumar / Restar' },
    { key: 'subtract' as Mode, label: 'Acumular tiempos' },
  ];

  let result: { label: string; value: string }[] = [];

  if (mode === 'between') {
    const s = parseTime(start);
    const e = parseTime(end);
    if (s !== null && e !== null) {
      let diff = e - s;
      if (diff < 0) diff += 24 * 60; // overnight
      const brk = parseInt(breakMins) || 0;
      const net = diff - brk;
      result = [
        { label: 'Tiempo bruto', value: minsToHM(diff) + ` (${minsToDecimal(diff)})` },
        { label: 'Descanso', value: minsToHM(brk) },
        { label: 'Tiempo neto trabajado', value: minsToHM(net) + ` (${minsToDecimal(net)})` },
      ];
    }
  } else if (mode === 'add') {
    const base = parseTime(baseTime);
    const addMins = (parseInt(addH) || 0) * 60 + (parseInt(addM) || 0);
    if (base !== null) {
      const sumMins = ((base + addMins) % (24 * 60) + 24 * 60) % (24 * 60);
      const subMins = ((base - addMins) % (24 * 60) + 24 * 60) % (24 * 60);
      const fmtHour = (m: number) => `${Math.floor(m / 60).toString().padStart(2, '0')}:${(m % 60).toString().padStart(2, '0')}`;
      result = [
        { label: `${baseTime} + ${addH}h${addM}min`, value: fmtHour(sumMins) },
        { label: `${baseTime} − ${addH}h${addM}min`, value: fmtHour(subMins) },
        { label: 'Duración añadida', value: minsToHM(addMins) + ` (${minsToDecimal(addMins)})` },
      ];
    }
  } else {
    // Accumulate
    const totalMins = entries.reduce((acc, e) => {
      const m = parseTime(e);
      return acc + (m ?? 0);
    }, 0);
    result = [
      { label: `Total (${entries.length} entradas)`, value: minsToHM(totalMins) + ` (${minsToDecimal(totalMins)})` },
    ];
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {MODES.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${mode === m.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {mode === 'between' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora inicio</label>
            <input type="time" value={start} onChange={e => setStart(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora fin</label>
            <input type="time" value={end} onChange={e => setEnd(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descanso (minutos)</label>
            <input type="number" value={breakMins} onChange={e => setBreakMins(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
        </div>
      )}

      {mode === 'add' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hora base</label>
            <input type="time" value={baseTime} onChange={e => setBaseTime(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Horas a sumar</label>
            <input type="number" value={addH} onChange={e => setAddH(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Minutos a sumar</label>
            <input type="number" value={addM} onChange={e => setAddM(e.target.value)} min="0" max="59"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
        </div>
      )}

      {mode === 'subtract' && (
        <div className="space-y-3">
          <div className="space-y-2">
            {entries.map((e, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input type="time" value={e} onChange={ev => setEntries(prev => prev.map((x, j) => j === i ? ev.target.value : x))}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
                <button onClick={() => setEntries(prev => prev.filter((_, j) => j !== i))}
                  className="text-red-400 hover:text-red-600 text-lg px-2">×</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="time" value={newEntry} onChange={e => setNewEntry(e.target.value)}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <button onClick={() => { if (newEntry) { setEntries(p => [...p, newEntry]); setNewEntry(''); } }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700">
              + Añadir
            </button>
          </div>
        </div>
      )}

      {result.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-2">
          {result.map((r, i) => (
            <div key={i} className={`flex justify-between ${i === result.length - 1 ? 'font-bold text-lg border-t border-indigo-200 dark:border-indigo-700 pt-2 mt-2' : 'text-sm'}`}>
              <span className="text-gray-600 dark:text-gray-400">{r.label}</span>
              <span className="text-indigo-700 dark:text-indigo-300">{r.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
