'use client';
import { useState } from 'react';

type Zona = 'es' | 'ext';

const LIMITES = {
  es: { sinPernocta: 26.67, conPernocta: 53.34 },
  ext: { sinPernocta: 48.08, conPernocta: 91.35 },
};

const KM_RATE = 0.26;

const fmt2 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

export default function CalculadoraDietasEmpresa() {
  const [zona, setZona] = useState<Zona>('es');
  const [pernocta, setPernocta] = useState(false);
  const [dias, setDias] = useState('5');
  const [dietaReal, setDietaReal] = useState('30');
  const [km, setKm] = useState('100');

  const diasN = parseFloat(dias) || 0;
  const dietaN = parseFloat(dietaReal) || 0;
  const kmN = parseFloat(km) || 0;

  const limitesDieta = pernocta ? LIMITES[zona].conPernocta : LIMITES[zona].sinPernocta;
  const exentoDieta = Math.min(dietaN, limitesDieta);
  const tributaDieta = Math.max(0, dietaN - limitesDieta);

  const exentoKm = kmN * KM_RATE;

  const totalExento = (exentoDieta + exentoKm) * diasN;
  const totalTributa = tributaDieta * diasN;

  const BTN = 'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1 text-center';
  const active = 'bg-indigo-600 text-white';
  const inactive = 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400';

  return (
    <div className="space-y-4">
      {/* Zona */}
      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Zona de desplazamiento</label>
        <div className="flex gap-2">
          <button onClick={() => setZona('es')} className={`${BTN} ${zona === 'es' ? active : inactive}`}>🇪🇸 España</button>
          <button onClick={() => setZona('ext')} className={`${BTN} ${zona === 'ext' ? active : inactive}`}>🌍 Extranjero</button>
        </div>
      </div>

      {/* Pernocta */}
      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">¿Hay pernoctación?</label>
        <div className="flex gap-2">
          <button onClick={() => setPernocta(false)} className={`${BTN} ${!pernocta ? active : inactive}`}>Sin pernocta</button>
          <button onClick={() => setPernocta(true)} className={`${BTN} ${pernocta ? active : inactive}`}>Con pernocta</button>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-xs text-indigo-700 dark:text-indigo-300">
        Límite exento Hacienda 2026: <strong>{limitesDieta.toFixed(2)}€/día</strong>
        {zona === 'ext' ? ' (extranjero)' : ' (España)'}
        {pernocta ? ' con pernocta' : ' sin pernocta'}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Número de días</label>
          <input type="number" value={dias} onChange={e => setDias(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Dieta diaria percibida (€/día)</label>
          <input type="number" step="0.01" value={dietaReal} onChange={e => setDietaReal(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Kilómetros por día (en vehículo propio)</label>
          <input type="number" value={km} onChange={e => setKm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
          <div className="text-xs text-green-600 dark:text-green-400 font-semibold mb-2">✅ EXENTO DE IRPF (total {diasN} días)</div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">Dieta exenta ({fmt2(exentoDieta)}/día × {diasN})</span>
            <span className="font-semibold text-gray-900 dark:text-white">{fmt2(exentoDieta * diasN)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Kilometraje ({kmN} km × {KM_RATE}€)</span>
            <span className="font-semibold text-gray-900 dark:text-white">{fmt2(exentoKm * diasN)}</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t border-green-200 dark:border-green-800 pt-2">
            <span>Total exento</span>
            <span className="text-green-700 dark:text-green-300">{fmt2(totalExento)}</span>
          </div>
        </div>

        {totalTributa > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
            <div className="text-xs text-red-600 dark:text-red-400 font-semibold mb-2">⚠️ TRIBUTA EN IRPF</div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Exceso dieta ({fmt2(tributaDieta)}/día × {diasN})</span>
              <span className="font-semibold text-red-700 dark:text-red-300">{fmt2(totalTributa)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        Tarifa de Hacienda para vehículo propio: <strong>0,26€/km</strong> (exenta de IRPF y SS). Dietas basadas en el Reglamento del IRPF, art. 9.
      </div>
    </div>
  );
}
