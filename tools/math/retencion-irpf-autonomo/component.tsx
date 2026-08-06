'use client';
import { useState } from 'react';

const fmt2 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export default function RetencionIrpfAutonomo() {
  const [modo, setModo] = useState<'factura' | 'modelo130'>('factura');
  const [tipoRetencion, setTipoRetencion] = useState<'15' | '7'>('15');
  const [baseFactura, setBaseFactura] = useState('1000');
  const [iva, setIva] = useState<'21' | '10' | '4' | '0'>('21');

  // Modelo 130
  const [ingresosTrimestrales, setIngresosTrimestrales] = useState('9000');
  const [gastosTrimestrales, setGastosTrimestrales] = useState('3000');
  const [retencionesAcumuladas, setRetencionesAcumuladas] = useState('1000');
  const [pagosAnteriores, setPagosAnteriores] = useState('0');

  const base = parseFloat(baseFactura) || 0;
  const pctRet = parseFloat(tipoRetencion) / 100;
  const pctIva = parseFloat(iva) / 100;

  const retencion = base * pctRet;
  const ivaImporte = base * pctIva;
  const total = base + ivaImporte - retencion;

  // Modelo 130
  const ingresos = parseFloat(ingresosTrimestrales) || 0;
  const gastos = parseFloat(gastosTrimestrales) || 0;
  const retenciones = parseFloat(retencionesAcumuladas) || 0;
  const pagos = parseFloat(pagosAnteriores) || 0;
  const beneficio = Math.max(0, ingresos - gastos);
  const pago20 = beneficio * 0.20;
  const pagoFinal = Math.max(0, pago20 - retenciones - pagos);

  const BTN = 'flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-colors';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400';
  const INPUT = 'w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none';

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setModo('factura')} className={`${BTN} ${modo === 'factura' ? active : inactive}`}>🧾 Factura con retención</button>
        <button onClick={() => setModo('modelo130')} className={`${BTN} ${modo === 'modelo130' ? active : inactive}`}>📋 Modelo 130</button>
      </div>

      {modo === 'factura' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Tipo de retención</label>
            <div className="flex gap-2">
              <button onClick={() => setTipoRetencion('15')} className={`${BTN} ${tipoRetencion === '15' ? active : inactive}`}>15% (general)</button>
              <button onClick={() => setTipoRetencion('7')} className={`${BTN} ${tipoRetencion === '7' ? active : inactive}`}>7% (nuevo autónomo)</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Base imponible (€)</label>
              <input type="number" value={baseFactura} onChange={e => setBaseFactura(e.target.value)} className={INPUT} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">IVA</label>
              <select value={iva} onChange={e => setIva(e.target.value as typeof iva)}
                className={INPUT}>
                <option value="21">21% (general)</option>
                <option value="10">10% (reducido)</option>
                <option value="4">4% (superreducido)</option>
                <option value="0">0% (exento)</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            {[
              { label: 'Base imponible', val: fmt2(base), cls: '' },
              { label: `IVA (${iva}%)`, val: `+ ${fmt2(ivaImporte)}`, cls: 'text-blue-600' },
              { label: `Retención IRPF (${tipoRetencion}%)`, val: `− ${fmt2(retencion)}`, cls: 'text-red-500' },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{r.label}</span>
                <span className={`font-medium ${r.cls}`}>{r.val}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>Total a cobrar</span>
              <span className="text-indigo-700 dark:text-indigo-300">{fmt2(total)}</span>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
            La retención de <strong>{fmt2(retencion)}</strong> la ingresa el cliente a Hacienda en tu nombre (modelo 111 trimestral).
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
            Modelo 130 = 20% del beneficio neto trimestral, menos retenciones soportadas y pagos anteriores
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Ingresos del trimestre (€)', val: ingresosTrimestrales, set: setIngresosTrimestrales },
              { label: 'Gastos deducibles del trimestre (€)', val: gastosTrimestrales, set: setGastosTrimestrales },
              { label: 'Retenciones soportadas acumuladas (€)', val: retencionesAcumuladas, set: setRetencionesAcumuladas },
              { label: 'Pagos fraccionados anteriores (€)', val: pagosAnteriores, set: setPagosAnteriores },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
                <input type="number" value={f.val} onChange={e => f.set(e.target.value)} className={INPUT} />
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            {[
              { label: 'Beneficio neto', val: fmt0(beneficio) },
              { label: '20% del beneficio', val: fmt0(pago20) },
              { label: '− Retenciones soportadas', val: `− ${fmt0(retenciones)}` },
              { label: '− Pagos anteriores', val: `− ${fmt0(pagos)}` },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{r.label}</span>
                <span className="font-medium">{r.val}</span>
              </div>
            ))}
            <div className="flex justify-between text-base font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
              <span>A ingresar en Hacienda</span>
              <span className={pagoFinal > 0 ? 'text-red-600' : 'text-green-600'}>{fmt0(pagoFinal)}</span>
            </div>
          </div>

          {pagoFinal === 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-xs text-green-700 dark:text-green-300">
              ✅ Resultado 0 o negativo: presenta el modelo 130 con resultado 0 (sin pagar nada este trimestre).
            </div>
          )}
        </div>
      )}
    </div>
  );
}
