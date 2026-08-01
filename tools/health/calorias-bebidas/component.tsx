'use client';
import { useState } from 'react';

const BEBIDAS = [
  { nombre: 'Agua', cal100: 0, cat: '💧 Sin calorías' },
  { nombre: 'Agua con gas', cal100: 0, cat: '💧 Sin calorías' },
  { nombre: 'Té sin azúcar', cal100: 1, cat: '💧 Sin calorías' },
  { nombre: 'Café solo', cal100: 2, cat: '💧 Sin calorías' },
  { nombre: 'Café con leche (100ml leche)', cal100: 47, cat: '☕ Cafés' },
  { nombre: 'Cappuccino', cal100: 40, cat: '☕ Cafés' },
  { nombre: 'Latte grande (400ml)', cal100: 50, cat: '☕ Cafés' },
  { nombre: 'Coca-Cola', cal100: 42, cat: '🥤 Refrescos' },
  { nombre: 'Coca-Cola Zero', cal100: 1, cat: '🥤 Refrescos' },
  { nombre: 'Fanta Naranja', cal100: 46, cat: '🥤 Refrescos' },
  { nombre: 'Red Bull (250ml)', cal100: 45, cat: '🥤 Refrescos' },
  { nombre: 'Zumo naranja natural', cal100: 45, cat: '🍊 Zumos' },
  { nombre: 'Zumo manzana industrial', cal100: 46, cat: '🍊 Zumos' },
  { nombre: 'Zumo de piña', cal100: 51, cat: '🍊 Zumos' },
  { nombre: 'Batido de chocolate', cal100: 83, cat: '🥛 Lácteos' },
  { nombre: 'Leche entera', cal100: 65, cat: '🥛 Lácteos' },
  { nombre: 'Leche desnatada', cal100: 35, cat: '🥛 Lácteos' },
  { nombre: 'Yogur líquido', cal100: 60, cat: '🥛 Lácteos' },
  { nombre: 'Cerveza (5%)', cal100: 43, cat: '🍺 Alcohol' },
  { nombre: 'Cerveza sin alcohol', cal100: 17, cat: '🍺 Alcohol' },
  { nombre: 'Vino tinto', cal100: 85, cat: '🍷 Alcohol' },
  { nombre: 'Vino blanco', cal100: 77, cat: '🍷 Alcohol' },
  { nombre: 'Cava / Champán', cal100: 76, cat: '🍷 Alcohol' },
  { nombre: 'Whisky / Ron / Vodka', cal100: 231, cat: '🥃 Alcohol fuerte' },
  { nombre: 'Gin Tonic (250ml)', cal100: 60, cat: '🥃 Alcohol fuerte' },
  { nombre: 'Mojito (250ml)', cal100: 55, cat: '🥃 Alcohol fuerte' },
  { nombre: 'Horchata', cal100: 68, cat: '🥤 Otros' },
  { nombre: 'Bebida de soja', cal100: 33, cat: '🥤 Otros' },
  { nombre: 'Bebida de avena', cal100: 45, cat: '🥤 Otros' },
  { nombre: 'Smoothie de frutas', cal100: 70, cat: '🥤 Otros' },
];

interface Seleccion { nombre: string; cal100: number; ml: number; }

const ML_COMUNES = [100, 150, 200, 250, 330, 400, 500];

export default function CaloriasBebidas() {
  const [seleccion, setSeleccion] = useState<Seleccion[]>([]);
  const [catFiltro, setCatFiltro] = useState('');

  const CATS = [...new Set(BEBIDAS.map(b => b.cat))];

  const addBebida = (b: typeof BEBIDAS[0]) => {
    if (!seleccion.find(s => s.nombre === b.nombre)) {
      setSeleccion(s => [...s, { nombre: b.nombre, cal100: b.cal100, ml: 200 }]);
    }
  };

  const remove = (nombre: string) => setSeleccion(s => s.filter(x => x.nombre !== nombre));
  const updateMl = (nombre: string, ml: number) => setSeleccion(s => s.map(x => x.nombre === nombre ? { ...x, ml } : x));

  const totalCal = seleccion.reduce((acc, s) => acc + Math.round(s.cal100 * s.ml / 100), 0);
  const totalMl = seleccion.reduce((acc, s) => acc + s.ml, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 flex-wrap">
        <button onClick={() => setCatFiltro('')} className={`px-2 py-0.5 rounded-full text-xs ${!catFiltro ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>Todas</button>
        {CATS.map(c => <button key={c} onClick={() => setCatFiltro(c)} className={`px-2 py-0.5 rounded-full text-xs ${catFiltro === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>{c}</button>)}
      </div>

      <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
        {BEBIDAS.filter(b => !catFiltro || b.cat === catFiltro).map(b => {
          const added = seleccion.find(s => s.nombre === b.nombre);
          return (
            <button key={b.nombre} onClick={() => added ? remove(b.nombre) : addBebida(b)}
              className={`text-left px-2.5 py-2 rounded-xl text-xs border transition-colors ${added ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}>
              <div className="font-medium text-gray-700 dark:text-gray-300">{b.nombre}</div>
              <div className="text-gray-400">{b.cal100} kcal/100ml</div>
            </button>
          );
        })}
      </div>

      {seleccion.length > 0 && (
        <div className="space-y-3">
          {seleccion.map(s => {
            const cals = Math.round(s.cal100 * s.ml / 100);
            return (
              <div key={s.nombre} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{s.nombre}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{cals} kcal</span>
                    <button onClick={() => remove(s.nombre)} className="text-gray-400 hover:text-red-500 text-sm">×</button>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {ML_COMUNES.map(ml => (
                    <button key={ml} onClick={() => updateMl(s.nombre, ml)}
                      className={`px-2 py-0.5 rounded-lg text-xs ${s.ml === ml ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                      {ml}ml
                    </button>
                  ))}
                  <input type="number" value={s.ml} onChange={e => updateMl(s.nombre, parseInt(e.target.value) || 100)}
                    className="w-16 border border-gray-200 dark:border-gray-600 rounded-lg px-1 py-0.5 text-xs text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none" />
                </div>
              </div>
            );
          })}
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: 'Total ml', val: totalMl + ' ml' },
              { label: 'Total kcal', val: totalCal + ' kcal' },
              { label: '% obj. diario', val: Math.round(totalCal / 2000 * 100) + '%' },
            ].map(r => (
              <div key={r.label} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-2">
                <div className="text-xs text-indigo-500 dark:text-indigo-400">{r.label}</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">{r.val}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center">Objetivo diario estimado: 2000 kcal</div>
        </div>
      )}
    </div>
  );
}
