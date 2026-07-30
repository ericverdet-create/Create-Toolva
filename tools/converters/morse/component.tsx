'use client';
import { useState } from 'react';
import { textToMorse, morseToText, isValidMorse } from './index';

export default function MorseCodeComponent() {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  function handleTextChange(val: string) {
    setText(val);
    setMorse(textToMorse(val));
  }

  function handleMorseChange(val: string) {
    setMorse(val);
    if (isValidMorse(val) || val === '') {
      setText(morseToText(val));
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {[['encode', 'Texto → Morse'], ['decode', 'Morse → Texto']].map(([v, l]) => (
          <button key={v} onClick={() => { setMode(v as typeof mode); setText(''); setMorse(''); }}
            className={`flex-1 py-2 rounded-lg font-medium transition-colors ${mode === v ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            {l}
          </button>
        ))}
      </div>

      {mode === 'encode' ? (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
            <textarea value={text} onChange={e => handleTextChange(e.target.value)}
              placeholder="Escribe aquí tu texto..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none h-28" />
          </div>
          {morse && (
            <div className="bg-gray-900 rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-sm">Código Morse</span>
                <button onClick={() => navigator.clipboard.writeText(morse)}
                  className="text-gray-400 hover:text-white text-sm transition-colors">Copiar</button>
              </div>
              <p className="text-green-400 font-mono text-lg leading-relaxed break-all">{morse}</p>
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código Morse (usa . - y / entre palabras)</label>
            <textarea value={morse} onChange={e => handleMorseChange(e.target.value)}
              placeholder="... --- ..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none h-28 font-mono" />
          </div>
          {text && (
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Texto decodificado</p>
              <p className="text-xl font-semibold text-gray-900">{text}</p>
            </div>
          )}
        </>
      )}

      <details className="bg-gray-50 rounded-xl p-4">
        <summary className="cursor-pointer font-medium text-gray-700">Referencia rápida del alfabeto Morse</summary>
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2 font-mono text-sm">
          {Object.entries({A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'}).map(([l,c]) => (
            <div key={l} className="bg-white rounded-lg p-2 text-center border border-gray-200">
              <div className="font-bold text-gray-900">{l}</div>
              <div className="text-gray-500 text-xs">{c}</div>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
