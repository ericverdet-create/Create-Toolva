'use client';
import { useState } from 'react';

export default function RentabilidadAlquiler() {
  const [precioCompra, setPrecioCompra] = useState('180000');
  const [gastosCompra, setGastosCompra] = useState('12');  // % sobre precio
  const [alquilerMes, setAlquilerMes] = useState('900');
  const [mesesOcupado, setMesesOcupado] = useState('11');
  const [ibi, setIbi] = useState('400');
  const [comunidad, setComunidad] = useState('600');
  const [seguro, setSeguro] = useState('200');
  const [reparaciones, setReparaciones] = useState('300');
  const [irpf, setIrpf] = useState('19');

  const pc = parseFloat(precioCompra) || 0;
  const gc = parseFloat(gastosCompra) || 0;
  const am = parseFloat(alquilerMes) || 0;
  const mo = parseFloat(mesesOcupado) || 12;
  const ibiAnual = parseFloat(ibi) || 0;
  const comAnual = parseFloat(comunidad) || 0;
  const segAnual = parseFloat(seguro) || 0;
  const repAnual = parseFloat(reparaciones) || 0;
  const irpfPct = parseFloat(irpf) || 19;

  const inversionTotal = pc * (1 + gc / 100);
  const ingresosAnuales = am * mo;
  const gastosAnuales = ibiAnual + comAnual + segAnual + repAnual;

  const rentaBruta = inversionTotal > 0 ? (ingresosAnuales / inversionTotal) * 100 : 0;

  // Deducción IRPF: 60% reducción sobre rendimiento neto para vivienda habitual
  const rendimientoNeto = ingresosAnuales - gastosAnuales;
  const reduccion = rendimientoNeto > 0 ? rendimientoNeto * 0.60 : 0;
  const baseImponible = rendimientoNeto - reduccion;
  const impuesto = baseImponible > 0 ? baseImponible * (irpfPct / 100) : 0;

  const ingresoNeto = rendimientoNeto - impuesto;
  const rentaNeta = inversionTotal > 0 ? (ingresoNeto / inversionTotal) * 100 : 0;
  const paybackAnios = rentaNeta > 0 ? 100 / rentaNeta : null;

  const fmt = (n: number, dec = 0) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const fmt2 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rentaColor = rentaNeta >= 5 ? 'green' : rentaNeta >= 3 ? 'yellow' : 'red';
  const colorMap: Record<string, string> = {
    green: 'text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    yellow: 'text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
    red: 'text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio de compra (€)</label>
          <input type="number" value={precioCompra} onChange={e => setPrecioCompra(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Gastos compra (ITP/IVA+notaría %)</label>
          <input type="number" value={gastosCompra} onChange={e => setGastosCompra(e.target.value)} min="0" max="20"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Alquiler mensual (€)</label>
          <input type="number" value={alquilerMes} onChange={e => setAlquilerMes(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Meses ocupado al año</label>
          <input type="number" value={mesesOcupado} onChange={e => setMesesOcupado(e.target.value)} min="1" max="12"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Gastos anuales deducibles (€)</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'IBI', val: ibi, set: setIbi },
            { label: 'Comunidad', val: comunidad, set: setComunidad },
            { label: 'Seguro hogar', val: seguro, set: setSeguro },
            { label: 'Reparaciones', val: reparaciones, set: setReparaciones },
          ].map(({ label, val, set }) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</label>
              <input type="number" value={val} onChange={e => set(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-indigo-400 focus:outline-none text-xs" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo IRPF marginal (%)</label>
        <input type="number" value={irpf} onChange={e => setIrpf(e.target.value)} min="0" max="50"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      {pc > 0 && am > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Rentabilidad bruta</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{fmt2(rentaBruta)}%</div>
            </div>
            <div className={`border rounded-xl p-3 text-center ${colorMap[rentaColor]}`}>
              <div className="text-xs opacity-80">Rentabilidad neta</div>
              <div className="text-2xl font-bold">{fmt2(rentaNeta)}%</div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Inversión total', val: fmt(inversionTotal) + ' €' },
                { label: 'Ingresos anuales', val: fmt(ingresosAnuales) + ' €' },
                { label: 'Gastos anuales', val: fmt(gastosAnuales) + ' €' },
                { label: 'Rend. neto tras IRPF', val: fmt(ingresoNeto) + ' €' },
                ...(paybackAnios ? [{ label: 'Recuperar inversión en', val: fmt(paybackAnios, 1) + ' años' }] : []),
              ].map(r => (
                <div key={r.label} className="flex flex-col">
                  <span className="text-indigo-600 dark:text-indigo-400">{r.label}</span>
                  <span className="font-bold text-indigo-800 dark:text-indigo-200">{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Aplica la reducción del 60% en IRPF solo si el inmueble se destina a vivienda habitual del arrendatario (Ley IRPF art. 23.2). Consulta con un asesor para tu caso concreto.
          </div>
        </div>
      )}
    </div>
  );
}
