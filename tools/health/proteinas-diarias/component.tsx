'use client';
import { useState } from 'react';

const ACTIVIDADES = [
  { label: 'Sedentario (sin ejercicio)', factor: { perder: 1.2, mantener: 0.8, ganar: 1.6 } },
  { label: 'Ligero (1-2 días/semana)', factor: { perder: 1.4, mantener: 1.0, ganar: 1.8 } },
  { label: 'Moderado (3-4 días/semana)', factor: { perder: 1.6, mantener: 1.2, ganar: 2.0 } },
  { label: 'Activo (5-6 días/semana)', factor: { perder: 1.8, mantener: 1.4, ganar: 2.2 } },
  { label: 'Muy activo (atleta / diario)', factor: { perder: 2.0, mantener: 1.6, ganar: 2.4 } },
];

const FUENTES = [
  { nombre: 'Pechuga de pollo (100g)', prot: 31, kcal: 165 },
  { nombre: 'Atún al natural (lata 80g)', prot: 19, kcal: 86 },
  { nombre: 'Huevo entero (1 ud)', prot: 6, kcal: 78 },
  { nombre: 'Claras de huevo (3 uds)', prot: 11, kcal: 51 },
  { nombre: 'Yogur griego (125g)', prot: 10, kcal: 100 },
  { nombre: 'Queso cottage (100g)', prot: 11, kcal: 98 },
  { nombre: 'Salmón (100g)', prot: 20, kcal: 208 },
  { nombre: 'Lentejas cocidas (100g)', prot: 9, kcal: 116 },
  { nombre: 'Proteína whey (30g scoop)', prot: 24, kcal: 120 },
  { nombre: 'Tofu (100g)', prot: 8, kcal: 76 },
];

export default function ProteinasDiarias() {
  const [peso, setPeso] = useState('70');
  const [actividadIdx, setActividadIdx] = useState(2);
  const [objetivo, setObjetivo] = useState<'perder' | 'mantener' | 'ganar'>('mantener');

  const p = parseFloat(peso) || 0;
  const factor = ACTIVIDADES[actividadIdx].factor[objetivo];
  const gramos = p * factor;
  const min = p * (factor * 0.9);
  const max = p * (factor * 1.1);

  const fmt = (n: number) => Math.round(n);

  const objetivos = [
    { val: 'perder', label: '📉 Perder grasa', desc: 'Mayor proteína para preservar músculo en déficit' },
    { val: 'mantener', label: '⚖️ Mantener', desc: 'Ingesta de mantenimiento' },
    { val: 'ganar', label: '📈 Ganar músculo', desc: 'Alta ingesta para síntesis proteica' },
  ] as const;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso corporal (kg)</label>
        <input type="number" value={peso} onChange={e => setPeso(e.target.value)} min="30" max="250"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Objetivo</label>
        <div className="space-y-1.5">
          {objetivos.map(o => (
            <button key={o.val} onClick={() => setObjetivo(o.val)}
              className={`w-full text-left px-3 py-2 rounded-xl border transition-colors text-sm ${objetivo === o.val ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              <div className="font-medium">{o.label}</div>
              <div className={`text-xs ${objetivo === o.val ? 'text-indigo-200' : 'text-gray-400'}`}>{o.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nivel de actividad</label>
        <select value={actividadIdx} onChange={e => setActividadIdx(parseInt(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {ACTIVIDADES.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
        </select>
      </div>

      {p > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Proteína diaria recomendada</div>
            <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(gramos)}g</div>
            <div className="text-sm text-indigo-500 dark:text-indigo-400">Rango: {fmt(min)}–{fmt(max)} g/día · {factor} g/kg</div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">🍗 Ejemplos para alcanzar {fmt(gramos)}g</div>
            <div className="space-y-1">
              {FUENTES.map(f => {
                const raciones = gramos / f.prot;
                return (
                  <div key={f.nombre} className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">{f.nombre}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{raciones.toFixed(1)} raciones ({Math.round(raciones * f.kcal)} kcal)</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            Basado en ISSN (International Society of Sports Nutrition). Distribuye la ingesta en 3-5 comidas para maximizar la síntesis proteica muscular.
          </div>
        </div>
      )}
    </div>
  );
}
