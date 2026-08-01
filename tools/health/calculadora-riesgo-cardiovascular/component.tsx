'use client';
import { useState } from 'react';

// Escala SCORE simplificada (riesgo a 10 años de evento cardiovascular fatal)
// Basado en factores de riesgo principales
function calcularRiesgo(edad: number, sexo: 'h' | 'm', fumador: boolean, sistolica: number, colesterol: number, diabetes: boolean): number {
  let score = 0;

  // Base por edad y sexo
  if (sexo === 'h') {
    if (edad < 45) score += 1;
    else if (edad < 50) score += 2;
    else if (edad < 55) score += 4;
    else if (edad < 60) score += 6;
    else if (edad < 65) score += 9;
    else score += 12;
  } else {
    if (edad < 45) score += 0;
    else if (edad < 50) score += 1;
    else if (edad < 55) score += 2;
    else if (edad < 60) score += 3;
    else if (edad < 65) score += 5;
    else score += 7;
  }

  // Tensión arterial sistólica
  if (sistolica >= 180) score += 4;
  else if (sistolica >= 160) score += 3;
  else if (sistolica >= 140) score += 2;
  else if (sistolica >= 120) score += 0;

  // Colesterol total (mmol/L equivalentes)
  if (colesterol >= 310) score += 3;
  else if (colesterol >= 270) score += 2;
  else if (colesterol >= 230) score += 1;

  // Factores adicionales
  if (fumador) score += 3;
  if (diabetes) score += 2;

  // Convertir score a % riesgo aproximado
  if (score <= 2) return 0.5;
  if (score <= 5) return 1;
  if (score <= 8) return 2;
  if (score <= 11) return 4;
  if (score <= 14) return 7;
  if (score <= 17) return 12;
  return 20;
}

export default function RiesgoCardiovascular() {
  const [edad, setEdad] = useState('50');
  const [sexo, setSexo] = useState<'h' | 'm'>('h');
  const [fumador, setFumador] = useState(false);
  const [sistolica, setSistolica] = useState('130');
  const [colesterol, setColesterol] = useState('200');
  const [diabetes, setDiabetes] = useState(false);
  const [hdl, setHdl] = useState('55');

  const e = parseInt(edad) || 50;
  const s = parseInt(sistolica) || 120;
  const col = parseInt(colesterol) || 200;
  const riesgo = calcularRiesgo(e, sexo, fumador, s, col, diabetes);

  const nivel = riesgo < 1 ? { label: 'Bajo', color: 'bg-green-500', textColor: 'text-green-700 dark:text-green-300', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' }
    : riesgo < 5 ? { label: 'Moderado', color: 'bg-yellow-500', textColor: 'text-yellow-700 dark:text-yellow-300', bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' }
    : riesgo < 10 ? { label: 'Alto', color: 'bg-orange-500', textColor: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' }
    : { label: 'Muy alto', color: 'bg-red-600', textColor: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' };

  const RECOMENDACIONES: Record<string, string[]> = {
    Bajo: ['Mantén hábitos saludables', 'Ejercicio regular 150min/semana', 'Dieta mediterránea', 'Revisión médica cada 2-3 años'],
    Moderado: ['Control tensión arterial regular', 'Reducir ingesta de grasas saturadas', 'Ejercicio aeróbico diario', 'Consulta médica anual'],
    Alto: ['Consulta cardiológica urgente', 'Posible medicación para tensión/colesterol', 'Abandono tabaco si fumador', 'Monitorización frecuente'],
    'Muy alto': ['Evaluación cardiológica inmediata', 'Tratamiento farmacológico probable', 'Cambios drásticos en estilo de vida', 'Seguimiento mensual'],
  };

  return (
    <div className="space-y-4">
      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2">
        ⚠️ Herramienta informativa basada en escala SCORE. No reemplaza al médico. Consulta siempre a un profesional sanitario.
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad</label>
          <input type="number" value={edad} onChange={e => setEdad(e.target.value)} min="30" max="80"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sexo</label>
          <div className="flex gap-1">
            {[{ id: 'h', label: '♂ Hombre' }, { id: 'm', label: '♀ Mujer' }].map(s => (
              <button key={s.id} onClick={() => setSexo(s.id as 'h' | 'm')}
                className={`flex-1 py-2 rounded-xl text-xs font-medium ${sexo === s.id ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">T.A. sistólica (mmHg)</label>
          <div className="flex items-center gap-1">
            <input type="number" value={sistolica} onChange={e => setSistolica(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none text-center" />
            <span className="text-xs text-gray-400">mmHg</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Normal: &lt;120</div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Colesterol total (mg/dL)</label>
          <div className="flex items-center gap-1">
            <input type="number" value={colesterol} onChange={e => setColesterol(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none text-center" />
            <span className="text-xs text-gray-400">mg/dL</span>
          </div>
          <div className="text-xs text-gray-400 mt-0.5">Deseable: &lt;200</div>
        </div>
      </div>

      <div className="flex gap-2">
        {[
          { label: '🚬 Fumador activo', val: fumador, set: setFumador },
          { label: '🍭 Diabetes', val: diabetes, set: setDiabetes },
        ].map(f => (
          <button key={f.label} onClick={() => f.set(!f.val)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-medium border-2 transition-colors ${f.val ? 'bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-700 text-red-700 dark:text-red-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}>
            {f.val ? '✅ ' : '⬜ '}{f.label}
          </button>
        ))}
      </div>

      <div className={`${nivel.bg} border rounded-2xl p-4 text-center`}>
        <div className="text-xs text-gray-500 dark:text-gray-400">Riesgo cardiovascular a 10 años</div>
        <div className={`text-5xl font-bold mt-1 ${nivel.textColor}`}>{riesgo}%</div>
        <div className={`text-sm font-bold mt-1 ${nivel.textColor}`}>Riesgo {nivel.label}</div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
          <div className={`${nivel.color} h-2 rounded-full transition-all`} style={{ width: `${Math.min(100, riesgo * 5)}%` }} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Recomendaciones</div>
        {(RECOMENDACIONES[nivel.label] || []).map((r, i) => (
          <div key={i} className="text-xs text-gray-600 dark:text-gray-400 flex gap-1.5">
            <span className="text-indigo-400 flex-shrink-0">→</span><span>{r}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
