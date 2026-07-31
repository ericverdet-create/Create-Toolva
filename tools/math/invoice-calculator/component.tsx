'use client';
import { useState } from 'react';

interface Line { desc: string; qty: string; price: string; vat: number; }

export default function InvoiceCalculator() {
  const [lines, setLines] = useState<Line[]>([
    { desc: 'Servicio de diseño web', qty: '1', price: '800', vat: 21 },
  ]);
  const [discount, setDiscount] = useState('0');
  const [irpf, setIrpf] = useState('15');
  const [applyIrpf, setApplyIrpf] = useState(false);

  const addLine = () => setLines(l => [...l, { desc: '', qty: '1', price: '0', vat: 21 }]);
  const removeLine = (i: number) => setLines(l => l.filter((_, idx) => idx !== i));
  const updateLine = (i: number, k: keyof Line, v: string | number) =>
    setLines(l => l.map((row, idx) => idx === i ? { ...row, [k]: v } : row));

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const lineCalcs = lines.map(l => {
    const qty = parseFloat(l.qty) || 0;
    const price = parseFloat(l.price) || 0;
    const base = qty * price;
    const vatAmt = base * (l.vat / 100);
    return { base, vatAmt, total: base + vatAmt };
  });

  const subtotal = lineCalcs.reduce((s, l) => s + l.base, 0);
  const discountAmt = subtotal * (parseFloat(discount) / 100 || 0);
  const subtotalAfterDiscount = subtotal - discountAmt;
  const totalVat = lineCalcs.reduce((s, l) => s + l.vatAmt, 0) * (1 - (parseFloat(discount) / 100 || 0));
  const irpfAmt = applyIrpf ? subtotalAfterDiscount * (parseFloat(irpf) / 100 || 0) : 0;
  const total = subtotalAfterDiscount + totalVat - irpfAmt;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_60px_80px_70px_32px] gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
          <span>Descripción</span><span className="text-center">Cant.</span><span className="text-center">Precio</span><span className="text-center">IVA</span><span />
        </div>
        {lines.map((line, i) => (
          <div key={i} className="grid grid-cols-[1fr_60px_80px_70px_32px] gap-1 items-center">
            <input value={line.desc} onChange={e => updateLine(i, 'desc', e.target.value)} placeholder="Descripción"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none" />
            <input type="number" value={line.qty} onChange={e => updateLine(i, 'qty', e.target.value)} min="0" step="1"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
            <input type="number" value={line.price} onChange={e => updateLine(i, 'price', e.target.value)} min="0" step="0.01"
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-center" />
            <select value={line.vat} onChange={e => updateLine(i, 'vat', Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-1 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none">
              {[0, 4, 10, 21].map(v => <option key={v} value={v}>{v}%</option>)}
            </select>
            <button onClick={() => removeLine(i)} disabled={lines.length <= 1}
              className="text-gray-400 hover:text-red-500 disabled:opacity-30 text-lg leading-none">×</button>
          </div>
        ))}

        {lines.length > 1 && (
          <div className="grid grid-cols-[1fr_60px_80px_70px_32px] gap-1 text-xs text-gray-500 dark:text-gray-400 px-1 pt-1 border-t border-gray-100 dark:border-gray-700">
            {lines.map((_, i) => (
              <div key={i} className="contents">
                {i === 0 && <><span /><span className="text-center">{(parseFloat(lines[i].qty)||0).toFixed(0)}</span><span className="text-center">{fmt(lineCalcs[i].base)}</span><span className="text-center text-indigo-600">+{fmt(lineCalcs[i].vatAmt)}</span><span /></>}
              </div>
            ))}
          </div>
        )}

        <button onClick={addLine}
          className="w-full py-1.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-xs text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          + Añadir línea
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Descuento (%)</label>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} min="0" max="100"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button onClick={() => setApplyIrpf(v => !v)}
              className={`w-8 h-5 rounded-full transition-colors flex-shrink-0 ${applyIrpf ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
              <span className={`block w-3 h-3 rounded-full bg-white shadow mx-1 transition-transform ${applyIrpf ? 'translate-x-3' : ''}`} />
            </button>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400">IRPF (%)</label>
          </div>
          <input type="number" value={irpf} onChange={e => setIrpf(e.target.value)} min="0" max="47" disabled={!applyIrpf}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm disabled:opacity-40" />
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-4 space-y-1.5 text-sm">
        {[
          { label: 'Base imponible', value: fmt(subtotal) },
          ...(parseFloat(discount) > 0 ? [{ label: `Descuento (${discount}%)`, value: `− ${fmt(discountAmt)}`, red: true }] : []),
          { label: 'Base tras descuento', value: fmt(subtotalAfterDiscount) },
          { label: 'IVA', value: `+ ${fmt(totalVat)}` },
          ...(applyIrpf ? [{ label: `IRPF (${irpf}%)`, value: `− ${fmt(irpfAmt)}`, red: true }] : []),
        ].map((r: {label: string; value: string; red?: boolean}, i) => (
          <div key={i} className={`flex justify-between ${r.red ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}>
            <span>{r.label}</span><span>{r.value}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-indigo-200 dark:border-indigo-700 pt-2 mt-2">
          <span>TOTAL</span>
          <span className="text-indigo-700 dark:text-indigo-300">{fmt(total)}</span>
        </div>
      </div>
    </div>
  );
}
