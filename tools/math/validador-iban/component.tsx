'use client';
import { useState } from 'react';

function mod97(str: string): number {
  let remainder = 0;
  for (const ch of str) {
    remainder = (remainder * 10 + parseInt(ch)) % 97;
  }
  return remainder;
}

function validarIBAN(iban: string): {
  valido: boolean; pais: string; checkDigits: string;
  entidad: string; oficina: string; dc: string; cuenta: string;
  esEspanol: boolean; mensaje: string;
} {
  const clean = iban.toUpperCase().replace(/[\s-]/g, '');
  const pais = clean.slice(0, 2);
  const checkDigits = clean.slice(2, 4);
  const bban = clean.slice(4);
  const esEspanol = pais === 'ES';

  // Rearrange: move first 4 chars to end, replace letters
  const rearranged = (bban + pais + checkDigits).split('').map(c => {
    const code = c.charCodeAt(0);
    return code >= 65 && code <= 90 ? String(code - 55) : c;
  }).join('');

  const resto = mod97(rearranged);
  const valido = resto === 1;

  let entidad = '', oficina = '', dc = '', cuenta = '';
  if (esEspanol && bban.length === 20) {
    entidad = bban.slice(0, 4);
    oficina = bban.slice(4, 8);
    dc = bban.slice(8, 10);
    cuenta = bban.slice(10);
  }

  const PAISES: Record<string, string> = {
    ES: '🇪🇸 España', DE: '🇩🇪 Alemania', FR: '🇫🇷 Francia', IT: '🇮🇹 Italia',
    GB: '🇬🇧 Reino Unido', PT: '🇵🇹 Portugal', NL: '🇳🇱 Países Bajos',
    BE: '🇧🇪 Bélgica', AT: '🇦🇹 Austria', CH: '🇨🇭 Suiza',
  };

  const mensaje = valido
    ? `IBAN válido de ${PAISES[pais] || pais}`
    : `IBAN no válido (dígitos de control incorrectos)`;

  return { valido, pais: PAISES[pais] || pais, checkDigits, entidad, oficina, dc, cuenta, esEspanol, mensaje };
}

const EJEMPLOS = [
  'ES91 2100 0418 4502 0005 1332',
  'DE89 3704 0044 0532 0130 00',
  'FR76 3000 6000 0112 3456 7890 189',
  'GB29 NWBK 6016 1331 9268 19',
];

export default function ValidadorIban() {
  const [iban, setIban] = useState('');
  const clean = iban.toUpperCase().replace(/[\s-]/g, '');
  const resultado = clean.length >= 15 ? validarIBAN(clean) : null;

  const formatIban = (v: string) => {
    const raw = v.toUpperCase().replace(/[\s-]/g, '');
    return raw.match(/.{1,4}/g)?.join(' ') || raw;
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">IBAN</label>
        <input
          type="text" value={iban}
          onChange={e => setIban(formatIban(e.target.value))}
          placeholder="ES91 2100 0418 4502 0005 1332"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-indigo-400 focus:outline-none tracking-wider"
        />
        <div className="text-xs text-gray-400 mt-0.5">{clean.length} caracteres · IBAN español: ES + 22 dígitos = 24 total</div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {EJEMPLOS.map(ej => (
          <button key={ej} onClick={() => setIban(ej)}
            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 font-mono hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
            {ej.slice(0, 9)}…
          </button>
        ))}
      </div>

      {resultado && (
        <div className="space-y-3">
          <div className={`rounded-2xl p-4 text-center border-2 ${resultado.valido ? 'bg-green-50 dark:bg-green-900/20 border-green-400' : 'bg-red-50 dark:bg-red-900/20 border-red-400'}`}>
            <div className="text-3xl mb-1">{resultado.valido ? '✅' : '❌'}</div>
            <div className={`text-lg font-bold ${resultado.valido ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              {resultado.mensaje}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Dígitos de control: <span className="font-mono font-bold">{resultado.checkDigits}</span>
            </div>
          </div>

          {resultado.valido && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 space-y-2">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Desglose del IBAN</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'País', value: resultado.pais },
                  { label: 'Dígitos control', value: resultado.checkDigits },
                  ...(resultado.esEspanol ? [
                    { label: 'Código entidad', value: resultado.entidad },
                    { label: 'Oficina', value: resultado.oficina },
                    { label: 'Dígitos control cuenta', value: resultado.dc },
                    { label: 'Número de cuenta', value: resultado.cuenta },
                  ] : []),
                ].map(f => (
                  <div key={f.label} className="bg-white dark:bg-gray-700 rounded-lg p-2">
                    <div className="text-xs text-gray-400">{f.label}</div>
                    <div className="font-mono text-sm font-bold text-gray-700 dark:text-gray-200">{f.value}</div>
                  </div>
                ))}
              </div>
              {resultado.esEspanol && (
                <div className="text-xs text-gray-400 flex gap-2 flex-wrap mt-1">
                  <span className="bg-white dark:bg-gray-700 px-2 py-0.5 rounded font-mono">ES·{resultado.checkDigits}·{resultado.entidad}·{resultado.oficina}·{resultado.dc}·{resultado.cuenta}</span>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-xs text-blue-700 dark:text-blue-300">
            🔒 Este validador funciona completamente en tu navegador. No se envían datos a ningún servidor.
          </div>
        </div>
      )}
    </div>
  );
}
