'use client';
import { useState } from 'react';

interface Asignatura { nombre: string; nota: string; creditos: string; }

export default function NotaMedia() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([
    { nombre: 'Matemáticas', nota: '7.5', creditos: '6' },
    { nombre: 'Física', nota: '6', creditos: '6' },
    { nombre: 'Historia', nota: '8.5', creditos: '4' },
  ]);
  const [modo, setModo] = useState<'ponderada' | 'simple'>('ponderada');
  const [escala, setEscala] = useState<'10' | '4'>('10');

  const add = () => setAsignaturas(prev => [...prev, { nombre: '', nota: '', creditos: '6' }]);
  const remove = (i: number) => setAsignaturas(prev => prev.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof Asignatura, val: string) =>
    setAsignaturas(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: val } : a));

  const validas = asignaturas.filter(a => {
    const n = parseFloat(a.nota);
    return !isNaN(n) && n >= 0;
  });

  const media = (() => {
    if (validas.length === 0) return null;
    if (modo === 'simple') {
      return validas.reduce((s, a) => s + parseFloat(a.nota), 0) / validas.length;
    }
    const totalCreditos = validas.reduce((s, a) => s + (parseFloat(a.creditos) || 1), 0);
    if (totalCreditos === 0) return null;
    const suma = validas.reduce((s, a) => s + parseFloat(a.nota) * (parseFloat(a.creditos) || 1), 0);
    return suma / totalCreditos;
  })();

  const totalCreditos = validas.reduce((s, a) => s + (parseFloat(a.creditos) || 0), 0);

  const toScale4 = (n: number) => (n / 10) * 4;

  const calificacion = (n: number) => {
    if (n >= 9) return { label: 'Matrícula de Honor', color: 'text-purple-700 dark:text-purple-300' };
    if (n >= 7) return { label: 'Notable', color: 'text-blue-700 dark:text-blue-300' };
    if (n >= 6) return { label: 'Bien', color: 'text-green-700 dark:text-green-300' };
    if (n >= 5) return { label: 'Aprobado', color: 'text-yellow-700 dark:text-yellow-300' };
    return { label: 'Suspenso', color: 'text-red-700 dark:text-red-300' };
  };

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setModo('ponderada')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${modo === 'ponderada' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
          Ponderada (créditos)
        </button>
        <button onClick={() => setModo('simple')}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${modo === 'simple' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
          Simple
        </button>
      </div>

      <div className="space-y-2">
        <div className="grid text-xs font-medium text-gray-500 dark:text-gray-400 px-1"
          style={{ gridTemplateColumns: modo === 'ponderada' ? '1fr 80px 70px 24px' : '1fr 80px 24px' }}>
          <span>Asignatura</span>
          <span className="text-center">Nota</span>
          {modo === 'ponderada' && <span className="text-center">Créditos</span>}
          <span></span>
        </div>

        {asignaturas.map((a, i) => (
          <div key={i} className="grid gap-2 items-center"
            style={{ gridTemplateColumns: modo === 'ponderada' ? '1fr 80px 70px 24px' : '1fr 80px 24px' }}>
            <input value={a.nombre} onChange={e => update(i, 'nombre', e.target.value)} placeholder={`Asignatura ${i + 1}`}
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs" />
            <input type="number" value={a.nota} onChange={e => update(i, 'nota', e.target.value)} placeholder="0–10" min="0" max="10" step="0.1"
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            {modo === 'ponderada' && (
              <input type="number" value={a.creditos} onChange={e => update(i, 'creditos', e.target.value)} placeholder="ECTS" min="1" max="30"
                className="border border-gray-300 dark:border-gray-600 rounded-xl px-2 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xs text-center" />
            )}
            {asignaturas.length > 1 && (
              <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 font-bold text-base">×</button>
            )}
          </div>
        ))}

        <button onClick={add}
          className="w-full py-2 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl text-xs text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-colors">
          + Añadir asignatura
        </button>
      </div>

      {media !== null && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-2">
              <button onClick={() => setEscala('10')} className={`px-3 py-1 rounded-lg text-xs font-medium ${escala === '10' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>Escala 10</button>
              <button onClick={() => setEscala('4')} className={`px-3 py-1 rounded-lg text-xs font-medium ${escala === '4' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>Escala 4 (GPA)</button>
            </div>
            <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-300">
              {escala === '10' ? fmt(media) : fmt(toScale4(media))}
            </div>
            <div className={`text-sm font-semibold mt-1 ${calificacion(media).color}`}>{calificacion(media).label}</div>
            {modo === 'ponderada' && (
              <div className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">{totalCreditos} créditos ECTS · {validas.length} asignaturas</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
