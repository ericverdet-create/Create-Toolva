'use client';
import { useState } from 'react';

interface Ingrediente { nombre: string; cantidad: string; unidad: string; }

const RECETAS_EJEMPLO = [
  { nombre: '🍰 Bizcocho', raciones: 8, ingredientes: [
    { nombre: 'Harina', cantidad: '200', unidad: 'g' },
    { nombre: 'Azúcar', cantidad: '150', unidad: 'g' },
    { nombre: 'Mantequilla', cantidad: '100', unidad: 'g' },
    { nombre: 'Huevos', cantidad: '3', unidad: 'uds' },
    { nombre: 'Leche', cantidad: '100', unidad: 'ml' },
    { nombre: 'Levadura', cantidad: '1', unidad: 'sobre' },
  ]},
  { nombre: '🍝 Pasta boloñesa', raciones: 4, ingredientes: [
    { nombre: 'Pasta', cantidad: '400', unidad: 'g' },
    { nombre: 'Carne picada', cantidad: '500', unidad: 'g' },
    { nombre: 'Tomate triturado', cantidad: '400', unidad: 'g' },
    { nombre: 'Cebolla', cantidad: '1', unidad: 'uds' },
    { nombre: 'Ajo', cantidad: '2', unidad: 'dientes' },
    { nombre: 'Aceite de oliva', cantidad: '3', unidad: 'cucharadas' },
  ]},
  { nombre: '🥞 Tortitas', raciones: 2, ingredientes: [
    { nombre: 'Harina', cantidad: '150', unidad: 'g' },
    { nombre: 'Leche', cantidad: '200', unidad: 'ml' },
    { nombre: 'Huevo', cantidad: '1', unidad: 'uds' },
    { nombre: 'Azúcar', cantidad: '2', unidad: 'cucharadas' },
    { nombre: 'Mantequilla', cantidad: '20', unidad: 'g' },
  ]},
];

const UNIDADES = ['g', 'kg', 'ml', 'L', 'uds', 'cucharadas', 'cucharaditas', 'tazas', 'sobre', 'dientes', 'puñado', ''];

export default function EscalarReceta() {
  const [racionesOriginal, setRacionesOriginal] = useState('4');
  const [racionesNuevo, setRacionesNuevo] = useState('6');
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { nombre: 'Ingrediente 1', cantidad: '200', unidad: 'g' },
    { nombre: 'Ingrediente 2', cantidad: '3', unidad: 'uds' },
  ]);

  const factor = (parseFloat(racionesNuevo) || 1) / (parseFloat(racionesOriginal) || 1);

  const escalar = (cantidad: string): string => {
    const n = parseFloat(cantidad);
    if (isNaN(n)) return cantidad;
    const resultado = n * factor;
    if (resultado % 1 === 0) return String(resultado);
    return resultado.toFixed(resultado < 1 ? 2 : 1);
  };

  const addIngrediente = () => setIngredientes(p => [...p, { nombre: '', cantidad: '', unidad: 'g' }]);
  const removeIngrediente = (i: number) => setIngredientes(p => p.filter((_, j) => j !== i));
  const updateIngrediente = (i: number, field: keyof Ingrediente, val: string) =>
    setIngredientes(p => p.map((x, j) => j === i ? { ...x, [field]: val } : x));

  const loadReceta = (r: typeof RECETAS_EJEMPLO[0]) => {
    setIngredientes(r.ingredientes);
    setRacionesOriginal(String(r.raciones));
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Recetas de ejemplo</div>
        <div className="flex gap-1.5 flex-wrap">
          {RECETAS_EJEMPLO.map(r => (
            <button key={r.nombre} onClick={() => loadReceta(r)}
              className="px-2.5 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
              {r.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Raciones originales</label>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setRacionesOriginal(p => String(Math.max(1, parseInt(p) - 1)))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">−</button>
            <input type="number" value={racionesOriginal} onChange={e => setRacionesOriginal(e.target.value)} min="1"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none" />
            <button onClick={() => setRacionesOriginal(p => String(parseInt(p) + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">+</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Raciones deseadas</label>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setRacionesNuevo(p => String(Math.max(1, parseInt(p) - 1)))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">−</button>
            <input type="number" value={racionesNuevo} onChange={e => setRacionesNuevo(e.target.value)} min="1"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:ring-1 focus:ring-indigo-400 focus:outline-none" />
            <button onClick={() => setRacionesNuevo(p => String(parseInt(p) + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">+</button>
          </div>
        </div>
      </div>

      {factor !== 1 && (
        <div className="text-center text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg py-1.5">
          Factor: ×{factor.toFixed(2)} — {factor > 1 ? `multiplicando ×${factor.toFixed(1)}` : `dividiendo ÷${(1/factor).toFixed(1)}`}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Ingredientes</div>
          <button onClick={addIngrediente} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline">+ Añadir</button>
        </div>
        {ingredientes.map((ing, i) => (
          <div key={i} className="grid grid-cols-[1fr_80px_80px_28px] gap-1.5 items-center">
            <input value={ing.nombre} onChange={e => updateIngrediente(i, 'nombre', e.target.value)} placeholder="Ingrediente"
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400" />
            <input type="number" value={ing.cantidad} onChange={e => updateIngrediente(i, 'cantidad', e.target.value)} placeholder="Cant."
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs text-center focus:outline-none focus:ring-1 focus:ring-indigo-400" />
            <select value={ing.unidad} onChange={e => updateIngrediente(i, 'unidad', e.target.value)}
              className="border border-gray-200 dark:border-gray-600 rounded-lg px-1 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none">
              {UNIDADES.map(u => <option key={u} value={u}>{u || '—'}</option>)}
            </select>
            <button onClick={() => removeIngrediente(i)} className="text-gray-400 hover:text-red-500 text-sm">×</button>
          </div>
        ))}
      </div>

      {ingredientes.some(i => i.cantidad) && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl overflow-hidden">
          <div className="px-3 py-2 text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40">
            ✅ Receta para {racionesNuevo} raciones
          </div>
          <div className="divide-y divide-green-100 dark:divide-green-900">
            {ingredientes.filter(i => i.nombre || i.cantidad).map((ing, i) => (
              <div key={i} className="flex justify-between px-3 py-2 text-xs">
                <span className="text-gray-700 dark:text-gray-300">{ing.nombre || `Ingrediente ${i+1}`}</span>
                <span className="font-bold text-green-700 dark:text-green-300">{escalar(ing.cantidad)} {ing.unidad}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
