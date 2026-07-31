'use client';
import { useState } from 'react';

type Solve = 'speed' | 'distance' | 'time';

function hmsToHours(h: string, m: string, s: string): number {
  return (parseFloat(h)||0) + (parseFloat(m)||0)/60 + (parseFloat(s)||0)/3600;
}
function hoursToHms(h: number): { h: number; m: number; s: number } {
  const totalS = Math.round(h * 3600);
  return { h: Math.floor(totalS/3600), m: Math.floor((totalS%3600)/60), s: totalS%60 };
}

export default function SpeedDistanceTime() {
  const [solve, setSolve] = useState<Solve>('time');
  const [speed, setSpeed] = useState('120');
  const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph' | 'ms'>('kmh');
  const [distance, setDistance] = useState('400');
  const [distUnit, setDistUnit] = useState<'km' | 'm' | 'mi'>('km');
  const [th, setTh] = useState('3');
  const [tm, setTm] = useState('20');
  const [ts, setTs] = useState('0');

  // Convert to SI (m, m/s, s)
  const speedVal = parseFloat(speed) || 0;
  const speedMs = speedUnit === 'kmh' ? speedVal / 3.6 : speedUnit === 'mph' ? speedVal * 0.44704 : speedVal;

  const distVal = parseFloat(distance) || 0;
  const distM = distUnit === 'km' ? distVal * 1000 : distUnit === 'mi' ? distVal * 1609.34 : distVal;

  const timeH = hmsToHours(th, tm, ts);
  const timeS = timeH * 3600;

  let result: { label: string; value: string; extra?: string } | null = null;

  if (solve === 'speed' && distM > 0 && timeS > 0) {
    const ms = distM / timeS;
    const kmh = ms * 3.6;
    const mph = ms * 2.23694;
    result = {
      label: 'Velocidad',
      value: `${kmh.toFixed(1)} km/h`,
      extra: `${mph.toFixed(1)} mph · ${ms.toFixed(2)} m/s`,
    };
    if (solve === 'speed' && distUnit === 'km' && distVal > 0) {
      const pace = timeH * 60 / distVal;
      const paceM = Math.floor(pace);
      const paceS = Math.round((pace - paceM) * 60);
      result.extra = `Ritmo: ${paceM}:${String(paceS).padStart(2,'0')} min/km · ${mph.toFixed(1)} mph`;
    }
  } else if (solve === 'distance' && speedMs > 0 && timeS > 0) {
    const m = speedMs * timeS;
    const km = m / 1000;
    const mi = m / 1609.34;
    result = { label: 'Distancia', value: `${km.toFixed(2)} km`, extra: `${m.toFixed(0)} m · ${mi.toFixed(2)} millas` };
  } else if (solve === 'time' && speedMs > 0 && distM > 0) {
    const s = distM / speedMs;
    const hms = hoursToHms(s / 3600);
    result = {
      label: 'Tiempo',
      value: `${hms.h}h ${hms.m}m ${hms.s}s`,
      extra: `${(s/60).toFixed(1)} minutos · ${(s/3600).toFixed(2)} horas`,
    };
  }

  const tabs: { key: Solve; label: string }[] = [
    { key: 'speed', label: '⚡ Velocidad' },
    { key: 'distance', label: '📏 Distancia' },
    { key: 'time', label: '⏱️ Tiempo' },
  ];

  const inputClass = "w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none";
  const selectClass = "border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm";

  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Calcular:</div>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setSolve(t.key)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${solve === t.key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {solve !== 'speed' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Velocidad</label>
          <div className="flex gap-2">
            <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} min="0" className={`${inputClass} flex-1`} />
            <select value={speedUnit} onChange={e => setSpeedUnit(e.target.value as 'kmh' | 'mph' | 'ms')} className={selectClass}>
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
              <option value="ms">m/s</option>
            </select>
          </div>
        </div>
      )}

      {solve !== 'distance' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Distancia</label>
          <div className="flex gap-2">
            <input type="number" value={distance} onChange={e => setDistance(e.target.value)} min="0" className={`${inputClass} flex-1`} />
            <select value={distUnit} onChange={e => setDistUnit(e.target.value as 'km' | 'm' | 'mi')} className={selectClass}>
              <option value="km">km</option>
              <option value="m">m</option>
              <option value="mi">mi</option>
            </select>
          </div>
        </div>
      )}

      {solve !== 'time' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiempo</label>
          <div className="grid grid-cols-3 gap-2">
            {[['Horas', th, setTh], ['Minutos', tm, setTm], ['Segundos', ts, setTs]].map(([label, val, setter]) => (
              <div key={label as string}>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{label as string}</div>
                <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
          <div className="text-sm opacity-80 mb-1">{result.label}</div>
          <div className="text-4xl font-bold">{result.value}</div>
          {result.extra && <div className="text-sm opacity-70 mt-1">{result.extra}</div>}
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 text-center">
        Fórmula: Velocidad = Distancia ÷ Tiempo
      </div>
    </div>
  );
}
