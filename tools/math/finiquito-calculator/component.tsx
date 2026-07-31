'use client';
import { useState } from 'react';

type Reason = 'voluntary' | 'objective' | 'unfair' | 'mutual';

const REASON_LABELS: Record<Reason, string> = {
  voluntary: 'Baja voluntaria',
  objective: 'Despido objetivo / ERE (20 días/año)',
  unfair: 'Despido improcedente (33 días/año)',
  mutual: 'Mutuo acuerdo',
};

const REASON_DAYS: Record<Reason, number> = {
  voluntary: 0,
  objective: 20,
  unfair: 33,
  mutual: 0,
};

const REASON_CAP_MONTHS: Record<Reason, number> = {
  voluntary: 0,
  objective: 12,
  unfair: 24,
  mutual: 0,
};

export default function FiniquitoCalculator() {
  const [salary, setSalary] = useState('30000');
  const [years, setYears] = useState('3');
  const [months, setMonths] = useState('6');
  const [reason, setReason] = useState<Reason>('unfair');
  const [vacDays, setVacDays] = useState('22');
  const [vacUsed, setVacUsed] = useState('10');
  const [pagas, setPagas] = useState<'12' | '14'>('14');

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const grossAnnual = parseFloat(salary) || 0;
  const yearsN = parseFloat(years) || 0;
  const monthsN = parseFloat(months) || 0;
  const totalYears = yearsN + monthsN / 12;
  const dailySalary = grossAnnual / 365;

  // Indemnización
  const daysPerYear = REASON_DAYS[reason];
  const capMonths = REASON_CAP_MONTHS[reason];
  const rawIndemnization = dailySalary * daysPerYear * totalYears;
  const maxIndemnization = (grossAnnual / 12) * capMonths;
  const indemnization = daysPerYear > 0 ? Math.min(rawIndemnization, maxIndemnization) : 0;

  // Vacaciones no disfrutadas
  const vacTotal = parseFloat(vacDays) || 22;
  const vacUsedN = parseFloat(vacUsed) || 0;
  // Proportional vacation for current year
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const propVacDays = Math.max(0, (vacTotal * dayOfYear / 365) - vacUsedN);
  const vacCompensation = dailySalary * propVacDays;

  // Parte proporcional paga extra
  const pagasN = parseInt(pagas);
  const extraPays = pagasN === 14 ? 2 : 0;
  const extraPerDay = extraPays > 0 ? (grossAnnual / pagasN) * extraPays / 365 : 0;
  // Days since last extra pay (approximate: June 30 and Dec 31)
  const month = today.getMonth() + 1;
  let daysSinceExtra = 0;
  if (month <= 6) daysSinceExtra = dayOfYear - 1;
  else daysSinceExtra = dayOfYear - 181;
  daysSinceExtra = Math.max(0, daysSinceExtra);
  const extraProporcional = extraPays > 0 ? extraPerDay * daysSinceExtra : 0;

  const total = indemnization + vacCompensation + extraProporcional;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salario bruto anual (€)</label>
          <input type="number" value={salary} onChange={e => setSalary(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pagas al año</label>
          <div className="flex gap-2">
            {(['12', '14'] as const).map(p => (
              <button key={p} onClick={() => setPagas(p)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-colors ${pagas === p ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600'}`}>
                {p} pagas
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Años trabajados</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meses adicionales</label>
          <input type="number" value={months} onChange={e => setMonths(e.target.value)} min="0" max="11"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Días vacaciones/año</label>
          <input type="number" value={vacDays} onChange={e => setVacDays(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vacaciones ya disfrutadas</label>
          <input type="number" value={vacUsed} onChange={e => setVacUsed(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Motivo de la baja</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(Object.keys(REASON_LABELS) as Reason[]).map(r => (
            <button key={r} onClick={() => setReason(r)}
              className={`text-left px-3 py-2.5 rounded-xl text-sm border transition-colors ${reason === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              {REASON_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">Estimación del finiquito</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Indemnización ({REASON_DAYS[reason]} días/año)</span>
            <span className="font-medium text-gray-900 dark:text-white">{fmt(indemnization)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Vacaciones no disfrutadas ({propVacDays.toFixed(1)} días)</span>
            <span className="font-medium text-gray-900 dark:text-white">{fmt(vacCompensation)}</span>
          </div>
          {extraPays > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Parte proporcional paga extra</span>
              <span className="font-medium text-gray-900 dark:text-white">{fmt(extraProporcional)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-indigo-200 dark:border-indigo-700 pt-2">
            <span className="font-bold text-gray-900 dark:text-white">Total estimado (bruto)</span>
            <span className="font-bold text-xl text-indigo-700 dark:text-indigo-300">{fmt(total)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">Cálculo orientativo. Consulta con un abogado laboralista para valores exactos.</p>
      </div>
    </div>
  );
}
