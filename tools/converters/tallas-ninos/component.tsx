'use client';
import { useState } from 'react';

// [edad_label, altura_cm_min, altura_cm_max, EU, UK, US, ES_talla]
const TABLA = [
  { label: 'Recién nacido', h: '50-56', eu: '50/56', uk: 'Newborn', us: 'Newborn', es: 'RN' },
  { label: '1-3 meses', h: '56-62', eu: '56/62', uk: '0-3M', us: '0-3M', es: '1-3M' },
  { label: '3-6 meses', h: '62-68', eu: '62/68', uk: '3-6M', us: '3-6M', es: '3-6M' },
  { label: '6-9 meses', h: '68-74', eu: '68/74', uk: '6-9M', us: '6-9M', es: '6-9M' },
  { label: '9-12 meses', h: '74-80', eu: '74/80', uk: '9-12M', us: '9-12M', es: '9-12M' },
  { label: '12-18 meses', h: '80-86', eu: '80/86', uk: '12-18M', us: '12-18M', es: '12-18M' },
  { label: '18-24 meses', h: '86-92', eu: '86/92', uk: '18-24M', us: '18-24M', es: '18-24M' },
  { label: '2 años', h: '92', eu: '92', uk: '2Y', us: '2T', es: '2A' },
  { label: '3 años', h: '98', eu: '98', uk: '3Y', us: '3T', es: '3A' },
  { label: '4 años', h: '104', eu: '104', uk: '4Y', us: '4T', es: '4A' },
  { label: '5 años', h: '110', eu: '110', uk: '5Y', us: '5', es: '5A' },
  { label: '6 años', h: '116', eu: '116', uk: '6Y', us: '6', es: '6A' },
  { label: '7 años', h: '122', eu: '122', uk: '7Y', us: '7', es: '7A' },
  { label: '8 años', h: '128', eu: '128', uk: '8Y', us: '8', es: '8A' },
  { label: '9 años', h: '134', eu: '134', uk: '9Y', us: '9', es: '9A' },
  { label: '10 años', h: '140', eu: '140', uk: '10Y', us: '10', es: '10A' },
  { label: '11 años', h: '146', eu: '146', uk: '11Y', us: '11', es: '11A' },
  { label: '12 años', h: '152', eu: '152', uk: '12Y', us: '12', es: '12A' },
  { label: '13 años', h: '158', eu: '158', uk: '13Y', us: '13', es: '13A' },
  { label: '14 años', h: '164', eu: '164', uk: '14Y', us: '14', es: '14A' },
];

export default function TallasNinos() {
  const [altura, setAltura] = useState('');
  const [selected, setSelected] = useState<typeof TABLA[0] | null>(null);

  const altNum = parseInt(altura);
  const auto = !isNaN(altNum) && altNum > 0
    ? TABLA.find(r => {
        const parts = r.h.split('-').map(Number);
        if (parts.length === 1) return Math.abs(parts[0] - altNum) <= 3;
        return altNum >= parts[0] && altNum <= parts[1];
      }) ?? null
    : null;

  const shown = auto ?? selected;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Altura del niño (cm) — opcional</label>
        <input type="number" value={altura} onChange={e => { setAltura(e.target.value); setSelected(null); }} placeholder="ej. 92"
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
      </div>

      {shown && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
          <div className="text-center text-sm text-indigo-600 dark:text-indigo-400 mb-3 font-medium">{shown.label} · {shown.h} cm</div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { label: 'EU', val: shown.eu },
              { label: 'UK', val: shown.uk },
              { label: 'US', val: shown.us },
              { label: 'ES', val: shown.es },
            ].map(r => (
              <div key={r.label} className="bg-white dark:bg-gray-700 rounded-xl p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">{r.label}</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-300">{r.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs font-medium text-gray-600 dark:text-gray-400">O selecciona directamente:</div>
      <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700">
        {TABLA.map((row, i) => {
          const isActive = shown?.label === row.label;
          return (
            <div key={i} onClick={() => { setSelected(row); setAltura(''); }}
              className={`grid items-center px-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0 cursor-pointer text-xs transition-colors ${isActive ? 'bg-indigo-100 dark:bg-indigo-900/40' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              style={{ gridTemplateColumns: '120px 1fr 1fr 1fr 1fr' }}>
              <span className={`font-medium ${isActive ? 'text-indigo-700 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300'}`}>{row.label}</span>
              <span className="text-center text-gray-500 dark:text-gray-400">{row.eu}</span>
              <span className="text-center text-gray-500 dark:text-gray-400">{row.uk}</span>
              <span className="text-center text-gray-500 dark:text-gray-400">{row.us}</span>
              <span className="text-center text-gray-500 dark:text-gray-400">{row.es}</span>
            </div>
          );
        })}
        <div className="grid text-center text-xs font-medium text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 sticky bottom-0"
          style={{ gridTemplateColumns: '120px 1fr 1fr 1fr 1fr' }}>
          <span></span><span>EU</span><span>UK</span><span>US</span><span>ES</span>
        </div>
      </div>
    </div>
  );
}
