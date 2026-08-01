'use client';
import { useState } from 'react';

// Tabla de porcentajes por años cotizados (SS España 2024)
function getPorcentajePension(años: number): number {
  if (años < 15) return 0;
  if (años >= 37) return 100; // 37 años = 100% base reguladora
  // 15 años = 50%, de 16 a 25 años: +2.8% por año; de 26 en adelante: +2% por año
  let pct = 50;
  for (let i = 16; i <= Math.min(años, 25); i++) pct += 2.8;
  for (let i = 26; i <= Math.min(años, 37); i++) pct += 2;
  return Math.min(100, pct);
}

// Porcentaje por edad de jubilación (reducción si es anticipada)
function getFactorEdad(edadJubilacion: number, añosCotizados: number): number {
  if (edadJubilacion >= 65) return 1.0; // Sin reducción
  if (edadJubilacion < 60) return 0; // No se puede
  // Jubilación anticipada: penalización entre 1.56% y 2% por trimestre
  const trimestresAnticipos = (65 - edadJubilacion) * 4;
  const penalizacion = añosCotizados >= 44.5 ? 0.0156 : añosCotizados >= 37 ? 0.0169 : añosCotizados >= 31 ? 0.0181 : 0.02;
  return Math.max(0, 1 - trimestresAnticipos * penalizacion);
}

const PENSION_MAX_2024 = 3175.04; // €/mes (14 pagas)
const PENSION_MIN_2024 = 767.25;  // €/mes con cónyuge

export default function CalculadoraPension() {
  const [baseReguladora, setBaseReguladora] = useState('1800');
  const [añosCotizados, setAñosCotizados] = useState('35');
  const [edadJubilacion, setEdadJubilacion] = useState('65');
  const [tipo, setTipo] = useState<'ordinaria' | 'anticipada' | 'demorada'>('ordinaria');

  const base = parseFloat(baseReguladora) || 0;
  const años = parseFloat(añosCotizados) || 0;
  const edad = parseFloat(edadJubilacion) || 65;

  const pctAños = getPorcentajePension(años);
  const factorEdad = tipo === 'ordinaria' ? 1.0 : tipo === 'demorada' ? 1 + (edad - 65) * 0.04 : getFactorEdad(edad, años);

  let pensionBruta = base * pctAños / 100 * factorEdad;
  const tope = pensionBruta > PENSION_MAX_2024;
  if (tope) pensionBruta = PENSION_MAX_2024;

  const pensionAnual = pensionBruta * 14;
  const tasaSust = base > 0 ? (pensionBruta / base * 100) : 0;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  return (
    <div className="space-y-4">
      <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-3 py-2">
        💡 Cálculo orientativo basado en el sistema de pensiones español 2024. La Seguridad Social considera los últimos 25 años cotizados para la base reguladora.
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Base reguladora mensual</label>
          <div className="relative">
            <input type="number" value={baseReguladora} onChange={e => setBaseReguladora(e.target.value)} min="0"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Media últimos 25 años cotizados</div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Años cotizados</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setAñosCotizados(a => String(Math.max(0, parseFloat(a) - 1)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-sm">−</button>
            <input type="number" value={añosCotizados} onChange={e => setAñosCotizados(e.target.value)} min="0" max="50"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:outline-none" />
            <button onClick={() => setAñosCotizados(a => String(Math.min(50, parseFloat(a) + 1)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold text-sm">+</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Tipo de jubilación</label>
        <div className="flex gap-1">
          {[
            { id: 'anticipada', label: '🔙 Anticipada', desc: '< 65 años' },
            { id: 'ordinaria', label: '✅ Ordinaria', desc: '65 años' },
            { id: 'demorada', label: '⏩ Demorada', desc: '> 65 años' },
          ].map(t => (
            <button key={t.id} onClick={() => { setTipo(t.id as any); if (t.id === 'ordinaria') setEdadJubilacion('65'); }}
              className={`flex-1 py-2 px-1 rounded-xl text-xs ${tipo === t.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              <div className="font-medium">{t.label}</div>
              <div className="opacity-70">{t.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {tipo !== 'ordinaria' && (
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad de jubilación</label>
          <div className="flex items-center gap-2">
            <button onClick={() => setEdadJubilacion(a => String(Math.max(60, parseFloat(a) - 1)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">−</button>
            <input type="number" value={edadJubilacion} onChange={e => setEdadJubilacion(e.target.value)} min={tipo === 'anticipada' ? 60 : 65} max={tipo === 'anticipada' ? 65 : 70}
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:outline-none" />
            <span className="text-xs text-gray-500">años</span>
            <button onClick={() => setEdadJubilacion(a => String(Math.min(tipo === 'anticipada' ? 65 : 70, parseFloat(a) + 1)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">+</button>
          </div>
        </div>
      )}

      {base > 0 && años >= 15 && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-400">% por años cotizados</div>
              <div className="font-bold text-gray-900 dark:text-white text-lg">{pctAños.toFixed(1)}%</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
              <div className="text-gray-400">Factor edad</div>
              <div className={`font-bold text-lg ${factorEdad < 1 ? 'text-red-500' : factorEdad > 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>{(factorEdad * 100).toFixed(1)}%</div>
            </div>
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-500">Pensión estimada bruta/mes</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(pensionBruta)}</div>
            {tope && <div className="text-xs text-orange-500 mt-1">⚠️ Topada al máximo legal ({fmt(PENSION_MAX_2024)})</div>}
            <div className="text-xs text-indigo-400 mt-2">{fmt(pensionAnual)}/año (14 pagas)</div>
            <div className="text-xs text-indigo-400">Tasa de sustitución: {tasaSust.toFixed(1)}%</div>
          </div>
          {años < 37 && (
            <div className="text-xs bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-2 text-amber-700 dark:text-amber-300">
              💡 Con {37 - años} años más cotizados alcanzarías el 100% de la base reguladora ({fmt(base * factorEdad)}/mes)
            </div>
          )}
          <div className="text-xs text-gray-400 text-center">
            Pensión mínima garantizada: {fmt(PENSION_MIN_2024)}/mes · Pensión máxima: {fmt(PENSION_MAX_2024)}/mes
          </div>
        </div>
      )}
      {años < 15 && base > 0 && (
        <div className="text-center text-red-500 text-sm py-4">
          ❌ Se requieren al menos 15 años cotizados para tener derecho a pensión de jubilación
        </div>
      )}
    </div>
  );
}
