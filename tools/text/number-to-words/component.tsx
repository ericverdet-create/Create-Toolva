'use client';
import { useState, useCallback } from 'react';

const UNIDADES = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
  'veinte', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve'];

const DECENAS = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const CENTENAS = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

function convertirCentenas(n: number): string {
  if (n === 0) return '';
  if (n === 100) return 'cien';
  if (n < 30) return UNIDADES[n];
  if (n < 100) {
    const dec = Math.floor(n / 10);
    const uni = n % 10;
    return uni === 0 ? DECENAS[dec] : DECENAS[dec] + ' y ' + UNIDADES[uni];
  }
  const cen = Math.floor(n / 100);
  const resto = n % 100;
  return CENTENAS[cen] + (resto > 0 ? ' ' + convertirCentenas(resto) : '');
}

function numberToWords(n: number, feminine = false): string {
  if (n === 0) return 'cero';
  if (n < 0) return 'menos ' + numberToWords(-n, feminine);

  const parts: string[] = [];

  if (n >= 1_000_000_000) {
    const miles = Math.floor(n / 1_000_000_000);
    parts.push(miles === 1 ? 'mil millones' : convertirCentenas(miles) + ' mil millones');
    n %= 1_000_000_000;
  }

  if (n >= 1_000_000) {
    const mill = Math.floor(n / 1_000_000);
    parts.push(mill === 1 ? 'un millón' : convertirCentenas(mill) + ' millones');
    n %= 1_000_000;
  }

  if (n >= 1000) {
    const miles = Math.floor(n / 1000);
    if (miles === 1) parts.push('mil');
    else parts.push(convertirCentenas(miles) + ' mil');
    n %= 1000;
  }

  if (n > 0) {
    let s = convertirCentenas(n);
    if (feminine) {
      s = s.replace(/\buno\b/, 'una').replace(/\bveintiuno\b/, 'veintiuna');
    }
    parts.push(s);
  }

  return parts.join(' ').trim().replace(/\s+/g, ' ');
}

function formatCurrency(n: number, currency: string): string {
  const int = Math.floor(n);
  const dec = Math.round((n - int) * 100);

  const currencyNames: Record<string, [string, string, boolean]> = {
    EUR: ['euro', 'euros', false],
    USD: ['dólar', 'dólares', false],
    GBP: ['libra', 'libras', true],
    MXN: ['peso', 'pesos', false],
  };

  const [sing, plur, fem] = currencyNames[currency] || ['euro', 'euros', false];
  const intWords = numberToWords(int, fem);
  const unit = int === 1 ? sing : plur;

  if (dec === 0) return `${intWords} ${unit}`;
  const decWords = numberToWords(dec, true);
  return `${intWords} ${unit} con ${decWords} céntimos`;
}

export default function NumberToWords() {
  const [input, setInput] = useState('1234567');
  const [mode, setMode] = useState<'number' | 'currency'>('number');
  const [currency, setCurrency] = useState('EUR');
  const [copied, setCopied] = useState(false);

  const num = parseFloat(input.replace(',', '.'));
  const isValid = !isNaN(num) && isFinite(num) && Math.abs(num) < 1_000_000_000_000;

  const result = isValid
    ? mode === 'number'
      ? numberToWords(Math.round(num))
      : formatCurrency(num, currency)
    : '';

  const resultCapitalized = result
    ? result.charAt(0).toUpperCase() + result.slice(1)
    : '';

  const handleCopy = useCallback(() => {
    if (!resultCapitalized) return;
    navigator.clipboard.writeText(resultCapitalized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [resultCapitalized]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(['number', 'currency'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${mode === m ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
            {m === 'number' ? '123 → palabras' : '💶 Importe monetario'}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {mode === 'number' ? 'Número' : 'Importe'}
          </label>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            placeholder={mode === 'number' ? 'Ej: 1234567' : 'Ej: 1234.56'}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg" />
        </div>
        {mode === 'currency' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Moneda</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
              <option value="EUR">EUR €</option>
              <option value="USD">USD $</option>
              <option value="GBP">GBP £</option>
              <option value="MXN">MXN $</option>
            </select>
          </div>
        )}
      </div>

      {isValid && resultCapitalized && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4">
          <div className="flex justify-between items-start gap-3">
            <p className="text-gray-900 dark:text-white font-medium text-lg leading-relaxed flex-1">
              {resultCapitalized}
            </p>
            <button onClick={handleCopy}
              className="shrink-0 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
              {copied ? '✓' : 'Copiar'}
            </button>
          </div>
        </div>
      )}

      {!isValid && input && (
        <p className="text-red-500 text-sm">Introduce un número válido (máximo 999.999.999.999)</p>
      )}
    </div>
  );
}
