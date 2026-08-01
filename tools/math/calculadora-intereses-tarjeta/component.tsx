'use client';
import { useState } from 'react';

function calcularAmortizacion(deuda: number, tae: number, pago: number): { meses: number; totalIntereses: number; rows: { mes: number; saldo: number; interes: number; principal: number }[] } {
  const tasaMensual = tae / 100 / 12;
  let saldo = deuda;
  let totalIntereses = 0;
  let meses = 0;
  const rows = [];
  while (saldo > 0.01 && meses < 600) {
    meses++;
    const interes = saldo * tasaMensual;
    const principal = Math.min(pago - interes, saldo);
    totalIntereses += interes;
    saldo = Math.max(0, saldo - principal);
    if (rows.length < 12) rows.push({ mes: meses, saldo, interes, principal });
  }
  return { meses, totalIntereses, rows };
}

export default function CalculadoraInteresTarjeta() {
  const [deuda, setDeuda] = useState('2000');
  const [tae, setTae] = useState('22');
  const [modo, setModo] = useState<'minimo' | 'fijo'>('fijo');
  const [pagoFijo, setPagoFijo] = useState('100');
  const [pctMinimo, setPctMinimo] = useState('2');

  const D = parseFloat(deuda) || 0;
  const T = parseFloat(tae) || 0;
  const tasaMensual = T / 100 / 12;
  const pagoMinCalc = D * (parseFloat(pctMinimo) || 2) / 100;
  const pago = modo === 'minimo' ? Math.max(pagoMinCalc, 10) : (parseFloat(pagoFijo) || 0);

  const pagoCubre = pago > D * tasaMensual;
  const { meses, totalIntereses, rows } = pagoCubre && D > 0
    ? calcularAmortizacion(D, T, pago)
    : { meses: 0, totalIntereses: 0, rows: [] };

  const formatM = (m: number) => m >= 12 ? `${Math.floor(m / 12)}a ${m % 12}m` : `${m} meses`;
  const fmt = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Deuda actual</label>
          <div className="relative">
            <input type="number" value={deuda} onChange={e => setDeuda(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl pl-6 pr-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">TAE anual (%)</label>
          <div className="relative">
            <input type="number" value={tae} onChange={e => setTae(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 pr-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Media tarjetas ES: ~20-25%</div>
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {[{ id: 'fijo', label: '💰 Cuota fija' }, { id: 'minimo', label: '📉 Pago mínimo' }].map(m => (
          <button key={m.id} onClick={() => setModo(m.id as 'minimo' | 'fijo')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${modo === m.id ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {modo === 'fijo' ? (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Pago mensual</label>
          <div className="relative">
            <input type="number" value={pagoFijo} onChange={e => setPagoFijo(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl pl-6 pr-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
          </div>
        </div>
      ) : (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">% mínimo sobre deuda</label>
          <div className="flex gap-1">
            {[2, 3, 5].map(p => (
              <button key={p} onClick={() => setPctMinimo(String(p))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${pctMinimo === String(p) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{p}%</button>
            ))}
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Pago mínimo: {fmt(Math.max(pagoMinCalc, 10))}/mes</div>
        </div>
      )}

      {D > 0 && T > 0 && (
        <>
          {!pagoCubre ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl p-3 text-center text-sm text-red-700 dark:text-red-300">
              ⚠️ El pago ({fmt(pago)}/mes) no cubre los intereses mensuales ({fmt(D * tasaMensual)}). La deuda crecerá indefinidamente.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Tiempo para saldar', value: formatM(meses), color: 'text-indigo-600 dark:text-indigo-300' },
                { label: 'Total intereses', value: fmt(totalIntereses), color: 'text-red-600 dark:text-red-300' },
                { label: 'Total pagado', value: fmt(D + totalIntereses), color: 'text-gray-700 dark:text-gray-200' },
              ].map(s => (
                <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2.5 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                  <div className={`text-base font-bold mt-0.5 ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>
          )}

          {pagoCubre && rows.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Primeros 12 meses</div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="text-gray-400">
                    <th className="text-left py-1">Mes</th><th className="text-right py-1">Interés</th>
                    <th className="text-right py-1">Capital</th><th className="text-right py-1">Saldo</th>
                  </tr></thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.mes} className="border-t border-gray-100 dark:border-gray-800">
                        <td className="py-0.5 text-gray-500">{r.mes}</td>
                        <td className="py-0.5 text-right text-red-500">{fmt(r.interes)}</td>
                        <td className="py-0.5 text-right text-green-600">{fmt(r.principal)}</td>
                        <td className="py-0.5 text-right font-mono">{fmt(r.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
