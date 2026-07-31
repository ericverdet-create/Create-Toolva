'use client';
import { useState } from 'react';

// US Navy method
function calcBodyFat(gender: 'male' | 'female', height: number, waist: number, neck: number, hip?: number): number {
  if (gender === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + (hip||0) - neck) + 0.22100 * Math.log10(height)) - 450;
  }
}

const CATEGORIES = {
  male: [
    { max: 6, label: 'Esencial', color: 'text-blue-600' },
    { max: 14, label: 'Atlético', color: 'text-green-600' },
    { max: 18, label: 'Fitness', color: 'text-green-500' },
    { max: 25, label: 'Aceptable', color: 'text-amber-500' },
    { max: Infinity, label: 'Obesidad', color: 'text-red-600' },
  ],
  female: [
    { max: 14, label: 'Esencial', color: 'text-blue-600' },
    { max: 21, label: 'Atlético', color: 'text-green-600' },
    { max: 25, label: 'Fitness', color: 'text-green-500' },
    { max: 32, label: 'Aceptable', color: 'text-amber-500' },
    { max: Infinity, label: 'Obesidad', color: 'text-red-600' },
  ],
};

export default function BodyFat() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('175');
  const [waist, setWaist] = useState('85');
  const [neck, setNeck] = useState('38');
  const [hip, setHip] = useState('95');
  const [weight, setWeight] = useState('75');

  const h = parseFloat(height) || 0;
  const w = parseFloat(waist) || 0;
  const n = parseFloat(neck) || 0;
  const hp = parseFloat(hip) || 0;
  const wt = parseFloat(weight) || 0;

  const valid = h > 0 && w > 0 && n > 0 && (gender === 'male' || hp > 0) && w > n;
  const bf = valid ? calcBodyFat(gender, h, w, n, hp) : 0;
  const bfRounded = Math.max(0, Math.round(bf * 10) / 10);

  const cat = CATEGORIES[gender].find(c => bfRounded < c.max);
  const fatMass = wt > 0 ? (bfRounded / 100) * wt : null;
  const leanMass = wt > 0 && fatMass !== null ? wt - fatMass : null;

  const inputClass = "w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center text-sm";

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
        Método US Navy — mide con una cinta métrica a la altura del ombligo (cintura), nuez de Adán (cuello) y caderas (mujeres).
      </div>

      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {(['male', 'female'] as const).map(g => (
          <button key={g} onClick={() => setGender(g)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${gender === g ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {g === 'male' ? '♂ Hombre' : '♀ Mujer'}
          </button>
        ))}
      </div>

      <div className={`grid gap-3 ${gender === 'female' ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {[
          { label: 'Altura (cm)', val: height, set: setHeight },
          { label: 'Cintura (cm)', val: waist, set: setWaist },
          { label: 'Cuello (cm)', val: neck, set: setNeck },
          ...(gender === 'female' ? [{ label: 'Caderas (cm)', val: hip, set: setHip }] : []),
          { label: 'Peso (kg, opc.)', val: weight, set: setWeight },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0" className={inputClass} />
          </div>
        ))}
      </div>

      {!valid && w > 0 && w <= n && (
        <div className="text-xs text-red-500 text-center">La cintura debe ser mayor que el cuello.</div>
      )}

      {valid && bfRounded > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Grasa corporal estimada</div>
            <div className="text-5xl font-bold">{bfRounded}%</div>
            {cat && <div className={`text-lg font-medium mt-1 opacity-90`}>{cat.label}</div>}
          </div>

          {(fatMass !== null && leanMass !== null) && (
            <div className="grid grid-cols-2 gap-3 text-center text-sm">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Masa grasa</div>
                <div className="font-bold text-gray-900 dark:text-white">{fatMass!.toFixed(1)} kg</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">Masa magra</div>
                <div className="font-bold text-gray-900 dark:text-white">{leanMass!.toFixed(1)} kg</div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs">
            <div className="font-medium text-gray-600 dark:text-gray-400 mb-2">Categorías ({gender === 'male' ? 'hombres' : 'mujeres'})</div>
            <div className="space-y-0.5">
              {CATEGORIES[gender].map((c, i) => {
                const prev = i === 0 ? 0 : CATEGORIES[gender][i-1].max;
                return (
                  <div key={c.label} className={`flex justify-between ${c.label === cat?.label ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    <span>{c.label}</span>
                    <span>{prev}–{c.max === Infinity ? '∞' : c.max}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
