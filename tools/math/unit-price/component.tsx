'use client';
import { useState } from 'react';

type Unit = 'kg' | 'g' | 'l' | 'ml' | 'unidad';

interface Product { name: string; price: string; qty: string; unit: Unit; }

const UNITS: { key: Unit; label: string; toBase: number }[] = [
  { key: 'kg', label: 'kg', toBase: 1 },
  { key: 'g', label: 'g', toBase: 0.001 },
  { key: 'l', label: 'L', toBase: 1 },
  { key: 'ml', label: 'ml', toBase: 0.001 },
  { key: 'unidad', label: 'ud.', toBase: 1 },
];

const COLORS = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];

export default function UnitPrice() {
  const [products, setProducts] = useState<Product[]>([
    { name: 'Marca A', price: '2.49', qty: '1', unit: 'kg' },
    { name: 'Marca B', price: '1.89', qty: '750', unit: 'g' },
    { name: 'Oferta', price: '4.50', qty: '2', unit: 'kg' },
  ]);

  const updateP = (i: number, k: keyof Product, v: string) =>
    setProducts(p => p.map((row, idx) => idx === i ? { ...row, [k]: v } : row));
  const addProduct = () => setProducts(p => [...p, { name: `Opción ${p.length + 1}`, price: '1.00', qty: '1', unit: 'kg' }]);
  const removeP = (i: number) => setProducts(p => p.filter((_, idx) => idx !== i));

  const calcs = products.map(p => {
    const price = parseFloat(p.price) || 0;
    const qty = parseFloat(p.qty) || 1;
    const toBase = UNITS.find(u => u.key === p.unit)?.toBase || 1;
    const baseQty = qty * toBase;
    const pricePerBase = baseQty > 0 ? price / baseQty : Infinity;
    return { pricePerBase, baseQty };
  });

  const minPrice = Math.min(...calcs.map(c => c.pricePerBase).filter(p => isFinite(p)));
  const maxPrice = Math.max(...calcs.map(c => c.pricePerBase).filter(p => isFinite(p)));

  const baseUnitLabel = products[0]?.unit === 'g' || products[0]?.unit === 'kg' ? 'kg' : products[0]?.unit === 'ml' || products[0]?.unit === 'l' ? 'L' : 'ud.';

  const selectClass = "border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {products.map((p, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${COLORS[i % COLORS.length]}`} />
              <input value={p.name} onChange={e => updateP(i, 'name', e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              <button onClick={() => removeP(i)} disabled={products.length <= 2} className="text-gray-400 hover:text-red-500 disabled:opacity-30 text-lg">×</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Precio (€)</div>
                <input type="number" value={p.price} onChange={e => updateP(i, 'price', e.target.value)} min="0" step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Cantidad</div>
                <input type="number" value={p.qty} onChange={e => updateP(i, 'qty', e.target.value)} min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
              </div>
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Unidad</div>
                <select value={p.unit} onChange={e => updateP(i, 'unit', e.target.value as Unit)} className={`${selectClass} w-full`}>
                  {UNITS.map(u => <option key={u.key} value={u.key}>{u.label}</option>)}
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addProduct} className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          + Añadir producto
        </button>
      </div>

      <div className="space-y-2">
        {products.map((p, i) => {
          const { pricePerBase } = calcs[i];
          const isBest = pricePerBase === minPrice;
          const isWorst = pricePerBase === maxPrice && maxPrice !== minPrice;
          const savingPct = maxPrice > 0 && isFinite(pricePerBase) ? ((maxPrice - pricePerBase) / maxPrice * 100) : 0;
          const barW = maxPrice > 0 && isFinite(pricePerBase) ? (pricePerBase / maxPrice * 100) : 0;
          return (
            <div key={i} className={`rounded-xl p-3 ${isBest ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-400' : 'bg-gray-50 dark:bg-gray-800'}`}>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${COLORS[i % COLORS.length]}`} />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</span>
                  {isBest && <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">✓ Mejor precio</span>}
                </div>
                <span className={`font-bold ${isBest ? 'text-green-600' : isWorst ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                  {isFinite(pricePerBase) ? `${pricePerBase.toFixed(2)} €/${baseUnitLabel}` : '—'}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isBest ? 'bg-green-500' : isWorst ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${barW}%` }} />
              </div>
              {isBest && savingPct > 0 && (
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">Ahorra un {savingPct.toFixed(0)}% vs el más caro</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
