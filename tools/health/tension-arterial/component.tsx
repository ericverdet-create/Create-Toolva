'use client';
import { useState } from 'react';

interface Category {
  label: string;
  color: string;
  bg: string;
  recomendacion: string;
}

function clasificar(sis: number, dia: number): Category | null {
  if (sis <= 0 || dia <= 0) return null;

  // ESC/ESH 2023 guidelines
  if (sis < 120 && dia < 80) return {
    label: '🟢 Tensión óptima',
    color: 'text-green-700 dark:text-green-300',
    bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    recomendacion: 'Excelente. Mantén hábitos saludables: dieta equilibrada, ejercicio regular y control del estrés.',
  };
  if (sis < 130 && dia < 85) return {
    label: '🟢 Tensión normal',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    recomendacion: 'Dentro del rango normal. Revisa tu tensión anualmente y mantén un estilo de vida saludable.',
  };
  if (sis < 140 && dia < 90) return {
    label: '🟡 Tensión normal-alta',
    color: 'text-yellow-700 dark:text-yellow-300',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    recomendacion: 'Presta atención. Reduce el sodio, modera el alcohol y aumenta la actividad física. Revisión en 6 meses.',
  };
  if ((sis >= 140 && sis < 160) || (dia >= 90 && dia < 100)) return {
    label: '🟠 Hipertensión grado 1',
    color: 'text-orange-700 dark:text-orange-300',
    bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    recomendacion: 'Consulta a tu médico. Cambios en el estilo de vida son imprescindibles. Puede requerir medicación.',
  };
  if ((sis >= 160 && sis < 180) || (dia >= 100 && dia < 110)) return {
    label: '🔴 Hipertensión grado 2',
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    recomendacion: 'Consulta médica urgente. Generalmente requiere tratamiento farmacológico.',
  };
  return {
    label: '🔴 Hipertensión grado 3 (severa)',
    color: 'text-red-800 dark:text-red-200',
    bg: 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700',
    recomendacion: '⚠️ Consulta médica inmediata. Riesgo cardiovascular muy elevado.',
  };
}

const TABLA = [
  { cat: 'Óptima', sis: '< 120', dia: '< 80', color: 'bg-green-500' },
  { cat: 'Normal', sis: '120–129', dia: '80–84', color: 'bg-green-400' },
  { cat: 'Normal-alta', sis: '130–139', dia: '85–89', color: 'bg-yellow-400' },
  { cat: 'HTA grado 1', sis: '140–159', dia: '90–99', color: 'bg-orange-400' },
  { cat: 'HTA grado 2', sis: '160–179', dia: '100–109', color: 'bg-red-500' },
  { cat: 'HTA grado 3', sis: '≥ 180', dia: '≥ 110', color: 'bg-red-700' },
];

export default function TensionArterial() {
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [showTabla, setShowTabla] = useState(false);

  const sis = parseFloat(sistolica) || 0;
  const dia = parseFloat(diastolica) || 0;
  const resultado = clasificar(sis, dia);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Sistólica (mmHg)</label>
          <input type="number" value={sistolica} onChange={e => setSistolica(e.target.value)} placeholder="ej. 120" min="60" max="250"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
          <div className="text-xs text-center text-gray-400 mt-1">presión máxima</div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Diastólica (mmHg)</label>
          <input type="number" value={diastolica} onChange={e => setDiastolica(e.target.value)} placeholder="ej. 80" min="40" max="150"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg font-bold text-center" />
          <div className="text-xs text-center text-gray-400 mt-1">presión mínima</div>
        </div>
      </div>

      {resultado && (
        <div className={`border-2 rounded-2xl p-5 ${resultado.bg}`}>
          <div className={`text-xl font-bold mb-2 ${resultado.color}`}>{resultado.label}</div>
          <div className={`text-lg font-semibold mb-3 ${resultado.color}`}>{sis}/{dia} mmHg</div>
          <div className="text-sm text-gray-700 dark:text-gray-300">{resultado.recomendacion}</div>
        </div>
      )}

      <button onClick={() => setShowTabla(!showTabla)}
        className="w-full py-2 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
        {showTabla ? '▲ Ocultar tabla' : '▼ Ver tabla clasificación ESC/ESH'}
      </button>

      {showTabla && (
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-400">Categoría</th>
                <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-400">Sistólica</th>
                <th className="px-3 py-2 text-center font-medium text-gray-600 dark:text-gray-400">Diastólica</th>
              </tr>
            </thead>
            <tbody>
              {TABLA.map((r, i) => (
                <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-3 py-2 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${r.color} flex-shrink-0`}></span>
                    {r.cat}
                  </td>
                  <td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{r.sis}</td>
                  <td className="px-3 py-2 text-center text-gray-700 dark:text-gray-300">{r.dia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        Guías ESC/ESH 2023. Esta herramienta es orientativa. Mide siempre en reposo, 3 veces seguidas y con el brazo a la altura del corazón.
      </div>
    </div>
  );
}
