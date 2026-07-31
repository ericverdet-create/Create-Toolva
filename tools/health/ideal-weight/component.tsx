'use client';
import { useState } from 'react';

export default function IdealWeight() {
  const [height, setHeight] = useState('170');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [frame, setFrame] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentWeight, setCurrentWeight] = useState('75');

  const h = parseFloat(height) || 0;
  const cw = parseFloat(currentWeight) || 0;
  const hIn = h / 2.54;       // height in inches
  const hOver5ft = hIn - 60;  // inches over 5 feet (152.4cm)

  // Classic formulas (in kg, using cm)
  const devine = sex === 'male'
    ? 50 + 2.3 * hOver5ft
    : 45.5 + 2.3 * hOver5ft;

  const robinson = sex === 'male'
    ? 52 + 1.9 * hOver5ft
    : 49 + 1.7 * hOver5ft;

  const miller = sex === 'male'
    ? 56.2 + 1.41 * hOver5ft
    : 53.1 + 1.36 * hOver5ft;

  const hamwi = sex === 'male'
    ? 48 + 2.7 * hOver5ft
    : 45.4 + 2.27 * hOver5ft;

  const avg = (devine + robinson + miller + hamwi) / 4;

  // Frame adjustment
  const frameAdj = frame === 'small' ? -0.1 : frame === 'large' ? 0.1 : 0;
  const adjusted = avg * (1 + frameAdj);

  // Healthy BMI range (18.5 - 25)
  const hM = h / 100;
  const minBMI = 18.5 * hM * hM;
  const maxBMI = 25 * hM * hM;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const diff = cw - adjusted;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Altura (cm)</label>
          <input type="number" value={height} onChange={e => setHeight(e.target.value)} min="140" max="220"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso actual (kg) — opcional</label>
          <input type="number" value={currentWeight} onChange={e => setCurrentWeight(e.target.value)} min="30" max="300"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Sexo biológico</label>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {([['male', '👨 Hombre'], ['female', '👩 Mujer']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSex(key)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${sex === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Complexión</label>
        <div className="grid grid-cols-3 gap-2">
          {([['small', 'Pequeña'], ['medium', 'Media'], ['large', 'Grande']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setFrame(key)}
              className={`py-2 rounded-xl text-sm font-medium transition-colors ${frame === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {h >= 140 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(adjusted)} kg</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">Peso ideal estimado (media ajustada)</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-2 text-sm">
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Por fórmula</div>
            {[
              { label: 'Devine', val: devine },
              { label: 'Robinson', val: robinson },
              { label: 'Miller', val: miller },
              { label: 'Hamwi', val: hamwi },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{r.label}</span><span className="font-semibold text-gray-900 dark:text-white">{fmt(r.val)} kg</span>
              </div>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-1">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Rango IMC sano (18.5–25)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(minBMI)}–{fmt(maxBMI)} kg</span>
              </div>
            </div>
          </div>

          {cw > 0 && (
            <div className={`rounded-2xl p-4 text-center border ${Math.abs(diff) < 2 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : diff > 0 ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'}`}>
              <div className={`font-bold text-lg ${Math.abs(diff) < 2 ? 'text-green-700 dark:text-green-300' : diff > 0 ? 'text-orange-700 dark:text-orange-300' : 'text-blue-700 dark:text-blue-300'}`}>
                {Math.abs(diff) < 2 ? '✅ Estás en tu peso ideal' : diff > 0 ? `📉 ${fmt(diff)} kg sobre el peso ideal` : `📈 ${fmt(Math.abs(diff))} kg bajo el peso ideal`}
              </div>
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Estas fórmulas son orientativas. El peso ideal varía según masa muscular, densidad ósea y otros factores. Consulta a un profesional de la salud.
          </div>
        </div>
      )}
    </div>
  );
}
