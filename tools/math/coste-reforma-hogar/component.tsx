'use client';
import { useState } from 'react';

const PARTIDAS = [
  { cat: '🛁 Baño', items: [
    { name: 'Baño completo (5-7m²)', min: 4000, max: 12000, unit: 'ud' },
    { name: 'Baño con ducha plato', min: 2500, max: 6000, unit: 'ud' },
    { name: 'Alicatado baño (por m²)', min: 30, max: 80, unit: 'm²' },
    { name: 'Sanitarios (wc + lavabo)', min: 400, max: 1500, unit: 'ud' },
  ]},
  { cat: '🍳 Cocina', items: [
    { name: 'Cocina completa (muebles + electrodomésticos)', min: 5000, max: 20000, unit: 'ud' },
    { name: 'Solo muebles cocina', min: 2000, max: 8000, unit: 'ud' },
    { name: 'Encimera (por m.l.)', min: 100, max: 400, unit: 'm²' },
    { name: 'Alicatado cocina (por m²)', min: 25, max: 70, unit: 'm²' },
  ]},
  { cat: '🪟 Suelos y paredes', items: [
    { name: 'Parquet/tarima flotante (por m²)', min: 20, max: 60, unit: 'm²' },
    { name: 'Suelo porcelánico (por m²)', min: 25, max: 70, unit: 'm²' },
    { name: 'Pintura completa piso (por m²)', min: 8, max: 20, unit: 'm²' },
    { name: 'Demolición suelo antiguo (por m²)', min: 5, max: 15, unit: 'm²' },
  ]},
  { cat: '⚡ Instalaciones', items: [
    { name: 'Instalación eléctrica (piso 80m²)', min: 2000, max: 5000, unit: 'ud' },
    { name: 'Fontanería general (piso 80m²)', min: 1500, max: 4000, unit: 'ud' },
    { name: 'Calefacción (radiadores)', min: 3000, max: 8000, unit: 'ud' },
    { name: 'Aire acondicionado (split + instalación)', min: 800, max: 2000, unit: 'ud' },
  ]},
  { cat: '🚪 Carpintería', items: [
    { name: 'Puerta interior (por ud)', min: 200, max: 600, unit: 'ud' },
    { name: 'Armario empotrado (por m²)', min: 300, max: 800, unit: 'm²' },
    { name: 'Ventana PVC doble cristal (por ud)', min: 300, max: 800, unit: 'ud' },
    { name: 'Puerta entrada blindada', min: 600, max: 2000, unit: 'ud' },
  ]},
];

interface Partida { name: string; cantidad: number; calidad: 'bajo' | 'medio' | 'alto'; min: number; max: number; }

export default function CosteReformaHogar() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [iva, setIva] = useState(true);
  const [superficiePiso, setSuperficiePiso] = useState('80');

  const addPartida = (item: typeof PARTIDAS[0]['items'][0]) => {
    const existe = partidas.find(p => p.name === item.name);
    if (!existe) {
      setPartidas(p => [...p, { name: item.name, cantidad: 1, calidad: 'medio', min: item.min, max: item.max }]);
    }
  };

  const removePartida = (name: string) => setPartidas(p => p.filter(x => x.name !== name));
  const updatePartida = (name: string, field: 'cantidad' | 'calidad', val: any) =>
    setPartidas(p => p.map(x => x.name === name ? { ...x, [field]: val } : x));

  const getCoste = (p: Partida) => {
    const factor = p.calidad === 'bajo' ? p.min : p.calidad === 'alto' ? p.max : (p.min + p.max) / 2;
    return factor * p.cantidad;
  };

  const total = partidas.reduce((acc, p) => acc + getCoste(p), 0);
  const totalIva = iva ? total * 1.21 : total;

  const fmt = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Superficie vivienda (m²)</label>
          <input type="number" value={superficiePiso} onChange={e => setSuperficiePiso(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div className="flex items-end">
          <button onClick={() => setIva(!iva)} className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${iva ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {iva ? '✅ IVA incluido (21%)' : '⬜ Sin IVA'}
          </button>
        </div>
      </div>

      {PARTIDAS.map(cat => (
        <div key={cat.cat}>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">{cat.cat}</div>
          <div className="grid grid-cols-1 gap-1">
            {cat.items.map(item => {
              const added = partidas.find(p => p.name === item.name);
              return (
                <button key={item.name} onClick={() => added ? removePartida(item.name) : addPartida(item)}
                  className={`text-left px-3 py-2 rounded-xl text-xs transition-colors border ${added ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'}`}>
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-2 text-gray-400">{fmt(item.min)}–{fmt(item.max)}</span>
                  {added && <span className="ml-2 text-indigo-500">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {partidas.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">Partidas seleccionadas</div>
          {partidas.map(p => (
            <div key={p.name} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2">
              <div className="flex justify-between items-start">
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1">{p.name}</div>
                <button onClick={() => removePartida(p.name)} className="text-gray-400 hover:text-red-500 ml-2 text-sm">×</button>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                  <button onClick={() => updatePartida(p.name, 'cantidad', Math.max(1, p.cantidad - 1))} className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-xs font-bold">−</button>
                  <span className="text-xs w-6 text-center font-medium">{p.cantidad}</span>
                  <button onClick={() => updatePartida(p.name, 'cantidad', p.cantidad + 1)} className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-xs font-bold">+</button>
                </div>
                <div className="flex gap-1 flex-1">
                  {(['bajo', 'medio', 'alto'] as const).map(q => (
                    <button key={q} onClick={() => updatePartida(p.name, 'calidad', q)}
                      className={`flex-1 py-0.5 rounded text-xs capitalize ${p.calidad === q ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                      {q}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{fmt(getCoste(p))}</div>
              </div>
            </div>
          ))}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="flex justify-between text-sm text-indigo-600 dark:text-indigo-400">
              <span>Subtotal</span><span>{fmt(total)}</span>
            </div>
            {iva && <div className="flex justify-between text-xs text-indigo-400 dark:text-indigo-500 mt-1"><span>IVA (21%)</span><span>{fmt(total * 0.21)}</span></div>}
            <div className="flex justify-between text-lg font-bold text-indigo-700 dark:text-indigo-300 mt-2 pt-2 border-t border-indigo-200 dark:border-indigo-700">
              <span>TOTAL</span><span>{fmt(totalIva)}</span>
            </div>
            <div className="text-xs text-indigo-400 dark:text-indigo-500 mt-1">{fmt(totalIva / parseInt(superficiePiso || '80'))} por m²</div>
          </div>
          <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
            💡 Precios orientativos. El coste final depende de materiales, zona geográfica y empresa contratada. Solicita siempre 3 presupuestos.
          </div>
        </div>
      )}
    </div>
  );
}
