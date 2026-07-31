'use client';
import { useState } from 'react';

// Spain national holidays 2024 & 2025 (fixed dates only; movable ones approximate)
const HOLIDAYS: Record<string, string> = {
  '2024-01-01': 'Año Nuevo', '2024-01-06': 'Reyes Magos',
  '2024-03-29': 'Viernes Santo', '2024-04-01': 'Lunes de Pascua',
  '2024-05-01': 'Día del Trabajo', '2024-08-15': 'Asunción',
  '2024-10-12': 'Fiesta Nacional', '2024-11-01': 'Todos los Santos',
  '2024-12-06': 'Constitución', '2024-12-08': 'Inmaculada',
  '2024-12-25': 'Navidad',
  '2025-01-01': 'Año Nuevo', '2025-01-06': 'Reyes Magos',
  '2025-04-18': 'Viernes Santo',
  '2025-05-01': 'Día del Trabajo', '2025-08-15': 'Asunción',
  '2025-10-12': 'Fiesta Nacional', '2025-11-01': 'Todos los Santos',
  '2025-12-06': 'Constitución', '2025-12-08': 'Inmaculada',
  '2025-12-25': 'Navidad',
  '2026-01-01': 'Año Nuevo', '2026-01-06': 'Reyes Magos',
  '2026-04-03': 'Viernes Santo',
  '2026-05-01': 'Día del Trabajo', '2026-08-15': 'Asunción',
  '2026-10-12': 'Fiesta Nacional', '2026-11-01': 'Todos los Santos',
  '2026-12-06': 'Constitución', '2026-12-08': 'Inmaculada',
  '2026-12-25': 'Navidad',
};

function toKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

function calcBusinessDays(start: Date, end: Date, includeHolidays: boolean): { business: number; weekends: number; holidays: string[] } {
  let current = new Date(start);
  let business = 0;
  let weekends = 0;
  const foundHolidays: string[] = [];

  while (current <= end) {
    const day = current.getDay();
    const key = toKey(current);
    if (day === 0 || day === 6) {
      weekends++;
    } else if (includeHolidays && HOLIDAYS[key]) {
      foundHolidays.push(`${key}: ${HOLIDAYS[key]}`);
    } else {
      business++;
    }
    current.setDate(current.getDate() + 1);
  }
  return { business, weekends, holidays: foundHolidays };
}

export default function BusinessDaysCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const nextMonth = new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(nextMonth);
  const [excludeHolidays, setExcludeHolidays] = useState(true);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const valid = start <= end;
  const total = valid ? Math.round((end.getTime() - start.getTime()) / 86400000) + 1 : 0;
  const { business, weekends, holidays } = valid
    ? calcBusinessDays(start, end, excludeHolidays)
    : { business: 0, weekends: 0, holidays: [] };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de inicio</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de fin</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setExcludeHolidays(v => !v)}
          className={`w-10 h-6 rounded-full transition-colors ${excludeHolidays ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${excludeHolidays ? 'translate-x-4' : ''}`} />
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">Excluir festivos nacionales España</span>
      </div>

      {!valid && <div className="text-sm text-red-500">La fecha de fin debe ser posterior al inicio.</div>}

      {valid && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Días laborables</div>
            <div className="text-5xl font-bold">{business}</div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Total días', value: total },
              { label: 'Fin de semana', value: weekends },
              { label: 'Festivos excl.', value: holidays.length },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white text-lg">{r.value}</div>
              </div>
            ))}
          </div>

          {holidays.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
              <div className="text-xs font-medium text-amber-800 dark:text-amber-300 mb-1">Festivos excluidos:</div>
              {holidays.map(h => (
                <div key={h} className="text-xs text-amber-700 dark:text-amber-400">{h}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
