'use client';
import { useState } from 'react';

export default function LiquidacionSalario() {
  const [sueldoBruto, setSueldoBruto] = useState('24000');
  const [pagas, setPagas] = useState('14');
  const [diaInicio, setDiaInicio] = useState('2024-01-01');
  const [diaFin, setDiaFin] = useState(new Date().toISOString().slice(0, 10));
  const [diasVacaciones, setDiasVacaciones] = useState('22');
  const [vacacionesDisfrutadas, setVacacionesDisfrutadas] = useState('10');
  const [horasExtra, setHorasExtra] = useState('0');
  const [valorHoraExtra, setValorHoraExtra] = useState('0');

  const bruto = parseFloat(sueldoBruto) || 0;
  const np = parseInt(pagas) || 12;
  const vac = parseFloat(diasVacaciones) || 22;
  const vacDis = parseFloat(vacacionesDisfrutadas) || 0;
  const hExtra = parseFloat(horasExtra) || 0;
  const vHora = parseFloat(valorHoraExtra) || 0;

  const d1 = new Date(diaInicio);
  const d2 = new Date(diaFin);

  // Días trabajados en el mes de salida
  const diasMes = new Date(d2.getFullYear(), d2.getMonth() + 1, 0).getDate();
  const diaTrabajado = d2.getDate();

  // Salario base diario
  const sueldoDiario = bruto / 365;
  const sueldoMensual = bruto / 12;

  // Parte proporcional del salario del mes de baja
  const salarioPropMes = (sueldoMensual / diasMes) * diaTrabajado;

  // Pagas extra prorrateadas (del 1 enero al fin de mes / 6 meses por paga)
  const pagasExtra = np - 12; // número de pagas extra (0, 2, etc.)
  const valorPagaExtra = pagasExtra > 0 ? bruto / np : 0;

  // Prorratea las pagas extra desde inicio del semestre
  // Simplificado: días desde inicio del año o del semestre
  const inicioAnio = new Date(d2.getFullYear(), 0, 1);
  const diasDesdeInicioAnio = Math.floor((d2.getTime() - inicioAnio.getTime()) / (1000 * 60 * 60 * 24));
  const pagaExtraProrrateada = pagasExtra > 0
    ? (valorPagaExtra * pagasExtra * diasDesdeInicioAnio) / 365
    : 0;

  // Vacaciones pendientes
  const vacPendientes = Math.max(0, vac - vacDis);
  const importeVacaciones = vacPendientes * sueldoDiario;

  // Horas extra
  const importeHorasExtra = hExtra * vHora;

  const totalLiquidacion = salarioPropMes + pagaExtraProrrateada + importeVacaciones + importeHorasExtra;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sueldo bruto anual (€)</label>
          <input type="number" value={sueldoBruto} onChange={e => setSueldoBruto(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Número de pagas</label>
          <select value={pagas} onChange={e => setPagas(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            <option value="12">12 pagas</option>
            <option value="14">14 pagas (2 extras)</option>
            <option value="15">15 pagas (3 extras)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha inicio del año / contrato</label>
          <input type="date" value={diaInicio} onChange={e => setDiaInicio(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha de baja</label>
          <input type="date" value={diaFin} onChange={e => setDiaFin(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Días vacaciones/año</label>
          <input type="number" value={diasVacaciones} onChange={e => setDiasVacaciones(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Vacaciones ya disfrutadas</label>
          <input type="number" value={vacacionesDisfrutadas} onChange={e => setVacacionesDisfrutadas(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas extra pendientes</label>
          <input type="number" value={horasExtra} onChange={e => setHorasExtra(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Valor hora extra (€)</label>
          <input type="number" value={valorHoraExtra} onChange={e => setValorHoraExtra(e.target.value)} min="0" step="0.5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {bruto > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Total liquidación bruta</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(totalLiquidacion)} €</div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { label: `Salario del mes (${diaTrabajado}/${diasMes} días)`, val: salarioPropMes },
              { label: 'Pagas extra prorrateadas', val: pagaExtraProrrateada },
              { label: `Vacaciones pendientes (${fmt0(vacPendientes)} días × ${fmt(sueldoDiario)} €/día)`, val: importeVacaciones },
              { label: `Horas extra (${hExtra}h × ${fmt(vHora)} €)`, val: importeHorasExtra },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center px-4 py-2.5 text-sm">
                <span className="text-gray-600 dark:text-gray-400 text-xs">{r.label}</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(r.val)} €</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            ⚠️ Esta liquidación es orientativa. El finiquito lo negocias con tu empresa — incluye también posibles indemnizaciones. Consulta con un abogado laboral si hay discrepancias.
          </div>
        </div>
      )}
    </div>
  );
}
