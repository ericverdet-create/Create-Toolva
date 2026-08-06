'use client';
import { useState } from 'react';

// Tramos IRPF España 2024 (estatal + autonómico aproximado Madrid)
const TRAMOS_ESTATAL = [
  { desde: 0, hasta: 12450, tipo: 9.5 },
  { desde: 12450, hasta: 20200, tipo: 12 },
  { desde: 20200, hasta: 35200, tipo: 15 },
  { desde: 35200, hasta: 60000, tipo: 18.5 },
  { desde: 60000, hasta: 300000, tipo: 22.5 },
  { desde: 300000, hasta: Infinity, tipo: 24.5 },
];

const TRAMOS_AUTONOMICO_MADRID = [
  { desde: 0, hasta: 12450, tipo: 8.5 },
  { desde: 12450, hasta: 17707.2, tipo: 10.7 },
  { desde: 17707.2, hasta: 33007.2, tipo: 12.9 },
  { desde: 33007.2, hasta: 53407.2, tipo: 17.9 },
  { desde: 53407.2, hasta: 120000.2, tipo: 21.0 },
  { desde: 120000.2, hasta: Infinity, tipo: 22.0 },
];

function calcularCuota(base: number, tramos: typeof TRAMOS_ESTATAL): { cuota: number; desglose: { desde: number; hasta: number; tipo: number; cuota: number; base: number }[] } {
  let cuota = 0;
  const desglose = [];
  for (const t of tramos) {
    if (base <= t.desde) break;
    const baseTramo = Math.min(base, t.hasta) - t.desde;
    const cuotaTramo = baseTramo * t.tipo / 100;
    cuota += cuotaTramo;
    desglose.push({ desde: t.desde, hasta: Math.min(base, t.hasta), tipo: t.tipo, cuota: cuotaTramo, base: baseTramo });
    if (base <= t.hasta) break;
  }
  return { cuota, desglose };
}

export default function CalculadoraIrpf() {
  const [salario, setSalario] = useState('30000');
  const [hijos, setHijos] = useState('0');
  const [discapacidad, setDiscapacidad] = useState(false);
  const [mostrarDesglose, setMostrarDesglose] = useState(false);

  const bruto = parseFloat(salario) || 0;
  const numHijos = parseInt(hijos) || 0;

  // Mínimo personal y familiar
  const minimoPersonal = 5550;
  const minimoHijos = numHijos >= 1 ? 2400 : 0 +
    (numHijos >= 2 ? 2700 : 0) +
    (numHijos >= 3 ? 4000 : 0) +
    (numHijos >= 4 ? 4500 : 0);
  const minimoDependencia = discapacidad ? 3000 : 0;
  const minimoTotal = minimoPersonal + minimoHijos + minimoDependencia;

  // Reducción trabajo
  const reduccionTrabajo = bruto <= 14852 ? 6498 : bruto <= 17690.67 ? 6498 - 1.14286 * (bruto - 13115) : 0;
  const baseImponible = Math.max(0, bruto - reduccionTrabajo);

  // SS aprox 6.35%
  const ss = bruto * 0.0635;
  const baseIRPF = Math.max(0, baseImponible - ss);

  const { cuota: cuotaEstatal, desglose: desEstatal } = calcularCuota(baseIRPF, TRAMOS_ESTATAL);
  const { cuota: cuotaAuto, desglose: desAuto } = calcularCuota(baseIRPF, TRAMOS_AUTONOMICO_MADRID);

  // Mínimos sobre el impuesto
  const { cuota: minimoEstatalImp } = calcularCuota(minimoTotal, TRAMOS_ESTATAL);
  const { cuota: minimoAutoImp } = calcularCuota(minimoTotal, TRAMOS_AUTONOMICO_MADRID);

  const cuotaFinalEstatal = Math.max(0, cuotaEstatal - minimoEstatalImp);
  const cuotaFinalAuto = Math.max(0, cuotaAuto - minimoAutoImp);
  const irpfTotal = cuotaFinalEstatal + cuotaFinalAuto;
  const retencionMensual = irpfTotal / 12;
  const tipoMedio = bruto > 0 ? (irpfTotal / bruto * 100) : 0;
  const tipoMarginal = TRAMOS_ESTATAL.concat(TRAMOS_AUTONOMICO_MADRID).filter(t => baseIRPF > t.desde).pop()?.tipo || 0;
  const neto = bruto - irpfTotal - ss;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
  const fmtPct = (n: number) => n.toFixed(2) + '%';

  return (
    <div className="space-y-4">
      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
        ⚠️ Estimación orientativa. IRPF estatal + autonómico Madrid 2024. No incluye deducciones autonómicas específicas ni situaciones complejas.
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Salario bruto anual</label>
          <div className="relative">
            <input type="number" value={salario} onChange={e => setSalario(e.target.value)} min="0" step="100"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Hijos a cargo</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setHijos(h => String(Math.max(0, parseInt(h) - 1)))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300">−</button>
            <span className="flex-1 text-center font-bold text-gray-900 dark:text-white">{hijos}</span>
            <button onClick={() => setHijos(h => String(parseInt(h) + 1))} className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-gray-700 dark:text-gray-300">+</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Discapacidad &gt;33%</label>
          <button onClick={() => setDiscapacidad(v => !v)}
            className={`w-full py-2 rounded-xl text-xs font-medium ${discapacidad ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {discapacidad ? '✓ Sí' : 'No'}
          </button>
        </div>
      </div>

      {bruto > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <div className="text-red-500 dark:text-red-400">IRPF anual</div>
              <div className="font-bold text-red-700 dark:text-red-300 text-xl">{fmt(irpfTotal)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3">
              <div className="text-gray-500 dark:text-gray-400">Retención mensual aprox.</div>
              <div className="font-bold text-gray-900 dark:text-white text-xl">{fmt(retencionMensual)}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: 'Tipo medio', val: fmtPct(tipoMedio), color: 'text-orange-600 dark:text-orange-400' },
              { label: 'Tipo marginal', val: fmtPct(tipoMarginal), color: 'text-red-600 dark:text-red-400' },
              { label: 'SS (6,35%)', val: fmt(ss), color: 'text-gray-600 dark:text-gray-400' },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                <div className="text-gray-400">{r.label}</div>
                <div className={`font-bold ${r.color}`}>{r.val}</div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center">
            <div className="text-xs text-green-600 dark:text-green-400">Salario neto anual estimado</div>
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">{fmt(neto)}</div>
            <div className="text-xs text-green-500 dark:text-green-400">{fmt(neto / 12)} / mes</div>
          </div>

          <button onClick={() => setMostrarDesglose(v => !v)}
            className="w-full py-2 text-xs text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
            {mostrarDesglose ? '▲ Ocultar tramos' : '▼ Ver tramos IRPF'}
          </button>

          {mostrarDesglose && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden text-xs">
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-800 font-medium text-gray-600 dark:text-gray-400">Tramos estatales (base: {fmt(baseIRPF)})</div>
              {desEstatal.map((t, i) => (
                <div key={i} className="flex justify-between px-3 py-1.5 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-500">{t.tipo}% sobre {fmt(t.base)}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{fmt(t.cuota)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA Afiliado — Declaración de la Renta / IRPF */}
      <div className="mt-4 rounded-2xl border border-orange-100 dark:border-orange-900/40 bg-orange-50 dark:bg-orange-900/10 p-4">
        <p className="text-xs font-semibold text-orange-700 dark:text-orange-400 mb-2 uppercase tracking-wide">¿Haces bien tu declaración?</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Con un asesor fiscal online puedes recuperar más dinero en tu declaración de la renta. Muchos contribuyentes dejan cientos de euros sin reclamar.</p>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.declarando.es" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium rounded-lg transition-colors">
            Declarar con asesor →
          </a>
          <a href="https://www.taxfix.es" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-800 hover:border-orange-400 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-lg transition-colors">
            TaxFix →
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Enlace patrocinado. Sin coste para ti.</p>
      </div>
    </div>
  );
}
