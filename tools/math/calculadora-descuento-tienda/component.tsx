'use client';
import { useState } from 'react';

type Modo = 'aplicar' | 'inverso' | 'comparar';

export default function DescuentoTienda() {
  const [modo, setModo] = useState<Modo>('aplicar');
  // Modo aplicar
  const [precioOriginal, setPrecioOriginal] = useState('49.99');
  const [descuento, setDescuento] = useState('20');
  // Modo inverso
  const [precioFinal, setPrecioFinal] = useState('39.99');
  const [precioAntes, setPrecioAntes] = useState('49.99');
  // Modo comparar
  const [items, setItems] = useState([
    { nombre: 'Producto A', precio: '120', desc: '10' },
    { nombre: 'Producto B', precio: '90', desc: '5' },
    { nombre: 'Producto C', precio: '150', desc: '20' },
  ]);

  const DESCUENTOS_RAPIDOS = [5, 10, 15, 20, 25, 30, 40, 50];

  const fmtE = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  // Modo aplicar
  const po = parseFloat(precioOriginal) || 0;
  const d = parseFloat(descuento) || 0;
  const ahorro = po * d / 100;
  const pFinal = po - ahorro;

  // Modo inverso
  const pf = parseFloat(precioFinal) || 0;
  const pa = parseFloat(precioAntes) || 0;
  const pctInverso = pa > 0 ? ((pa - pf) / pa * 100) : 0;
  const ahorroInverso = pa - pf;

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {[['aplicar', '💰 Aplicar descuento'], ['inverso', '🔍 ¿Qué % es?'], ['comparar', '📊 Comparar']].map(([v, l]) => (
          <button key={v} onClick={() => setModo(v as Modo)}
            className={`flex-1 py-2 rounded-xl text-xs font-medium ${modo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
        ))}
      </div>

      {modo === 'aplicar' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio original</label>
              <div className="relative">
                <input type="number" value={precioOriginal} onChange={e => setPrecioOriginal(e.target.value)} min="0" step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">% Descuento</label>
              <div className="relative">
                <input type="number" value={descuento} onChange={e => setDescuento(e.target.value)} min="0" max="100"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DESCUENTOS_RAPIDOS.map(p => (
              <button key={p} onClick={() => setDescuento(String(p))}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${descuento === String(p) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>−{p}%</button>
            ))}
          </div>
          {po > 0 && d > 0 && (
            <div className="space-y-2">
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-green-600 dark:text-green-400">Precio con {d}% de descuento</div>
                <div className="text-4xl font-bold text-green-700 dark:text-green-300">{fmtE(pFinal)}</div>
                <div className="text-sm text-green-600 dark:text-green-400">Ahorras {fmtE(ahorro)}</div>
              </div>
              <div className="flex items-center gap-3 justify-center text-xs text-gray-500 dark:text-gray-400">
                <span className="line-through">{fmtE(po)}</span>
                <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">−{d}%</span>
                <span className="font-bold text-gray-900 dark:text-white">{fmtE(pFinal)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {modo === 'inverso' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[{ label: 'Precio original', v: precioAntes, set: setPrecioAntes }, { label: 'Precio con descuento', v: precioFinal, set: setPrecioFinal }].map(f => (
              <div key={f.label}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
                <div className="relative">
                  <input type="number" value={f.v} onChange={e => f.set(e.target.value)} min="0" step="0.01"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                </div>
              </div>
            ))}
          </div>
          {pa > 0 && pf > 0 && pa > pf && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
              <div className="text-xs text-indigo-600 dark:text-indigo-400">El descuento aplicado fue de</div>
              <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-300">{pctInverso.toFixed(1)}%</div>
              <div className="text-sm text-indigo-500 dark:text-indigo-400">Ahorraste {fmtE(ahorroInverso)}</div>
            </div>
          )}
        </div>
      )}

      {modo === 'comparar' && (
        <div className="space-y-3">
          {items.map((item, i) => {
            const p = parseFloat(item.precio) || 0;
            const d2 = parseFloat(item.desc) || 0;
            const final = p - p * d2 / 0o100;
            return (
              <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input value={item.nombre} onChange={e => setItems(it => it.map((x, j) => j === i ? { ...x, nombre: e.target.value } : x))} placeholder="Nombre"
                    className="col-span-3 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none" />
                  <div className="relative">
                    <input type="number" value={item.precio} onChange={e => setItems(it => it.map((x, j) => j === i ? { ...x, precio: e.target.value } : x))} placeholder="Precio €"
                      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 pr-5 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none" />
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
                  </div>
                  <div className="relative">
                    <input type="number" value={item.desc} onChange={e => setItems(it => it.map((x, j) => j === i ? { ...x, desc: e.target.value } : x))} placeholder="Desc %"
                      className="w-full border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 pr-5 text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none" />
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                  </div>
                  <div className="flex items-center justify-center font-bold text-green-600 dark:text-green-400 text-sm">{fmtE(p - p * d2 / 100)}</div>
                </div>
              </div>
            );
          })}
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Mejor precio: <strong className="text-green-600 dark:text-green-400">
              {(() => {
                const finals = items.map(it => ({ nombre: it.nombre, final: (parseFloat(it.precio) || 0) - (parseFloat(it.precio) || 0) * (parseFloat(it.desc) || 0) / 100 }));
                const best = finals.reduce((a, b) => a.final < b.final ? a : b);
                return `${best.nombre} — ${fmtE(best.final)}`;
              })()}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
}
