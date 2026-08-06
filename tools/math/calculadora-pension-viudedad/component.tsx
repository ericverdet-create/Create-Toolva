'use client';
import { useState } from 'react';

const fmt2 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

// Pensión mínima viudedad 2026 (aprox, actualizada con revalorización)
const MINIMO_65 = 775.90;
const MINIMO_65_CARGAS = 939.90;
const MINIMO_MENOR65 = 638.60;

export default function CalculadoraPensionViudedad() {
  const [baseReguladora, setBaseReguladora] = useState('1800');
  const [cargas, setCargas] = useState(false);
  const [edad, setEdad] = useState('60');
  const [tipo, setTipo] = useState<'70' | '52'>('52');

  const base = parseFloat(baseReguladora) || 0;
  const edadN = parseInt(edad) || 0;
  const pct = tipo === '70' ? 0.70 : 0.52;

  const pension = base * pct;
  const minimo = edadN >= 65 ? (cargas ? MINIMO_65_CARGAS : MINIMO_65) : MINIMO_MENOR65;
  const pensionFinal = Math.max(pension, minimo);
  const pensionAnual = pensionFinal * 14;

  const BTN = 'flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400';

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
        Esta calculadora ofrece una estimación orientativa. La cuantía exacta la determina la Seguridad Social según el historial de cotizaciones del fallecido.
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Base reguladora mensual del fallecido (€)</label>
        <input type="number" value={baseReguladora} onChange={e => setBaseReguladora(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        <p className="text-xs text-gray-400 mt-1">Media de las bases de cotización del fallecido</p>
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Tu edad</label>
        <input type="number" value={edad} onChange={e => setEdad(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">¿Tienes hijos menores a cargo o discapacidad?</label>
        <div className="flex gap-2">
          <button onClick={() => setCargas(false)} className={`${BTN} ${!cargas ? active : inactive}`}>No</button>
          <button onClick={() => setCargas(true)} className={`${BTN} ${cargas ? active : inactive}`}>Sí (cargas familiares)</button>
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Porcentaje aplicable</label>
        <div className="flex gap-2">
          <button onClick={() => setTipo('52')} className={`${BTN} ${tipo === '52' ? active : inactive}`}>52% (general)</button>
          <button onClick={() => setTipo('70')} className={`${BTN} ${tipo === '70' ? active : inactive}`}>70% (especial)</button>
        </div>
        <p className="text-xs text-gray-400 mt-1">El 70% aplica si tienes cargas familiares, +65 años y la pensión es tu principal ingreso</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 text-center">
          <div className="text-xs text-indigo-500 mb-1">Pensión mensual estimada</div>
          <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{fmt2(pensionFinal)}</div>
          <div className="text-xs text-gray-500 mt-1">({pct * 100}% de {fmt2(base)})</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">Pensión anual (14 pagas)</div>
          <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{fmt0(pensionAnual)}</div>
        </div>
      </div>

      {pension < minimo && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
          ℹ️ La pensión calculada ({fmt2(pension)}) es inferior al mínimo garantizado. Se aplicaría el complemento mínimo: <strong>{fmt2(minimo)}/mes</strong>.
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">Pensiones mínimas 2026 (orientativas)</div>
        {[
          ['Beneficiario con 65 años o más', fmt2(MINIMO_65) + '/mes'],
          ['Con cargas familiares', fmt2(MINIMO_65_CARGAS) + '/mes'],
          ['Menor de 65 años sin cargas', fmt2(MINIMO_MENOR65) + '/mes'],
        ].map(([label, val]) => (
          <div key={label} className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">{label}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
