'use client';
import { useState } from 'react';

export default function DescuentoAcumulado() {
  const [precio, setPrecio] = useState('100');
  const [descuentos, setDescuentos] = useState<string[]>(['20', '10', '5']);

  const addDescuento = () => setDescuentos(prev => [...prev, '']);
  const removeDescuento = (i: number) => setDescuentos(prev => prev.filter((_, idx) => idx !== i));
  const updateDescuento = (i: number, val: string) => setDescuentos(prev => prev.map((d, idx) => idx === i ? val : d));

  const base = parseFloat(precio) || 0;
  const validDescuentos = descuentos.map(d => parseFloat(d) || 0).filter(d => d > 0);

  let precioActual = base;
  const steps: { descuento: number; ahorro: number; precio: number }[] = [];
  for (const d of validDescuentos) {
    const ahorro = precioActual * (d / 100);
    precioActual -= ahorro;
    steps.push({ descuento: d, ahorro, precio: precioActual });
  }

  const precioFinal = precioActual;
  const ahorroTotal = base - precioFinal;
  const descuentoEquivalente = base > 0 ? (ahorroTotal / base) * 100 : 0;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt1 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio original (€)</label>
        <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} min="0"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Descuentos consecutivos</div>
        {descuentos.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
            <input type="number" value={d} onChange={e => updateDescuento(i, e.target.value)} min="0" max="100" placeholder="0"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="text-sm text-gray-500">%</span>
            {descuentos.length > 1 && (
              <button onClick={() => removeDescuento(i)} className="text-red-400 hover:text-red-600 font-bold text-lg w-6 text-center">×</button>
            )}
          </div>
        ))}
        {descuentos.length < 6 && (
          <button onClick={addDescuento}
            className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-colors">
            + Añadir descuento
          </button>
        )}
      </div>

      {steps.length > 0 && base > 0 && (
        <>
          <div className="space-y-1">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center justify-between text-xs px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">Descuento {i + 1}: -{s.descuento}%</span>
                <span className="text-red-500">-{fmt(s.ahorro)} €</span>
                <span className="font-medium text-gray-900 dark:text-white">{fmt(s.precio)} €</span>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(precioFinal)} €</div>
            <div className="text-center text-sm text-indigo-600 dark:text-indigo-400">precio final</div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-center text-xs">
              <div className="bg-white dark:bg-gray-700 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">Ahorro total</div>
                <div className="font-bold text-green-600 dark:text-green-400">{fmt(ahorroTotal)} €</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">Descuento equivalente</div>
                <div className="font-bold text-gray-900 dark:text-white">{fmt1(descuentoEquivalente)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Los descuentos acumulados no se suman: un 20% + 10% no es un 30%, sino un {fmt1(descuentoEquivalente)}% equivalente.
          </div>
        </>
      )}
    </div>
  );
}
