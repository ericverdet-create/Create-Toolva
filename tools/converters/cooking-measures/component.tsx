'use client';
import { useState } from 'react';

// Base unit: ml for liquids, grams for solids
const LIQUID_UNITS: { label: string; ml: number }[] = [
  { label: 'ml', ml: 1 },
  { label: 'L', ml: 1000 },
  { label: 'cl', ml: 10 },
  { label: 'dl', ml: 100 },
  { label: 'Taza (250ml)', ml: 250 },
  { label: 'Taza americana (240ml)', ml: 240 },
  { label: 'Cucharada (15ml)', ml: 15 },
  { label: 'Cucharadita (5ml)', ml: 5 },
  { label: 'Onza fl. (oz)', ml: 29.5735 },
  { label: 'Pinta UK (568ml)', ml: 568.261 },
  { label: 'Pinta US (473ml)', ml: 473.176 },
];

// Densities (g/ml) for common ingredients
const INGREDIENTS: { label: string; density: number }[] = [
  { label: 'Agua', density: 1.0 },
  { label: 'Aceite vegetal', density: 0.92 },
  { label: 'Aceite de oliva', density: 0.91 },
  { label: 'Leche', density: 1.03 },
  { label: 'Miel', density: 1.4 },
  { label: 'Harina de trigo', density: 0.57 },
  { label: 'Azúcar blanco', density: 0.85 },
  { label: 'Azúcar moreno', density: 0.72 },
  { label: 'Sal fina', density: 1.2 },
  { label: 'Arroz (crudo)', density: 0.85 },
  { label: 'Mantequilla', density: 0.91 },
  { label: 'Cacao en polvo', density: 0.5 },
  { label: 'Maicena', density: 0.6 },
  { label: 'Levadura seca', density: 0.85 },
];

export default function CookingMeasures() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(4); // Taza 250ml
  const [ingredient, setIngredient] = useState(0);

  const val = parseFloat(value) || 0;
  const ml = val * LIQUID_UNITS[fromUnit].ml;
  const grams = ml * INGREDIENTS[ingredient].density;

  const fmt = (n: number, dec = 1) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cantidad</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} min="0" step="0.25"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Unidad</label>
          <select value={fromUnit} onChange={e => setFromUnit(parseInt(e.target.value))}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {LIQUID_UNITS.map((u, i) => <option key={i} value={i}>{u.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ingrediente (para conversión en gramos)</label>
        <select value={ingredient} onChange={e => setIngredient(parseInt(e.target.value))}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
          {INGREDIENTS.map((ing, i) => <option key={i} value={i}>{ing.label}</option>)}
        </select>
      </div>

      {val > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(ml, 1)} ml</div>
            <div className="text-sm text-indigo-600 dark:text-indigo-400">{fmt(grams, 1)} g de {INGREDIENTS[ingredient].label}</div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            {LIQUID_UNITS.filter((_, i) => i !== fromUnit).map((u, i) => {
              const converted = ml / u.ml;
              return (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400 text-xs">{u.label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{fmt(converted, 2)}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
            📝 Densidad usada: {INGREDIENTS[ingredient].density} g/ml para {INGREDIENTS[ingredient].label}. Los valores son aproximados.
          </div>
        </div>
      )}
    </div>
  );
}
