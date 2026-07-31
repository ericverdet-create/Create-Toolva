'use client';
import { useState } from 'react';

function calcularNeto(brutoAnual: number, hijos: number, minusvaliaP: boolean) {
  // Cotización SS empleado (aprox 6.35%)
  const ss = brutoAnual * 0.0635;
  const baseIRPF = brutoAnual - ss;

  // IRPF 2024 aproximado (escala estatal + autonómica media)
  let irpfPct = 0;
  if (baseIRPF <= 12450) irpfPct = 0.19;
  else if (baseIRPF <= 20200) irpfPct = 0.24;
  else if (baseIRPF <= 35200) irpfPct = 0.30;
  else if (baseIRPF <= 60000) irpfPct = 0.37;
  else if (baseIRPF <= 300000) irpfPct = 0.45;
  else irpfPct = 0.47;

  // Reducción mínimo personal y familiar (simplificada)
  const minPersonal = 5550;
  const minHijos = hijos > 0 ? (hijos >= 1 ? 2400 : 0) + (hijos >= 2 ? 2700 : 0) + (hijos >= 3 ? 4000 : 0) : 0;
  const minFamiliar = minPersonal + minHijos + (minusvaliaP ? 3000 : 0);
  const reduccion = minFamiliar * irpfPct * 0.5;

  const irpf = baseIRPF * irpfPct - reduccion;
  const netoAnual = brutoAnual - ss - Math.max(0, irpf);
  return {
    brutoAnual,
    brutoMensual: brutoAnual / 12,
    ss: ss,
    irpf: Math.max(0, irpf),
    irpfPct: irpfPct * 100,
    netoAnual,
    netoMensual: netoAnual / 12,
    netoMensual14: netoAnual / 14,
  };
}

export default function SalaryCalculator() {
  const [bruto, setBruto] = useState('30000');
  const [hijos, setHijos] = useState('0');
  const [minusvalia, setMinusvalia] = useState(false);
  const [pagas, setPagas] = useState<'12' | '14'>('14');

  const brutoNum = parseFloat(bruto.replace(',', '.')) || 0;
  const r = calcularNeto(brutoNum, parseInt(hijos) || 0, minusvalia);
  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Salario bruto anual (€)</label>
          <input type="number" value={bruto} onChange={e => setBruto(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hijos a cargo</label>
          <select value={hijos} onChange={e => setHijos(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
            {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="minusvalia" checked={minusvalia} onChange={e => setMinusvalia(e.target.checked)}
            className="w-4 h-4 accent-indigo-600" />
          <label htmlFor="minusvalia" className="text-sm text-gray-700 dark:text-gray-300">Discapacidad reconocida</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pagas al año</label>
          <div className="flex gap-2">
            {(['12','14'] as const).map(p => (
              <button key={p} onClick={() => setPagas(p)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${pagas===p?'bg-indigo-600 text-white border-indigo-600':'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
                {p} pagas
              </button>
            ))}
          </div>
        </div>
      </div>

      {brutoNum > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Salario neto anual</div>
              <div className="text-2xl font-bold text-indigo-600">{fmt(r.netoAnual)} €</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 mb-1">Neto mensual ({pagas} pagas)</div>
              <div className="text-2xl font-bold text-green-600">{fmt(pagas==='12'?r.netoMensual:r.netoMensual14)} €</div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <div className="flex justify-between py-2"><span className="text-gray-600 dark:text-gray-400">Bruto anual</span><span className="font-medium">{fmt(r.brutoAnual)} €</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600 dark:text-gray-400">Cotización SS (~6.35%)</span><span className="text-red-500">-{fmt(r.ss)} €</span></div>
            <div className="flex justify-between py-2"><span className="text-gray-600 dark:text-gray-400">Retención IRPF (~{r.irpfPct.toFixed(0)}%)</span><span className="text-red-500">-{fmt(r.irpf)} €</span></div>
            <div className="flex justify-between py-2 font-semibold"><span>Neto anual</span><span className="text-indigo-600">{fmt(r.netoAnual)} €</span></div>
          </div>
          <p className="text-xs text-gray-400 text-center">Cálculo orientativo. Consulta con tu gestor para valores exactos.</p>
        </div>
      )}
    </div>
  );
}
