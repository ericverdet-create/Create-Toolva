'use client';
import { useState } from 'react';

const ACTIVITY_LEVELS = [
  { key: 'sedentary', label: 'Sedentario', desc: 'Poco o ningún ejercicio', factor: 1.2 },
  { key: 'light', label: 'Ligero', desc: '1–3 días/semana', factor: 1.375 },
  { key: 'moderate', label: 'Moderado', desc: '3–5 días/semana', factor: 1.55 },
  { key: 'active', label: 'Activo', desc: '6–7 días/semana', factor: 1.725 },
  { key: 'very_active', label: 'Muy activo', desc: 'Físico + ejercicio', factor: 1.9 },
];

const GOALS = [
  { key: 'lose_fast', label: 'Perder rápido', deficit: 1000, kg: 1 },
  { key: 'lose', label: 'Perder (recom.)', deficit: 500, kg: 0.5 },
  { key: 'lose_slow', label: 'Perder lento', deficit: 250, kg: 0.25 },
  { key: 'maintain', label: 'Mantener', deficit: 0, kg: 0 },
  { key: 'gain', label: 'Ganar músculo', deficit: -300, kg: -0.3 },
];

export default function CalorieDeficit() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('lose');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;

  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;

  const actFactor = ACTIVITY_LEVELS.find(l => l.key === activity)?.factor || 1.55;
  const tdee = bmr * actFactor;

  const goalObj = GOALS.find(g => g.key === goal) || GOALS[1];
  const targetCals = Math.max(1200, tdee - goalObj.deficit);
  const weeklyChange = goalObj.kg;

  const macros = {
    protein: Math.round(w * 2), // 2g/kg
    fat: Math.round(targetCals * 0.25 / 9),
    carbs: Math.round((targetCals - w * 2 * 4 - (targetCals * 0.25 / 9) * 9) / 4),
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => setGender(g)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${gender === g ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {g === 'male' ? '♂ Hombre' : '♀ Mujer'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[['Edad', age, setAge], ['Peso (kg)', weight, setWeight], ['Altura (cm)', height, setHeight]].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label as string}</label>
            <input type="number" value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center text-sm" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nivel de actividad</label>
        <div className="space-y-1">
          {ACTIVITY_LEVELS.map(l => (
            <button key={l.key} onClick={() => setActivity(l.key)}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-xl text-sm border transition-colors ${activity === l.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400'}`}>
              <span className="font-medium">{l.label}</span>
              <span className={`text-xs ${activity === l.key ? 'opacity-80' : 'text-gray-400'}`}>{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objetivo</label>
        <div className="flex flex-wrap gap-2">
          {GOALS.map(g => (
            <button key={g.key} onClick={() => setGoal(g.key)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${goal === g.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {w > 0 && h > 0 && a > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Calorías diarias objetivo</div>
            <div className="text-5xl font-bold">{Math.round(targetCals)}</div>
            <div className="text-sm opacity-70 mt-1">kcal/día</div>
            {weeklyChange !== 0 && (
              <div className="text-sm opacity-80 mt-1">
                ≈ {Math.abs(weeklyChange)} kg/semana ({weeklyChange > 0 ? 'pérdida' : 'ganancia'})
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            {[
              { label: 'TMB (reposo)', val: `${Math.round(bmr)} kcal` },
              { label: 'TDEE (mantenimiento)', val: `${Math.round(tdee)} kcal` },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Macros sugeridos</div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { label: 'Proteína', val: macros.protein, kcal: macros.protein * 4, color: 'bg-blue-500' },
                { label: 'Grasa', val: macros.fat, kcal: macros.fat * 9, color: 'bg-yellow-500' },
                { label: 'Carbos', val: macros.carbs, kcal: macros.carbs * 4, color: 'bg-green-500' },
              ].map(m => (
                <div key={m.label}>
                  <div className={`w-3 h-3 ${m.color} rounded-full mx-auto mb-0.5`} />
                  <div className="font-bold text-gray-900 dark:text-white">{m.val}g</div>
                  <div className="text-gray-400">{m.kcal} kcal</div>
                  <div className="text-gray-400">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
