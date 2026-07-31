'use client';
import { useState } from 'react';

const QUARTERS = ['1T (Ene–Mar)', '2T (Abr–Jun)', '3T (Jul–Sep)', '4T (Oct–Dic)'];

export default function PagoFraccionado() {
  const [quarter, setQuarter] = useState(0);
  const [ingresos, setIngresos] = useState('15000');
  const [gastos, setGastos] = useState('3000');
  const [pagosAnt, setPagosAnt] = useState('0');
  const [retencionesAnt, setRetencionesAnt] = useState('0');
  const [retencionesTrim, setRetencionesTrim] = useState('0');

  const ing = parseFloat(ingresos) || 0;
  const gas = parseFloat(gastos) || 0;
  const ant = parseFloat(pagosAnt) || 0;
  const retAnt = parseFloat(retencionesAnt) || 0;
  const retTrim = parseFloat(retencionesTrim) || 0;

  const rendimientoNeto = Math.max(0, ing - gas);
  const base = rendimientoNeto * 0.20; // 20% sobre rendimiento neto
  const deduccionPagosAnt = ant;
  const deduccionRetenciones = retAnt + retTrim;
  const resultado = base - deduccionPagosAnt - deduccionRetenciones;
  const aPagar = Math.max(0, resultado);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
        ℹ️ Modelo 130 — Estimación directa. El pago fraccionado es el 20% del rendimiento neto acumulado, menos pagos anteriores y retenciones soportadas.
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Trimestre</label>
        <div className="grid grid-cols-2 gap-2">
          {QUARTERS.map((q, i) => (
            <button key={i} onClick={() => setQuarter(i)}
              className={`py-2 px-3 rounded-xl text-sm font-medium transition-colors ${quarter === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {q}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Acumulado desde 1 enero hasta el {quarter === 0 ? '31 marzo' : quarter === 1 ? '30 junio' : quarter === 2 ? '30 septiembre' : '31 diciembre'}</div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Ingresos acumulados (€)', val: ingresos, set: setIngresos },
          { label: 'Gastos deducibles acumulados (€)', val: gastos, set: setGastos },
          { label: 'Pagos fraccionados anteriores (€)', val: pagosAnt, set: setPagosAnt },
          { label: 'Retenciones soportadas anteriores (€)', val: retencionesAnt, set: setRetencionesAnt },
          { label: 'Retenciones soportadas este trimestre (€)', val: retencionesTrim, set: setRetencionesTrim },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" value={f.val} onChange={e => f.set(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-2 text-sm">
        <div className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Cálculo {QUARTERS[quarter]}</div>
        {[
          { label: 'Rendimiento neto (ingresos − gastos)', val: fmt(rendimientoNeto) },
          { label: '× 20% (tipo pago fraccionado)', val: fmt(base) },
          { label: '− Pagos fraccionados anteriores', val: '−' + fmt(deduccionPagosAnt) },
          { label: '− Retenciones soportadas', val: '−' + fmt(deduccionRetenciones) },
        ].map(r => (
          <div key={r.label} className="flex justify-between text-gray-600 dark:text-gray-400">
            <span>{r.label}</span><span>{r.val}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-2">
          <div className={`flex justify-between font-bold text-lg ${aPagar > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            <span>{aPagar > 0 ? '💳 A ingresar' : '✅ Resultado'}</span>
            <span>{aPagar > 0 ? fmt(aPagar) : 'Sin pago (0,00 €)'}</span>
          </div>
          {resultado < 0 && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">El resultado negativo no genera devolución — se aplica 0 €</div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
        📅 Plazos: 1T → 1-20 abril · 2T → 1-20 julio · 3T → 1-20 octubre · 4T → 1-30 enero
      </div>
    </div>
  );
}
