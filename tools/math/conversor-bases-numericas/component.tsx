'use client';
import { useState } from 'react';

type Base = 'decimal' | 'binario' | 'hexadecimal' | 'octal';

function toDecimal(val: string, base: Base): number | null {
  const clean = val.trim().toUpperCase();
  if (!clean) return null;
  const bases: Record<Base, number> = { decimal: 10, binario: 2, hexadecimal: 16, octal: 8 };
  const n = parseInt(clean, bases[base]);
  return isNaN(n) ? null : n;
}

function fromDecimal(n: number): Record<Base, string> {
  return {
    decimal: n.toString(10),
    binario: n.toString(2),
    hexadecimal: n.toString(16).toUpperCase(),
    octal: n.toString(8),
  };
}

function splitBinary(bin: string): string {
  // Split into groups of 4 from right
  const padded = bin.padStart(Math.ceil(bin.length / 4) * 4, '0');
  return padded.match(/.{1,4}/g)?.join(' ') || bin;
}

const BASE_INFO: Record<Base, { label: string; prefix: string; chars: string; color: string; example: string }> = {
  decimal:     { label: 'Decimal (base 10)',     prefix: '',   chars: '0-9',   color: 'indigo', example: '255' },
  binario:     { label: 'Binario (base 2)',       prefix: '0b', chars: '0-1',   color: 'green',  example: '11111111' },
  hexadecimal: { label: 'Hexadecimal (base 16)', prefix: '0x', chars: '0-9,A-F', color: 'orange', example: 'FF' },
  octal:       { label: 'Octal (base 8)',         prefix: '0o', chars: '0-7',   color: 'purple', example: '377' },
};

const COLORS: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300',
  green:  'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300',
  orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-300',
  purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300',
};

export default function ConversorBasesNumericas() {
  const [inputBase, setInputBase] = useState<Base>('decimal');
  const [valor, setValor] = useState('255');

  const decimal = toDecimal(valor, inputBase);
  const conversiones = decimal !== null ? fromDecimal(decimal) : null;

  const handleChange = (v: string) => {
    // Filter allowed chars based on base
    const filters: Record<Base, RegExp> = {
      decimal:     /[^0-9]/g,
      binario:     /[^01]/g,
      hexadecimal: /[^0-9a-fA-F]/g,
      octal:       /[^0-7]/g,
    };
    setValor(v.replace(filters[inputBase], ''));
  };

  const BASES: Base[] = ['decimal', 'binario', 'hexadecimal', 'octal'];

  return (
    <div className="space-y-4">
      {/* Selector base de entrada */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Convertir desde</label>
        <div className="grid grid-cols-2 gap-1.5">
          {BASES.map(b => (
            <button key={b} onClick={() => { setInputBase(b); setValor(''); }}
              className={`py-2 px-3 rounded-xl text-xs font-medium border-2 transition-colors text-left ${inputBase === b ? COLORS[BASE_INFO[b].color] + ' border-current' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'}`}>
              <div className="font-bold">{b.charAt(0).toUpperCase() + b.slice(1)}</div>
              <div className="text-xs opacity-70">Base {BASE_INFO[b].prefix || '10'} · {BASE_INFO[b].chars}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
          {BASE_INFO[inputBase].label}
        </label>
        <input
          value={valor}
          onChange={e => handleChange(e.target.value)}
          placeholder={`Ej: ${BASE_INFO[inputBase].example}`}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        {decimal !== null && (
          <div className="text-xs text-gray-400 mt-0.5">= {decimal.toLocaleString('es-ES')} en decimal</div>
        )}
      </div>

      {/* Resultados */}
      {conversiones && decimal !== null ? (
        <div className="space-y-2">
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Resultado en todas las bases</div>
          {BASES.filter(b => b !== inputBase).map(b => {
            const val = conversiones[b];
            const info = BASE_INFO[b];
            return (
              <div key={b} className={`border rounded-xl p-3 ${COLORS[info.color]}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs font-medium opacity-70">{info.label}</div>
                    <div className="font-mono text-lg font-bold mt-0.5">
                      {info.prefix}{b === 'binario' ? splitBinary(val) : val}
                    </div>
                    {b === 'binario' && (
                      <div className="text-xs opacity-60 mt-0.5">{val.length} bits · {Math.ceil(val.length/8)} byte(s)</div>
                    )}
                  </div>
                  <button
                    onClick={() => navigator.clipboard?.writeText(val)}
                    className="text-xs opacity-60 hover:opacity-100 transition-opacity px-2 py-1 rounded-lg hover:bg-white/30">
                    📋 Copiar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : valor ? (
        <div className="text-center py-4 text-red-500 text-sm">⚠️ Valor no válido para {inputBase}</div>
      ) : null}

      {/* Tabla referencia rápida */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Referencia rápida</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400">
                <th className="text-left py-1 pr-3">Dec</th>
                <th className="text-left py-1 pr-3">Bin</th>
                <th className="text-left py-1 pr-3">Hex</th>
                <th className="text-left py-1">Oct</th>
              </tr>
            </thead>
            <tbody>
              {[0,1,2,4,8,10,15,16,32,64,128,255].map(n => (
                <tr key={n} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => { setInputBase('decimal'); setValor(String(n)); }}>
                  <td className="py-0.5 pr-3 text-indigo-600 dark:text-indigo-400">{n}</td>
                  <td className="py-0.5 pr-3 text-green-600 dark:text-green-400">{n.toString(2)}</td>
                  <td className="py-0.5 pr-3 text-orange-600 dark:text-orange-400">{n.toString(16).toUpperCase()}</td>
                  <td className="py-0.5 text-purple-600 dark:text-purple-400">{n.toString(8)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
