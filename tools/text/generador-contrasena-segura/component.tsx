'use client';
import { useState } from 'react';

function analizarContrasena(pwd: string): {
  score: number; nivel: string; color: string; tiempoDescifrado: string;
  feedback: string[]; checks: { label: string; ok: boolean }[];
} {
  const checks = [
    { label: 'Mínimo 8 caracteres', ok: pwd.length >= 8 },
    { label: 'Letras minúsculas (a-z)', ok: /[a-z]/.test(pwd) },
    { label: 'Letras mayúsculas (A-Z)', ok: /[A-Z]/.test(pwd) },
    { label: 'Números (0-9)', ok: /\d/.test(pwd) },
    { label: 'Símbolos (!@#$...)', ok: /[^a-zA-Z0-9]/.test(pwd) },
    { label: 'Más de 12 caracteres', ok: pwd.length >= 12 },
    { label: 'Más de 16 caracteres', ok: pwd.length >= 16 },
  ];

  const patterns = [
    /^[0-9]+$/,    // solo números
    /^[a-z]+$/i,   // solo letras
    /(.)\1{2,}/,   // caracteres repetidos
    /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|qwerty|asdf|zxcv)/i, // secuencias
    /^(password|contraseña|123456|qwerty|admin|letmein)/i,
  ];
  const hasPattern = patterns.some(p => p.test(pwd));

  let score = 0;
  checks.forEach((c, i) => { if (c.ok) score += i < 5 ? 15 : 10; });
  if (hasPattern) score = Math.max(0, score - 30);
  if (pwd.length === 0) score = 0;

  // Calcular espacio de búsqueda para tiempo de descifrado
  let charset = 0;
  if (/[a-z]/.test(pwd)) charset += 26;
  if (/[A-Z]/.test(pwd)) charset += 26;
  if (/\d/.test(pwd)) charset += 10;
  if (/[^a-zA-Z0-9]/.test(pwd)) charset += 32;
  const combinaciones = charset > 0 ? Math.pow(charset, pwd.length) : 1;
  const intentosPorSegundo = 1e10; // 10 mil millones/s (GPU moderno)
  const segundos = combinaciones / intentosPorSegundo / 2; // promedio = mitad del espacio

  let tiempoDescifrado: string;
  if (pwd.length === 0) tiempoDescifrado = '—';
  else if (segundos < 1) tiempoDescifrado = 'Instantáneo';
  else if (segundos < 60) tiempoDescifrado = `${Math.round(segundos)} segundos`;
  else if (segundos < 3600) tiempoDescifrado = `${Math.round(segundos / 60)} minutos`;
  else if (segundos < 86400) tiempoDescifrado = `${Math.round(segundos / 3600)} horas`;
  else if (segundos < 86400 * 365) tiempoDescifrado = `${Math.round(segundos / 86400)} días`;
  else if (segundos < 86400 * 365 * 1000) tiempoDescifrado = `${Math.round(segundos / (86400 * 365))} años`;
  else if (segundos < 86400 * 365 * 1e6) tiempoDescifrado = `${Math.round(segundos / (86400 * 365 * 1000))} mil años`;
  else tiempoDescifrado = 'Siglos (muy segura)';

  const nivelData = score < 25 ? { nivel: 'Muy débil', color: 'text-red-600 dark:text-red-400' }
    : score < 45 ? { nivel: 'Débil', color: 'text-orange-500 dark:text-orange-400' }
    : score < 65 ? { nivel: 'Regular', color: 'text-yellow-500 dark:text-yellow-400' }
    : score < 80 ? { nivel: 'Fuerte', color: 'text-blue-600 dark:text-blue-400' }
    : { nivel: 'Muy fuerte', color: 'text-green-600 dark:text-green-400' };

  const feedback: string[] = [];
  if (hasPattern) feedback.push('⚠️ Contiene patrones predecibles o secuencias comunes');
  if (pwd.length < 12) feedback.push('💡 Aumenta la longitud a más de 12 caracteres');
  if (!/[^a-zA-Z0-9]/.test(pwd)) feedback.push('💡 Añade símbolos especiales (!@#$%&*)');
  if (!/[A-Z]/.test(pwd)) feedback.push('💡 Añade letras mayúsculas');
  if (!/\d/.test(pwd)) feedback.push('💡 Añade números');
  if (score >= 80) feedback.push('✅ ¡Contraseña muy segura!');

  return { score: Math.min(100, score), ...nivelData, tiempoDescifrado, feedback, checks };
}

const CHARS = {
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numeros: '0123456789',
  simbolos: '!@#$%^&*()-_=+[]{}|;:,.<>?',
};

export default function ComprobadorContrasena() {
  const [pwd, setPwd] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [genLong, setGenLong] = useState(16);
  const [genOpts, setGenOpts] = useState({ minusculas: true, mayusculas: true, numeros: true, simbolos: true });
  const [generada, setGenerada] = useState('');

  const analisis = analizarContrasena(pwd);

  const barColor = analisis.score < 25 ? 'bg-red-500' : analisis.score < 45 ? 'bg-orange-500' : analisis.score < 65 ? 'bg-yellow-500' : analisis.score < 80 ? 'bg-blue-500' : 'bg-green-500';

  const generarContrasena = () => {
    let charset = '';
    if (genOpts.minusculas) charset += CHARS.minusculas;
    if (genOpts.mayusculas) charset += CHARS.mayusculas;
    if (genOpts.numeros) charset += CHARS.numeros;
    if (genOpts.simbolos) charset += CHARS.simbolos;
    if (!charset) charset = CHARS.minusculas + CHARS.numeros;
    const result = Array.from({ length: genLong }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
    setGenerada(result);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tu contraseña</label>
        <div className="relative">
          <input type={mostrar ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)}
            placeholder="Escribe tu contraseña para analizarla..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2.5 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none font-mono" />
          <button onClick={() => setMostrar(!mostrar)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{mostrar ? '🙈' : '👁️'}</button>
        </div>
      </div>

      {pwd.length > 0 && (
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className={`font-bold ${analisis.color}`}>{analisis.nivel}</span>
              <span className="text-gray-400">{analisis.score}/100</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${analisis.score}%` }} />
            </div>
          </div>

          <div className={`text-center py-2 rounded-xl ${analisis.score < 45 ? 'bg-red-50 dark:bg-red-900/20' : analisis.score < 80 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-green-50 dark:bg-green-900/20'}`}>
            <div className="text-xs text-gray-500 dark:text-gray-400">Tiempo estimado de descifrado (ataque fuerza bruta)</div>
            <div className={`text-lg font-bold ${analisis.color}`}>{analisis.tiempoDescifrado}</div>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {analisis.checks.map(c => (
              <div key={c.label} className={`flex items-center gap-1.5 text-xs px-2 py-1.5 rounded-lg ${c.ok ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
                <span>{c.ok ? '✅' : '⬜'}</span><span>{c.label}</span>
              </div>
            ))}
          </div>

          {analisis.feedback.map(f => (
            <div key={f} className="text-xs text-gray-600 dark:text-gray-400">{f}</div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Generar contraseña segura</div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Longitud: {genLong}</span>
          <input type="range" min={8} max={32} value={genLong} onChange={e => setGenLong(parseInt(e.target.value))} className="flex-1" />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {(Object.entries(genOpts) as [keyof typeof genOpts, boolean][]).map(([k, v]) => (
            <button key={k} onClick={() => setGenOpts(o => ({ ...o, [k]: !o[k] }))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium ${v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
              {k}
            </button>
          ))}
        </div>
        <button onClick={generarContrasena} className="w-full py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold">🎲 Generar</button>
        {generada && (
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
            <code className="flex-1 text-xs font-mono text-gray-700 dark:text-gray-300 break-all">{generada}</code>
            <button onClick={() => { navigator.clipboard?.writeText(generada); setPwd(generada); }} className="text-xs text-indigo-600 dark:text-indigo-400 whitespace-nowrap hover:underline">Copiar y analizar</button>
          </div>
        )}
      </div>
    </div>
  );
}
