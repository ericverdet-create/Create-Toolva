'use client';
import { useState } from 'react';

export default function PlazoFijo() {
  const [capital, setCapital] = useState('10000');
  const [tasa, setTasa] = useState('3.5');
  const [meses, setMeses] = useState('12');
  const [retencion, setRetencion] = useState('19');

  const cap = parseFloat(capital) || 0;
  const t = parseFloat(tasa) || 0;
  const m = parseInt(meses) || 0;
  const ret = parseFloat(retencion) || 19;

  const interesesBrutos = cap * (t / 100) * (m / 12);
  const impuesto = interesesBrutos * (ret / 100);
  const interesesNetos = interesesBrutos - impuesto;
  const totalBruto = cap + interesesBrutos;
  const totalNeto = cap + interesesNetos;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  // Comparativa de plazos
  const comparativa = [3, 6, 12, 18, 24, 36].map(mes => {
    const ib = cap * (t / 100) * (mes / 12);
    const inet = ib * (1 - ret / 100);
    return { mes, ib, inet, total: cap + inet };
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Capital (€)</label>
          <input type="number" value={capital} onChange={e => setCapital(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de interés anual (%)</label>
          <input type="number" value={tasa} onChange={e => setTasa(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Plazo (meses)</label>
          <select value={meses} onChange={e => setMeses(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            {[1,2,3,6,9,12,18,24,36,48,60].map(m => <option key={m} value={m}>{m} {m === 1 ? 'mes' : 'meses'}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Retención IRPF (%)</label>
          <select value={retencion} onChange={e => setRetencion(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm">
            <option value="19">19% (hasta 6.000 €)</option>
            <option value="21">21% (6.001–50.000 €)</option>
            <option value="23">23% (50.001–200.000 €)</option>
            <option value="27">27% (200.001–300.000 €)</option>
            <option value="28">28% (más de 300.000 €)</option>
            <option value="0">Sin retención</option>
          </select>
        </div>
      </div>

      {cap > 0 && t > 0 && m > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4">
            <div className="text-center text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(interesesNetos)} €</div>
            <div className="text-center text-sm text-indigo-600 dark:text-indigo-400 mb-3">intereses netos (tras IRPF)</div>
            <div className="grid grid-cols-2 gap-2 text-xs text-center">
              {[
                { label: 'Intereses brutos', val: fmt(interesesBrutos) + ' €' },
                { label: 'Retención IRPF', val: '−' + fmt(impuesto) + ' €' },
                { label: 'Capital + intereses brutos', val: fmt(totalBruto) + ' €' },
                { label: 'Capital + intereses netos', val: fmt(totalNeto) + ' €' },
              ].map(r => (
                <div key={r.label} className="bg-white dark:bg-gray-700 rounded-xl p-2">
                  <div className="text-gray-500 dark:text-gray-400">{r.label}</div>
                  <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
                </div>
              ))}
            </div>
          </div>

          <details className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <summary className="px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 cursor-pointer bg-gray-50 dark:bg-gray-800">📊 Comparativa por plazo</summary>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {comparativa.map(r => (
                <div key={r.mes} className={`flex justify-between items-center px-3 py-2 text-xs ${r.mes === m ? 'bg-indigo-50 dark:bg-indigo-900/20 font-bold' : ''}`}>
                  <span className="text-gray-600 dark:text-gray-400">{r.mes} meses</span>
                  <span className="text-green-600 dark:text-green-400">+{fmt(r.inet)} €</span>
                  <span className="text-gray-900 dark:text-white">{fmt0(r.total)} €</span>
                </div>
              ))}
            </div>
          </details>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
            💡 Los intereses de depósitos tributan como rendimientos del capital mobiliario. El banco aplica la retención automáticamente.
          </div>
        </div>
      )}
    </div>
  );
}
