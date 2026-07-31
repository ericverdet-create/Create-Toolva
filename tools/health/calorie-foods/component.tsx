'use client';
import { useState, useMemo } from 'react';

interface Food { name: string; cat: string; kcal: number; prot: number; carbs: number; fat: number; }

const FOODS: Food[] = [
  // Carnes y aves
  { name: 'Pollo (pechuga, cocida)', cat: 'Carnes', kcal: 165, prot: 31, carbs: 0, fat: 3.6 },
  { name: 'Ternera (solomillo)', cat: 'Carnes', kcal: 193, prot: 26, carbs: 0, fat: 9.6 },
  { name: 'Cerdo (lomo)', cat: 'Carnes', kcal: 215, prot: 25, carbs: 0, fat: 12 },
  { name: 'Jamón serrano', cat: 'Carnes', kcal: 241, prot: 28, carbs: 1, fat: 14 },
  { name: 'Chorizo', cat: 'Carnes', kcal: 455, prot: 24, carbs: 2, fat: 39 },
  { name: 'Atún (lata en aceite)', cat: 'Pescados', kcal: 289, prot: 26, carbs: 0, fat: 20 },
  { name: 'Atún (lata al natural)', cat: 'Pescados', kcal: 108, prot: 24, carbs: 0, fat: 0.5 },
  { name: 'Salmón (fresco)', cat: 'Pescados', kcal: 208, prot: 20, carbs: 0, fat: 13 },
  { name: 'Merluza', cat: 'Pescados', kcal: 86, prot: 17, carbs: 0, fat: 1.5 },
  { name: 'Gambas', cat: 'Pescados', kcal: 85, prot: 18, carbs: 0, fat: 0.9 },
  { name: 'Bacalao', cat: 'Pescados', kcal: 82, prot: 18, carbs: 0, fat: 0.7 },
  // Lácteos
  { name: 'Leche entera', cat: 'Lácteos', kcal: 61, prot: 3.2, carbs: 4.7, fat: 3.3 },
  { name: 'Leche desnatada', cat: 'Lácteos', kcal: 35, prot: 3.4, carbs: 5, fat: 0.1 },
  { name: 'Yogur natural', cat: 'Lácteos', kcal: 59, prot: 3.5, carbs: 4.7, fat: 3.3 },
  { name: 'Queso manchego', cat: 'Lácteos', kcal: 395, prot: 27, carbs: 0.5, fat: 32 },
  { name: 'Queso fresco', cat: 'Lácteos', kcal: 98, prot: 12, carbs: 3.3, fat: 4 },
  { name: 'Huevo (entero)', cat: 'Lácteos', kcal: 155, prot: 13, carbs: 1.1, fat: 11 },
  // Cereales y pan
  { name: 'Pan blanco', cat: 'Cereales', kcal: 265, prot: 8, carbs: 49, fat: 3.2 },
  { name: 'Pan integral', cat: 'Cereales', kcal: 247, prot: 9, carbs: 41, fat: 4.2 },
  { name: 'Arroz blanco (cocido)', cat: 'Cereales', kcal: 130, prot: 2.7, carbs: 28, fat: 0.3 },
  { name: 'Pasta (cocida)', cat: 'Cereales', kcal: 158, prot: 5.8, carbs: 31, fat: 0.9 },
  { name: 'Avena', cat: 'Cereales', kcal: 389, prot: 17, carbs: 66, fat: 7 },
  { name: 'Patata (cocida)', cat: 'Cereales', kcal: 87, prot: 1.9, carbs: 20, fat: 0.1 },
  // Frutas
  { name: 'Manzana', cat: 'Frutas', kcal: 52, prot: 0.3, carbs: 14, fat: 0.2 },
  { name: 'Naranja', cat: 'Frutas', kcal: 47, prot: 0.9, carbs: 12, fat: 0.1 },
  { name: 'Plátano', cat: 'Frutas', kcal: 89, prot: 1.1, carbs: 23, fat: 0.3 },
  { name: 'Fresas', cat: 'Frutas', kcal: 32, prot: 0.7, carbs: 8, fat: 0.3 },
  { name: 'Uvas', cat: 'Frutas', kcal: 69, prot: 0.7, carbs: 18, fat: 0.2 },
  { name: 'Sandía', cat: 'Frutas', kcal: 30, prot: 0.6, carbs: 8, fat: 0.2 },
  { name: 'Melocotón', cat: 'Frutas', kcal: 39, prot: 0.9, carbs: 10, fat: 0.3 },
  // Verduras
  { name: 'Tomate', cat: 'Verduras', kcal: 18, prot: 0.9, carbs: 3.9, fat: 0.2 },
  { name: 'Lechuga', cat: 'Verduras', kcal: 15, prot: 1.4, carbs: 2.9, fat: 0.2 },
  { name: 'Zanahoria', cat: 'Verduras', kcal: 41, prot: 0.9, carbs: 10, fat: 0.2 },
  { name: 'Brócoli', cat: 'Verduras', kcal: 34, prot: 2.8, carbs: 7, fat: 0.4 },
  { name: 'Espinacas', cat: 'Verduras', kcal: 23, prot: 2.9, carbs: 3.6, fat: 0.4 },
  { name: 'Cebolla', cat: 'Verduras', kcal: 40, prot: 1.1, carbs: 9.3, fat: 0.1 },
  { name: 'Pimiento rojo', cat: 'Verduras', kcal: 31, prot: 1, carbs: 6, fat: 0.3 },
  { name: 'Aguacate', cat: 'Verduras', kcal: 160, prot: 2, carbs: 9, fat: 15 },
  // Legumbres
  { name: 'Lentejas (cocidas)', cat: 'Legumbres', kcal: 116, prot: 9, carbs: 20, fat: 0.4 },
  { name: 'Garbanzos (cocidos)', cat: 'Legumbres', kcal: 164, prot: 8.9, carbs: 27, fat: 2.6 },
  { name: 'Judías blancas (cocidas)', cat: 'Legumbres', kcal: 127, prot: 8.7, carbs: 23, fat: 0.5 },
  // Frutos secos
  { name: 'Almendras', cat: 'Frutos secos', kcal: 579, prot: 21, carbs: 22, fat: 50 },
  { name: 'Nueces', cat: 'Frutos secos', kcal: 654, prot: 15, carbs: 14, fat: 65 },
  { name: 'Cacahuetes', cat: 'Frutos secos', kcal: 567, prot: 26, carbs: 16, fat: 49 },
  // Grasas y aceites
  { name: 'Aceite de oliva', cat: 'Grasas', kcal: 884, prot: 0, carbs: 0, fat: 100 },
  { name: 'Mantequilla', cat: 'Grasas', kcal: 717, prot: 0.9, carbs: 0.1, fat: 81 },
  // Dulces
  { name: 'Azúcar blanco', cat: 'Dulces', kcal: 387, prot: 0, carbs: 100, fat: 0 },
  { name: 'Chocolate negro (70%)', cat: 'Dulces', kcal: 598, prot: 8, carbs: 46, fat: 43 },
  { name: 'Galletas María', cat: 'Dulces', kcal: 430, prot: 7, carbs: 74, fat: 12 },
  // Bebidas
  { name: 'Cerveza (33cl)', cat: 'Bebidas', kcal: 139, prot: 1, carbs: 13, fat: 0 },
  { name: 'Vino tinto (100ml)', cat: 'Bebidas', kcal: 85, prot: 0.1, carbs: 2.6, fat: 0 },
  { name: 'Zumo de naranja', cat: 'Bebidas', kcal: 45, prot: 0.7, carbs: 10, fat: 0.2 },
  { name: 'Refresco cola (250ml)', cat: 'Bebidas', kcal: 105, prot: 0, carbs: 27, fat: 0 },
];

interface PlateItem { foodIdx: number; grams: string; }

export default function CalorieFoods() {
  const [search, setSearch] = useState('');
  const [plate, setPlate] = useState<PlateItem[]>([]);
  const [selectedCat, setSelectedCat] = useState('Todos');

  const cats = ['Todos', ...Array.from(new Set(FOODS.map(f => f.cat)))];

  const filtered = useMemo(() => FOODS.filter(f =>
    (selectedCat === 'Todos' || f.cat === selectedCat) &&
    f.name.toLowerCase().includes(search.toLowerCase())
  ), [search, selectedCat]);

  const addToPlate = (idx: number) => {
    const foodIdx = FOODS.indexOf(filtered[idx]);
    setPlate(prev => [...prev, { foodIdx, grams: '100' }]);
  };

  const totals = plate.reduce((acc, item) => {
    const f = FOODS[item.foodIdx];
    const g = parseFloat(item.grams) || 0;
    const ratio = g / 100;
    return {
      kcal: acc.kcal + f.kcal * ratio,
      prot: acc.prot + f.prot * ratio,
      carbs: acc.carbs + f.carbs * ratio,
      fat: acc.fat + f.fat * ratio,
    };
  }, { kcal: 0, prot: 0, carbs: 0, fat: 0 });

  const fmt1 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 1 });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar alimento..."
          className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      <div className="flex gap-1 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setSelectedCat(c)}
            className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${selectedCat === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="max-h-52 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {filtered.map((f, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800">
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">{f.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{f.kcal} kcal · P:{f.prot}g · C:{f.carbs}g · G:{f.fat}g <span className="text-gray-400">(por 100g)</span></div>
            </div>
            <button onClick={() => addToPlate(i)}
              className="ml-2 w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-200 flex-shrink-0 transition-colors">+</button>
          </div>
        ))}
        {filtered.length === 0 && <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">Sin resultados</div>}
      </div>

      {plate.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">🍽️ Mi plato</div>
          {plate.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
              <span className="flex-1 text-xs text-gray-900 dark:text-white truncate">{FOODS[item.foodIdx].name}</span>
              <input type="number" value={item.grams} onChange={e => setPlate(prev => prev.map((p, idx) => idx === i ? { ...p, grams: e.target.value } : p))}
                className="w-16 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-xs text-center text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none" />
              <span className="text-xs text-gray-400">g</span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 w-14 text-right">
                {fmt1(FOODS[item.foodIdx].kcal * (parseFloat(item.grams) || 0) / 100)} kcal
              </span>
              <button onClick={() => setPlate(prev => prev.filter((_, idx) => idx !== i))}
                className="text-red-400 hover:text-red-600 text-sm font-bold w-5 text-center">×</button>
            </div>
          ))}

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="text-center text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">{fmt1(totals.kcal)} kcal</div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              {[
                { label: '🥩 Proteínas', val: fmt1(totals.prot) + 'g' },
                { label: '🍞 Carbohidratos', val: fmt1(totals.carbs) + 'g' },
                { label: '🧈 Grasas', val: fmt1(totals.fat) + 'g' },
              ].map(r => (
                <div key={r.label} className="bg-white dark:bg-gray-700 rounded-xl p-2">
                  <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
