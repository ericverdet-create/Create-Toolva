'use client';
import { useState, useCallback } from 'react';

export default function QrGenerator() {
  const [text, setText] = useState('https://toolva.com');
  const [size, setSize] = useState(200);
  const [copied, setCopied] = useState(false);

  const qrUrl = text.trim()
    ? `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text.trim())}&size=${size}x${size}&format=png&margin=10`
    : null;

  const handleDownload = useCallback(async () => {
    if (!qrUrl) return;
    try {
      const res = await fetch(qrUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'qr-toolva.png';
      a.click();
    } catch {
      window.open(qrUrl, '_blank');
    }
  }, [qrUrl]);

  const handleCopyUrl = useCallback(() => {
    if (!qrUrl) return;
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [qrUrl]);

  const SIZES = [150, 200, 300, 400, 500];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Texto o URL
        </label>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={3}
          placeholder="https://ejemplo.com o cualquier texto..."
          className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none resize-none"
        />
        <div className="text-xs text-gray-400 mt-1 text-right">{text.length} caracteres</div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tamaño: {size}×{size} px
        </label>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${size === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-indigo-400'}`}>
              {s}px
            </button>
          ))}
        </div>
      </div>

      {qrUrl && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-md inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="Código QR generado" width={size} height={size} className="rounded" />
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownload}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              ⬇ Descargar PNG
            </button>
            <button onClick={handleCopyUrl}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:border-indigo-400 transition-colors">
              {copied ? '✓ Copiado' : '🔗 Copiar URL'}
            </button>
          </div>
        </div>
      )}

      {!text.trim() && (
        <div className="text-center text-gray-400 text-sm py-8">
          Escribe algo arriba para generar tu código QR
        </div>
      )}
    </div>
  );
}
