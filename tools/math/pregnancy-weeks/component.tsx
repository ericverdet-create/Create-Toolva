'use client';
import { useState } from 'react';

const TRIMESTERS = [
  { weeks: [1, 13], label: '1er Trimestre', color: 'bg-pink-400' },
  { weeks: [14, 26], label: '2º Trimestre', color: 'bg-purple-400' },
  { weeks: [27, 40], label: '3er Trimestre', color: 'bg-indigo-400' },
];

const MILESTONES: { week: number; text: string }[] = [
  { week: 4, text: 'Prueba de embarazo positiva' },
  { week: 6, text: 'Latido cardíaco detectable' },
  { week: 8, text: 'Primera ecografía recomendada' },
  { week: 12, text: 'Riesgo de aborto disminuye notablemente' },
  { week: 20, text: 'Ecografía morfológica' },
  { week: 24, text: 'Viabilidad fetal' },
  { week: 28, text: 'Test glucosa (embarazo de riesgo)' },
  { week: 32, text: 'Últimas ecografías' },
  { week: 37, text: 'Embarazo a término' },
  { week: 40, text: 'Fecha probable de parto' },
];

type Mode = 'lmp' | 'conception' | 'duedate';

export default function PregnancyWeeks() {
  const [mode, setMode] = useState<Mode>('lmp');
  const [date, setDate] = useState(new Date(Date.now() - 70 * 86400000).toISOString().slice(0, 10));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lmpDate: Date;
  const inputDate = new Date(date);

  if (mode === 'lmp') {
    lmpDate = inputDate;
  } else if (mode === 'conception') {
    lmpDate = new Date(inputDate.getTime() - 14 * 86400000);
  } else {
    lmpDate = new Date(inputDate.getTime() - 280 * 86400000);
  }

  const dueDate = new Date(lmpDate.getTime() + 280 * 86400000);
  const daysPregnant = Math.floor((today.getTime() - lmpDate.getTime()) / 86400000);
  const weeksPregnant = Math.floor(daysPregnant / 7);
  const daysExtra = daysPregnant % 7;
  const daysToGo = Math.max(0, Math.ceil((dueDate.getTime() - today.getTime()) / 86400000));

  const trimester = TRIMESTERS.find(t => weeksPregnant >= t.weeks[0] && weeksPregnant <= t.weeks[1]);
  const progressPct = Math.min(100, Math.max(0, (weeksPregnant / 40) * 100));

  const fmtDate = (d: Date) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  const valid = daysPregnant >= 0 && daysPregnant <= 300;

  const modeLabels: Record<Mode, string> = {
    lmp: 'Última menstruación',
    conception: 'Fecha de concepción',
    duedate: 'Fecha probable de parto',
  };

  const upcomingMilestones = MILESTONES.filter(m => m.week > weeksPregnant).slice(0, 3);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(modeLabels) as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${mode === m ? 'bg-pink-500 text-white border-pink-500' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-pink-400'}`}>
            {modeLabels[m]}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{modeLabels[mode]}</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-400 focus:outline-none" />
      </div>

      {valid && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl p-5 text-center">
            <div className="text-sm opacity-80 mb-1">Semanas de embarazo</div>
            <div className="text-5xl font-bold">{weeksPregnant}<span className="text-2xl font-normal"> sem {daysExtra > 0 ? `+ ${daysExtra}d` : ''}</span></div>
            {trimester && <div className="mt-1 text-sm opacity-80">{trimester.label}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3 text-center text-sm">
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Fecha probable de parto</div>
              <div className="font-bold text-gray-900 dark:text-white text-xs mt-0.5">{fmtDate(dueDate)}</div>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-3">
              <div className="text-xs text-gray-500 dark:text-gray-400">Días hasta el parto</div>
              <div className="font-bold text-gray-900 dark:text-white text-lg">{daysToGo}</div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Semana 1</span><span>Semana 40</span>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full transition-all"
                style={{ width: `${progressPct}%` }} />
            </div>
            <div className="flex justify-between text-xs mt-1">
              {TRIMESTERS.map(t => (
                <span key={t.label} className="text-gray-400">{t.label}</span>
              ))}
            </div>
          </div>

          {upcomingMilestones.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Próximos hitos</div>
              {upcomingMilestones.map(m => (
                <div key={m.week} className="flex justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <span className="text-gray-600 dark:text-gray-400">{m.text}</span>
                  <span className="font-medium text-pink-600 dark:text-pink-400">Sem. {m.week}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
