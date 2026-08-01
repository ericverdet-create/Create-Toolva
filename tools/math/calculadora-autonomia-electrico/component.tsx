'use client';
import { useState } from 'react';

const COCHES: { nombre: string; bateria: number; consumo: number }[] = [
  { nombre: 'Tesla Model 3', bateria: 75, consumo: 14.5 },
  { nombre: 'Volkswagen ID.4', bateria: 77, consumo: 17.5 },
  { nombre: 'Renault Zoe', bateria: 52, consumo: 17 },
  { nombre: 'Nissan Leaf', bateria: 40, consumo: 17 },
  { nombre: 'Hyundai IONIQ 5', bateria: 72.6, consumo: 15 },
  { nombre: 'SEAT MÓ', bateria: 45, consumo: 16 },
  { nombre: 'Personalizado', bateria: 60, consumo: 16 },
];

const FACTORES_TEMP: { label: string; factor: number }[] = [
  { label: '☀️ Verano (+25°C)', factor: 1.0 },
  { label: '🌤️ Primavera/Otoño', factor: 0.9 },
  { label: '❄️ Invierno (0°C)', factor: 0.75 },
  { label: '🥶 Frío extremo (-10°C)', factor: 0.65 },
];

export default function CalculadoraAutonomiaElectrico() {
  const [cocheIdx, setCocheIdx] = useState(0);
  const [bateria, setBateria] = useState('75');
  const [consumo, setConsumo] = useState('14.5');
  const [cargaActual, setCargaActual] = useState('80');
  const [tempIdx, setTempIdx] = useState(0);
  const [precioCorriente, setPrecioCorriente] = useState('0.22');
  const [velocidad, setVelocidad] = useState('120');

  const coche = COCHES[cocheIdx];
  const batKwh = cocheIdx === 6 ? (parseFloat(bateria) || 75) : coche.bateria;
  const consBase = cocheIdx === 6 ? (parseFloat(consumo) || 16) : coche.consumo;
  const carga = Math.min(100, Math.max(0, parseInt(cargaActual) || 80));
  const tempFactor = FACTORES_TEMP[tempIdx].factor;

  // Consumo aumenta a alta velocidad (aprox +10% cada 20 km/h sobre 100)
  const vel = parseInt(velocidad) || 120;
  const factorVel = vel <= 100 ? 1 : 1 + (vel - 100) / 100 * 0.5;

  const consReal = consBase * factorVel / tempFactor;
  const energiaDisponible = batKwh * (carga / 100) * 0.95; // 5% reserva
  const autonomia = (energiaDisponible / consReal) * 100;

  const precioKwh = parseFloat(precioCorriente) || 0.22;
  const costePorKm = (consReal / 100) * precioKwh;
  const costePor100 = costePorKm * 100;

  // Tiempo recarga (desde actual hasta 80%)
  const energiaNecesaria80 = batKwh * (0.8 - carga / 100);
  const tiempoRecarga11kw = energiaNecesaria80 > 0 ? energiaNecesaria80 / 11 : 0;
  const tiempoRecarga50kw = energiaNecesaria80 > 0 ? energiaNecesaria80 / 50 : 0;
  const tiempoRecarga150kw = energiaNecesaria80 > 0 ? energiaNecesaria80 / 150 : 0;

  const formatT = (h: number) => h <= 0 ? 'Ya cargado al 80%' : h < 1 ? `${Math.round(h * 60)} min` : `${Math.floor(h)}h ${Math.round((h % 1) * 60)}min`;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Vehículo</label>
        <div className="grid grid-cols-2 gap-1">
          {COCHES.map((c, i) => (
            <button key={c.nombre} onClick={() => { setCocheIdx(i); if (i < 6) { setBateria(String(c.bateria)); setConsumo(String(c.consumo)); } }}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium text-left transition-colors ${cocheIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {c.nombre}
            </button>
          ))}
        </div>
      </div>

      {cocheIdx === 6 && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Batería (kWh)</label>
            <input type="number" value={bateria} onChange={e => setBateria(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Consumo (kWh/100km)</label>
            <input type="number" value={consumo} onChange={e => setConsumo(e.target.value)}
              className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center focus:outline-none" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Carga actual: {carga}%</label>
          <input type="range" min={0} max={100} value={cargaActual} onChange={e => setCargaActual(e.target.value)} className="w-full" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Velocidad: {vel} km/h</label>
          <input type="range" min={60} max={200} step={10} value={velocidad} onChange={e => setVelocidad(e.target.value)} className="w-full" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Temperatura</label>
        <div className="grid grid-cols-2 gap-1">
          {FACTORES_TEMP.map((t, i) => (
            <button key={t.label} onClick={() => setTempIdx(i)}
              className={`py-1.5 px-2 rounded-lg text-xs ${tempIdx === i ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Autonomía real', value: `${Math.round(autonomia)} km`, color: 'text-green-600 dark:text-green-300', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Consumo real', value: `${consReal.toFixed(1)} kWh/100`, color: 'text-orange-600 dark:text-orange-300', bg: 'bg-orange-50 dark:bg-orange-900/20' },
          { label: 'Coste/100km', value: `${costePor100.toFixed(2)}€`, color: 'text-indigo-600 dark:text-indigo-300', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-xl p-2.5 text-center`}>
            <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            <div className={`text-base font-bold mt-0.5 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Tiempo hasta 80% de carga</div>
        {energiaNecesaria80 > 0 ? (
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { tipo: '🏠 Wallbox 11kW', tiempo: tiempoRecarga11kw },
              { tipo: '⚡ Rápido 50kW', tiempo: tiempoRecarga50kw },
              { tipo: '🚀 Ultrarrápido 150kW', tiempo: tiempoRecarga150kw },
            ].map(r => (
              <div key={r.tipo} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2 text-center">
                <div className="text-xs text-gray-500">{r.tipo}</div>
                <div className="text-xs font-bold text-gray-700 dark:text-gray-200 mt-0.5">{formatT(r.tiempo)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg px-3 py-2">
            ✅ Batería ya al {carga}% — por encima del 80%
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 whitespace-nowrap">Precio kWh:</span>
          <input type="number" value={precioCorriente} onChange={e => setPrecioCorriente(e.target.value)} step="0.01"
            className="w-20 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-xs bg-white dark:bg-gray-800 text-center" />
          <span className="text-xs text-gray-400">€/kWh · Coste por km: {(costePorKm * 100).toFixed(2)} céntimos</span>
        </div>
      </div>
    </div>
  );
}
