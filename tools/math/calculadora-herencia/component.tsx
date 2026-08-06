'use client';
import { useState } from 'react';

const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const fmt2 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

type Grupo = 'I' | 'II' | 'III' | 'IV';
type CCAA = 'madrid' | 'andalucia' | 'cataluna' | 'valencia' | 'general';

const REDUCCIONES: Record<Grupo, number> = {
  I: 47859, II: 15957, III: 7993, IV: 0,
};

const BONIFICACIONES: Record<CCAA, Partial<Record<Grupo, number>>> = {
  madrid:    { I: 0.99, II: 0.99 },
  andalucia: { I: 0.99, II: 0.99 },
  cataluna:  { I: 0.00, II: 0.00 },
  valencia:  { I: 0.75, II: 0.75 },
  general:   {},
};

const CCAA_LABELS: Record<CCAA, string> = {
  madrid: 'Madrid', andalucia: 'Andalucía', cataluna: 'Cataluña', valencia: 'C. Valenciana', general: 'Otras / General',
};

const GRUPO_LABELS: Record<Grupo, string> = {
  I: 'Grupo I — Hijos <21 años',
  II: 'Grupo II — Hijos ≥21, cónyuge, padres',
  III: 'Grupo III — Hermanos, tíos, sobrinos',
  IV: 'Grupo IV — Primos, extraños',
};

// Tarifa estatal sucesiones (simplificada)
function calcularCuota(base: number): number {
  const tramos = [
    [7993, 0.0765], [7987, 0.0850], [7987, 0.0918], [7987, 0.1020],
    [7987, 0.1105], [7987, 0.1188], [7987, 0.1275], [7987, 0.1360],
    [7987, 0.1445], [7987, 0.1530], [7987, 0.1615], [7987, 0.1700],
    [7987, 0.1785], [7987, 0.1870], [7987, 0.1955], [7987, 0.2040],
    [7987, 0.2125], [7987, 0.2210], [7987, 0.2295], [7987, 0.2380],
    [7987, 0.2465], [7987, 0.2550], [7987, 0.2635], [Infinity, 0.3400],
  ];
  let cuota = 0;
  let resto = base;
  for (const [limite, tipo] of tramos) {
    if (resto <= 0) break;
    const chunk = Math.min(resto, limite as number);
    cuota += chunk * (tipo as number);
    resto -= chunk;
  }
  return cuota;
}

export default function CalculadoraHerencia() {
  const [valorHerencia, setValorHerencia] = useState('200000');
  const [grupo, setGrupo] = useState<Grupo>('II');
  const [ccaa, setCcaa] = useState<CCAA>('madrid');

  const valor = parseFloat(valorHerencia) || 0;
  const reduccion = Math.min(valor, REDUCCIONES[grupo]);
  const baseImponible = Math.max(0, valor - reduccion);
  const cuotaBase = calcularCuota(baseImponible);
  const bonif = BONIFICACIONES[ccaa][grupo] ?? 0;
  const cuotaFinal = cuotaBase * (1 - bonif);
  const tipoEfectivo = valor > 0 ? (cuotaFinal / valor) * 100 : 0;

  const BTN = 'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors';
  const INPUT = 'w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none';

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-300">
        ⚠️ Estimación orientativa. El impuesto real varía según el patrimonio preexistente del heredero, el tipo de bien y la normativa autonómica exacta. Consulta con un asesor fiscal.
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Valor de la herencia (€)</label>
        <input type="number" value={valorHerencia} onChange={e => setValorHerencia(e.target.value)} className={INPUT} />
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Parentesco con el fallecido</label>
        <div className="space-y-1.5">
          {(Object.keys(GRUPO_LABELS) as Grupo[]).map(g => (
            <button key={g} onClick={() => setGrupo(g)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors ${grupo === g ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {GRUPO_LABELS[g]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2">Comunidad autónoma del fallecido</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(CCAA_LABELS) as CCAA[]).map(c => (
            <button key={c} onClick={() => setCcaa(c)}
              className={`${BTN} ${ccaa === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
              {CCAA_LABELS[c]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Valor herencia</span><span className="font-medium">{fmt0(valor)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reducción (Grupo {grupo})</span><span className="font-medium text-green-600">− {fmt0(reduccion)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Base imponible</span><span className="font-medium">{fmt0(baseImponible)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Cuota tarifa estatal</span><span className="font-medium">{fmt2(cuotaBase)}</span>
          </div>
          {bonif > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500">Bonificación {ccaa === 'madrid' ? 'Madrid' : ccaa === 'andalucia' ? 'Andalucía' : ccaa === 'valencia' ? 'Valencia' : ''} ({(bonif * 100).toFixed(0)}%)</span>
              <span className="font-medium text-green-600">− {fmt2(cuotaBase * bonif)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
            <span>Impuesto a pagar</span>
            <span className={cuotaFinal < 100 ? 'text-green-600' : 'text-red-600'}>{fmt2(cuotaFinal)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3 text-center">
            <div className="text-xs text-indigo-500 mb-1">Tipo efectivo</div>
            <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{tipoEfectivo.toFixed(2)}%</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <div className="text-xs text-green-500 mb-1">Neto heredado</div>
            <div className="text-xl font-bold text-green-700 dark:text-green-300">{fmt0(valor - cuotaFinal)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
