'use client';
import { useState } from 'react';

export default function HourlyRate() {
  const [anualBruto, setAnualBruto] = useState('30000');
  const [fixedCosts, setFixedCosts] = useState('3000');
  const [vacacionesDias, setVacacionesDias] = useState('22');
  const [horasDia, setHorasDia] = useState('8');
  const [margen, setMargen] = useState('20');
  const [irpf, setIrpf] = useState('15');
  const [autonomos, setAutonomos] = useState('366'); // cuota autónomos mensual

  const bruto = parseFloat(anualBruto) || 0;
  const costes = parseFloat(fixedCosts) || 0;
  const vacaciones = parseFloat(vacacionesDias) || 22;
  const horas = parseFloat(horasDia) || 8;
  const margenPct = parseFloat(margen) || 20;
  const irpfPct = parseFloat(irpf) || 15;
  const cuotaAutonomos = parseFloat(autonomos) || 366;

  // Días laborables al año (aprox 365 - fines de semana - festivos - vacaciones)
  const diasFinde = 104;
  const festivos = 14;
  const diasLaborables = 365 - diasFinde - festivos - vacaciones;
  const horasAnuales = diasLaborables * horas;

  // Coste total que debe cubrir la tarifa
  const cuotaAnual = cuotaAutonomos * 12;
  const totalNecesario = bruto + costes + cuotaAnual;

  // Con margen de beneficio
  const totalConMargen = totalNecesario * (1 + margenPct / 100);

  // IRPF sobre el neto (retención)
  const retencionAnual = bruto * (irpfPct / 100);
  const totalFacturar = totalConMargen + retencionAnual;

  const precioPorHora = horasAnuales > 0 ? totalFacturar / horasAnuales : 0;
  const precioPorDia = precioPorHora * horas;
  const precioPorSemana = precioPorDia * 5;

  const fmt = (n: number, dec = 2) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sueldo neto deseado anual (€)</label>
          <input type="number" value={anualBruto} onChange={e => setAnualBruto(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gastos fijos anuales (€)</label>
          <input type="number" value={fixedCosts} onChange={e => setFixedCosts(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cuota autónomos mensual (€)</label>
          <input type="number" value={autonomos} onChange={e => setAutonomos(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Retención IRPF (%)</label>
          <input type="number" value={irpf} onChange={e => setIrpf(e.target.value)} min="0" max="50"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas/día facturables</label>
          <input type="number" value={horasDia} onChange={e => setHorasDia(e.target.value)} min="1" max="16"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Vacaciones (días)</label>
          <input type="number" value={vacacionesDias} onChange={e => setVacacionesDias(e.target.value)} min="0" max="60"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Margen de beneficio (%)</label>
          <input type="range" value={margen} onChange={e => setMargen(e.target.value)} min="0" max="100"
            className="w-full accent-indigo-600" />
          <div className="text-right text-xs text-indigo-600 dark:text-indigo-400 font-medium">{margen}%</div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
        <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(precioPorHora)} €/h</div>
        <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-1">tarifa mínima recomendada</div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm text-center">
        {[
          { label: 'Por día', val: fmt(precioPorDia) + ' €' },
          { label: 'Por semana', val: fmt(precioPorSemana) + ' €' },
          { label: 'Por año (facturable)', val: fmt(totalFacturar, 0) + ' €' },
        ].map(r => (
          <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
            <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-600 dark:text-gray-400 space-y-1">
        <div className="flex justify-between"><span>Horas facturables/año:</span><span className="font-medium">{Math.round(horasAnuales)} h</span></div>
        <div className="flex justify-between"><span>Cuota autónomos anual:</span><span className="font-medium">{fmt(cuotaAnual, 0)} €</span></div>
        <div className="flex justify-between"><span>Total a cubrir (con margen):</span><span className="font-medium">{fmt(totalConMargen, 0)} €</span></div>
      </div>
    </div>
  );
}
