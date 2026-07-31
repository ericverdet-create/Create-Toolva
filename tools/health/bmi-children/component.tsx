'use client';
import { useState } from 'react';

// WHO BMI-for-age percentile cutoffs (simplified, boys/girls average)
// P3, P15, P85, P97 for ages 2-18
// Values are approximate BMI thresholds
const WHO_CUTOFFS: Record<number, { p3: number; p15: number; p85: number; p97: number }> = {
  2:  { p3: 13.8, p15: 14.5, p85: 17.8, p97: 19.4 },
  3:  { p3: 13.4, p15: 14.0, p85: 17.2, p97: 18.7 },
  4:  { p3: 13.1, p15: 13.7, p85: 16.8, p97: 18.2 },
  5:  { p3: 12.9, p15: 13.5, p85: 16.6, p97: 18.1 },
  6:  { p3: 12.8, p15: 13.5, p85: 16.8, p97: 18.5 },
  7:  { p3: 13.0, p15: 13.7, p85: 17.4, p97: 19.4 },
  8:  { p3: 13.3, p15: 14.0, p85: 18.1, p97: 20.5 },
  9:  { p3: 13.5, p15: 14.3, p85: 18.9, p97: 21.6 },
  10: { p3: 13.8, p15: 14.6, p85: 19.7, p97: 22.8 },
  11: { p3: 14.1, p15: 14.9, p85: 20.6, p97: 24.0 },
  12: { p3: 14.5, p15: 15.3, p85: 21.4, p97: 25.1 },
  13: { p3: 14.9, p15: 15.8, p85: 22.2, p97: 26.0 },
  14: { p3: 15.3, p15: 16.2, p85: 22.8, p97: 26.9 },
  15: { p3: 15.7, p15: 16.6, p85: 23.4, p97: 27.5 },
  16: { p3: 16.1, p15: 17.1, p85: 23.9, p97: 28.1 },
  17: { p3: 16.5, p15: 17.5, p85: 24.4, p97: 28.6 },
  18: { p3: 17.0, p15: 18.0, p85: 24.9, p97: 29.0 },
};

function getCategory(bmi: number, age: number): { label: string; color: string; desc: string } {
  const cutoff = WHO_CUTOFFS[age] || WHO_CUTOFFS[18];
  if (bmi < cutoff.p3) return { label: 'Bajo peso severo', color: 'text-red-600', desc: 'IMC por debajo del percentil 3. Consulta con el pediatra.' };
  if (bmi < cutoff.p15) return { label: 'Bajo peso', color: 'text-amber-500', desc: 'IMC entre los percentiles 3 y 15. Puede necesitar revisión.' };
  if (bmi < cutoff.p85) return { label: 'Peso normal', color: 'text-green-600', desc: 'IMC entre los percentiles 15 y 85. Rango saludable.' };
  if (bmi < cutoff.p97) return { label: 'Sobrepeso', color: 'text-amber-500', desc: 'IMC entre los percentiles 85 y 97. Consulta con el pediatra.' };
  return { label: 'Obesidad', color: 'text-red-600', desc: 'IMC por encima del percentil 97. Requiere atención médica.' };
}

export default function BmiChildren() {
  const [weight, setWeight] = useState('25');
  const [height, setHeight] = useState('110');
  const [age, setAge] = useState('5');

  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 1;
  const a = parseInt(age) || 5;
  const bmi = w / ((h / 100) ** 2);
  const valid = w > 0 && h > 0 && a >= 2 && a <= 18;
  const cat = valid ? getCategory(bmi, a) : null;

  const cutoff = WHO_CUTOFFS[Math.min(18, Math.max(2, a))] || WHO_CUTOFFS[5];

  return (
    <div className="space-y-5">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-sm text-blue-800 dark:text-blue-300">
        📋 Calculadora basada en los percentiles de la OMS para niños de 2 a 18 años.
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Edad (años)', val: age, set: setAge, min: 2, max: 18 },
          { label: 'Peso (kg)', val: weight, set: setWeight, min: 5, max: 200 },
          { label: 'Talla (cm)', val: height, set: setHeight, min: 50, max: 220 },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min={f.min} max={f.max}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
          </div>
        ))}
      </div>

      {valid && cat && (
        <div className="space-y-3">
          <div className="bg-indigo-600 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">IMC</div>
            <div className="text-5xl font-bold">{bmi.toFixed(1)}</div>
            <div className={`text-lg font-semibold mt-1 ${cat.color.replace('text-', 'text-').replace('600', '200').replace('500', '200')}`}>
              {cat.label}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-400">
            {cat.desc}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm">
            <div className="font-medium text-gray-700 dark:text-gray-300 mb-2">Percentiles OMS para {a} años</div>
            <div className="space-y-1 text-xs">
              {[
                { label: 'Bajo peso severo (<P3)', val: cutoff.p3, color: 'bg-red-500' },
                { label: 'Bajo peso (P3–P15)', val: cutoff.p15, color: 'bg-amber-400' },
                { label: 'Normal (P15–P85)', val: cutoff.p85, color: 'bg-green-500' },
                { label: 'Sobrepeso (P85–P97)', val: cutoff.p97, color: 'bg-amber-500' },
                { label: 'Obesidad (>P97)', val: null, color: 'bg-red-600' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${r.color}`} />
                  <span className={bmi >= (i === 0 ? 0 : [cutoff.p3, cutoff.p15, cutoff.p85, cutoff.p97][i-1] || 0) && bmi < (r.val || Infinity) ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}>
                    {r.label} (IMC {i === 0 ? '<' : '≥'}{i === 0 ? cutoff.p3 : [cutoff.p3, cutoff.p15, cutoff.p85, cutoff.p97][i-1]})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {a < 2 || a > 18 ? (
        <div className="text-sm text-red-500 text-center">Esta calculadora es para niños de 2 a 18 años.</div>
      ) : null}
    </div>
  );
}
