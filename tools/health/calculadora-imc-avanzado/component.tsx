'use client';
import { useState } from 'react';

export default function ImcAvanzado() {
  const [peso, setPeso] = useState('75');
  const [altura, setAltura] = useState('175');
  const [edad, setEdad] = useState('30');
  const [sexo, setSexo] = useState<'h' | 'm'>('h');
  const [actividad, setActividad] = useState(1.55);
  const [objetivo, setObjetivo] = useState<'perder' | 'mantener' | 'ganar'>('perder');
  const [ritmo, setRitmo] = useState('0.5'); // kg/semana

  const p = parseFloat(peso) || 0;
  const h = parseFloat(altura) || 0;
  const e = parseFloat(edad) || 30;
  const r = parseFloat(ritmo) || 0.5;

  const imc = h > 0 ? p / (h / 100) ** 2 : 0;
  const hm = h / 100;

  const imcCategoria = () => {
    if (imc < 18.5) return { label: 'Bajo peso', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' };
    if (imc < 25) return { label: 'Peso normal', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' };
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' };
    if (imc < 35) return { label: 'Obesidad I', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' };
    return { label: 'Obesidad II+', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' };
  };

  // Peso ideal por fórmula de Devine
  const pesoIdeal = sexo === 'h' ? 50 + 2.3 * ((h - 152.4) / 2.54) : 45.5 + 2.3 * ((h - 152.4) / 2.54);
  const pesoMin = 18.5 * hm ** 2;
  const pesoMax = 24.9 * hm ** 2;

  // TMB Harris-Benedict revisada
  const tmb = sexo === 'h'
    ? 88.362 + 13.397 * p + 4.799 * h - 5.677 * e
    : 447.593 + 9.247 * p + 3.098 * h - 4.330 * e;
  const tdee = tmb * actividad;

  // Calorías según objetivo
  const deficitPorKg = 7700; // kcal por kg grasa
  const calObjetivo = objetivo === 'perder' ? tdee - (r * deficitPorKg / 7) : objetivo === 'ganar' ? tdee + (r * deficitPorKg / 7) : tdee;

  // Tiempo para llegar al peso ideal
  const diferencia = Math.abs(p - pesoIdeal);
  const semanas = r > 0 ? Math.round(diferencia / r) : null;

  const fmt1 = (n: number) => n.toFixed(1);
  const fmt0 = (n: number) => Math.round(n);
  const cat = imcCategoria();

  const ACTIVIDADES = [
    { val: 1.2, label: 'Sedentario' },
    { val: 1.375, label: 'Ligero (1-2 días)' },
    { val: 1.55, label: 'Moderado (3-4 días)' },
    { val: 1.725, label: 'Activo (5-6 días)' },
    { val: 1.9, label: 'Muy activo (diario)' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso (kg)</label>
          <input type="number" value={peso} onChange={e => setPeso(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Altura (cm)</label>
          <input type="number" value={altura} onChange={e => setAltura(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad</label>
          <input type="number" value={edad} onChange={e => setEdad(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sexo</label>
          <div className="flex gap-2">
            {[['h', '♂ Hombre'], ['m', '♀ Mujer']] .map(([v, l]) => (
              <button key={v} onClick={() => setSexo(v as 'h' | 'm')}
                className={`flex-1 py-2 rounded-xl text-xs font-medium ${sexo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Actividad física</label>
        <select value={actividad} onChange={e => setActividad(parseFloat(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {ACTIVIDADES.map(a => <option key={a.val} value={a.val}>{a.label} (×{a.val})</option>)}
        </select>
      </div>

      {imc > 0 && (
        <div className="space-y-3">
          <div className={`border-2 rounded-2xl p-4 text-center ${cat.bg}`}>
            <div className={`text-xs font-medium ${cat.color}`}>IMC</div>
            <div className={`text-4xl font-bold ${cat.color}`}>{fmt1(imc)}</div>
            <div className={`text-sm font-semibold ${cat.color}`}>{cat.label}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            {[
              { label: 'Peso ideal (Devine)', val: fmt1(pesoIdeal) + ' kg' },
              { label: 'Rango saludable', val: `${fmt0(pesoMin)}–${fmt0(pesoMax)} kg` },
              { label: 'TMB', val: fmt0(tmb) + ' kcal' },
              { label: 'Calorías mantenimiento', val: fmt0(tdee) + ' kcal' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Objetivo</div>
            <div className="flex gap-2">
              {([['perder', '📉 Perder'], ['mantener', '⚖️ Mantener'], ['ganar', '📈 Ganar']] as const).map(([v, l]) => (
                <button key={v} onClick={() => setObjetivo(v)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${objetivo === v ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>{l}</button>
              ))}
            </div>
            {objetivo !== 'mantener' && (
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Ritmo (kg/semana)</label>
                <select value={ritmo} onChange={e => setRitmo(e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-xs focus:outline-none">
                  {['0.25', '0.5', '0.75', '1'].map(v => <option key={v} value={v}>{v} kg/semana</option>)}
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-2">
                <div className="text-gray-400">Calorías objetivo</div>
                <div className="font-bold text-indigo-600 dark:text-indigo-400">{fmt0(calObjetivo)} kcal/día</div>
              </div>
              {semanas && objetivo !== 'mantener' && (
                <div className="bg-white dark:bg-gray-700 rounded-lg p-2">
                  <div className="text-gray-400">Tiempo estimado</div>
                  <div className="font-bold text-green-600 dark:text-green-400">{semanas} semanas</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
