'use client';
import { useState } from 'react';

const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

// Depreciación acumulada por año (% del valor original que conserva)
function valorResidual(años: number): number {
  const tabla: Record<number, number> = {
    0: 1.00, 1: 0.78, 2: 0.68, 3: 0.59, 4: 0.52,
    5: 0.46, 6: 0.41, 7: 0.37, 8: 0.33, 9: 0.30,
    10: 0.27, 11: 0.25, 12: 0.23, 13: 0.21, 14: 0.20, 15: 0.18,
  };
  if (años <= 0) return 1;
  if (años >= 15) return 0.15;
  return tabla[años] ?? (0.18 - (años - 14) * 0.01);
}

type Estado = 'excelente' | 'bueno' | 'normal' | 'deteriorado';
const FACTOR_ESTADO: Record<Estado, number> = {
  excelente: 1.10, bueno: 1.00, normal: 0.90, deteriorado: 0.75,
};
const LABEL_ESTADO: Record<Estado, string> = {
  excelente: '⭐ Excelente', bueno: '✅ Bueno', normal: '⚠️ Normal', deteriorado: '🔧 Deteriorado',
};

export default function PrecioVentaCoche() {
  const [precioNuevo, setPrecioNuevo] = useState('25000');
  const [años, setAños] = useState('4');
  const [km, setKm] = useState('60000');
  const [estado, setEstado] = useState<Estado>('bueno');

  const precio = parseFloat(precioNuevo) || 0;
  const añosN = parseInt(años) || 0;
  const kmN = parseInt(km) || 0;

  const kmEsperados = añosN * 17500;
  const difKm = kmN - kmEsperados;
  const ajusteKm = -difKm * 0.07 / 1000; // ±0.07€ por km de diferencia, en miles

  const baseResidual = valorResidual(añosN);
  const valorBase = precio * baseResidual;
  const valorConKm = valorBase * (1 + ajusteKm / 100);
  const valorFinal = valorConKm * FACTOR_ESTADO[estado];

  const precioMin = valorFinal * 0.90;
  const precioMax = valorFinal * 1.10;
  const depreciacion = precio - valorFinal;
  const pctDepreciacion = (depreciacion / precio) * 100;

  const BTN = 'px-3 py-2 rounded-xl text-xs font-medium transition-colors flex-1 text-center';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Precio de nuevo (€)</label>
          <input type="number" value={precioNuevo} onChange={e => setPrecioNuevo(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Años de antigüedad</label>
          <input type="number" value={años} onChange={e => setAños(e.target.value)} min="0" max="20"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div className="col-span-2">
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Kilometraje actual</label>
          <input type="number" value={km} onChange={e => setKm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
          <p className="text-xs text-gray-400 mt-1">Km medios esperados: {(añosN * 17500).toLocaleString('es-ES')} km
            {difKm > 0 ? ` (${difKm.toLocaleString('es-ES')} km de más → penaliza precio)` : difKm < 0 ? ` (${Math.abs(difKm).toLocaleString('es-ES')} km de menos → bonifica precio)` : ''}
          </p>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Estado de conservación</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(FACTOR_ESTADO) as Estado[]).map(e => (
            <button key={e} onClick={() => setEstado(e)}
              className={`${BTN} ${estado === e ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {LABEL_ESTADO[e]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 text-center">
        <div className="text-xs text-indigo-500 mb-1">Precio de venta estimado</div>
        <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt0(valorFinal)}</div>
        <div className="text-xs text-gray-500 mt-1">Rango recomendado: {fmt0(precioMin)} – {fmt0(precioMax)}</div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <div className="text-xs text-gray-500 mb-1">Valor residual</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{(baseResidual * 100).toFixed(0)}%</div>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
          <div className="text-xs text-red-500 mb-1">Depreciación</div>
          <div className="text-sm font-bold text-red-700 dark:text-red-300">{fmt0(depreciacion)}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          <div className="text-xs text-gray-500 mb-1">Pérdida total</div>
          <div className="text-sm font-bold text-gray-700 dark:text-gray-300">{pctDepreciacion.toFixed(0)}%</div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
        💡 Compara con Coches.net o AutoScout24 buscando tu modelo exacto con km similares para afinar el precio real de mercado.
      </div>
    </div>
  );
}
