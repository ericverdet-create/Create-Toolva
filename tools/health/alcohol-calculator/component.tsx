'use client';
import { useState } from 'react';

const DRINKS = [
  { label: 'Cerveza 33cl (5°)', grams: 13 },
  { label: 'Vino 150ml (12°)', grams: 14 },
  { label: 'Cava 150ml (11°)', grams: 13 },
  { label: 'Copa de vino 250ml', grams: 24 },
  { label: 'Combinado 50ml (40°)', grams: 16 },
  { label: 'Chupito 30ml (40°)', grams: 10 },
  { label: 'Whisky 50ml (40°)', grams: 16 },
  { label: 'Sidra 330ml (5°)', grams: 13 },
];

export default function AlcoholCalculator() {
  const [weight, setWeight] = useState('70');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [hours, setHours] = useState('2');
  const [drinks, setDrinks] = useState<number[]>(new Array(DRINKS.length).fill(0));

  const w = parseFloat(weight) || 70;
  const h = parseFloat(hours) || 0;
  // Widmark formula
  const r = sex === 'male' ? 0.68 : 0.55; // body water constant
  const totalGrams = drinks.reduce((acc, count, i) => acc + count * DRINKS[i].grams, 0);
  // BAC = grams / (weight_kg * r * 10) - time * elimination_rate
  const eliminationRate = 0.15; // g/L per hour
  const peakBAC = totalGrams / (w * r * 10);
  const currentBAC = Math.max(0, peakBAC - h * eliminationRate);
  const hoursToSober = peakBAC / eliminationRate;
  const hoursToLegal = Math.max(0, (peakBAC - 0.25) / eliminationRate); // Spain: 0.25mg/L breath = 0.5 g/L blood

  const update = (i: number, val: number) => {
    setDrinks(prev => prev.map((v, idx) => idx === i ? Math.max(0, val) : v));
  };

  const fmtBAC = (n: number) => (n * 1000).toFixed(2) + ' g/L'; // promille
  const getColor = (bac: number) => {
    if (bac <= 0) return 'text-green-600 dark:text-green-400';
    if (bac < 0.3) return 'text-yellow-600 dark:text-yellow-400';
    if (bac < 0.5) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const totalDrinks = drinks.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso (kg)</label>
          <input type="number" value={weight} onChange={e => setWeight(e.target.value)} min="40" max="200"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sexo</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 h-[38px]">
            {([['male', 'H'], ['female', 'M']] as const).map(([key, label]) => (
              <button key={key} onClick={() => setSex(key)}
                className={`flex-1 text-sm font-medium transition-colors ${sex === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas desde 1ª copa</label>
          <input type="number" value={hours} onChange={e => setHours(e.target.value)} min="0" max="24" step="0.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Bebidas consumidas</div>
        <div className="space-y-2">
          {DRINKS.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 dark:text-gray-400 flex-1">{d.label}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => update(i, drinks[i] - 1)}
                  className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">−</button>
                <span className="w-6 text-center font-bold text-gray-900 dark:text-white text-sm">{drinks[i]}</span>
                <button onClick={() => update(i, drinks[i] + 1)}
                  className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalDrinks > 0 && (
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Alcohol total consumido</span>
              <span className="font-bold text-gray-900 dark:text-white">{totalGrams.toFixed(0)} g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">BAC pico (al consumir)</span>
              <span className={`font-bold ${getColor(peakBAC)}`}>{fmtBAC(peakBAC)}</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400 text-sm">BAC actual (tras {hours}h)</span>
                <span className={`font-bold text-lg ${getColor(currentBAC)}`}>{fmtBAC(currentBAC)}</span>
              </div>
            </div>
          </div>

          <div className={`rounded-2xl p-4 border text-center ${currentBAC <= 0.0005 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : currentBAC < 0.5 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            {currentBAC <= 0.0005 ? (
              <div className="text-green-700 dark:text-green-300 font-bold">✅ Alcohol eliminado — Apto para conducir</div>
            ) : currentBAC < 0.5 ? (
              <div>
                <div className="text-yellow-700 dark:text-yellow-300 font-bold">⚠️ Por encima del límite legal (0,5 g/L)</div>
                <div className="text-xs mt-1 text-yellow-600 dark:text-yellow-400">
                  Legal en ~{hoursToLegal.toFixed(1)}h · Completamente sobrio en ~{hoursToSober.toFixed(1)}h
                </div>
              </div>
            ) : (
              <div>
                <div className="text-red-700 dark:text-red-300 font-bold">🚫 No conduzcas — Alcohol elevado</div>
                <div className="text-xs mt-1 text-red-600 dark:text-red-400">
                  Legal en ~{hoursToLegal.toFixed(1)}h · Completamente sobrio en ~{hoursToSober.toFixed(1)}h
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Cálculo estimativo (fórmula de Widmark). Variables como alimentación, medicación y metabolismo afectan al resultado real. España: límite 0,5 g/L (0,3 para noveles y conductores profesionales). Nunca conduzcas si has bebido.
          </div>
        </div>
      )}
    </div>
  );
}
