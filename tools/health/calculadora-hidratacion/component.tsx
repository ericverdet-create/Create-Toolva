'use client';
import { useState } from 'react';

export default function CalculadoraHidratacion() {
  const [peso, setPeso] = useState('70');
  const [actividad, setActividad] = useState<'sedentario' | 'ligero' | 'moderado' | 'intenso' | 'atleta'>('moderado');
  const [temperatura, setTemperatura] = useState<'fria' | 'normal' | 'calurosa'>('normal');
  const [embarazada, setEmbarazada] = useState(false);
  const [lactancia, setLactancia] = useState(false);

  const p = parseFloat(peso) || 0;

  const FACTORES_ACTIVIDAD = { sedentario: 30, ligero: 33, moderado: 35, intenso: 40, atleta: 45 };
  const EXTRA_TEMPERATURA = { fria: 0, normal: 0, calurosa: 300 };
  const EXTRA_EMBARAZO = embarazada ? 300 : 0;
  const EXTRA_LACTANCIA = lactancia ? 700 : 0;

  const mlBase = p * FACTORES_ACTIVIDAD[actividad];
  const mlTotal = mlBase + EXTRA_TEMPERATURA[temperatura] + EXTRA_EMBARAZO + EXTRA_LACTANCIA;
  const litros = mlTotal / 1000;
  const vasos250 = Math.round(mlTotal / 250);
  const botellas500 = Math.round(mlTotal / 500 * 2) / 2;
  const botellas1500 = Math.round(mlTotal / 1500 * 10) / 10;

  const ACTIVIDADES = [
    { key: 'sedentario', label: '🪑 Sedentario', desc: 'Trabajo de oficina, sin ejercicio' },
    { key: 'ligero', label: '🚶 Ligero', desc: '1-2 días ejercicio semanal' },
    { key: 'moderado', label: '🏃 Moderado', desc: '3-4 días ejercicio semanal' },
    { key: 'intenso', label: '🏋️ Intenso', desc: '5-6 días ejercicio semanal' },
    { key: 'atleta', label: '🏅 Atleta', desc: 'Entrenamiento diario intenso' },
  ] as const;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso corporal (kg)</label>
        <input type="number" value={peso} onChange={e => setPeso(e.target.value)} min="30" max="200"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nivel de actividad</label>
        <div className="space-y-1">
          {ACTIVIDADES.map(a => (
            <button key={a.key} onClick={() => setActividad(a.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-left transition-colors ${actividad === a.key ? 'bg-indigo-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
              <span>{a.label}</span>
              <span className={`text-xs ${actividad === a.key ? 'text-indigo-200' : 'text-gray-400'}`}>{a.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Temperatura ambiente</label>
        <div className="flex gap-1.5">
          {[['fria', '🥶 Fría (<15°C)'], ['normal', '🌤️ Normal (15-25°C)'], ['calurosa', '🔥 Calurosa (>25°C)']].map(([v, l]) => (
            <button key={v} onClick={() => setTemperatura(v as 'fria' | 'normal' | 'calurosa')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-medium ${temperatura === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        {[['embarazada', '🤱 Embarazada', embarazada, setEmbarazada], ['lactancia', '🍼 Lactancia', lactancia, setLactancia]].map(([key, label, val, set]) => (
          <button key={String(key)} onClick={() => (set as (v: boolean) => void)(!val as boolean)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium ${val ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {String(label)}
          </button>
        ))}
      </div>

      {p > 0 && (
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-blue-600 dark:text-blue-400">Agua recomendada al día</div>
            <div className="text-5xl font-bold text-blue-700 dark:text-blue-300">{litros.toFixed(1)}</div>
            <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">litros</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-center">
            {[
              { label: '🥤 Vasos 250ml', val: vasos250 },
              { label: '🍶 Botellas 500ml', val: botellas500 },
              { label: '🏺 Botellas 1,5L', val: botellas1500 },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white text-base">{r.val}</div>
              </div>
            ))}
          </div>
          {(EXTRA_TEMPERATURA[temperatura] || EXTRA_EMBARAZO || EXTRA_LACTANCIA) > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
              <div>Base ({FACTORES_ACTIVIDAD[actividad]} ml/kg): {Math.round(mlBase)} ml</div>
              {EXTRA_TEMPERATURA[temperatura] > 0 && <div>+ Calor: +{EXTRA_TEMPERATURA[temperatura]} ml</div>}
              {EXTRA_EMBARAZO > 0 && <div>+ Embarazo: +{EXTRA_EMBARAZO} ml</div>}
              {EXTRA_LACTANCIA > 0 && <div>+ Lactancia: +{EXTRA_LACTANCIA} ml</div>}
              <div className="font-medium text-gray-700 dark:text-gray-300">= Total: {Math.round(mlTotal)} ml</div>
            </div>
          )}
          <div className="text-xs text-gray-400 dark:text-gray-500 space-y-0.5">
            <div>💡 El agua de los alimentos aporta ~20% de la ingesta total</div>
            <div>💡 Señal de buena hidratación: orina amarillo claro o transparente</div>
          </div>
        </div>
      )}
    </div>
  );
}
