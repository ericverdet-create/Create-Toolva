'use client';
import { useState } from 'react';

const CATEGORIAS = [
  { label: '📱 Tecnología (móviles, tablets)', depAnual: 35 },
  { label: '💻 Ordenadores/portátiles', depAnual: 30 },
  { label: '📷 Cámaras / óptica', depAnual: 20 },
  { label: '🎮 Videojuegos / consolas', depAnual: 25 },
  { label: '🛋️ Muebles y decoración', depAnual: 15 },
  { label: '👕 Ropa y complementos', depAnual: 40 },
  { label: '🚲 Bicicletas / deporte', depAnual: 20 },
  { label: '🧸 Juguetes / bebé', depAnual: 30 },
  { label: '📚 Libros / música', depAnual: 20 },
  { label: '🔧 Herramientas', depAnual: 15 },
  { label: '🏠 Electrodomésticos', depAnual: 20 },
  { label: '🚗 Accesorios de coche', depAnual: 25 },
];

const ESTADOS = [
  { label: '✨ Nuevo sin usar (con caja)', factor: 0.85 },
  { label: '🟢 Como nuevo (10/10)', factor: 0.75 },
  { label: '🟡 Muy buen estado (8/10)', factor: 0.60 },
  { label: '🟠 Buen estado (6/10)', factor: 0.45 },
  { label: '🔴 Aceptable (4/10)', factor: 0.30 },
  { label: '⚠️ Con defectos visibles', factor: 0.20 },
];

const EXTRAS = [
  { label: 'Incluye caja original', valor: 0.05 },
  { label: 'Incluye accesorios originales', valor: 0.05 },
  { label: 'Tiene factura/garantía', valor: 0.07 },
  { label: 'Tiene funda/protector', valor: 0.02 },
  { label: 'Primera mano (1 solo dueño)', valor: 0.03 },
];

export default function CalculadoraSegundaMano() {
  const [precioOriginal, setPrecioOriginal] = useState('300');
  const [meses, setMeses] = useState('18');
  const [catIdx, setCatIdx] = useState(0);
  const [estadoIdx, setEstadoIdx] = useState(2);
  const [extras, setExtras] = useState<boolean[]>(new Array(EXTRAS.length).fill(false));

  const precioBase = parseFloat(precioOriginal) || 0;
  const mesesUso = parseInt(meses) || 0;
  const cat = CATEGORIAS[catIdx];
  const estado = ESTADOS[estadoIdx];

  // Depreciación por tiempo
  const depTime = cat.depAnual / 100 / 12 * mesesUso;
  const factorTiempo = Math.max(0.05, 1 - Math.min(depTime, 0.9));

  // Factor estado
  const factorEstado = estado.factor;

  // Factor extras
  const factorExtras = extras.reduce((acc, e, i) => e ? acc + EXTRAS[i].valor : acc, 0);

  const precioFinal = precioBase * factorTiempo * factorEstado * (1 + factorExtras);
  const precioMin = precioFinal * 0.85;
  const precioMax = precioFinal * 1.15;

  const fmt = (n: number) => Math.round(n).toLocaleString('es-ES') + ' €';
  const pct = (n: number) => Math.round((1 - n) * 100) + '%';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio nuevo</label>
          <div className="relative">
            <input type="number" value={precioOriginal} onChange={e => setPrecioOriginal(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Meses de uso</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setMeses(m => String(Math.max(0, parseInt(m) - 1)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-sm">−</button>
            <input type="number" value={meses} onChange={e => setMeses(e.target.value)} min="0"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:outline-none" />
            <button onClick={() => setMeses(m => String(parseInt(m) + 1))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-sm">+</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Categoría</label>
        <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
          {CATEGORIAS.map((c, i) => (
            <button key={i} onClick={() => setCatIdx(i)}
              className={`text-left text-xs px-2.5 py-2 rounded-xl border transition-colors ${catIdx === i ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Estado del artículo</label>
        <div className="space-y-1">
          {ESTADOS.map((e, i) => (
            <button key={i} onClick={() => setEstadoIdx(i)}
              className={`w-full text-left text-xs px-3 py-2 rounded-xl border transition-colors ${estadoIdx === i ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Extras que incluye</label>
        <div className="grid grid-cols-1 gap-1">
          {EXTRAS.map((e, i) => (
            <button key={i} onClick={() => setExtras(ex => ex.map((x, j) => j === i ? !x : x))}
              className={`text-left text-xs px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-2 ${extras[i] ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'}`}>
              <span>{extras[i] ? '✅' : '⬜'}</span> {e.label} (+{e.valor * 100}%)
            </button>
          ))}
        </div>
      </div>

      {precioBase > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 space-y-3">
          <div className="text-center">
            <div className="text-xs text-indigo-500 dark:text-indigo-400">Precio recomendado</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(precioFinal)}</div>
            <div className="text-xs text-indigo-400">Rango: {fmt(precioMin)} – {fmt(precioMax)}</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-400">Precio nuevo</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmt(precioBase)}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-400">Depreciación total</div>
              <div className="font-bold text-red-500">{fmt(precioBase - precioFinal)} ({pct(precioFinal / precioBase)})</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
