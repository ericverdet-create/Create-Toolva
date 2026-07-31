'use client';
import { useState } from 'react';

const LETRAS = 'TRWAGMYFPDXBNJZSQVHLCKE';

function calcLetraDNI(numero: number): string {
  return LETRAS[numero % 23];
}

function calcLetraNIE(nie: string): string | null {
  const first = nie[0].toUpperCase();
  const map: Record<string, string> = { X: '0', Y: '1', Z: '2' };
  if (!map[first]) return null;
  const numStr = map[first] + nie.slice(1, 8);
  const num = parseInt(numStr);
  if (isNaN(num)) return null;
  return LETRAS[num % 23];
}

export default function LetraDni() {
  const [tipo, setTipo] = useState<'dni' | 'nie'>('dni');
  const [numero, setNumero] = useState('');
  const [letraIntroducida, setLetraIntroducida] = useState('');

  const numLimpio = numero.replace(/\D/g, '').slice(0, 8);
  const nieCompleto = numero.toUpperCase().replace(/[^XYZ0-9]/g, '').slice(0, 9);

  let letraCorrecta: string | null = null;
  let esValido: boolean | null = null;

  if (tipo === 'dni' && numLimpio.length === 8) {
    letraCorrecta = calcLetraDNI(parseInt(numLimpio));
    if (letraIntroducida) {
      esValido = letraIntroducida.toUpperCase() === letraCorrecta;
    }
  } else if (tipo === 'nie' && nieCompleto.length >= 8) {
    letraCorrecta = calcLetraNIE(nieCompleto);
    if (letraCorrecta && letraIntroducida) {
      esValido = letraIntroducida.toUpperCase() === letraCorrecta;
    }
  }

  const handleInput = (val: string) => {
    if (tipo === 'dni') {
      setNumero(val.replace(/\D/g, '').slice(0, 8));
    } else {
      setNumero(val.toUpperCase().replace(/[^XYZ0-9]/g, '').slice(0, 8));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['dni', 'nie'] as const).map(t => (
          <button key={t} onClick={() => { setTipo(t); setNumero(''); setLetraIntroducida(''); }}
            className={`flex-1 py-2 rounded-xl font-medium text-sm transition-colors ${tipo === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {tipo === 'dni' ? 'Número del DNI (8 dígitos)' : 'Número del NIE (X/Y/Z + 7 dígitos)'}
        </label>
        <input value={numero} onChange={e => handleInput(e.target.value)}
          placeholder={tipo === 'dni' ? '12345678' : 'X1234567'}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-xl font-mono text-center tracking-widest" />
      </div>

      {letraCorrecta && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6 text-center">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-2">La letra correcta es</div>
          <div className="text-8xl font-bold text-indigo-700 dark:text-indigo-300">{letraCorrecta}</div>
          <div className="text-sm text-indigo-500 dark:text-indigo-400 mt-2 font-mono">
            {tipo === 'dni' ? numLimpio : nieCompleto}-<span className="font-bold">{letraCorrecta}</span>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Verificar letra (opcional)</label>
        <input value={letraIntroducida} onChange={e => setLetraIntroducida(e.target.value.toUpperCase().slice(0, 1))}
          placeholder="Escribe la letra para validar"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm text-center font-mono text-xl uppercase" />
        {esValido !== null && (
          <div className={`mt-2 text-center font-bold text-lg ${esValido ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {esValido ? '✅ Letra correcta' : `❌ Incorrecta — la correcta es ${letraCorrecta}`}
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        <div className="font-medium mb-1">Cómo funciona:</div>
        <div>Se divide el número entre 23 y el resto determina la letra según la tabla: <span className="font-mono">{LETRAS}</span></div>
        <div className="mt-1">En el NIE: X=0, Y=1, Z=2 (se sustituyen antes del cálculo)</div>
      </div>
    </div>
  );
}
