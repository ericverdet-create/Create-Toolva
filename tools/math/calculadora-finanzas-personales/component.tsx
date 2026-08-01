'use client';
import { useState } from 'react';

export default function Regla503020() {
  const [sueldo, setSueldo] = useState('2000');
  const [frecuencia, setFrecuencia] = useState<'mensual' | 'anual'>('mensual');
  const [nec, setNec] = useState(50);
  const [des, setDes] = useState(30);
  const [aho, setAho] = useState(20);

  const base = frecuencia === 'mensual' ? parseFloat(sueldo) || 0 : (parseFloat(sueldo) || 0) / 12;

  const necesidades = base * nec / 100;
  const deseos = base * des / 100;
  const ahorro = base * aho / 100;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';

  const ITEMS_NEC = ['Alquiler/hipoteca', 'Alimentación', 'Suministros (luz, agua, gas)', 'Transporte', 'Salud / seguro médico', 'Mínimo ropa básica'];
  const ITEMS_DES = ['Ocio y entretenimiento', 'Restaurantes', 'Ropa y calzado extra', 'Viajes y vacaciones', 'Suscripciones (Netflix, Spotify)', 'Hobbies'];
  const ITEMS_AHO = ['Fondo de emergencia (3-6 meses gastos)', 'Plan de pensiones / jubilación', 'Inversiones', 'Ahorro para objetivos (casa, coche)', 'Amortización deudas extra'];

  const BLOQUES = [
    { label: 'Necesidades', pct: nec, set: setNec, val: necesidades, color: 'bg-blue-500', lightColor: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', textColor: 'text-blue-700 dark:text-blue-300', items: ITEMS_NEC, desc: 'Gastos esenciales sin los que no puedes vivir' },
    { label: 'Deseos', pct: des, set: setDes, val: deseos, color: 'bg-orange-500', lightColor: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', textColor: 'text-orange-700 dark:text-orange-300', items: ITEMS_DES, desc: 'Gastos que mejoran tu calidad de vida' },
    { label: 'Ahorro', pct: aho, set: setAho, val: ahorro, color: 'bg-green-500', lightColor: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', textColor: 'text-green-700 dark:text-green-300', items: ITEMS_AHO, desc: 'Tu futuro financiero' },
  ];

  const total = nec + des + aho;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ingresos netos</label>
          <div className="relative">
            <input type="number" value={sueldo} onChange={e => setSueldo(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Frecuencia</label>
          <div className="flex gap-1">
            {(['mensual', 'anual'] as const).map(f => (
              <button key={f} onClick={() => setFrecuencia(f)}
                className={`flex-1 py-2 rounded-xl text-xs font-medium ${frecuencia === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barras de porcentaje */}
      <div className="space-y-2">
        {BLOQUES.map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">{b.label}</span>
              <span className="text-gray-500">{b.pct}% · {fmt(b.val)}</span>
            </div>
            <input type="range" min={0} max={100} value={b.pct}
              onChange={e => {
                const v = parseInt(e.target.value);
                b.set(v);
              }}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{ accentColor: b.color.replace('bg-', '').replace('-500', '') }}
            />
          </div>
        ))}
        {total !== 100 && (
          <div className={`text-xs text-center font-medium ${total > 100 ? 'text-red-500' : 'text-orange-500'}`}>
            ⚠️ Total: {total}% — ajusta para sumar 100%
          </div>
        )}
      </div>

      {/* Visualización de barra */}
      <div className="flex rounded-xl overflow-hidden h-4">
        {BLOQUES.map(b => (
          <div key={b.label} className={`${b.color} transition-all`} style={{ width: `${b.pct}%` }} />
        ))}
      </div>

      {/* Tarjetas de distribución */}
      <div className="grid grid-cols-3 gap-2">
        {BLOQUES.map(b => (
          <div key={b.label} className={`${b.lightColor} border rounded-2xl p-3 text-center`}>
            <div className={`text-xs font-medium ${b.textColor}`}>{b.label}</div>
            <div className={`text-xl font-bold ${b.textColor}`}>{b.pct}%</div>
            <div className={`text-xs ${b.textColor}`}>{fmt(b.val)}/mes</div>
            {frecuencia === 'anual' && <div className={`text-xs ${b.textColor} opacity-70`}>{fmt(b.val * 12)}/año</div>}
          </div>
        ))}
      </div>

      {/* Ejemplos */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        {BLOQUES.map(b => (
          <div key={b.label} className="space-y-1">
            <div className="text-gray-400 font-medium">{b.desc}</div>
            {b.items.map(item => <div key={item} className="text-gray-500 dark:text-gray-400">· {item}</div>)}
          </div>
        ))}
      </div>

      {base > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
          💡 Con {fmt(ahorro)}/mes de ahorro, en 1 año acumularías <strong>{fmt(ahorro * 12)}</strong> y en 5 años <strong>{fmt(ahorro * 60)}</strong>
        </div>
      )}
    </div>
  );
}
