'use client';
import { useState } from 'react';

export default function ImcCintura() {
  const [sexo, setSexo] = useState<'hombre' | 'mujer'>('hombre');
  const [cintura, setCintura] = useState('88');
  const [cadera, setCadera] = useState('95');
  const [altura, setAltura] = useState('170');

  const c = parseFloat(cintura) || 0;
  const ca = parseFloat(cadera) || 0;
  const h = parseFloat(altura) || 0;

  // ICC = cintura / cadera
  const icc = ca > 0 ? c / ca : 0;

  // Relación cintura-altura (RCA) = cintura / altura
  const rca = h > 0 ? c / h : 0;

  // Riesgo ICC
  const getRiesgoICC = () => {
    if (icc === 0) return null;
    if (sexo === 'hombre') {
      if (icc < 0.90) return { nivel: 'Bajo', color: 'green' };
      if (icc < 1.00) return { nivel: 'Moderado', color: 'yellow' };
      return { nivel: 'Alto', color: 'red' };
    } else {
      if (icc < 0.80) return { nivel: 'Bajo', color: 'green' };
      if (icc < 0.85) return { nivel: 'Moderado', color: 'yellow' };
      return { nivel: 'Alto', color: 'red' };
    }
  };

  // Riesgo RCA
  const getRiesgoRCA = () => {
    if (rca === 0) return null;
    if (rca < 0.40) return { nivel: 'Muy bajo (delgadez)', color: 'blue' };
    if (rca < 0.50) return { nivel: 'Saludable', color: 'green' };
    if (rca < 0.60) return { nivel: 'Riesgo moderado', color: 'yellow' };
    return { nivel: 'Riesgo elevado', color: 'red' };
  };

  // Riesgo cintura sola (OMS)
  const getRiesgoCintura = () => {
    if (c === 0) return null;
    if (sexo === 'hombre') {
      if (c < 94) return { nivel: 'Sin riesgo', color: 'green' };
      if (c < 102) return { nivel: 'Riesgo moderado', color: 'yellow' };
      return { nivel: 'Riesgo alto', color: 'red' };
    } else {
      if (c < 80) return { nivel: 'Sin riesgo', color: 'green' };
      if (c < 88) return { nivel: 'Riesgo moderado', color: 'yellow' };
      return { nivel: 'Riesgo alto', color: 'red' };
    }
  };

  const colorMap: Record<string, string> = {
    green: 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    yellow: 'text-yellow-700 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    red: 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    blue: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  };

  const riesgoICC = getRiesgoICC();
  const riesgoRCA = getRiesgoRCA();
  const riesgoCintura = getRiesgoCintura();

  const fmt2 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['hombre', 'mujer'] as const).map(s => (
          <button key={s} onClick={() => setSexo(s)}
            className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${sexo === s ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {s === 'hombre' ? '♂ Hombre' : '♀ Mujer'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Cintura (cm)', val: cintura, set: setCintura },
          { label: 'Cadera (cm)', val: cadera, set: setCadera },
          { label: 'Altura (cm)', val: altura, set: setAltura },
        ].map(({ label, val, set }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
            <input type="number" value={val} onChange={e => set(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
          </div>
        ))}
      </div>

      {c > 0 && (
        <div className="space-y-3">
          {[
            { label: '📏 Perímetro cintura', riesgo: riesgoCintura, valor: `${c} cm`, ref: sexo === 'hombre' ? 'Ref: <94 sin riesgo, 94-102 moderado, >102 alto' : 'Ref: <80 sin riesgo, 80-88 moderado, >88 alto' },
            { label: '⚖️ Índice Cintura-Cadera (ICC)', riesgo: riesgoICC, valor: icc > 0 ? fmt2(icc) : '-', ref: sexo === 'hombre' ? 'Ref: <0.90 bajo, 0.90-1.00 moderado, >1.00 alto' : 'Ref: <0.80 bajo, 0.80-0.85 moderado, >0.85 alto' },
            { label: '📐 Relación Cintura-Altura (RCA)', riesgo: riesgoRCA, valor: rca > 0 ? fmt2(rca) : '-', ref: 'Ref: 0.40-0.50 saludable, 0.50-0.60 moderado, >0.60 elevado' },
          ].map(({ label, riesgo, valor, ref }) => riesgo && (
            <div key={label} className={`border rounded-2xl p-4 ${colorMap[riesgo.color]}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-medium opacity-80">{label}</div>
                  <div className="text-2xl font-bold">{valor}</div>
                  <div className="text-sm font-semibold">{riesgo.nivel}</div>
                </div>
              </div>
              <div className="text-xs opacity-70 mt-1">{ref}</div>
            </div>
          ))}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-600 dark:text-gray-400">
            ℹ️ La RCA es el indicador más predictivo de riesgo cardiovascular y metabólico. Un valor &lt;0.5 significa que tu cintura mide menos de la mitad de tu altura.
          </div>
        </div>
      )}
    </div>
  );
}
