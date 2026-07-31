'use client';
import { useState } from 'react';

const HITOS = [
  { semana: 8, desc: '🫀 Latido cardíaco detectable por ecografía' },
  { semana: 12, desc: '🔬 Fin del primer trimestre — riesgo de aborto disminuye' },
  { semana: 16, desc: '🤸 Movimientos fetales iniciales' },
  { semana: 20, desc: '🩺 Ecografía morfológica (semana 20)' },
  { semana: 24, desc: '👶 Viabilidad fetal — pulmones en desarrollo' },
  { semana: 28, desc: '🌙 Inicio del tercer trimestre' },
  { semana: 32, desc: '🧠 Cerebro en rápido desarrollo' },
  { semana: 36, desc: '✅ Casi a término — pulmones maduros' },
  { semana: 40, desc: '🎉 Fecha probable de parto (FPP)' },
];

export default function CalculadoraEmbarazo() {
  const [modo, setModo] = useState<'fur' | 'concepcion'>('fur');
  const [fecha, setFecha] = useState('');

  const calcular = () => {
    if (!fecha) return null;
    const base = new Date(fecha);
    if (isNaN(base.getTime())) return null;

    let inicio: Date;
    if (modo === 'fur') {
      inicio = base; // fecha última regla
    } else {
      // fecha concepción → restar 14 días para obtener FUR
      inicio = new Date(base.getTime() - 14 * 24 * 3600 * 1000);
    }

    const hoy = new Date();
    const fpp = new Date(inicio.getTime() + 280 * 24 * 3600 * 1000); // 40 semanas = 280 días
    const diasGestados = Math.floor((hoy.getTime() - inicio.getTime()) / (24 * 3600 * 1000));
    const semanasActuales = Math.floor(diasGestados / 7);
    const diasExtra = diasGestados % 7;
    const diasRestantes = Math.max(0, Math.ceil((fpp.getTime() - hoy.getTime()) / (24 * 3600 * 1000)));
    const trimestre = semanasActuales < 13 ? 1 : semanasActuales < 27 ? 2 : 3;

    return { fpp, semanasActuales, diasExtra, diasRestantes, trimestre, diasGestados };
  };

  const res = calcular();
  const fmtFecha = (d: Date) => d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  const trimNames = ['', 'Primer trimestre', 'Segundo trimestre', 'Tercer trimestre'];
  const trimColors = ['', 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300', 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300', 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300'];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {[['fur', '📅 Última regla'], ['concepcion', '💑 Fecha concepción']].map(([v, l]) => (
          <button key={v} onClick={() => { setModo(v as 'fur' | 'concepcion'); setFecha(''); }}
            className={`flex-1 py-2 rounded-xl text-xs font-medium ${modo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
        ))}
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {modo === 'fur' ? 'Fecha del primer día de la última regla' : 'Fecha aproximada de concepción'}
        </label>
        <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} max={new Date().toISOString().split('T')[0]}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      {res && res.diasGestados >= 0 && res.semanasActuales <= 45 && (
        <div className="space-y-3">
          <div className={`border-2 rounded-2xl p-4 text-center ${trimColors[res.trimestre]}`}>
            <div className="text-xs font-medium opacity-70">{trimNames[res.trimestre]}</div>
            <div className="text-4xl font-bold">S{res.semanasActuales}+{res.diasExtra}</div>
            <div className="text-sm font-medium opacity-80">{res.semanasActuales} semanas y {res.diasExtra} días de gestación</div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-center">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-gray-500 dark:text-gray-400">📅 Fecha probable de parto</div>
              <div className="font-bold text-gray-900 dark:text-white">{fmtFecha(res.fpp)}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
              <div className="text-gray-500 dark:text-gray-400">⏳ Días restantes</div>
              <div className="font-bold text-gray-900 dark:text-white">{res.diasRestantes > 0 ? `${res.diasRestantes} días` : '¡Ya llegó la fecha!'}</div>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Semana 1</span>
              <span>Semana 40</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 rounded-full transition-all"
                style={{ width: `${Math.min(100, (res.semanasActuales / 40) * 100)}%` }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">1T · 13s</span>
              <span className="text-gray-400">2T · 14-26s</span>
              <span className="text-gray-400">3T · 27-40s</span>
            </div>
          </div>

          {/* Hitos */}
          <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">🗓️ Hitos del embarazo</summary>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {HITOS.map(h => (
                <div key={h.semana} className={`flex gap-3 px-3 py-2 text-xs ${res.semanasActuales >= h.semana ? 'opacity-50' : ''}`}>
                  <span className={`font-bold w-12 flex-shrink-0 ${res.semanasActuales === h.semana ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>S{h.semana}</span>
                  <span className="text-gray-700 dark:text-gray-300">{h.desc}</span>
                  {res.semanasActuales >= h.semana && <span className="ml-auto text-green-500">✓</span>}
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
      {res && res.diasGestados < 0 && (
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          La fecha introducida es futura. Selecciona una fecha pasada.
        </div>
      )}
    </div>
  );
}
