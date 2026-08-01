'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

const TEXTOS = [
  "El sol brillaba con fuerza sobre el horizonte cuando María decidió salir a correr por primera vez en meses. El aire fresco de la mañana llenaba sus pulmones mientras sus zapatillas golpeaban el asfalto húmedo.",
  "La tecnología ha transformado la forma en que vivimos y trabajamos. Cada día millones de personas utilizan sus teléfonos móviles para comunicarse, comprar y acceder a información de todo el mundo.",
  "Cocinar es un arte que combina creatividad y técnica. Los mejores chefs del mundo dedican años a perfeccionar sus habilidades y a descubrir nuevas combinaciones de sabores que sorprenden al paladar.",
  "El cambio climático es uno de los mayores desafíos que enfrenta la humanidad. Reducir las emisiones de carbono y apostar por las energías renovables son pasos fundamentales para proteger nuestro planeta.",
  "Leer libros es una de las mejores formas de expandir el conocimiento y la imaginación. Cada página es una ventana a mundos diferentes y a experiencias que enriquecen nuestra perspectiva de la vida.",
];

type Estado = 'esperando' | 'escribiendo' | 'terminado';

export default function TestVelocidadEscritura() {
  const [textoIdx, setTextoIdx] = useState(0);
  const [input, setInput] = useState('');
  const [estado, setEstado] = useState<Estado>('esperando');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [resultados, setResultados] = useState<{ ppm: number; precision: number; tiempo: number }[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const texto = TEXTOS[textoIdx];
  const palabrasTexto = texto.trim().split(/\s+/).length;

  useEffect(() => {
    if (estado === 'escribiendo') {
      timerRef.current = setInterval(() => setElapsed(Date.now() - (startTime || Date.now())), 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [estado, startTime]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (estado === 'esperando' && val.length > 0) {
      setEstado('escribiendo');
      setStartTime(Date.now());
    }
    if (estado === 'terminado') return;
    setInput(val);

    if (val === texto) {
      const tiempoSeg = (Date.now() - (startTime || Date.now())) / 1000;
      const ppm = Math.round((palabrasTexto / tiempoSeg) * 60);
      let correctos = 0;
      for (let i = 0; i < texto.length; i++) {
        if (val[i] === texto[i]) correctos++;
      }
      const precision = Math.round((correctos / texto.length) * 100);
      setResultados(r => [...r, { ppm, precision, tiempo: tiempoSeg }]);
      setEstado('terminado');
    }
  }, [estado, startTime, texto, palabrasTexto]);

  const reiniciar = () => {
    setInput('');
    setEstado('esperando');
    setStartTime(null);
    setElapsed(0);
    setTextoIdx(i => (i + 1) % TEXTOS.length);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Colorear el texto
  const getCharClass = (idx: number) => {
    if (idx >= input.length) return 'text-gray-400 dark:text-gray-500';
    return input[idx] === texto[idx] ? 'text-gray-900 dark:text-white' : 'bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 rounded';
  };

  const ppmActual = startTime && input.length > 0
    ? Math.round((input.trim().split(/\s+/).filter(Boolean).length / (elapsed / 1000)) * 60)
    : 0;

  const precision = input.length > 0 ? Math.round(([...input].filter((c, i) => c === texto[i]).length / input.length) * 100) : 100;

  const mejorPPM = resultados.length > 0 ? Math.max(...resultados.map(r => r.ppm)) : 0;

  const nivelPPM = (ppm: number) => {
    if (ppm < 20) return { label: '🐢 Principiante', color: 'text-gray-500' };
    if (ppm < 40) return { label: '🚶 Básico', color: 'text-blue-500' };
    if (ppm < 60) return { label: '🏃 Intermedio', color: 'text-green-500' };
    if (ppm < 80) return { label: '🚀 Avanzado', color: 'text-indigo-500' };
    return { label: '⚡ Experto', color: 'text-purple-500' };
  };

  return (
    <div className="space-y-4">
      {/* Estadísticas en vivo */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
          <div className="text-gray-400">PPM</div>
          <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{estado === 'terminado' && resultados.length > 0 ? resultados[resultados.length - 1].ppm : ppmActual}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
          <div className="text-gray-400">Precisión</div>
          <div className="text-xl font-bold text-green-600 dark:text-green-400">{estado === 'terminado' && resultados.length > 0 ? resultados[resultados.length - 1].precision : precision}%</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
          <div className="text-gray-400">Tiempo</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{(elapsed / 1000).toFixed(1)}s</div>
        </div>
      </div>

      {/* Texto a copiar */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 text-sm leading-relaxed font-mono select-none">
        {texto.split('').map((char, i) => (
          <span key={i} className={getCharClass(i)}>{char}</span>
        ))}
        {estado === 'esperando' && <span className="ml-1 animate-pulse text-indigo-400">▌</span>}
      </div>

      {/* Input */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={estado === 'terminado'}
        placeholder={estado === 'esperando' ? '✍️ Empieza a escribir aquí para comenzar el test...' : ''}
        rows={4}
        className={`w-full border-2 rounded-xl px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none text-sm font-mono resize-none transition-colors
          ${estado === 'terminado' ? 'border-green-400 dark:border-green-600 opacity-50' : 'border-indigo-300 dark:border-indigo-700 focus:border-indigo-500 dark:focus:border-indigo-400'}`}
      />

      {/* Barra de progreso */}
      <div>
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all"
            style={{ width: `${Math.min(100, (input.length / texto.length) * 100)}%` }}></div>
        </div>
        <div className="text-xs text-right text-gray-400 mt-0.5">{input.length}/{texto.length} caracteres</div>
      </div>

      {estado === 'terminado' && resultados.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-2xl p-4 text-center space-y-2">
          <div className="text-lg font-bold text-green-700 dark:text-green-300">¡Test completado! 🎉</div>
          <div className="text-4xl font-bold text-green-700 dark:text-green-300">{resultados[resultados.length - 1].ppm} PPM</div>
          <div className={`text-sm font-semibold ${nivelPPM(resultados[resultados.length - 1].ppm).color}`}>
            {nivelPPM(resultados[resultados.length - 1].ppm).label}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Media mundial: ~40 PPM · Mecanógrafos profesionales: 80+ PPM</div>
        </div>
      )}

      <div className="flex gap-2">
        <button onClick={reiniciar}
          className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors">
          {estado === 'terminado' ? '🔄 Siguiente texto' : '🔄 Reiniciar'}
        </button>
        {mejorPPM > 0 && (
          <div className="px-3 py-2.5 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-center">
            <div className="text-gray-400">Récord</div>
            <div className="font-bold text-gray-900 dark:text-white">{mejorPPM} PPM</div>
          </div>
        )}
      </div>
    </div>
  );
}
