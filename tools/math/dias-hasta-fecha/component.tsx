'use client';
import { useState, useEffect } from 'react';

const EVENTOS_RAPIDOS = [
  { label: '🎄 Navidad', fecha: () => { const h = new Date(); const n = new Date(h.getFullYear(), 11, 25); return n <= h ? new Date(h.getFullYear() + 1, 11, 25) : n; } },
  { label: '🎆 Año Nuevo', fecha: () => { const h = new Date(); return new Date(h.getFullYear() + 1, 0, 1); } },
  { label: '🌞 Verano', fecha: () => { const h = new Date(); const v = new Date(h.getFullYear(), 5, 21); return v <= h ? new Date(h.getFullYear() + 1, 5, 21) : v; } },
  { label: '🏖️ 1 Ago.', fecha: () => { const h = new Date(); const a = new Date(h.getFullYear(), 7, 1); return a <= h ? new Date(h.getFullYear() + 1, 7, 1) : a; } },
  { label: '💘 San Valentín', fecha: () => { const h = new Date(); const sv = new Date(h.getFullYear(), 1, 14); return sv <= h ? new Date(h.getFullYear() + 1, 1, 14) : sv; } },
  { label: '🎃 Halloween', fecha: () => { const h = new Date(); const hw = new Date(h.getFullYear(), 9, 31); return hw <= h ? new Date(h.getFullYear() + 1, 9, 31) : hw; } },
];

export default function DiasHastaFecha() {
  const [targetDate, setTargetDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const target = targetDate ? new Date(targetDate + 'T00:00:00') : null;
  const diffMs = target ? target.getTime() - now.getTime() : null;
  const isPast = diffMs !== null && diffMs < 0;
  const absDiff = diffMs !== null ? Math.abs(diffMs) : 0;

  const dias = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((absDiff % (1000 * 60)) / 1000);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30.44);

  const fmtFecha = (d: Date) => d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const setEvento = (e: typeof EVENTOS_RAPIDOS[0]) => {
    const f = e.fecha();
    setTargetDate(f.toISOString().split('T')[0]);
    setEventName(e.label);
  };

  const progressPct = target ? Math.min(100, Math.max(0, ((now.getTime() - (target.getTime() - dias * 24 * 3600 * 1000)) / (24 * 3600 * 1000)) * 100)) : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {EVENTOS_RAPIDOS.map(e => (
          <button key={e.label} onClick={() => setEvento(e)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${eventName === e.label ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {e.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">¿Para cuándo?</label>
          <input type="date" value={targetDate} onChange={e => { setTargetDate(e.target.value); setEventName(''); }}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nombre del evento (opcional)</label>
          <input type="text" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Ej: Mis vacaciones"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {target && (
        <div className="space-y-3">
          <div className={`border-2 rounded-2xl p-4 text-center ${isPast ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'}`}>
            {eventName && <div className={`text-sm font-semibold mb-1 ${isPast ? 'text-gray-600 dark:text-gray-400' : 'text-indigo-600 dark:text-indigo-400'}`}>{eventName}</div>}
            <div className={`text-xs mb-2 ${isPast ? 'text-gray-500' : 'text-indigo-500 dark:text-indigo-400'}`}>
              {isPast ? 'Hace' : 'Faltan'} {fmtFecha(target)}
            </div>
            <div className={`text-6xl font-bold ${isPast ? 'text-gray-700 dark:text-gray-300' : 'text-indigo-700 dark:text-indigo-300'}`}>{dias}</div>
            <div className={`text-lg font-semibold ${isPast ? 'text-gray-600 dark:text-gray-400' : 'text-indigo-600 dark:text-indigo-400'}`}>días</div>
          </div>

          {/* Cuenta atrás en tiempo real */}
          {!isPast && (
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { val: String(Math.floor(dias / 365)), label: 'años' },
                { val: String(semanas), label: 'semanas' },
                { val: String(horas).padStart(2, '0'), label: 'horas' },
                { val: String(segundos).padStart(2, '0'), label: 'seg' },
              ].map(r => (
                <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                  <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{r.val}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">Semanas</div>
              <div className="font-bold text-gray-900 dark:text-white">{semanas}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">Meses aprox.</div>
              <div className="font-bold text-gray-900 dark:text-white">{meses}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">Horas</div>
              <div className="font-bold text-gray-900 dark:text-white">{(dias * 24 + horas).toLocaleString('es-ES')}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
