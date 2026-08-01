'use client';
import { useState } from 'react';

export default function CalculadoraTae() {
  const [capital, setCapital] = useState('10000');
  const [tin, setTin] = useState('6');
  const [plazo, setPlazo] = useState('36');
  const [comisionApertura, setComisionApertura] = useState('1');
  const [comisionEstudio, setComisionEstudio] = useState('0');
  const [seguroMensual, setSeguroMensual] = useState('0');

  const C = parseFloat(capital) || 0;
  const tinRate = (parseFloat(tin) || 0) / 100 / 12;
  const n = parseInt(plazo) || 12;
  const comApertura = (parseFloat(comisionApertura) || 0) / 100 * C;
  const comEstudio = (parseFloat(comisionEstudio) || 0) / 100 * C;
  const seguro = parseFloat(seguroMensual) || 0;

  // Cuota mensual con TIN
  const cuotaTin = tinRate > 0 ? (C * tinRate * Math.pow(1 + tinRate, n)) / (Math.pow(1 + tinRate, n) - 1) : C / n;
  const totalTin = cuotaTin * n;
  const cuotaReal = cuotaTin + seguro;
  const totalReal = cuotaReal * n + comApertura + comEstudio;

  // Calcular TAE por Newton-Raphson
  // TAE mensual r tal que: C_neto = cuotaReal / r * (1 - (1+r)^-n) + comisiones
  // Capital neto recibido = C - comApertura - comEstudio
  const Cneto = C - comApertura - comEstudio;
  let taeM = tinRate;
  for (let i = 0; i < 100; i++) {
    const f = cuotaReal * (1 - Math.pow(1 + taeM, -n)) / taeM - Cneto;
    const df = cuotaReal * (n * Math.pow(1 + taeM, -n - 1) / taeM - (1 - Math.pow(1 + taeM, -n)) / (taeM * taeM));
    const next = taeM - f / df;
    if (Math.abs(next - taeM) < 1e-8) { taeM = next; break; }
    taeM = next;
  }
  const tae = (Math.pow(1 + taeM, 12) - 1) * 100;
  const diferencia = tae - parseFloat(tin);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
        💡 El <strong>TIN</strong> es el interés puro. La <strong>TAE</strong> incluye comisiones y seguros obligatorios — siempre es mayor. Compara TAEs para elegir el mejor préstamo.
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital</label>
          <div className="relative">
            <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">TIN anual (%)</label>
          <div className="relative">
            <input type="number" value={tin} onChange={e => setTin(e.target.value)} min="0" step="0.01"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Plazo (meses)</label>
          <input type="number" value={plazo} onChange={e => setPlazo(e.target.value)} min="1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Comisión apertura (%)</label>
          <div className="relative">
            <input type="number" value={comisionApertura} onChange={e => setComisionApertura(e.target.value)} min="0" step="0.1"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Comisión estudio (%)</label>
          <div className="relative">
            <input type="number" value={comisionEstudio} onChange={e => setComisionEstudio(e.target.value)} min="0" step="0.1"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Seguro mensual obligatorio</label>
          <div className="relative">
            <input type="number" value={seguroMensual} onChange={e => setSeguroMensual(e.target.value)} min="0" step="1"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
      </div>

      {C > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">TIN</div>
              <div className="text-3xl font-bold text-gray-700 dark:text-gray-300">{tin}%</div>
              <div className="text-xs text-gray-400">Cuota: {fmt(cuotaTin)} €/mes</div>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
              <div className="text-xs text-indigo-600 dark:text-indigo-400">TAE real</div>
              <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{isFinite(tae) ? fmt(tae) : '—'}%</div>
              <div className="text-xs text-indigo-500 dark:text-indigo-400">Cuota total: {fmt(cuotaReal)} €/mes</div>
            </div>
          </div>
          {diferencia > 0.01 && (
            <div className="text-center text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-2">
              ⚠️ Las comisiones y seguros encarecen el préstamo +{fmt(diferencia)} puntos sobre el TIN
            </div>
          )}
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            {[
              { label: 'Total a pagar (TIN)', val: fmt(totalTin) + ' €' },
              { label: 'Total real (TAE)', val: fmt(totalReal) + ' €' },
              { label: 'Comisiones totales', val: fmt(comApertura + comEstudio) + ' €' },
              { label: 'Sobrecoste total', val: fmt(totalReal - C) + ' €' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
