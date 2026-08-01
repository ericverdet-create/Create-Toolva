'use client';
import { useState, useCallback } from 'react';

const DADOS = [
  { caras: 4, label: 'd4', color: 'bg-purple-500' },
  { caras: 6, label: 'd6', color: 'bg-blue-500' },
  { caras: 8, label: 'd8', color: 'bg-green-500' },
  { caras: 10, label: 'd10', color: 'bg-yellow-500' },
  { caras: 12, label: 'd12', color: 'bg-orange-500' },
  { caras: 20, label: 'd20', color: 'bg-red-500' },
  { caras: 100, label: 'd100', color: 'bg-indigo-500' },
];

interface Dado { caras: number; color: string; label: string; }
interface Resultado { dado: Dado; valor: number; id: number; }

let idCounter = 0;

export default function SimuladorDados() {
  const [dadosSeleccionados, setDadosSeleccionados] = useState<{ dado: Dado; cantidad: number }[]>([]);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [historial, setHistorial] = useState<{ tirada: number[]; total: number; ts: string }[]>([]);
  const [animando, setAnimando] = useState(false);
  const [modificador, setModificador] = useState('0');

  const addDado = (dado: Dado) => {
    const existe = dadosSeleccionados.find(d => d.dado.caras === dado.caras);
    if (existe) {
      setDadosSeleccionados(ds => ds.map(d => d.dado.caras === dado.caras ? { ...d, cantidad: d.cantidad + 1 } : d));
    } else {
      setDadosSeleccionados(ds => [...ds, { dado, cantidad: 1 }]);
    }
  };

  const removeDado = (caras: number) => setDadosSeleccionados(ds => ds.filter(d => d.dado.caras !== caras));
  const updateCantidad = (caras: number, cantidad: number) =>
    setDadosSeleccionados(ds => ds.map(d => d.dado.caras === caras ? { ...d, cantidad: Math.max(1, cantidad) } : d));

  const totalDados = dadosSeleccionados.reduce((acc, d) => acc + d.cantidad, 0);
  const mod = parseInt(modificador) || 0;

  const tirar = useCallback(() => {
    if (dadosSeleccionados.length === 0 || animando) return;
    setAnimando(true);

    const nuevosResultados: Resultado[] = [];
    for (const { dado, cantidad } of dadosSeleccionados) {
      for (let i = 0; i < cantidad; i++) {
        nuevosResultados.push({
          dado,
          valor: Math.floor(Math.random() * dado.caras) + 1,
          id: ++idCounter,
        });
      }
    }

    setResultados(nuevosResultados);
    const total = nuevosResultados.reduce((acc, r) => acc + r.valor, 0) + mod;
    setHistorial(h => [{ tirada: nuevosResultados.map(r => r.valor), total, ts: new Date().toLocaleTimeString('es-ES', {hour: '2-digit', minute: '2-digit', second: '2-digit'}) }, ...h].slice(0, 10));
    setTimeout(() => setAnimando(false), 300);
  }, [dadosSeleccionados, animando, mod]);

  const totalActual = resultados.reduce((acc, r) => acc + r.valor, 0) + mod;
  const maxPosible = dadosSeleccionados.reduce((acc, d) => acc + d.dado.caras * d.cantidad, 0) + mod;
  const minPosible = totalDados + mod;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-1.5">
        {DADOS.map(dado => (
          <button key={dado.caras} onClick={() => addDado(dado)}
            className={`${dado.color} text-white rounded-xl py-2.5 text-xs font-bold hover:opacity-80 active:scale-95 transition-all shadow-sm`}>
            {dado.label}
          </button>
        ))}
      </div>

      {dadosSeleccionados.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {dadosSeleccionados.map(({ dado, cantidad }) => (
              <div key={dado.caras} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl px-2 py-1">
                <span className={`text-xs font-bold text-white px-1.5 py-0.5 rounded-lg ${dado.color}`}>{dado.label}</span>
                <button onClick={() => updateCantidad(dado.caras, cantidad - 1)} disabled={cantidad <= 1} className="w-5 h-5 rounded text-xs bg-gray-200 dark:bg-gray-700 disabled:opacity-30">−</button>
                <span className="text-xs font-bold w-4 text-center">{cantidad}</span>
                <button onClick={() => updateCantidad(dado.caras, cantidad + 1)} className="w-5 h-5 rounded text-xs bg-gray-200 dark:bg-gray-700">+</button>
                <button onClick={() => removeDado(dado.caras)} className="text-gray-400 hover:text-red-500 text-xs">×</button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Modificador:</span>
            <button onClick={() => setModificador(m => String((parseInt(m)||0) - 1))} className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-700 text-xs">−</button>
            <input type="number" value={modificador} onChange={e => setModificador(e.target.value)}
              className="w-12 border border-gray-200 dark:border-gray-600 rounded-lg px-1 py-0.5 text-xs text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none" />
            <button onClick={() => setModificador(m => String((parseInt(m)||0) + 1))} className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-700 text-xs">+</button>
          </div>
        </div>
      )}

      <button onClick={tirar} disabled={dadosSeleccionados.length === 0 || animando}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-2xl font-bold text-xl transition-all active:scale-95 shadow-lg disabled:cursor-not-allowed">
        🎲 {dadosSeleccionados.length === 0 ? 'Selecciona un dado' : `Tirar ${totalDados} dado${totalDados !== 1 ? 's' : ''}`}
      </button>

      {resultados.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2 justify-center">
            {resultados.map(r => (
              <div key={r.id} className={`w-14 h-14 rounded-2xl ${r.dado.color} text-white flex flex-col items-center justify-center shadow-md`}>
                <div className="text-xl font-bold leading-none">{r.valor}</div>
                <div className="text-xs opacity-70">{r.dado.label}</div>
              </div>
            ))}
          </div>
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
            <div className="text-xs text-indigo-500 dark:text-indigo-400">Resultado total{mod !== 0 ? ` (${mod > 0 ? '+' : ''}${mod})` : ''}</div>
            <div className={`text-5xl font-bold ${totalActual === maxPosible ? 'text-yellow-500' : totalActual === minPosible ? 'text-red-500' : 'text-indigo-700 dark:text-indigo-300'}`}>{totalActual}</div>
            {totalActual === maxPosible && <div className="text-xs text-yellow-600 font-bold mt-1">🌟 ¡CRÍTICO! Máximo posible</div>}
            {totalActual === minPosible && totalDados > 1 && <div className="text-xs text-red-500 font-bold mt-1">💀 Pifia. Mínimo posible</div>}
            <div className="text-xs text-indigo-400 mt-1">Rango: {minPosible}–{maxPosible}</div>
          </div>
        </div>
      )}

      {historial.length > 1 && (
        <div className="space-y-1">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Historial</div>
          {historial.slice(1).map((h, i) => (
            <div key={i} className="flex justify-between text-xs bg-gray-50 dark:bg-gray-800 rounded-lg px-3 py-1.5">
              <span className="text-gray-400">{h.ts}</span>
              <span className="text-gray-600 dark:text-gray-400">[{h.tirada.join(', ')}]</span>
              <span className="font-bold text-gray-900 dark:text-white">= {h.total}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
