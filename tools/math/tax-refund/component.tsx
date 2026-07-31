'use client';
import { useState } from 'react';

// IRPF 2024 state brackets
const BRACKETS = [
  { limit: 12450, rate: 0.19 },
  { limit: 20200, rate: 0.24 },
  { limit: 35200, rate: 0.30 },
  { limit: 60000, rate: 0.37 },
  { limit: 300000, rate: 0.45 },
  { limit: Infinity, rate: 0.47 },
];

function calcIRPF(base: number): number {
  let tax = 0;
  let prev = 0;
  for (const { limit, rate } of BRACKETS) {
    if (base <= prev) break;
    const taxable = Math.min(base, limit) - prev;
    tax += taxable * rate;
    prev = limit;
  }
  return tax;
}

export default function TaxRefund() {
  const [salary, setSalary] = useState('30000');
  const [retentions, setRetentions] = useState('4200');
  const [mortgage, setMortgage] = useState('0');
  const [donations, setDonations] = useState('0');
  const [children, setChildren] = useState('0');
  const [situation, setSituation] = useState<'single' | 'married'>('single');
  const [twoIncomes, setTwoIncomes] = useState(false);

  const sal = parseFloat(salary) || 0;
  const ret = parseFloat(retentions) || 0;
  const mort = parseFloat(mortgage) || 0;
  const don = parseFloat(donations) || 0;
  const ch = parseInt(children) || 0;

  // Mínimo personal y familiar
  const personalMin = situation === 'married' && !twoIncomes ? 5550 + 3400 : 5550;
  const childrenMin = [0, 2400, 2700, 4000, 4500].reduce((acc, v, i) => i <= ch && i > 0 ? acc + v : acc, 0);
  const totalMin = personalMin + childrenMin;

  // Work income reduction (reducción por rendimientos del trabajo 2024)
  let workReduction = 0;
  if (sal <= 13115) workReduction = 5565;
  else if (sal <= 16825) workReduction = 5565 - 1.5 * (sal - 13115);
  else workReduction = 0;

  // SS employee deduction (6.35%)
  const ssEmployee = sal * 0.0635;

  // Base liquidable
  const generalBase = Math.max(0, sal - ssEmployee - workReduction);
  const baseLiquidable = Math.max(0, generalBase - totalMin);

  // Cuota íntegra
  const cuotaIntegra = calcIRPF(baseLiquidable);

  // Mortgage deduction (15% up to €9,040, pre-2013 regime)
  const mortgageDeduction = Math.min(mort * 0.15, 9040 * 0.15);
  const donationDeduction = Math.min(don * 0.8, 150) + Math.max(0, don - 150) * 0.35;

  const cuotaLiquida = Math.max(0, cuotaIntegra - mortgageDeduction - donationDeduction);
  const resultado = ret - cuotaLiquida;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const isReturn = resultado >= 0;

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
        ⚠️ Simulación orientativa para trabajo por cuenta ajena. No incluye todas las deducciones ni tramo autonómico. Solo como referencia.
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Situación familiar</label>
        <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {([['single', 'Soltero/a'], ['married', 'Casado/a (declaración individual)']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setSituation(key)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${situation === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Rendimientos del trabajo brutos (€)', val: salary, set: setSalary },
          { label: 'Retenciones IRPF soportadas (€)', val: retentions, set: setRetentions },
          { label: 'Hijos a cargo (0-3+)', val: children, set: setChildren, max: '4' },
          { label: 'Cuotas hipoteca pagadas (€)', val: mortgage, set: setMortgage },
          { label: 'Donaciones a ONGs (€)', val: donations, set: setDonations },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0" max={f.max}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      {sal > 0 && (
        <div className="space-y-3">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-2 text-sm">
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cálculo simplificado</div>
            {[
              { label: 'Salario bruto', val: fmt(sal) },
              { label: '− SS (6,35%)', val: '−' + fmt(ssEmployee) },
              { label: '− Reducción trabajo', val: '−' + fmt(workReduction) },
              { label: '− Mínimo personal+familiar', val: '−' + fmt(totalMin) },
              { label: '= Base liquidable', val: fmt(baseLiquidable), bold: true },
              { label: 'Cuota íntegra (IRPF estatal)', val: fmt(cuotaIntegra) },
              { label: '− Deducciones', val: '−' + fmt(mortgageDeduction + donationDeduction) },
              { label: '= Cuota líquida', val: fmt(cuotaLiquida), bold: true },
              { label: '− Retenciones soportadas', val: '−' + fmt(ret) },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${(r as any).bold ? 'font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-1 mt-1' : 'text-gray-600 dark:text-gray-400'}`}>
                <span>{r.label}</span><span>{r.val}</span>
              </div>
            ))}
          </div>

          <div className={`rounded-2xl p-5 text-center border ${isReturn ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
            <div className="text-lg font-bold mb-1">{isReturn ? '✅ Te devuelven' : '💳 Tienes que pagar'}</div>
            <div className={`text-4xl font-bold ${isReturn ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {fmt(Math.abs(resultado))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
