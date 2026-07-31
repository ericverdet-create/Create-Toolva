'use client';
import { useState } from 'react';

const DENOMINACIONES = [
  { val: 50000, label: '500 €', tipo: 'billete' },
  { val: 20000, label: '200 €', tipo: 'billete' },
  { val: 10000, label: '100 €', tipo: 'billete' },
  { val: 5000,  label: '50 €',  tipo: 'billete' },
  { val: 2000,  label: '20 €',  tipo: 'billete' },
  { val: 1000,  label: '10 €',  tipo: 'billete' },
  { val: 500,   label: '5 €',   tipo: 'billete' },
  { val: 200,   label: '2 €',   tipo: 'moneda' },
  { val: 100,   label: '1 €',   tipo: 'moneda' },
  { val: 50,    label: '50 ct', tipo: 'moneda' },
  { val: 20,    label: '20 ct', tipo: 'moneda' },
  { val: 10,    label: '10 ct', tipo: 'moneda' },
  { val: 5,     label: '5 ct',  tipo: 'moneda' },
  { val: 2,     label: '2 ct',  tipo: 'moneda' },
  { val: 1,     label: '1 ct',  tipo: 'moneda' },
];

function desglose(centimos: number) {
  let resto = centimos;
  return DENOMINACIONES.map(d => {
    const cantidad = Math.floor(resto / d.val);
    resto -= cantidad * d.val;
    return { ...d, cantidad };
  }).filter(d => d.cantidad > 0);
}

export default function BilleteMonedas() {
  const [cantidad, setCantidad] = useState('87.35');
  const [modo, setModo] = useState<'exacto' | 'billetes'>('exacto');

  const num = parseFloat(cantidad) || 0;
  const centimos = Math.round(num * 100);

  // Modo exacto: mínimas piezas
  const resultado = desglose(centimos);
  const totalPiezas = resultado.reduce((s, r) => s + r.cantidad, 0);

  // Modo "solo billetes": redondear al billete siguiente y dar cambio
  const denominacionesBilletes = DENOMINACIONES.filter(d => d.tipo === 'billete');
  const siguienteBillete = denominacionesBilletes.find(d => d.val >= centimos);
  const cambio = siguienteBillete ? siguienteBillete.val - centimos : null;
  const resultadoCambio = cambio !== null && cambio > 0 ? desglose(cambio) : [];

  const fmt = (n: number) => (n / 100).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cantidad (€)</label>
        <input type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} min="0" step="0.01"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-2xl font-bold text-center" />
      </div>

      <div className="flex gap-2">
        {([['exacto', '💶 Importe exacto'], ['billetes', '💵 Pago con billete']] as const).map(([v, l]) => (
          <button key={v} onClick={() => setModo(v)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${modo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {l}
          </button>
        ))}
      </div>

      {num > 0 && (
        <div className="space-y-3">
          {modo === 'exacto' ? (
            <>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{totalPiezas} piezas para {fmt(centimos)} €</div>
              <div className="space-y-2">
                {resultado.map(r => (
                  <div key={r.val} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.tipo === 'billete' ? '💵' : '🪙'}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{r.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">× {r.cantidad}</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 w-20 text-right">{fmt(r.val * r.cantidad)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {siguienteBillete ? (
                <div className="space-y-3">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
                    <div className="text-xs text-indigo-600 dark:text-indigo-400">Paga con un billete de</div>
                    <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{siguienteBillete.label}</div>
                    {cambio !== null && cambio > 0 && (
                      <div className="text-sm text-indigo-500 dark:text-indigo-400 mt-1">Te devuelven {fmt(cambio)} €</div>
                    )}
                    {cambio === 0 && <div className="text-sm text-green-600 dark:text-green-400 mt-1">¡Importe exacto!</div>}
                  </div>
                  {resultadoCambio.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Cambio que recibirás:</div>
                      {resultadoCambio.map(r => (
                        <div key={r.val} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-2">
                          <div className="flex items-center gap-2">
                            <span>{r.tipo === 'billete' ? '💵' : '🪙'}</span>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{r.label} × {r.cantidad}</span>
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{fmt(r.val * r.cantidad)} €</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">No hay billete disponible para esta cantidad</div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
