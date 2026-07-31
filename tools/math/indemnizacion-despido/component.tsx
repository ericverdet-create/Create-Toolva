'use client';
import { useState } from 'react';

export default function IndemnizacionDespido() {
  const [salary, setSalary] = useState('30000');
  const [years, setYears] = useState('5');
  const [months, setMonths] = useState('6');
  const [type, setType] = useState<'improcedente' | 'procedente' | 'objetivo'>('improcedente');
  const [preReform, setPreReform] = useState(false);
  const [yearsPreReform, setYearsPreReform] = useState('2');

  const sal = parseFloat(salary) || 0;
  const y = parseFloat(years) || 0;
  const m = parseInt(months) || 0;
  const yPre = parseFloat(yearsPreReform) || 0;

  const dailySalary = sal / 365;
  const totalYears = y + m / 12;
  const yearsPostReform = Math.max(0, totalYears - (preReform ? yPre : 0));

  // Days per year by type
  const daysPerYear = type === 'improcedente' ? 33 : type === 'procedente' ? 20 : 20;

  // Post-reform calculation (2012+): 33 days/year for improcedente, 20 for procedente/objetivo
  const postReformAmount = yearsPostReform * daysPerYear * dailySalary;

  // Pre-reform amount (pre Feb 2012): 45 days/year for improcedente, capped at 42 monthly pays
  const preReformDays = type === 'improcedente' ? 45 : 20;
  const preReformAmount = preReform ? Math.min(yPre * preReformDays * dailySalary, 42 * (sal / 12)) : 0;

  const totalAmount = preReformAmount + postReformAmount;

  // Cap at 24 months of salary for post-reform improcedente (33 days/year)
  const cap = type === 'improcedente' ? 24 * (sal / 12) : Infinity;
  const cappedPostReform = Math.min(postReformAmount, cap - preReformAmount);
  const finalAmount = preReformAmount + cappedPostReform;

  const totalDays = preReform
    ? (yPre * preReformDays + yearsPostReform * daysPerYear)
    : totalYears * daysPerYear;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Tipo de despido</label>
        <div className="grid grid-cols-3 gap-2">
          {([
            ['improcedente', '🔴 Improcedente', '33 días/año'],
            ['objetivo', '🟡 Objetivo/ERTE', '20 días/año'],
            ['procedente', '🟢 Procedente', '20 días/año'],
          ] as const).map(([key, label, sub]) => (
            <button key={key} onClick={() => setType(key)}
              className={`py-2 px-2 rounded-xl text-center transition-colors ${type === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              <div className="text-xs font-medium">{label}</div>
              <div className="text-xs opacity-70">{sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Salario bruto anual (€)</label>
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Salario diario</label>
          <div className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
            {sal > 0 ? (dailySalary.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + ' €' : '—'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años trabajados</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} min="0" max="50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Meses adicionales</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} min="0" max="11"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {type === 'improcedente' && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="preReform" checked={preReform} onChange={e => setPreReform(e.target.checked)}
              className="rounded" />
            <label htmlFor="preReform" className="text-sm text-gray-700 dark:text-gray-300">
              ¿Tenía contrato antes del 12 Feb 2012? (régimen transitorio)
            </label>
          </div>
          {preReform && (
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años trabajados antes del 12/02/2012</label>
              <input type="number" value={yearsPreReform} onChange={e => setYearsPreReform(e.target.value)} min="0" max="30"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
          )}
        </div>
      )}

      {sal > 0 && totalYears > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Tiempo total</div>
              <div className="font-bold text-gray-900 dark:text-white">{y}a {m}m</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Días de indemnización</div>
              <div className="font-bold text-gray-900 dark:text-white">{Math.round(totalDays)} días</div>
            </div>
          </div>

          {preReform && preReformAmount > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm space-y-1">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tramo pre-reforma (45 d/año)</span><span>{fmt(preReformAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Tramo post-reforma (33 d/año)</span><span>{fmt(cappedPostReform)}</span>
              </div>
            </div>
          )}

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5 text-center">
            <div className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">💰 Indemnización estimada</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(finalAmount)}</div>
            {type === 'improcedente' && totalAmount > cap && (
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-2">⚠️ Limitada al tope de 24 mensualidades</div>
            )}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Cálculo orientativo. La indemnización incluye salario + pagas extras + complementos. Consulta con un abogado laboralista para confirmar tu caso específico.
          </div>
        </div>
      )}
    </div>
  );
}
