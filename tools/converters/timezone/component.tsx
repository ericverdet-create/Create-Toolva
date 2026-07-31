'use client';
import { useState, useEffect } from 'react';

const ZONES = [
  { label: 'Madrid', tz: 'Europe/Madrid' },
  { label: 'Londres', tz: 'Europe/London' },
  { label: 'Nueva York', tz: 'America/New_York' },
  { label: 'Los Ángeles', tz: 'America/Los_Angeles' },
  { label: 'Ciudad de México', tz: 'America/Mexico_City' },
  { label: 'Buenos Aires', tz: 'America/Argentina/Buenos_Aires' },
  { label: 'São Paulo', tz: 'America/Sao_Paulo' },
  { label: 'París', tz: 'Europe/Paris' },
  { label: 'Berlín', tz: 'Europe/Berlin' },
  { label: 'Moscú', tz: 'Europe/Moscow' },
  { label: 'Dubai', tz: 'Asia/Dubai' },
  { label: 'Mumbai', tz: 'Asia/Kolkata' },
  { label: 'Bangkok', tz: 'Asia/Bangkok' },
  { label: 'Singapur', tz: 'Asia/Singapore' },
  { label: 'Tokio', tz: 'Asia/Tokyo' },
  { label: 'Sídney', tz: 'Australia/Sydney' },
];

function formatInTz(date: Date, tz: string): { time: string; date: string; offset: string } {
  const timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz });
  const dateStr = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', timeZone: tz });
  const offsetStr = date.toLocaleDateString('es-ES', { timeZone: tz, timeZoneName: 'short' }).split(',').pop()?.trim() || '';
  return { time: timeStr, date: dateStr, offset: offsetStr };
}

export default function TimezoneConverter() {
  const [sourceZone, setSourceZone] = useState('Europe/Madrid');
  const [targetZone, setTargetZone] = useState('America/New_York');
  const [inputTime, setInputTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  });
  const [inputDate, setInputDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [currentTime, setCurrentTime] = useState(new Date());
  const [useNow, setUseNow] = useState(true);

  useEffect(() => {
    if (!useNow) return;
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, [useNow]);

  const baseDate = useNow ? currentTime : (() => {
    const [h, m] = inputTime.split(':').map(Number);
    const d = new Date(inputDate + 'T00:00:00');
    d.setHours(h, m, 0, 0);
    return d;
  })();

  const src = formatInTz(baseDate, sourceZone);
  const tgt = formatInTz(baseDate, targetZone);

  const selectClass = "w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm";

  const selectedZones = [sourceZone, targetZone, ...ZONES.filter(z => z.tz !== sourceZone && z.tz !== targetZone).slice(0, 4).map(z => z.tz)];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={() => setUseNow(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${useNow ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${useNow ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Usar hora actual</span>
      </div>

      {!useNow && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Hora</label>
            <input type="time" value={inputTime} onChange={e => setInputTime(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha</label>
            <input type="date" value={inputDate} onChange={e => setInputDate(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Origen</label>
          <select value={sourceZone} onChange={e => setSourceZone(e.target.value)} className={selectClass}>
            {ZONES.map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}
          </select>
        </div>
        <button onClick={() => { const tmp = sourceZone; setSourceZone(targetZone); setTargetZone(tmp); }}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 text-xl hover:bg-indigo-200 transition-colors">
          ⇆
        </button>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Destino</label>
          <select value={targetZone} onChange={e => setTargetZone(e.target.value)} className={selectClass}>
            {ZONES.map(z => <option key={z.tz} value={z.tz}>{z.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[{ zone: sourceZone, data: src }, { zone: targetZone, data: tgt }].map(({ zone, data }) => {
          const label = ZONES.find(z => z.tz === zone)?.label || zone;
          return (
            <div key={zone} className="bg-indigo-600 text-white rounded-2xl p-4 text-center">
              <div className="text-xs opacity-80 mb-1">{label}</div>
              <div className="text-3xl font-bold font-mono">{data.time}</div>
              <div className="text-xs opacity-70 mt-1">{data.date}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Hora mundial ahora</div>
        <div className="space-y-1">
          {ZONES.slice(0, 8).map(z => {
            const d = formatInTz(currentTime, z.tz);
            return (
              <div key={z.tz} className="flex justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">{z.label}</span>
                <span className="font-mono text-gray-900 dark:text-white">{d.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
