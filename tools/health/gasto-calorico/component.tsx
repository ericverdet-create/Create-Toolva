'use client';
import { useState, useMemo } from 'react';

interface Activity { name: string; cat: string; met: number; }

const ACTIVITIES: Activity[] = [
  // Cardio
  { name: 'Correr (8 km/h)', cat: 'Cardio', met: 8.0 },
  { name: 'Correr (10 km/h)', cat: 'Cardio', met: 10.0 },
  { name: 'Correr (12 km/h)', cat: 'Cardio', met: 11.5 },
  { name: 'Correr (14 km/h)', cat: 'Cardio', met: 13.5 },
  { name: 'Caminar (5 km/h)', cat: 'Cardio', met: 3.5 },
  { name: 'Caminar rápido (6 km/h)', cat: 'Cardio', met: 5.0 },
  { name: 'Senderismo', cat: 'Cardio', met: 6.0 },
  { name: 'Ciclismo (15 km/h)', cat: 'Cardio', met: 5.8 },
  { name: 'Ciclismo (20 km/h)', cat: 'Cardio', met: 7.5 },
  { name: 'Ciclismo (25 km/h)', cat: 'Cardio', met: 10.0 },
  { name: 'Bicicleta estática (moderado)', cat: 'Cardio', met: 6.8 },
  { name: 'Natación (estilo libre, moderado)', cat: 'Cardio', met: 7.0 },
  { name: 'Natación (rápido)', cat: 'Cardio', met: 10.0 },
  { name: 'Elíptica', cat: 'Cardio', met: 5.0 },
  { name: 'Remo (máquina)', cat: 'Cardio', met: 7.0 },
  { name: 'Saltar a la comba', cat: 'Cardio', met: 10.0 },
  { name: 'HIIT', cat: 'Cardio', met: 8.0 },
  { name: 'Aeróbic', cat: 'Cardio', met: 7.3 },
  { name: 'Zumba', cat: 'Cardio', met: 6.5 },
  // Fuerza
  { name: 'Musculación (moderado)', cat: 'Fuerza', met: 3.5 },
  { name: 'Musculación (intenso)', cat: 'Fuerza', met: 6.0 },
  { name: 'Pilates', cat: 'Fuerza', met: 3.0 },
  { name: 'Crossfit', cat: 'Fuerza', met: 9.0 },
  { name: 'Calistenia', cat: 'Fuerza', met: 5.0 },
  // Deportes
  { name: 'Fútbol', cat: 'Deportes', met: 7.0 },
  { name: 'Baloncesto', cat: 'Deportes', met: 6.5 },
  { name: 'Tenis (individual)', cat: 'Deportes', met: 7.3 },
  { name: 'Pádel', cat: 'Deportes', met: 6.0 },
  { name: 'Voleibol', cat: 'Deportes', met: 4.0 },
  { name: 'Natación sincronizada', cat: 'Deportes', met: 8.0 },
  { name: 'Esquí alpino', cat: 'Deportes', met: 6.8 },
  { name: 'Surf', cat: 'Deportes', met: 3.0 },
  // Relajación
  { name: 'Yoga', cat: 'Relajación', met: 2.5 },
  { name: 'Tai chi', cat: 'Relajación', met: 3.0 },
  { name: 'Estiramientos', cat: 'Relajación', met: 2.5 },
  // Actividades diarias
  { name: 'Limpiar la casa', cat: 'Diario', met: 3.5 },
  { name: 'Jardinería', cat: 'Diario', met: 3.5 },
  { name: 'Baile (social)', cat: 'Diario', met: 4.5 },
  { name: 'Subir escaleras', cat: 'Diario', met: 8.0 },
  { name: 'Compras (caminando)', cat: 'Diario', met: 2.3 },
];

export default function GastoCalorico() {
  const [peso, setPeso] = useState('70');
  const [minutos, setMinutos] = useState('30');
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Todos');
  const [selected, setSelected] = useState<Activity | null>(null);

  const p = parseFloat(peso) || 0;
  const min = parseFloat(minutos) || 0;

  const cats = ['Todos', ...Array.from(new Set(ACTIVITIES.map(a => a.cat)))];

  const filtered = useMemo(() => ACTIVITIES.filter(a =>
    (cat === 'Todos' || a.cat === cat) &&
    a.name.toLowerCase().includes(search.toLowerCase())
  ), [search, cat]);

  // kcal = MET × peso(kg) × tiempo(h)
  const kcal = selected && p > 0 && min > 0
    ? selected.met * p * (min / 60)
    : null;

  const fmt1 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Peso (kg)</label>
          <input type="number" value={peso} onChange={e => setPeso(e.target.value)} min="30" max="200"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duración (minutos)</label>
          <input type="number" value={minutos} onChange={e => setMinutos(e.target.value)} min="1" max="300"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar actividad..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />

      <div className="flex gap-1 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${cat === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {filtered.map((a, i) => {
          const isSelected = selected?.name === a.name;
          const cal = p > 0 && min > 0 ? Math.round(a.met * p * (min / 60)) : null;
          return (
            <div key={i} onClick={() => setSelected(a)}
              className={`flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              <div>
                <div className={`text-sm font-medium ${isSelected ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>{a.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">MET: {a.met} · {a.cat}</div>
              </div>
              {cal !== null && (
                <div className={`text-sm font-bold ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>{cal} kcal</div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">Sin resultados</div>}
      </div>

      {kcal !== null && selected && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 text-center">
          <div className="text-sm text-orange-600 dark:text-orange-400">{selected.name} · {min} min · {p} kg</div>
          <div className="text-4xl font-bold text-orange-700 dark:text-orange-300">{fmt1(kcal)} kcal</div>
          <div className="text-xs text-orange-500 dark:text-orange-400 mt-1">≈ {fmt1(kcal * 4.184)} kJ · MET {selected.met}</div>
        </div>
      )}
    </div>
  );
}
