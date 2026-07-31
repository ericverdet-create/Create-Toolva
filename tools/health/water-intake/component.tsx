'use client';
import { useState } from 'react';

const ACTIVITY = [
  { key: 'sedentary', label: 'Sedentario', extra: 0 },
  { key: 'light', label: 'Ligero (1–3 días)', extra: 0.35 },
  { key: 'moderate', label: 'Moderado (3–5 días)', extra: 0.6 },
  { key: 'active', label: 'Activo (6–7 días)', extra: 0.9 },
  { key: 'very_active', label: 'Muy activo / atleta', extra: 1.2 },
];

const CLIMATE = [
  { key: 'cold', label: 'Frío (<15°C)', extra: -0.1 },
  { key: 'mild', label: 'Templado (15–25°C)', extra: 0 },
  { key: 'warm', label: 'Cálido (25–35°C)', extra: 0.3 },
  { key: 'hot', label: 'Muy caluroso (>35°C)', extra: 0.6 },
];

export default function WaterIntake() {
  const [weight, setWeight] = useState('70');
  const [activity, setActivity] = useState('light');
  const [climate, setClimate] = useState('mild');
  const [pregnant, setPregnant] = useState(false);
  const [breastfeeding, setBreastfeeding] = useState(false);

  const w = parseFloat(weight) || 0;
  const actExtra = ACTIVITY.find(a => a.key === activity)?.extra || 0;
  const climExtra = CLIMATE.find(c => c.key === climate)?.extra || 0;

  // Base: 35ml per kg
  let base = w * 0.035;
  base += actExtra;
  base += climExtra;
  if (pregnant) base += 0.3;
  if (breastfeeding) base += 0.7;
  base = Math.max(1.5, base);

  const glasses = Math.round((base * 1000) / 250);
  const cups = Math.round((base * 1000) / 240);

  const fillPct = Math.min(100, (base / 4) * 100);

  const selectClass = "w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm";

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peso corporal (kg)</label>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="20" max="300"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 focus:outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Actividad física</label>
          <select value={activity} onChange={e => setActivity(e.target.value)} className={selectClass}>
            {ACTIVITY.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clima</label>
          <select value={climate} onChange={e => setClimate(e.target.value)} className={selectClass}>
            {CLIMATE.map(c => <option key={c.key} value={c.key}>{c.label}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        {[{ label: 'Embarazada', val: pregnant, set: setPregnant }, { label: 'Lactancia', val: breastfeeding, set: setBreastfeeding }].map(f => (
          <div key={f.label} className="flex items-center gap-2">
            <button onClick={() => f.set(v => !v)}
              className={`w-10 h-6 rounded-full transition-colors ${f.val ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`block w-4 h-4 rounded-full bg-white shadow mx-1 transition-transform ${f.val ? 'translate-x-4' : ''}`} />
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">{f.label}</span>
          </div>
        ))}
      </div>

      {w > 0 && (
        <div className="space-y-3">
          <div className="bg-blue-500 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Agua recomendada al día</div>
            <div className="text-5xl font-bold">{base.toFixed(1)} <span className="text-2xl">L</span></div>
            <div className="text-sm opacity-70 mt-1">{glasses} vasos de 250ml · {cups} tazas</div>
          </div>

          <div className="relative h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-blue-400 rounded-full transition-all" style={{ width: `${fillPct}%` }} />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-blue-800 dark:text-blue-200">
              {base.toFixed(1)} L / 4 L máx recomendado
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            {[
              { label: 'Mínimo diario', val: `${Math.max(1.5, w*0.030).toFixed(1)} L` },
              { label: 'Objetivo', val: `${base.toFixed(1)} L` },
              { label: 'Por hora (16h)', val: `${(base/16*1000).toFixed(0)} ml` },
            ].map(r => (
              <div key={r.label} className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
            💡 Incluye agua de alimentos (~20% del total). Aumenta en días de mucho calor o ejercicio intenso.
          </div>
        </div>
      )}
    </div>
  );
}
