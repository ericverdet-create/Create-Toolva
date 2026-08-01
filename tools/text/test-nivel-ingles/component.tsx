'use client';
import { useState } from 'react';

const PREGUNTAS = [
  // A1
  { id: 1, nivel: 'A1', pregunta: 'What ___ your name?', opciones: ['is', 'are', 'am', 'be'], correcta: 0 },
  { id: 2, nivel: 'A1', pregunta: 'She ___ a teacher.', opciones: ['am', 'is', 'are', 'be'], correcta: 1 },
  { id: 3, nivel: 'A1', pregunta: 'I ___ to school every day.', opciones: ['go', 'goes', 'going', 'went'], correcta: 0 },
  { id: 4, nivel: 'A1', pregunta: 'There ___ two cats in the garden.', opciones: ['is', 'are', 'am', 'has'], correcta: 1 },
  // A2
  { id: 5, nivel: 'A2', pregunta: 'I ___ breakfast at 7am yesterday.', opciones: ['have', 'had', 'has', 'having'], correcta: 1 },
  { id: 6, nivel: 'A2', pregunta: 'She can ___ very fast.', opciones: ['runs', 'run', 'running', 'ran'], correcta: 1 },
  { id: 7, nivel: 'A2', pregunta: 'We ___ friends for ten years.', opciones: ['are', 'were', 'have been', 'being'], correcta: 2 },
  // B1
  { id: 8, nivel: 'B1', pregunta: 'If it rains, I ___ stay at home.', opciones: ['will', 'would', 'should', 'shall'], correcta: 0 },
  { id: 9, nivel: 'B1', pregunta: 'The book ___ written by Cervantes.', opciones: ['is', 'was', 'were', 'has'], correcta: 1 },
  { id: 10, nivel: 'B1', pregunta: 'I\'m looking forward ___ you.', opciones: ['see', 'to see', 'to seeing', 'seeing'], correcta: 2 },
  { id: 11, nivel: 'B1', pregunta: 'He suggested ___ a taxi.', opciones: ['take', 'to take', 'taking', 'took'], correcta: 2 },
  // B2
  { id: 12, nivel: 'B2', pregunta: 'By 2030, scientists ___ a cure for cancer.', opciones: ['will find', 'will have found', 'find', 'would find'], correcta: 1 },
  { id: 13, nivel: 'B2', pregunta: 'I wish I ___ more time yesterday.', opciones: ['had', 'have had', 'had had', 'would have'], correcta: 2 },
  { id: 14, nivel: 'B2', pregunta: 'The company\'s ___ policy has changed significantly.', opciones: ['remuneration', 'punishment', 'accusation', 'decoration'], correcta: 0 },
  { id: 15, nivel: 'B2', pregunta: 'Despite ___ hard, they failed the exam.', opciones: ['studied', 'studying', 'to study', 'study'], correcta: 1 },
  // C1
  { id: 16, nivel: 'C1', pregunta: 'The new law will have far-___ consequences.', opciones: ['reaching', 'fetched', 'fetching', 'reaching out'], correcta: 0 },
  { id: 17, nivel: 'C1', pregunta: 'Had I known, I ___ differently.', opciones: ['would act', 'would have acted', 'will act', 'had acted'], correcta: 1 },
  { id: 18, nivel: 'C1', pregunta: 'The deal fell ___ at the last minute.', opciones: ['out', 'through', 'off', 'over'], correcta: 1 },
  // C2
  { id: 19, nivel: 'C2', pregunta: 'The politician\'s speech was full of ___: impressive words with little meaning.', opciones: ['rhetoric', 'syntax', 'phonetics', 'semantics'], correcta: 0 },
  { id: 20, nivel: 'C2', pregunta: 'The findings were somewhat ___: they neither confirmed nor denied the theory.', opciones: ['conclusive', 'ambiguous', 'definitive', 'categorical'], correcta: 1 },
];

type Estado = 'inicio' | 'jugando' | 'resultado';

const NIVELES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function getNivel(correctas: number): string {
  if (correctas <= 3) return 'A1';
  if (correctas <= 6) return 'A2';
  if (correctas <= 10) return 'B1';
  if (correctas <= 14) return 'B2';
  if (correctas <= 17) return 'C1';
  return 'C2';
}

const DESC_NIVEL: Record<string, { desc: string; emoji: string }> = {
  A1: { emoji: '🌱', desc: 'Principiante. Puedes presentarte y usar frases básicas.' },
  A2: { emoji: '🌿', desc: 'Básico. Entiendes situaciones cotidianas simples.' },
  B1: { emoji: '🌳', desc: 'Intermedio. Te comunicas en situaciones habituales de viaje y trabajo.' },
  B2: { emoji: '⭐', desc: 'Intermedio-alto. Puedes mantener conversaciones complejas con fluidez.' },
  C1: { emoji: '🌟', desc: 'Avanzado. Expresas ideas complejas con precisión y espontaneidad.' },
  C2: { emoji: '🏆', desc: 'Maestría. Dominas el inglés al nivel de un hablante nativo culto.' },
};

export default function TestNivelIngles() {
  const [estado, setEstado] = useState<Estado>('inicio');
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(Array(20).fill(null));
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [mostrarExpl, setMostrarExpl] = useState(false);

  const pregunta = PREGUNTAS[idx];
  const correctas = respuestas.filter((r, i) => r === PREGUNTAS[i].correcta).length;
  const nivelFinal = getNivel(correctas);

  const responder = (opIdx: number) => {
    if (seleccion !== null) return;
    setSeleccion(opIdx);
    const nuevas = [...respuestas];
    nuevas[idx] = opIdx;
    setRespuestas(nuevas);
  };

  const siguiente = () => {
    if (idx < PREGUNTAS.length - 1) {
      setIdx(idx + 1);
      setSeleccion(null);
      setMostrarExpl(false);
    } else {
      setEstado('resultado');
    }
  };

  const reiniciar = () => {
    setEstado('inicio');
    setIdx(0);
    setRespuestas(Array(20).fill(null));
    setSeleccion(null);
    setMostrarExpl(false);
  };

  if (estado === 'inicio') {
    return (
      <div className="space-y-4 text-center">
        <div className="text-4xl">🇬🇧</div>
        <div className="text-lg font-bold text-gray-800 dark:text-gray-100">Test de Nivel de Inglés</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">20 preguntas · Gramática y vocabulario · Niveles A1 a C2 (MCER)</div>
        <div className="grid grid-cols-3 gap-2">
          {NIVELES.map(n => (
            <div key={n} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 text-center">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{n}</div>
              <div className="text-xs text-gray-500">{DESC_NIVEL[n].emoji}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setEstado('jugando')}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-lg">
          🚀 Empezar test
        </button>
      </div>
    );
  }

  if (estado === 'resultado') {
    const info = DESC_NIVEL[nivelFinal];
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-5xl mb-2">{info.emoji}</div>
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Nivel {nivelFinal}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{info.desc}</div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Correctas', value: `${correctas}/20`, color: 'text-green-600 dark:text-green-400' },
            { label: 'Precisión', value: `${Math.round(correctas / 20 * 100)}%`, color: 'text-indigo-600 dark:text-indigo-400' },
            { label: 'Nivel MCER', value: nivelFinal, color: 'text-orange-600 dark:text-orange-400' },
          ].map(s => (
            <div key={s.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-center">
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Tu progresión por nivel</div>
          {NIVELES.map(n => {
            const pregNivel = PREGUNTAS.filter(p => p.nivel === n);
            const acertadasNivel = pregNivel.filter(p => respuestas[p.id - 1] === p.correcta).length;
            return (
              <div key={n} className="flex items-center gap-2">
                <span className="text-xs font-bold w-6 text-gray-600 dark:text-gray-400">{n}</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${(acertadasNivel / pregNivel.length) * 100}%` }} />
                </div>
                <span className="text-xs text-gray-400">{acertadasNivel}/{pregNivel.length}</span>
              </div>
            );
          })}
        </div>
        <button onClick={reiniciar} className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold">🔄 Repetir test</button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-lg">Nivel {pregunta.nivel}</span>
        <span className="text-xs text-gray-500">{idx + 1} / {PREGUNTAS.length}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
        <div className="bg-indigo-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx) / PREGUNTAS.length) * 100}%` }} />
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4">
        <div className="text-base font-medium text-gray-800 dark:text-gray-100">{pregunta.pregunta}</div>
      </div>

      <div className="space-y-2">
        {pregunta.opciones.map((op, i) => {
          let clase = 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300';
          if (seleccion !== null) {
            if (i === pregunta.correcta) clase = 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-300';
            else if (i === seleccion) clase = 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300';
          } else if (seleccion === i) {
            clase = 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-400 text-indigo-700';
          }
          return (
            <button key={i} onClick={() => responder(i)}
              className={`w-full text-left px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${clase}`}>
              <span className="text-gray-400 mr-2">{String.fromCharCode(65 + i)}.</span>{op}
            </button>
          );
        })}
      </div>

      {seleccion !== null && (
        <button onClick={siguiente}
          className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm">
          {idx < PREGUNTAS.length - 1 ? 'Siguiente →' : 'Ver resultado'}
        </button>
      )}
    </div>
  );
}
