'use client';
import { useState } from 'react';

const LETRAS = 'TRWAGMYFPDXBNJZSQVHLCKE';

function calcularLetra(num: number): string {
  return LETRAS[num % 23];
}

function validarNif(nif: string): { valido: boolean; letra: string; calculada: string; tipo: string } {
  const clean = nif.toUpperCase().trim();
  // NIE: empieza por X, Y, Z
  let tipo = 'DNI/NIF';
  let numero = clean;
  if (/^[XYZ]/.test(clean)) {
    tipo = 'NIE';
    const mapa: Record<string, string> = { X: '0', Y: '1', Z: '2' };
    numero = mapa[clean[0]] + clean.slice(1, -1);
  } else {
    numero = clean.slice(0, -1);
  }
  const n = parseInt(numero);
  const letraDoc = clean[clean.length - 1];
  const letraCalculada = calcularLetra(n);
  return { valido: letraDoc === letraCalculada, letra: letraDoc, calculada: letraCalculada, tipo };
}

export default function CalculadoraLetraDni() {
  const [numeros, setNumeros] = useState('');
  const [modoNie, setModoNie] = useState(false);
  const [nieLetra, setNieLetra] = useState<'X' | 'Y' | 'Z'>('X');
  const [validarMode, setValidarMode] = useState(false);
  const [dniCompleto, setDniCompleto] = useState('');

  const num = parseInt(numeros.replace(/\D/g, '')) || 0;
  const letraCalculada = numeros.length > 0 && !isNaN(num) ? calcularLetra(
    modoNie ? parseInt(({ X: '0', Y: '1', Z: '2' } as Record<string, string>)[nieLetra] + numeros.replace(/\D/g, '')) : num
  ) : null;

  const validacion = validarMode && dniCompleto.length >= 9 ? validarNif(dniCompleto) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
        {[
          { id: false, label: '🔢 Calcular letra' },
          { id: true, label: '✅ Validar DNI/NIF' },
        ].map(m => (
          <button key={String(m.id)} onClick={() => setValidarMode(m.id as boolean)}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${validarMode === m.id ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500'}`}>
            {m.label}
          </button>
        ))}
      </div>

      {!validarMode ? (
        <>
          <div className="flex gap-2 items-center">
            <button onClick={() => setModoNie(!modoNie)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border-2 ${modoNie ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400 text-blue-700 dark:text-blue-300' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}>
              {modoNie ? '✅ NIE' : '⬜ NIE (extranjero)'}
            </button>
          </div>

          <div className="flex gap-2 items-center">
            {modoNie && (
              <div className="flex gap-1">
                {(['X', 'Y', 'Z'] as const).map(l => (
                  <button key={l} onClick={() => setNieLetra(l)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm ${nieLetra === l ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}>{l}</button>
                ))}
              </div>
            )}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                {modoNie ? 'Los 7 números del NIE' : 'Los 8 dígitos del DNI'}
              </label>
              <input
                type="text" value={numeros} onChange={e => setNumeros(e.target.value.replace(/\D/g, '').slice(0, modoNie ? 7 : 8))}
                placeholder={modoNie ? '1234567' : '12345678'}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center tracking-widest"
                maxLength={modoNie ? 7 : 8}
              />
            </div>
          </div>

          {letraCalculada && numeros.length === (modoNie ? 7 : 8) && (
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-400 dark:border-green-700 rounded-2xl p-5 text-center">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">Tu {modoNie ? 'NIE' : 'DNI/NIF'} completo es:</div>
              <div className="text-4xl font-bold font-mono text-green-700 dark:text-green-300 tracking-widest">
                {modoNie ? nieLetra : ''}{numeros}<span className="text-indigo-600 dark:text-indigo-400">-{letraCalculada}</span>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 mt-2">
                La letra <strong>{letraCalculada}</strong> corresponde a {parseInt(modoNie ? ({ X: '0', Y: '1', Z: '2' } as Record<string, string>)[nieLetra] + numeros : numeros)} ÷ 23 = resto <strong>{parseInt(modoNie ? ({ X: '0', Y: '1', Z: '2' } as Record<string, string>)[nieLetra] + numeros : numeros) % 23}</strong>
              </div>
            </div>
          )}

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">¿Cómo funciona?</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div>1. Se divide el número entre 23</div>
              <div>2. El resto determina la letra según la tabla oficial</div>
              <div className="font-mono text-xs bg-white dark:bg-gray-700 rounded px-2 py-1 mt-1">TRWAGMYFPDXBNJZSQVHLCKE</div>
              <div className="text-xs text-gray-400">Posiciones 0–22 de la tabla</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">DNI, NIF o NIE completo (con letra)</label>
            <input
              type="text" value={dniCompleto} onChange={e => setDniCompleto(e.target.value.toUpperCase().replace(/[\s-]/g, '').slice(0, 9))}
              placeholder="Ej: 12345678Z o X1234567A"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center tracking-widest"
            />
          </div>

          {validacion && (
            <div className={`rounded-2xl p-4 text-center border-2 ${validacion.valido ? 'bg-green-50 dark:bg-green-900/20 border-green-400' : 'bg-red-50 dark:bg-red-900/20 border-red-400'}`}>
              <div className="text-3xl mb-1">{validacion.valido ? '✅' : '❌'}</div>
              <div className={`text-xl font-bold ${validacion.valido ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {validacion.tipo} {validacion.valido ? 'VÁLIDO' : 'NO VÁLIDO'}
              </div>
              {!validacion.valido && (
                <div className="text-sm mt-1 text-red-600 dark:text-red-400">
                  La letra correcta sería <strong>{validacion.calculada}</strong>, no {validacion.letra}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
