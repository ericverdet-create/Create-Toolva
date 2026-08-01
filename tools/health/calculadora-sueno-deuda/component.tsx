'use client';
import { useState } from 'react';

const RECOMENDACIONES: Record<string, { horas: number; label: string }> = {
  bebe: { horas: 14, label: 'Bebé (0-2 años)' },
  nino: { horas: 11, label: 'Niño (3-12 años)' },
  adolescente: { horas: 9, label: 'Adolescente (13-17)' },
  adulto: { horas: 8, label: 'Adulto (18-64)' },
  mayor: { horas: 7.5, label: 'Mayor (65+)' },
};

const EFECTOS = [
  { dias: 1, efecto: 'Cansancio leve, menor concentración' },
  { dias: 3, efecto: 'Irritabilidad, fallos de memoria, bajada de defensas' },
  { dias: 7, efecto: 'Riesgo cardiovascular, ansiedad, menor rendimiento cognitivo' },
  { dias: 14, efecto: 'Alerta: efectos similares a privación total de sueño' },
];

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export default function CalculadoraSuenoDeuda() {
  const [edad, setEdad] = useState<keyof typeof RECOMENDACIONES>('adulto');
  const [horas, setHoras] = useState(DIAS_SEMANA.map(() => '7'));
  const [objetivo, setObjetivo] = useState('8');

  const horasRecomendadas = parseFloat(objetivo) || RECOMENDACIONES[edad].horas;
  const horasReales = horas.map(h => parseFloat(h) || 0);
  const totalReal = horasReales.reduce((a, b) => a + b, 0);
  const totalRecomendado = horasRecomendadas * 7;
  const deuda = Math.max(0, totalRecomendado - totalReal);
  const exceso = Math.max(0, totalReal - totalRecomendado);
  const mediaReal = totalReal / 7;

  const updateHora = (i: number, val: string) => setHoras(h => h.map((x, j) => j === i ? val : x));

  const estadoColor = deuda === 0 ? 'text-green-600 dark:text-green-400' : deuda < 7 ? 'text-orange-500 dark:text-orange-400' : 'text-red-500 dark:text-red-400';
  const efecto = EFECTOS.find(e => deuda <= e.dias * horasRecomendadas)?.efecto || EFECTOS[EFECTOS.length - 1].efecto;

  const diasRecuperacion = Math.ceil(deuda / 1.5); // ~1.5h extra de sueño por noche para recuperar

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Grupo de edad</label>
          <select value={edad} onChange={e => { setEdad(e.target.value as any); setObjetivo(String(RECOMENDACIONES[e.target.value as keyof typeof RECOMENDACIONES].horas)); }}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none">
            {Object.entries(RECOMENDACIONES).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas objetivo/noche</label>
          <div className="flex items-center gap-1">
            <button onClick={() => setObjetivo(o => String(Math.max(4, parseFloat(o) - 0.5)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">−</button>
            <input type="number" value={objetivo} onChange={e => setObjetivo(e.target.value)} step="0.5" min="4" max="12"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center text-sm focus:outline-none" />
            <button onClick={() => setObjetivo(o => String(Math.min(12, parseFloat(o) + 0.5)))} className="w-8 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 font-bold">+</button>
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Horas dormidas esta semana</div>
        <div className="grid grid-cols-7 gap-1">
          {DIAS_SEMANA.map((dia, i) => {
            const h = parseFloat(horas[i]) || 0;
            const deficit = Math.max(0, horasRecomendadas - h);
            return (
              <div key={dia} className="text-center">
                <div className="text-xs text-gray-400 mb-1">{dia}</div>
                <input type="number" value={horas[i]} onChange={e => updateHora(i, e.target.value)} min="0" max="16" step="0.5"
                  className={`w-full border rounded-lg px-1 py-1.5 text-xs text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none ${deficit > 0 ? 'border-red-300 dark:border-red-700' : 'border-green-300 dark:border-green-700'}`} />
                <div className={`text-xs mt-0.5 ${deficit > 0 ? 'text-red-500' : 'text-green-500'}`}>{deficit > 0 ? `-${deficit}` : '✓'}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`text-center p-4 rounded-2xl ${deuda === 0 ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
        <div className="text-xs text-gray-500 dark:text-gray-400">{deuda === 0 ? '🎉 ¡Sin deuda de sueño!' : '😴 Deuda de sueño acumulada'}</div>
        <div className={`text-4xl font-bold mt-1 ${estadoColor}`}>{deuda === 0 ? '0h' : `-${deuda.toFixed(1)}h`}</div>
        {exceso > 0 && <div className="text-xs text-blue-500 mt-1">+{exceso.toFixed(1)}h de exceso (tampoco es óptimo)</div>}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        {[
          { label: 'Media real', val: mediaReal.toFixed(1) + 'h/noche', color: mediaReal >= horasRecomendadas ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400' },
          { label: 'Objetivo', val: horasRecomendadas + 'h/noche', color: 'text-indigo-600 dark:text-indigo-400' },
          { label: 'Recuperación', val: deuda === 0 ? '— días' : `~${diasRecuperacion} días`, color: 'text-orange-500 dark:text-orange-400' },
        ].map(r => (
          <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
            <div className="text-gray-400">{r.label}</div>
            <div className={`font-bold ${r.color}`}>{r.val}</div>
          </div>
        ))}
      </div>

      {deuda > 0 && (
        <div className="text-xs bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-3 text-orange-700 dark:text-orange-300">
          ⚠️ <strong>Efectos posibles:</strong> {efecto}
          <div className="mt-1 text-orange-600 dark:text-orange-400">💡 Para recuperar, duerme ~1.5h extra por noche los próximos {diasRecuperacion} días</div>
        </div>
      )}
    </div>
  );
}
