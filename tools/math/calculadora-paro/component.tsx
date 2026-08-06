'use client';
import { useState } from 'react';

const IPREM_DIARIO = 20.09;
const MAX_BASE = 4909.58 / 30;
const MIN_BASE_SH = IPREM_DIARIO * 7 * 30; // sin hijos mensual
const MIN_BASE_CH = IPREM_DIARIO * 7 * 30 * 1.75; // con hijos

function calcularDuracion(diasCotizados: number): number {
  if (diasCotizados < 360) return 0;
  const tabla = [
    [539, 120], [719, 180], [899, 240], [1079, 300],
    [1259, 360], [1439, 420], [1619, 480], [1799, 540],
    [1979, 600], [2159, 660], [9999, 720],
  ];
  for (const [min, dias] of tabla) {
    if (diasCotizados <= min) return dias;
  }
  return 720;
}

const fmt = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export default function CalculadoraParo() {
  const [base, setBase] = useState('2000');
  const [diasCotizados, setDiasCotizados] = useState('730');
  const [hijos, setHijos] = useState(false);

  const baseNum = parseFloat(base) || 0;
  const dias = parseInt(diasCotizados) || 0;
  const duracionDias = calcularDuracion(dias);
  const duracionMeses = Math.round(duracionDias / 30);

  // Cuantía
  const br = baseNum; // base reguladora mensual
  const cuantia70 = br * 0.70;
  const cuantia50 = br * 0.50;

  // Máximos y mínimos 2026
  const maxSH = 1570;
  const maxCH1 = 1817; // 1 hijo
  const maxCH2 = 2063; // 2+ hijos
  const minSH = 560;
  const minCH = 749;

  const maximo = hijos ? maxCH1 : maxSH;
  const minimo = hijos ? minCH : minSH;

  const cuantia1 = Math.max(minimo, Math.min(maximo, cuantia70));
  const cuantia2 = Math.max(minimo, Math.min(maximo, cuantia50));

  const dias70 = Math.min(180, duracionDias);
  const dias50 = Math.max(0, duracionDias - 180);

  const totalEstimado = (cuantia1 * dias70 / 30) + (cuantia2 * dias50 / 30);

  const BTN = 'px-4 py-2 rounded-xl text-sm font-medium transition-colors';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Base reguladora mensual (media últimos 6 meses)</label>
          <div className="relative">
            <input type="number" value={base} onChange={e => setBase(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Mira tu nómina: base de cotización por contingencias profesionales</p>
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Días cotizados en los últimos 6 años</label>
          <input type="number" value={diasCotizados} onChange={e => setDiasCotizados(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">¿Tienes hijos a cargo?</label>
          <div className="flex gap-2">
            <button onClick={() => setHijos(false)} className={`${BTN} flex-1 ${!hijos ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>No</button>
            <button onClick={() => setHijos(true)} className={`${BTN} flex-1 ${hijos ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>Sí</button>
          </div>
        </div>
      </div>

      {duracionDias === 0 ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-300">
          Con menos de 360 días cotizados no tienes derecho a prestación contributiva. Puedes solicitar el subsidio por desempleo si cumples otros requisitos.
        </div>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
              <div className="text-xs text-indigo-500 dark:text-indigo-400 mb-1">Duración</div>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{duracionMeses} meses</div>
              <div className="text-xs text-gray-500">({duracionDias} días)</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <div className="text-xs text-green-500 dark:text-green-400 mb-1">Total estimado</div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">{fmt(totalEstimado)}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
            <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Desglose de la prestación</div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Primeros 180 días (70%)</span>
              <span className="font-semibold text-gray-900 dark:text-white">{fmt(cuantia1)}/mes</span>
            </div>
            {duracionDias > 180 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">A partir del día 181 (50%)</span>
                <span className="font-semibold text-gray-900 dark:text-white">{fmt(cuantia2)}/mes</span>
              </div>
            )}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Máximo 2026</span><span>{fmt(maximo)}/mes</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Mínimo 2026</span><span>{fmt(minimo)}/mes</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
            <strong>Importante:</strong> Esta calculadora ofrece una estimación orientativa. El SEPE calculará tu prestación exacta basándose en tu historial de cotizaciones oficial.
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Guía rápida de cotización</div>
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          {[
            ['360–539 días', '4 meses'],
            ['540–719 días', '6 meses'],
            ['720–899 días', '8 meses'],
            ['900–1.079 días', '10 meses'],
            ['1.080–1.259 días', '12 meses'],
            ['Más de 2.160 días', '24 meses (máx.)'],
          ].map(([c, d]) => (
            <div key={c} className="flex justify-between bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1">
              <span className="text-gray-500">{c}</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
