'use client';
import { useState } from 'react';

type Sex = 'male' | 'female';
type Activity = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
type Goal = 'lose' | 'maintain' | 'gain';

const ACTIVITY_LABELS: Record<Activity, string> = {
  sedentary: 'Sedentario (sin ejercicio)',
  light: 'Ligero (1-3 días/semana)',
  moderate: 'Moderado (3-5 días/semana)',
  active: 'Activo (6-7 días/semana)',
  very_active: 'Muy activo (2x/día)',
};

const ACTIVITY_MULTIPLIERS: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const GOAL_LABELS: Record<Goal, string> = {
  lose: 'Perder peso (−500 kcal)',
  maintain: 'Mantener peso',
  gain: 'Ganar masa (+500 kcal)',
};

const GOAL_DELTAS: Record<Goal, number> = {
  lose: -500,
  maintain: 0,
  gain: 500,
};

export default function CalorieCalculator() {
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('175');
  const [activity, setActivity] = useState<Activity>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const a = parseFloat(age) || 0;

  // Mifflin-St Jeor equation
  let bmr = 0;
  if (w > 0 && h > 0 && a > 0) {
    if (sex === 'male') bmr = 10 * w + 6.25 * h - 5 * a + 5;
    else bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  const tdee = bmr * ACTIVITY_MULTIPLIERS[activity];
  const target = tdee + GOAL_DELTAS[goal];

  const macros = {
    protein: Math.round(w * 2), // 2g per kg bodyweight
    fat: Math.round((target * 0.25) / 9),
    carbs: Math.round((target - w * 2 * 4 - (target * 0.25 / 9) * 9) / 4),
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {(['male', 'female'] as Sex[]).map(s => (
          <button key={s} onClick={() => setSex(s)}
            className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${sex === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>
            {s === 'male' ? '♂ Hombre' : '♀ Mujer'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Edad (años)</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} min="10" max="100"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="30"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Altura (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="100"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nivel de actividad</label>
        <div className="space-y-2">
          {(Object.keys(ACTIVITY_LABELS) as Activity[]).map(act => (
            <button key={act} onClick={() => setActivity(act)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm border transition-colors ${activity === act ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              {ACTIVITY_LABELS[act]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objetivo</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(Object.keys(GOAL_LABELS) as Goal[]).map(g => (
            <button key={g} onClick={() => setGoal(g)}
              className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${goal === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              {GOAL_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      {bmr > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">BMR (reposo)</div>
              <div className="font-bold text-gray-900 dark:text-white">{Math.round(bmr)} kcal</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">TDEE (mantenimiento)</div>
              <div className="font-bold text-gray-900 dark:text-white">{Math.round(tdee)} kcal</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Objetivo diario</div>
              <div className="font-bold text-2xl text-indigo-700 dark:text-indigo-300">{Math.round(target)} kcal</div>
            </div>
          </div>
          <div className="border-t border-indigo-200 dark:border-indigo-700 pt-3">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Macros sugeridos</div>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-2">
                <div className="text-xs text-blue-600 dark:text-blue-400">Proteína</div>
                <div className="font-bold text-blue-700 dark:text-blue-300">{macros.protein}g</div>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-xl p-2">
                <div className="text-xs text-yellow-600 dark:text-yellow-400">Grasas</div>
                <div className="font-bold text-yellow-700 dark:text-yellow-300">{macros.fat}g</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-2">
                <div className="text-xs text-green-600 dark:text-green-400">Carbohidratos</div>
                <div className="font-bold text-green-700 dark:text-green-300">{macros.carbs}g</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
