'use client';
import { useState, useCallback } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, RGB, HSL } from './index';

export default function ColorConverterComponent() {
  const [hex, setHex] = useState('#4F46E5');
  const [rgb, setRgb] = useState<RGB>({ r: 79, g: 70, b: 229 });
  const [hsl, setHsl] = useState<HSL>({ h: 243, s: 75, l: 59 });

  const syncFromHex = useCallback((h: string) => {
    const r = hexToRgb(h);
    if (r) { setRgb(r); setHsl(rgbToHsl(r.r, r.g, r.b)); }
  }, []);

  const syncFromRgb = useCallback((r: RGB) => {
    setHex(rgbToHex(r.r, r.g, r.b));
    setHsl(rgbToHsl(r.r, r.g, r.b));
  }, []);

  const syncFromHsl = useCallback((h: HSL) => {
    const r = hslToRgb(h.h, h.s, h.l);
    setRgb(r);
    setHex(rgbToHex(r.r, r.g, r.b));
  }, []);

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-2xl shadow-lg border border-gray-200 flex-shrink-0"
          style={{ backgroundColor: hex }} />
        <div>
          <input type="color" value={hex} onChange={e => { setHex(e.target.value); syncFromHex(e.target.value); }}
            className="w-12 h-12 rounded-lg cursor-pointer border-0 p-0.5" />
          <p className="text-sm text-gray-500 mt-1">Selector visual</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">HEX</label>
        <div className="flex gap-2">
          <input value={hex} onChange={e => { setHex(e.target.value); syncFromHex(e.target.value); }}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-brand-500 focus:border-transparent text-lg uppercase" />
          <button onClick={() => copyText(hex)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            Copiar
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">RGB</label>
        <div className="flex gap-2">
          {(['r', 'g', 'b'] as const).map(ch => (
            <input key={ch} type="number" min={0} max={255} value={rgb[ch]}
              onChange={e => { const nr = { ...rgb, [ch]: Math.min(255, Math.max(0, Number(e.target.value))) }; setRgb(nr); syncFromRgb(nr); }}
              className="flex-1 px-3 py-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              placeholder={ch.toUpperCase()} />
          ))}
          <button onClick={() => copyText(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            Copiar
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">HSL</label>
        <div className="flex gap-2">
          {([['h', 360, 'H°'], ['s', 100, 'S%'], ['l', 100, 'L%']] as const).map(([ch, max, label]) => (
            <div key={ch} className="flex-1">
              <input type="number" min={0} max={max} value={hsl[ch]}
                onChange={e => { const nh = { ...hsl, [ch]: Math.min(max, Math.max(0, Number(e.target.value))) }; setHsl(nh); syncFromHsl(nh); }}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-brand-500 focus:border-transparent" />
              <p className="text-xs text-center text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
          <button onClick={() => copyText(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors self-start mt-0">
            Copiar
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</p>
      </div>
    </div>
  );
}
