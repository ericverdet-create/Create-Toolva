'use client';
import { useState } from 'react';

// MET values (Metabolic Equivalent of Task)
const EJERCICIOS = [
  { id: 'caminar', label: '🚶 Caminar (5 km/h)', met: 3.5, categoria: 'Cardio ligero' },
  { id: 'caminar-rapido', label: '🚶‍♂️ Caminar rápido (6 km/h)', met: 4.3, categoria: 'Cardio ligero' },
  { id: 'correr-8', label: '🏃 Correr (8 km/h)', met: 8.0, categoria: 'Running' },
  { id: 'correr-10', label: '🏃 Correr (10 km/h)', met: 10.0, categoria: 'Running' },
  { id: 'correr-12', label: '🏃‍♂️ Correr (12 km/h)', met: 12.5, categoria: 'Running' },
  { id: 'correr-15', label: '⚡ Correr (15 km/h)', met: 16.0, categoria: 'Running' },
  { id: 'bici-moderado', label: '🚴 Bicicleta moderada (16-19 km/h)', met: 8.0, categoria: 'Ciclismo' },
  { id: 'bici-fuerte', label: '🚴‍♂️ Bicicleta fuerte (>20 km/h)', met: 12.0, categoria: 'Ciclismo' },
  { id: 'bici-estatica', label: '🚵 Bici estática moderada', met: 7.0, categoria: 'Ciclismo' },
  { id: 'nadar-moderado', label: '🏊 Nadar (moderado)', met: 6.0, categoria: 'Natación' },
  { id: 'nadar-fuerte', label: '🏊‍♂️ Nadar (intenso)', met: 10.0, categoria: 'Natación' },
  { id: 'pesas', label: '🏋️ Pesas / musculación', met: 5.0, categoria: 'Gimnasio' },
  { id: 'hiit', label: '💥 HIIT / Crossfit', met: 10.0, categoria: 'Gimnasio' },
  { id: 'yoga', label: '🧘 Yoga / pilates', met: 3.0, categoria: 'Mente y cuerpo' },
  { id: 'futbol', label: '⚽ Fútbol (partido)', met: 10.0, categoria: 'Deportes' },
  { id: 'tenis', label: '🎾 Tenis (individual)', met: 8.0, categoria: 'Deportes' },
  { id: 'padel', label: '🏓 Pádel', met: 7.5, categoria: 'Deportes' },
  { id: 'saltar-cuerda', label: '🪢 Saltar a la cuerda', met: 12.3, categoria: 'Cardio intenso' },
  { id: 'eliptica', label: '🔄 Elíptica', met: 5.0, categoria: 'Cardio ligero' },
  { id: 'escaleras', label: '🪜 Subir escaleras', met: 9.0, categoria: 'Cardio intenso' },
  { id: 'baile', label: '💃 Baile / zumba', met: 7.8, categoria: 'Cardio ligero' },
  { id: 'boxeo', label: '🥊 Boxeo / kick boxing', met: 12.0, categoria: 'Cardio intenso' },
];

const CATEGORIAS = [...new Set(EJERCICIOS.map(e => e.categoria))];

export default function CaloriasEjercicio() {
  const [peso, setPeso] = useState('75');
  const [minutos, setMinutos] = useState('30');
  const [ejercicioId, setEjercicioId] = useState('correr-8');
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const p = parseFloat(peso) || 0;
  const t = parseFloat(minutos) / 60 || 0;
  const ejercicio = EJERCICIOS.find(e => e.id === ejercicioId)!;

  // Fórmula: calorías = MET × peso(kg) × tiempo(h)
  const calorias = ejercicio ? ejercicio.met * p * t : 0;
  const calPorMinuto = ejercicio ? ejercicio.met * p / 60 : 0;

  const tiemposRef = [15, 30, 45, 60, 90];
  const ejerciciosFiltrados = categoriaFiltro ? EJERCICIOS.filter(e => e.categoria === categoriaFiltro) : EJERCICIOS;

  // Equivalencias divertidas
  const EQUIVALENCIAS = [
    { item: '🍕 Pizza (porción)', cal: 285 },
    { item: '🍫 Chocolate (100g)', cal: 546 },
    { item: '🍺 Cerveza (330ml)', cal: 143 },
    { item: '🍎 Manzana', cal: 80 },
    { item: '🍔 Hamburguesa', cal: 540 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tu peso (kg)</label>
          <input type="number" value={peso} onChange={e => setPeso(e.target.value)} min="30" max="200"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duración (minutos)</label>
          <input type="number" value={minutos} onChange={e => setMinutos(e.target.value)} min="1" max="360"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        {tiemposRef.map(t => (
          <button key={t} onClick={() => setMinutos(String(t))}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium ${minutos === String(t) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {t}min
          </button>
        ))}
      </div>

      <div>
        <div className="flex gap-1 mb-2 flex-wrap">
          <button onClick={() => setCategoriaFiltro('')}
            className={`px-2 py-0.5 rounded-full text-xs ${!categoriaFiltro ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>Todo</button>
          {CATEGORIAS.map(c => (
            <button key={c} onClick={() => setCategoriaFiltro(c)}
              className={`px-2 py-0.5 rounded-full text-xs ${categoriaFiltro === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{c}</button>
          ))}
        </div>
        <select value={ejercicioId} onChange={e => setEjercicioId(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {ejerciciosFiltrados.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
        </select>
      </div>

      {calorias > 0 && (
        <div className="space-y-3">
          <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-orange-600 dark:text-orange-400">Calorías quemadas</div>
            <div className="text-5xl font-bold text-orange-700 dark:text-orange-300">{Math.round(calorias)}</div>
            <div className="text-sm text-orange-600 dark:text-orange-400">kcal en {minutos} minutos · {calPorMinuto.toFixed(1)} kcal/min</div>
          </div>

          {/* Comparativa tiempos */}
          <div className="grid grid-cols-5 gap-1 text-xs text-center">
            {tiemposRef.map(t2 => {
              const c2 = ejercicio.met * p * t2 / 60;
              return (
                <div key={t2} className={`rounded-xl p-2 ${minutos === String(t2) ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800' : 'bg-gray-50 dark:bg-gray-800'}`}>
                  <div className="text-gray-400">{t2}min</div>
                  <div className={`font-bold ${minutos === String(t2) ? 'text-orange-700 dark:text-orange-300' : 'text-gray-900 dark:text-white'}`}>{Math.round(c2)}</div>
                </div>
              );
            })}
          </div>

          {/* Equivalencias */}
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Equivale a quemar…</div>
            {EQUIVALENCIAS.map(eq => {
              const pct = Math.min(100, (calorias / eq.cal) * 100);
              const unidades = (calorias / eq.cal).toFixed(1);
              return (
                <div key={eq.item} className="flex items-center gap-2 text-xs">
                  <span className="w-32 text-gray-700 dark:text-gray-300">{eq.item}</span>
                  <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="w-12 text-right font-medium text-gray-700 dark:text-gray-300">{unidades}x</span>
                </div>
              );
            })}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">Fórmula: MET (×{ejercicio.met}) × peso × tiempo. Los valores son estimaciones; varían según condición física e intensidad real.</div>
        </div>
      )}
    </div>
  );
}
