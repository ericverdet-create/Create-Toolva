'use client';
import { useState } from 'react';

export default function SeguroVida() {
  const [edad, setEdad] = useState('35');
  const [ingresos, setIngresos] = useState('30000');
  const [deudas, setDeudas] = useState('80000');
  const [dependientes, setDependientes] = useState('2');
  const [anosProteccion, setAnosProteccion] = useState('20');
  const [fumador, setFumador] = useState(false);

  const e = parseInt(edad) || 35;
  const ing = parseFloat(ingresos) || 0;
  const deu = parseFloat(deudas) || 0;
  const dep = parseInt(dependientes) || 0;
  const anos = parseInt(anosProteccion) || 10;

  // Cálculo capital recomendado (método DIME simplificado)
  const capitalDeudas = deu;
  const capitalIngresos = ing * anos;
  const capitalDependientes = dep * 6000; // gasto anual por dependiente × 5 años
  const capitalTotal = capitalDeudas + capitalIngresos + capitalDependientes;

  // Estimación prima mensual (factores aproximados por edad)
  const factorEdad = e < 30 ? 0.8 : e < 40 ? 1.0 : e < 50 ? 1.8 : e < 60 ? 3.5 : 6.0;
  const factorFumador = fumador ? 2.0 : 1.0;
  // Base: ~0.15€/mes por 1000€ de capital para 35 años no fumador
  const primaMensualBase = (capitalTotal / 1000) * 0.15 * factorEdad * factorFumador;

  const fmt = (n: number) => Math.round(n).toLocaleString('es-ES') + ' €';
  const fmt2 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-4">
      <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
        📌 Estimación orientativa basada en el método DIME. Consulta con un corredor de seguros para una oferta real.
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad</label>
          <input type="number" value={edad} onChange={e => setEdad(e.target.value)} min="18" max="75"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ingresos anuales</label>
          <div className="relative">
            <input type="number" value={ingresos} onChange={e => setIngresos(e.target.value)} min="0" step="1000"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Deudas (hipoteca, etc.)</label>
          <div className="relative">
            <input type="number" value={deudas} onChange={e => setDeudas(e.target.value)} min="0" step="1000"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Dependientes a tu cargo</label>
          <input type="number" value={dependientes} onChange={e => setDependientes(e.target.value)} min="0" max="10"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años de protección</label>
          <div className="flex gap-1.5">
            {[10, 15, 20, 25, 30].map(a => (
              <button key={a} onClick={() => setAnosProteccion(String(a))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${anosProteccion === String(a) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{a}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">¿Fumador?</label>
          <div className="flex gap-2">
            {[['no', '🚭 No fumador', false], ['si', '🚬 Fumador', true]].map(([k, l, v]) => (
              <button key={String(k)} onClick={() => setFumador(v as boolean)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium ${fumador === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{String(l)}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
          <div className="text-xs text-indigo-600 dark:text-indigo-400">Capital asegurado recomendado</div>
          <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(capitalTotal)}</div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { label: '🏠 Deudas', val: fmt(capitalDeudas) },
            { label: '💼 Ingresos', val: fmt(capitalIngresos) },
            { label: '👨‍👩‍👧 Dependientes', val: fmt(capitalDependientes) },
          ].map(r => (
            <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
              <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
            </div>
          ))}
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center">
          <div className="text-xs text-green-600 dark:text-green-400">Prima mensual estimada</div>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">{fmt2(primaMensualBase)}</div>
          <div className="text-xs text-green-500 dark:text-green-500">{fmt2(primaMensualBase * 12)} al año</div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-1">
          <div>• Factor edad aplicado: ×{e < 30 ? '0,8' : e < 40 ? '1,0' : e < 50 ? '1,8' : e < 60 ? '3,5' : '6,0'}</div>
          {fumador && <div>• Factor fumador aplicado: ×2,0</div>}
          <div>• La prima real varía según compañía, salud y cobertura exacta</div>
        </div>
      </div>
    </div>
  );
}
