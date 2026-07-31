'use client';
import { useState } from 'react';

interface Aparato { nombre: string; vatios: string; horas: string; }

const PRESETS = [
  { nombre: 'Nevera (A++)', vatios: '150', horas: '24' },
  { nombre: 'Lavadora (60°)', vatios: '2000', horas: '1.5' },
  { nombre: 'Lavavajillas', vatios: '1800', horas: '1.5' },
  { nombre: 'Horno eléctrico', vatios: '2200', horas: '1' },
  { nombre: 'Microondas', vatios: '1000', horas: '0.25' },
  { nombre: 'TV 50" LED', vatios: '100', horas: '4' },
  { nombre: 'Ordenador portátil', vatios: '65', horas: '8' },
  { nombre: 'Ordenador de sobremesa', vatios: '300', horas: '8' },
  { nombre: 'Aire acondicionado', vatios: '1500', horas: '6' },
  { nombre: 'Calefactor eléctrico', vatios: '2000', horas: '4' },
  { nombre: 'Bombilla LED', vatios: '10', horas: '5' },
  { nombre: 'Bombilla incandescente', vatios: '60', horas: '5' },
  { nombre: 'Cargador móvil', vatios: '10', horas: '2' },
  { nombre: 'Router wifi', vatios: '10', horas: '24' },
  { nombre: 'Secador de pelo', vatios: '1800', horas: '0.25' },
];

export default function PrecioLuz() {
  const [tarifa, setTarifa] = useState('0.22');
  const [aparatos, setAparatos] = useState<Aparato[]>([
    { nombre: 'Nevera (A++)', vatios: '150', horas: '24' },
    { nombre: 'TV 50" LED', vatios: '100', horas: '4' },
    { nombre: 'Lavadora (60°)', vatios: '2000', horas: '1.5' },
  ]);

  const add = () => setAparatos(p => [...p, { nombre: '', vatios: '100', horas: '1' }]);
  const remove = (i: number) => setAparatos(p => p.filter((_, idx) => idx !== i));
  const upd = (i: number, f: keyof Aparato, v: string) => setAparatos(p => p.map((a, idx) => idx === i ? { ...a, [f]: v } : a));
  const addPreset = (pr: typeof PRESETS[0]) => setAparatos(p => [...p, { ...pr }]);

  const precio = parseFloat(tarifa) || 0;

  const items = aparatos.map(a => {
    const w = parseFloat(a.vatios) || 0;
    const h = parseFloat(a.horas) || 0;
    const kwh = (w / 1000) * h;
    return { ...a, kwh, diario: kwh * precio, mensual: kwh * 30 * precio, anual: kwh * 365 * precio };
  });

  const totDiario = items.reduce((s, i) => s + i.diario, 0);
  const totMensual = items.reduce((s, i) => s + i.mensual, 0);
  const totAnual = items.reduce((s, i) => s + i.anual, 0);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt3 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 3 });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio kWh (€)</label>
        <input type="number" value={tarifa} onChange={e => setTarifa(e.target.value)} min="0" step="0.01"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        <div className="text-xs text-gray-400 mt-1">Precio medio España ~0.22 €/kWh (revisa tu factura)</div>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Tus aparatos</div>
        {aparatos.map((a, i) => (
          <div key={i} className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 75px 70px 24px' }}>
            <input value={a.nombre} onChange={e => upd(i, 'nombre', e.target.value)} placeholder="Aparato"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
            <div className="relative">
              <input type="number" value={a.vatios} onChange={e => upd(i, 'vatios', e.target.value)} placeholder="W" min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 pr-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
              <span className="absolute right-2 top-1.5 text-xs text-gray-400">W</span>
            </div>
            <div className="relative">
              <input type="number" value={a.horas} onChange={e => upd(i, 'horas', e.target.value)} placeholder="h/día" min="0" max="24" step="0.25"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 pr-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
              <span className="absolute right-2 top-1.5 text-xs text-gray-400">h</span>
            </div>
            <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold text-base">×</button>
          </div>
        ))}
        <button onClick={add}
          className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-colors">
          + Añadir aparato
        </button>
      </div>

      <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">⚡ Añadir aparato típico</summary>
        <div className="grid grid-cols-2 gap-1 p-2">
          {PRESETS.map(pr => (
            <button key={pr.nombre} onClick={() => addPreset(pr)}
              className="text-left px-2 py-1.5 text-xs rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-gray-300">
              {pr.nombre} <span className="text-gray-400">{pr.vatios}W</span>
            </button>
          ))}
        </div>
      </details>

      {items.length > 0 && precio > 0 && (
        <div className="space-y-3">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: '📅 Diario', val: fmt(totDiario) + ' €' },
                { label: '🗓️ Mensual', val: fmt(totMensual) + ' €' },
                { label: '📆 Anual', val: Math.round(totAnual) + ' €' },
              ].map(r => (
                <div key={r.label}>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">{r.label}</div>
                  <div className="text-xl font-bold text-yellow-700 dark:text-yellow-300">{r.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-2"
              style={{ gridTemplateColumns: '1fr 60px 60px 65px' }}>
              <span>Aparato</span>
              <span className="text-right">kWh/día</span>
              <span className="text-right">€/mes</span>
              <span className="text-right">€/año</span>
            </div>
            {items.map((it, i) => (
              <div key={i} className="grid items-center text-xs px-3 py-2 border-t border-gray-100 dark:border-gray-700"
                style={{ gridTemplateColumns: '1fr 60px 60px 65px' }}>
                <span className="text-gray-700 dark:text-gray-300 truncate">{it.nombre || '—'}</span>
                <span className="text-right text-gray-500 dark:text-gray-400">{fmt3(it.kwh)}</span>
                <span className="text-right text-gray-700 dark:text-gray-300">{fmt(it.mensual)}</span>
                <span className="text-right font-medium text-gray-900 dark:text-white">{fmt(it.anual)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
