'use client';
import { useState } from 'react';

const LETTER_VALUES: Record<string, number> = {
  A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,
  N:5,Ñ:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8,
};

const MEANINGS: Record<number, { title: string; desc: string }> = {
  1: { title: 'El Líder', desc: 'Independiente, pionero, ambicioso y decidido. Natural líder con gran fuerza de voluntad.' },
  2: { title: 'El Diplomático', desc: 'Sensible, cooperativo, paciente. Excelente mediador con grandes dotes para las relaciones.' },
  3: { title: 'El Creativo', desc: 'Expresivo, alegre, sociable. Talento para la comunicación, el arte y la creatividad.' },
  4: { title: 'El Constructor', desc: 'Práctico, trabajador, metódico. Busca la estabilidad y se aplica con disciplina.' },
  5: { title: 'El Aventurero', desc: 'Libre, adaptable, curioso. Ama la libertad, los viajes y los nuevos desafíos.' },
  6: { title: 'El Responsable', desc: 'Cuidador, armonioso, leal. Orientado a la familia y al servicio a los demás.' },
  7: { title: 'El Sabio', desc: 'Analítico, introspectivo, espiritual. Busca conocimiento y comprensión profunda.' },
  8: { title: 'El Ejecutivo', desc: 'Ambicioso, materialista, poderoso. Orientado al éxito, los negocios y el poder.' },
  9: { title: 'El Humanista', desc: 'Compasivo, idealista, generoso. Vocación universal y espíritu altruista.' },
  11: { title: 'El Iluminado', desc: 'Número maestro. Altamente intuitivo, espiritual e inspirador para los demás.' },
  22: { title: 'El Gran Constructor', desc: 'Número maestro. Capacidad para materializar grandes visiones. El arquitecto del mundo.' },
  33: { title: 'El Maestro', desc: 'Número maestro. El maestro de la compasión y la enseñanza desinteresada.' },
};

function reduceToSingle(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split('').reduce((acc, d) => acc + parseInt(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n;
}

function calcLifePath(dob: string): number | null {
  if (!dob) return null;
  const parts = dob.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(p => parseInt(p));
  const sum = String(y).split('').reduce((a, c) => a + parseInt(c), 0)
    + String(m).split('').reduce((a, c) => a + parseInt(c), 0)
    + String(d).split('').reduce((a, c) => a + parseInt(c), 0);
  return reduceToSingle(sum);
}

function calcExpression(name: string): number | null {
  const clean = name.toUpperCase().replace(/[^A-ZÁÉÍÓÚÑ ]/g, '').replace(/[ÁÉÍÓÚ]/g, (c) => ({ Á:'A',É:'E',Í:'I',Ó:'O',Ú:'U' }[c] || c));
  const letters = clean.replace(/ /g, '').split('');
  if (letters.length === 0) return null;
  const sum = letters.reduce((acc, l) => acc + (LETTER_VALUES[l] || 0), 0);
  return reduceToSingle(sum);
}

export default function Numerology() {
  const [dob, setDob] = useState('1990-05-15');
  const [name, setName] = useState('');

  const lifePath = calcLifePath(dob);
  const expression = name.trim() ? calcExpression(name) : null;

  const lm = lifePath ? MEANINGS[lifePath] : null;
  const em = expression ? MEANINGS[expression] : null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Fecha de nacimiento</label>
          <input type="date" value={dob} onChange={e => setDob(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nombre completo (para número de expresión)</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre completo"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      {lifePath && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4">
          <div className="text-xs font-semibold text-purple-500 dark:text-purple-400 uppercase tracking-wide mb-2">🌟 Número del Camino de Vida</div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-purple-700 dark:text-purple-300 w-16 text-center">{lifePath}</div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">{lm?.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{lm?.desc}</div>
            </div>
          </div>
        </div>
      )}

      {expression && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
          <div className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-2">✨ Número de Expresión</div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-300 w-16 text-center">{expression}</div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">{em?.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{em?.desc}</div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        📖 La numerología pitagórica asigna valores del 1 al 9 a las letras. Los números maestros (11, 22, 33) no se reducen. Uso con fines de entretenimiento.
      </div>
    </div>
  );
}
