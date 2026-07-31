'use client';
import { useState } from 'react';

function addDays(date: Date, days: number): Date {
  const d = new Date(date); d.setDate(d.getDate() + days); return d;
}
function fmt(d: Date) { return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' }); }
function fmtShort(d: Date) { return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }); }

export default function CicloMenstrual() {
  const [ultimaRegla, setUltimaRegla] = useState(new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10));
  const [duracionCiclo, setDuracionCiclo] = useState('28');
  const [duracionRegla, setDuracionRegla] = useState('5');

  const inicio = new Date(ultimaRegla);
  const ciclo = parseInt(duracionCiclo) || 28;
  const regla = parseInt(duracionRegla) || 5;

  const ciclos = [1, 2, 3].map(n => {
    const inicioRegla = addDays(inicio, ciclo * (n - 1));
    const finRegla = addDays(inicioRegla, regla - 1);
    const ovulacion = addDays(inicioRegla, ciclo - 14);
    const fertileStart = addDays(ovulacion, -5);
    const fertileEnd = addDays(ovulacion, 1);
    const proximaRegla = addDays(inicioRegla, ciclo);
    return { n, inicioRegla, finRegla, ovulacion, fertileStart, fertileEnd, proximaRegla };
  });

  const hoy = new Date();
  const c = ciclos[0];
  const diasHastaProxima = Math.round((c.proximaRegla.getTime() - hoy.getTime()) / 86400000);
  const faseName = () => {
    const d = Math.round((hoy.getTime() - c.inicioRegla.getTime()) / 86400000);
    if (d < 0) return 'Antes del ciclo';
    if (d < regla) return '🔴 Fase menstrual';
    if (d < ciclo - 14 - 5) return '🌱 Fase folicular';
    if (d <= ciclo - 14 + 1) return '🌸 Ventana fértil / Ovulación';
    if (d < ciclo) return '🌙 Fase lútea';
    return '🔴 Próxima regla';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Inicio última regla</label>
          <input type="date" value={ultimaRegla} onChange={e => setUltimaRegla(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duración ciclo (días)</label>
          <input type="number" value={duracionCiclo} onChange={e => setDuracionCiclo(e.target.value)} min="21" max="45"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Duración regla (días)</label>
          <input type="number" value={duracionRegla} onChange={e => setDuracionRegla(e.target.value)} min="2" max="10"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-2xl p-4">
        <div className="text-xs text-pink-600 dark:text-pink-400 text-center mb-1">Fase actual</div>
        <div className="text-center text-xl font-bold text-pink-700 dark:text-pink-300">{faseName()}</div>
        {diasHastaProxima > 0 && <div className="text-center text-xs text-pink-500 dark:text-pink-400 mt-1">Próxima regla en {diasHastaProxima} días ({fmt(c.proximaRegla)})</div>}
        {diasHastaProxima <= 0 && <div className="text-center text-xs text-pink-500 dark:text-pink-400 mt-1">La regla puede haber empezado</div>}
      </div>

      <div className="space-y-3">
        {ciclos.map(c => (
          <div key={c.n} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400">
              Ciclo {c.n} {c.n === 1 ? '(actual)' : ''}
            </div>
            <div className="grid grid-cols-2 gap-0 divide-x divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { icon: '🔴', label: 'Regla', val: `${fmtShort(c.inicioRegla)} – ${fmtShort(c.finRegla)}` },
                { icon: '🌸', label: 'Días fértiles', val: `${fmtShort(c.fertileStart)} – ${fmtShort(c.fertileEnd)}` },
                { icon: '🥚', label: 'Ovulación', val: fmt(c.ovulacion) },
                { icon: '📅', label: 'Próxima regla', val: fmt(c.proximaRegla) },
              ].map(r => (
                <div key={r.label} className="px-3 py-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{r.icon} {r.label}</div>
                  <div className="text-xs font-medium text-gray-900 dark:text-white">{r.val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        Calculado según el método del calendario (Ogino-Knaus). No es un método anticonceptivo fiable. Consulta a tu ginecólogo.
      </div>
    </div>
  );
}
