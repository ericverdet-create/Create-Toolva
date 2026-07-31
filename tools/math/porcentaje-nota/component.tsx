'use client';
import { useState } from 'react';

interface Parte { nombre: string; nota: string; peso: string; }

export default function PorcentajeNota() {
  const [partes, setPartes] = useState<Parte[]>([
    { nombre: 'Parcial 1', nota: '6', peso: '30' },
    { nombre: 'Parcial 2', nota: '5', peso: '30' },
    { nombre: 'Trabajos', nota: '8', peso: '20' },
    { nombre: 'Examen final', nota: '', peso: '20' },
  ]);
  const [notaMinima, setNotaMinima] = useState('5');

  const add = () => setPartes(p => [...p, { nombre: '', nota: '', peso: '10' }]);
  const remove = (i: number) => setPartes(p => p.filter((_, idx) => idx !== i));
  const upd = (i: number, f: keyof Parte, v: string) => setPartes(p => p.map((a, idx) => idx === i ? { ...a, [f]: v } : a));

  const minima = parseFloat(notaMinima) || 5;
  const totalPeso = partes.reduce((s, p) => s + (parseFloat(p.peso) || 0), 0);

  // Calcular nota actual con partes que tienen nota
  const conNota = partes.filter(p => p.nota !== '');
  const sinNota = partes.filter(p => p.nota === '');

  const sumaActual = conNota.reduce((s, p) => s + (parseFloat(p.nota) || 0) * (parseFloat(p.peso) || 0), 0);
  const pesoActual = conNota.reduce((s, p) => s + (parseFloat(p.peso) || 0), 0);
  const pesoFaltante = sinNota.reduce((s, p) => s + (parseFloat(p.peso) || 0), 0);

  // Nota final si se sacan X en las partes sin nota
  const notaActual = totalPeso > 0 ? sumaActual / totalPeso : null;

  // Nota necesaria en las partes sin nota para alcanzar la mínima
  const notaNecesaria = pesoFaltante > 0
    ? (minima * totalPeso - sumaActual) / pesoFaltante
    : null;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const statusColor = (nota: number) => {
    if (nota > 10) return 'text-red-600 dark:text-red-400';
    if (nota >= 7) return 'text-green-600 dark:text-green-400';
    if (nota >= 5) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid text-xs font-medium text-gray-500 dark:text-gray-400 px-1"
          style={{ gridTemplateColumns: '1fr 70px 70px 24px' }}>
          <span>Parte</span>
          <span className="text-center">Nota</span>
          <span className="text-center">Peso %</span>
          <span></span>
        </div>
        {partes.map((p, i) => (
          <div key={i} className="grid gap-2 items-center" style={{ gridTemplateColumns: '1fr 70px 70px 24px' }}>
            <input value={p.nombre} onChange={e => upd(i, 'nombre', e.target.value)} placeholder={`Parte ${i + 1}`}
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
            <input type="number" value={p.nota} onChange={e => upd(i, 'nota', e.target.value)} placeholder="—" min="0" max="10" step="0.1"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            <input type="number" value={p.peso} onChange={e => upd(i, 'peso', e.target.value)} placeholder="%" min="0" max="100"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            {partes.length > 1 && (
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold text-base">×</button>
            )}
          </div>
        ))}
        <button onClick={add} className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-colors">
          + Añadir parte
        </button>
        {Math.abs(totalPeso - 100) > 0.1 && (
          <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-lg">
            Total pesos: {totalPeso}% (debería sumar 100%)
          </div>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nota mínima para aprobar</label>
        <input type="number" value={notaMinima} onChange={e => setNotaMinima(e.target.value)} min="0" max="10" step="0.1"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      {notaActual !== null && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-600 dark:text-indigo-400">Nota acumulada actual</div>
            <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(notaActual)}</div>
            <div className="text-xs text-indigo-500 dark:text-indigo-400">{pesoActual}% evaluado</div>
          </div>

          {notaNecesaria !== null && sinNota.length > 0 && (
            <div className={`border-2 rounded-xl p-4 text-center ${notaNecesaria > 10 ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700' : notaNecesaria <= 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'}`}>
              <div className={`text-xs font-medium mb-1 ${statusColor(notaNecesaria)}`}>
                Nota necesaria en lo que falta ({pesoFaltante}%)
              </div>
              <div className={`text-3xl font-bold ${statusColor(notaNecesaria)}`}>
                {notaNecesaria > 10 ? '¡Imposible!' : notaNecesaria <= 0 ? '¡Ya aprobado!' : fmt(notaNecesaria)}
              </div>
              {notaNecesaria > 10 && <div className="text-xs text-red-500 mt-1">La nota máxima es 10 — no es posible alcanzar el {notaMinima}</div>}
              {notaNecesaria <= 0 && <div className="text-xs text-green-500 mt-1">Aunque saques 0 en lo que falta, ya tienes el {notaMinima}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
