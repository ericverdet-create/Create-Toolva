'use client';
import { useState } from 'react';

interface Property {
  name: string;
  price: string;
  area: string;
}

export default function PrecioM2() {
  const [mode, setMode] = useState<'calc' | 'compare'>('calc');
  const [totalPrice, setTotalPrice] = useState('200000');
  const [area, setArea] = useState('80');
  const [targetM2, setTargetM2] = useState('');
  const [targetArea, setTargetArea] = useState('');

  const [properties, setProperties] = useState<Property[]>([
    { name: 'Piso A', price: '200000', area: '80' },
    { name: 'Piso B', price: '180000', area: '70' },
    { name: 'Piso C', price: '250000', area: '95' },
  ]);

  const price = parseFloat(totalPrice) || 0;
  const a = parseFloat(area) || 0;
  const priceM2 = a > 0 ? price / a : 0;

  const targetM2Val = parseFloat(targetM2) || 0;
  const targetAreaVal = parseFloat(targetArea) || 0;
  const totalFromM2 = targetM2Val * targetAreaVal;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
  const fmtM2 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €/m²';

  const propData = properties.map(p => ({
    ...p,
    priceVal: parseFloat(p.price) || 0,
    areaVal: parseFloat(p.area) || 0,
    m2Price: (parseFloat(p.area) || 0) > 0 ? (parseFloat(p.price) || 0) / (parseFloat(p.area) || 0) : 0,
  }));

  const minM2 = Math.min(...propData.filter(p => p.m2Price > 0).map(p => p.m2Price));

  const updateProp = (i: number, field: keyof Property, val: string) => {
    setProperties(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  return (
    <div className="space-y-4">
      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {([['calc', '🔢 Calcular precio/m²'], ['compare', '📊 Comparar propiedades']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setMode(key)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {label}
          </button>
        ))}
      </div>

      {mode === 'calc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio total (€)</label>
              <input type="number" value={totalPrice} onChange={e => setTotalPrice(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Superficie (m²)</label>
              <input type="number" value={area} onChange={e => setArea(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
          </div>

          {price > 0 && a > 0 && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmtM2(priceM2)}</div>
              <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">precio por metro cuadrado</div>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">🔄 Calcular precio total desde precio/m²</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio/m² (€)</label>
                <input type="number" value={targetM2} onChange={e => setTargetM2(e.target.value)} min="0" placeholder={priceM2 > 0 ? Math.round(priceM2).toString() : ''}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Superficie (m²)</label>
                <input type="number" value={targetArea} onChange={e => setTargetArea(e.target.value)} min="0" placeholder="90"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
              </div>
            </div>
            {totalFromM2 > 0 && (
              <div className="mt-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center">
                <div className="text-xl font-bold text-green-700 dark:text-green-300">{fmt(totalFromM2)}</div>
                <div className="text-xs text-green-600 dark:text-green-400">precio total estimado</div>
              </div>
            )}
          </div>
        </div>
      )}

      {mode === 'compare' && (
        <div className="space-y-3">
          {propData.map((p, i) => (
            <div key={i} className={`rounded-xl border p-3 space-y-2 ${p.m2Price === minM2 && p.m2Price > 0 ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
              <div className="flex items-center gap-2">
                <input value={p.name} onChange={e => updateProp(i, 'name', e.target.value)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                {p.m2Price === minM2 && p.m2Price > 0 && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">✓ Mejor precio</span>}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Precio (€)</label>
                  <input type="number" value={p.price} onChange={e => updateProp(i, 'price', e.target.value)} min="0"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">m²</label>
                  <input type="number" value={p.area} onChange={e => updateProp(i, 'area', e.target.value)} min="0"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">€/m²</label>
                  <div className={`rounded-lg px-2 py-1.5 text-sm font-bold text-center ${p.m2Price === minM2 && p.m2Price > 0 ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                    {p.m2Price > 0 ? Math.round(p.m2Price) : '—'}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setProperties(prev => [...prev, { name: `Piso ${prev.length + 1}`, price: '', area: '' }])}
            className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-sm text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors">
            + Añadir propiedad
          </button>
        </div>
      )}
    </div>
  );
}
