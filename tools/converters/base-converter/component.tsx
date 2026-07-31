'use client';
import { useState, useCallback } from 'react';

type Base = { name: string; radix: number; prefix: string; pattern: RegExp };

const BASES: Base[] = [
  { name: 'Binario (Base 2)', radix: 2, prefix: '0b', pattern: /^[01]*$/ },
  { name: 'Octal (Base 8)', radix: 8, prefix: '0o', pattern: /^[0-7]*$/ },
  { name: 'Decimal (Base 10)', radix: 10, prefix: '', pattern: /^[0-9]*$/ },
  { name: 'Hexadecimal (Base 16)', radix: 16, prefix: '0x', pattern: /^[0-9a-fA-F]*$/ },
];

export default function BaseConverter() {
  const [values, setValues] = useState<Record<number, string>>({ 2: '1010', 8: '12', 10: '10', 16: 'A' });
  const [activeBase, setActiveBase] = useState(10);
  const [copied, setCopied] = useState<number | null>(null);

  const handleChange = (radix: number, val: string) => {
    const base = BASES.find(b => b.radix === radix)!;
    const clean = val.toUpperCase();
    if (clean !== '' && !base.pattern.test(clean)) return;
    setActiveBase(radix);

    if (clean === '') {
      setValues({ 2: '', 8: '', 10: '', 16: '' });
      return;
    }

    const decimal = parseInt(clean, radix);
    if (isNaN(decimal) || decimal < 0) return;

    const newValues: Record<number, string> = {};
    BASES.forEach(b => {
      newValues[b.radix] = b.radix === 16
        ? decimal.toString(16).toUpperCase()
        : decimal.toString(b.radix);
    });
    setValues(newValues);
  };

  const copy = useCallback((radix: number) => {
    navigator.clipboard.writeText(values[radix] || '');
    setCopied(radix);
    setTimeout(() => setCopied(null), 2000);
  }, [values]);

  const decimalVal = values[10] ? parseInt(values[10], 10) : null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3">
        {BASES.map(base => (
          <div key={base.radix}
            className={`rounded-xl border p-3 transition-colors ${activeBase === base.radix ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'}`}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {base.name}
              </label>
              <button onClick={() => copy(base.radix)}
                className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors">
                {copied === base.radix ? '✓ Copiado' : 'Copiar'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              {base.prefix && <span className="text-gray-400 font-mono text-sm">{base.prefix}</span>}
              <input
                value={values[base.radix] || ''}
                onChange={e => handleChange(base.radix, e.target.value)}
                onFocus={() => setActiveBase(base.radix)}
                className="flex-1 bg-transparent font-mono text-lg text-gray-900 dark:text-white focus:outline-none"
                placeholder="0"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>
        ))}
      </div>

      {decimalVal !== null && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <div className="flex gap-4 flex-wrap">
            <span>Valor: <strong className="text-gray-900 dark:text-white">{decimalVal.toLocaleString('es-ES')}</strong></span>
            {decimalVal > 0 && <span>Bits necesarios: <strong className="text-gray-900 dark:text-white">{Math.floor(Math.log2(decimalVal)) + 1}</strong></span>}
            {decimalVal >= 0 && decimalVal <= 127 && (
              <span>ASCII: <strong className="text-gray-900 dark:text-white">{String.fromCharCode(decimalVal) || '—'}</strong></span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
