'use client';
import { useState } from 'react';

// Coeficientes máximos IIVTNU (RDL 26/2021) por años de tenencia
const COEFICIENTES: Record<number, number> = {
  1: 0.14, 2: 0.13, 3: 0.15, 4: 0.17, 5: 0.17,
  6: 0.16, 7: 0.12, 8: 0.10, 9: 0.09, 10: 0.08,
  11: 0.08, 12: 0.08, 13: 0.08, 14: 0.10, 15: 0.12,
  16: 0.16, 17: 0.20, 18: 0.26, 19: 0.36, 20: 0.45,
};

export default function PlusvaliaCalculator() {
  const [valorCatastral, setValorCatastral] = useState('100000');
  const [porcentajeSuelo, setPorcentajeSuelo] = useState('60');
  const [años, setAnos] = useState('10');
  const [tipoImpuesto, setTipoImpuesto] = useState('30');
  const [method, setMethod] = useState<'objetivo' | 'real'>('objetivo');
  const [precioCompra, setPrecioCompra] = useState('120000');
  const [precioVenta, setPrecioVenta] = useState('180000');

  const vc = parseFloat(valorCatastral) || 0;
  const pct = Math.min(100, Math.max(0, parseFloat(porcentajeSuelo) || 0));
  const n = Math.min(20, Math.max(1, parseInt(años) || 1));
  const tipo = parseFloat(tipoImpuesto) || 0;
  const pc = parseFloat(precioCompra) || 0;
  const pv = parseFloat(precioVenta) || 0;

  const valorSuelo = vc * (pct / 100);
  const coef = COEFICIENTES[n] ?? 0.45;

  // Método objetivo (nuevo desde 2021)
  const baseImponibleObjetivo = valorSuelo * coef;
  const cuotaObjetivo = baseImponibleObjetivo * (tipo / 100);

  // Método real (plusvalía real de la venta)
  const gananciaTotal = pv - pc;
  const gananciaSuelo = gananciaTotal * (pct / 100);
  const cuotaReal = Math.max(0, gananciaSuelo) * (tipo / 100);

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const selectedBase = method === 'objetivo' ? baseImponibleObjetivo : Math.max(0, gananciaSuelo);
  const selectedCuota = method === 'objetivo' ? cuotaObjetivo : cuotaReal;

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
        ℹ️ Desde el RDL 26/2021 puedes elegir el método que resulte más favorable: objetivo (basado en valor catastral) o real (basado en la ganancia real).
      </div>

      <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {([['objetivo', 'Método Objetivo'], ['real', 'Método Real (plusvalía real)']] as const).map(([key, label]) => (
          <button key={key} onClick={() => setMethod(key)}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${method === key ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Valor catastral total (€)</label>
          <input type="number" value={valorCatastral} onChange={e => setValorCatastral(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">% suelo del valor catastral</label>
          <input type="number" value={porcentajeSuelo} onChange={e => setPorcentajeSuelo(e.target.value)} min="0" max="100"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años de tenencia (1-20)</label>
          <input type="number" value={años} onChange={e => setAnos(e.target.value)} min="1" max="20"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo impositivo municipal (%)</label>
          <input type="number" value={tipoImpuesto} onChange={e => setTipoImpuesto(e.target.value)} min="0" max="30"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        {method === 'real' && (
          <>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio de compra (€)</label>
              <input type="number" value={precioCompra} onChange={e => setPrecioCompra(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio de venta (€)</label>
              <input type="number" value={precioVenta} onChange={e => setPrecioVenta(e.target.value)} min="0"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            </div>
          </>
        )}
      </div>

      {vc > 0 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: 'Valor catastral suelo', val: fmt(valorSuelo) },
              { label: 'Coeficiente (años ' + n + ')', val: coef },
            ].map(r => (
              <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 space-y-2">
            <div className="text-sm font-medium text-indigo-800 dark:text-indigo-300 text-center mb-3">
              {method === 'objetivo' ? '📐 Método Objetivo' : '📊 Método Real'}
            </div>
            {[
              { label: 'Base imponible', val: fmt(selectedBase), big: false },
              { label: 'Tipo impositivo', val: tipo + '%', big: false },
              { label: '💰 Cuota a pagar', val: fmt(selectedCuota), big: true },
            ].map(r => (
              <div key={r.label} className={`flex justify-between ${r.big ? 'font-bold text-indigo-700 dark:text-indigo-300 text-lg border-t border-indigo-200 dark:border-indigo-700 pt-2 mt-2' : 'text-sm text-gray-600 dark:text-gray-400'}`}>
                <span>{r.label}</span><span>{r.val}</span>
              </div>
            ))}
          </div>

          {method === 'real' && gananciaTotal <= 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-sm text-green-700 dark:text-green-300 text-center">
              ✅ No hay ganancia — puede estar exento de plusvalía municipal
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Puedes aplicar el método más favorable. Cada municipio puede tener tipos diferentes. Consulta con un asesor fiscal para confirmar.
          </div>
        </div>
      )}
    </div>
  );
}
