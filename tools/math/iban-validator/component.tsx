'use client';
import { useState } from 'react';

function mod97(str: string): number {
  let remainder = 0;
  for (let i = 0; i < str.length; i++) {
    remainder = (remainder * 10 + parseInt(str[i])) % 97;
  }
  return remainder;
}

function letterToNum(s: string): string {
  return s.split('').map(c => {
    const code = c.charCodeAt(0);
    return code >= 65 && code <= 90 ? String(code - 55) : c;
  }).join('');
}

function validateIBAN(iban: string): { valid: boolean; country: string; msg: string } {
  const clean = iban.replace(/\s/g, '').toUpperCase();
  if (clean.length < 4) return { valid: false, country: '', msg: 'IBAN demasiado corto' };
  const country = clean.slice(0, 2);
  const lengths: Record<string, number> = {
    ES: 24, DE: 22, FR: 27, IT: 27, GB: 22, PT: 25, NL: 18, BE: 16,
    AT: 20, CH: 21, PL: 28, SE: 24, DK: 18, NO: 15, FI: 18, IE: 22,
  };
  const expectedLen = lengths[country];
  if (expectedLen && clean.length !== expectedLen) {
    return { valid: false, country, msg: `Longitud incorrecta para ${country}: se esperan ${expectedLen} caracteres, tienes ${clean.length}` };
  }
  const rearranged = clean.slice(4) + clean.slice(0, 4);
  const numeric = letterToNum(rearranged);
  const remainder = mod97(numeric);
  return remainder === 1
    ? { valid: true, country, msg: '✅ IBAN válido' }
    : { valid: false, country, msg: '❌ Dígito de control incorrecto' };
}

function cccToIBAN(ccc: string): string | null {
  const c = ccc.replace(/\s/g, '');
  if (c.length !== 20) return null;
  const base = c + 'ES00';
  const numeric = letterToNum(base);
  const rem = mod97(numeric);
  const dc = String(98 - rem).padStart(2, '0');
  return `ES${dc}${c}`;
}

function formatIBAN(iban: string): string {
  return iban.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') ?? iban;
}

export default function IbanValidator() {
  const [modo, setModo] = useState<'validar' | 'generar'>('validar');
  const [iban, setIban] = useState('');
  const [ccc, setCcc] = useState('');

  const cleanIban = iban.replace(/\s/g, '').toUpperCase();
  const resultado = cleanIban.length >= 4 ? validateIBAN(cleanIban) : null;
  const ibanGenerado = ccc.replace(/\s/g, '').length === 20 ? cccToIBAN(ccc.replace(/\s/g, '')) : null;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {([['validar', '✅ Validar IBAN'], ['generar', '🔢 CCC → IBAN']] as const).map(([v, l]) => (
          <button key={v} onClick={() => setModo(v)}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${modo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
        ))}
      </div>

      {modo === 'validar' ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">IBAN (con o sin espacios)</label>
            <input value={iban} onChange={e => setIban(e.target.value.toUpperCase())} placeholder="ES91 2100 0418 4502 0005 1332"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm font-mono tracking-wide" />
          </div>
          {resultado && (
            <div className={`border-2 rounded-2xl p-4 text-center ${resultado.valid ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'}`}>
              <div className={`text-2xl font-bold ${resultado.valid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{resultado.msg}</div>
              {resultado.country && <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">País: {resultado.country} · {formatIBAN(cleanIban)}</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">CCC (20 dígitos: entidad + oficina + DC + cuenta)</label>
            <input value={ccc} onChange={e => setCcc(e.target.value.replace(/\D/g, '').slice(0, 20))} placeholder="21000418450200051332"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm font-mono tracking-wide" />
            <div className="text-xs text-gray-400 mt-1">{ccc.replace(/\s/g,'').length}/20 dígitos</div>
          </div>
          {ibanGenerado && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
              <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-1">Tu IBAN español es:</div>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 font-mono">{formatIBAN(ibanGenerado)}</div>
              <button onClick={() => navigator.clipboard?.writeText(ibanGenerado)}
                className="mt-2 text-xs text-indigo-500 dark:text-indigo-400 underline">Copiar</button>
            </div>
          )}
        </div>
      )}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-xs text-gray-500 dark:text-gray-400">
        Validación mediante módulo 97 (ISO 13616). Compatible con todos los países SEPA.
      </div>
    </div>
  );
}
