'use client';
import { useState } from 'react';

export default function HorasExtras() {
  const [sueldoBruto, setSueldoBruto] = useState('24000');
  const [horasAnuales, setHorasAnuales] = useState('1760');
  const [numHoras, setNumHoras] = useState('10');
  const [tipo, setTipo] = useState<'laborable' | 'festivo' | 'convenio'>('laborable');
  const [recargo, setRecargo] = useState('25');

  const bruto = parseFloat(sueldoBruto) || 0;
  const hAnuales = parseFloat(horasAnuales) || 1760;
  const nHoras = parseFloat(numHoras) || 0;
  const rec = tipo === 'convenio' ? parseFloat(recargo) || 0 : tipo === 'festivo' ? 75 : 25;

  const valorHoraNormal = bruto / hAnuales;
  const valorHoraExtra = valorHoraNormal * (1 + rec / 100);
  const totalBruto = valorHoraExtra * nHoras;

  // Cotización SS horas extra (28.3% empresa + 9.35% trabajador para estructura normal;
  // horas extra: 47.14% empresa + 28.% trabajador — simplificamos con cotización estándar)
  const ssEmpleado = totalBruto * 0.0635; // aprox SS + desempleo + formación trabajador
  const totalNeto = totalBruto - ssEmpleado;

  const fmt = (n: number, dec = 2) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const tiposHora = [
    { val: 'laborable', label: 'Día laborable', recargo: 25 },
    { val: 'festivo', label: 'Festivo / noche', recargo: 75 },
    { val: 'convenio', label: 'Convenio propio', recargo: null },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sueldo bruto anual (€)</label>
          <input type="number" value={sueldoBruto} onChange={e => setSueldoBruto(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas anuales en contrato</label>
          <input type="number" value={horasAnuales} onChange={e => setHorasAnuales(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Número de horas extra</label>
          <input type="number" value={numHoras} onChange={e => setNumHoras(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo</label>
          <select value={tipo} onChange={e => setTipo(e.target.value as typeof tipo)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {tiposHora.map(t => <option key={t.val} value={t.val}>{t.label}{t.recargo ? ` (+${t.recargo}%)` : ''}</option>)}
          </select>
        </div>
      </div>

      {tipo === 'convenio' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Recargo de convenio (%)</label>
          <input type="number" value={recargo} onChange={e => setRecargo(e.target.value)} min="0" max="200"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      )}

      {bruto > 0 && nHoras > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Total horas extra (bruto)</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(totalBruto)} €</div>
            <div className="text-sm text-indigo-500 dark:text-indigo-400">{nHoras} h × {fmt(valorHoraExtra)} €/h</div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Valor hora normal', val: fmt(valorHoraNormal) + ' €' },
              { label: 'Valor hora extra', val: fmt(valorHoraExtra) + ' €' },
              { label: 'Recargo aplicado', val: '+' + rec + '%' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div className="flex justify-between"><span>Cotización SS aproximada (trabajador):</span><span>−{fmt(ssEmpleado)} €</span></div>
            <div className="flex justify-between font-medium"><span>Neto estimado:</span><span className="text-green-600 dark:text-green-400">{fmt(totalNeto)} €</span></div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Límite: 80 horas extra/año (art. 35 ET). Las horas extra cotizan a tipo especial. Verifica tu convenio colectivo.
          </div>
        </div>
      )}
    </div>
  );
}
