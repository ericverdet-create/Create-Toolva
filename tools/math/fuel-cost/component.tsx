'use client';
import { useState } from 'react';

const FUEL_TYPES = [
  { label: 'Gasolina 95', price: 1.65 },
  { label: 'Gasolina 98', price: 1.78 },
  { label: 'Diésel', price: 1.55 },
  { label: 'GLP / Autogas', price: 0.85 },
  { label: 'GNC', price: 1.10 },
];

const TYPICAL_CARS = [
  { label: 'Utilitario (gasolina)', consumption: 6.5 },
  { label: 'Compacto (gasolina)', consumption: 7.5 },
  { label: 'SUV (gasolina)', consumption: 9.5 },
  { label: 'Utilitario (diésel)', consumption: 5.0 },
  { label: 'SUV (diésel)', consumption: 7.0 },
  { label: 'Híbrido', consumption: 4.5 },
  { label: 'Moto 125cc', consumption: 3.0 },
  { label: 'Moto grande', consumption: 5.5 },
];

export default function FuelCost() {
  const [distance, setDistance] = useState('500');
  const [consumption, setConsumption] = useState('7.5');
  const [fuelPrice, setFuelPrice] = useState('1.65');
  const [passengers, setPassengers] = useState('2');
  const [roundTrip, setRoundTrip] = useState(false);
  const [fuelTypeIdx, setFuelTypeIdx] = useState(-1); // -1 = custom

  const dist = parseFloat(distance) || 0;
  const cons = parseFloat(consumption) || 0;
  const price = parseFloat(fuelPrice) || 0;
  const pax = Math.max(1, parseInt(passengers) || 1);
  const totalDist = roundTrip ? dist * 2 : dist;

  const litresUsed = (totalDist / 100) * cons;
  const totalCost = litresUsed * price;
  const costPerPerson = totalCost / pax;
  const costPer100km = (cons * price);

  const fmt = (n: number, dec = 2) => n.toLocaleString('es-ES', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de combustible (precio orientativo)</label>
        <div className="grid grid-cols-3 gap-1 mb-2">
          {FUEL_TYPES.map((f, i) => (
            <button key={i} onClick={() => { setFuelTypeIdx(i); setFuelPrice(String(f.price)); }}
              className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors ${fuelTypeIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Distancia (km)</label>
          <input type="number" value={distance} onChange={e => setDistance(e.target.value)} min="0"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Consumo (L/100km)</label>
          <input type="number" value={consumption} onChange={e => setConsumption(e.target.value)} min="0" step="0.1"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio combustible (€/L)</label>
          <input type="number" value={fuelPrice} onChange={e => { setFuelPrice(e.target.value); setFuelTypeIdx(-1); }} min="0" step="0.01"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Pasajeros (para dividir)</label>
          <input type="number" value={passengers} onChange={e => setPassengers(e.target.value)} min="1" max="9"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Vehículo típico (consumo orientativo)</label>
        <div className="grid grid-cols-2 gap-1">
          {TYPICAL_CARS.map((c, i) => (
            <button key={i} onClick={() => setConsumption(String(c.consumption))}
              className="py-1.5 px-2 rounded-lg text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors text-left">
              {c.label} — {c.consumption} L/100km
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setRoundTrip(!roundTrip)}
        className={`w-full py-2 rounded-xl text-sm font-medium transition-colors border ${roundTrip ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'}`}>
        🔄 Ida y vuelta {roundTrip ? '(activado)' : '(solo ida)'}
      </button>

      {dist > 0 && cons > 0 && price > 0 && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 space-y-2 text-sm">
            {[
              { label: 'Distancia total', val: fmt(totalDist, 0) + ' km' },
              { label: 'Combustible consumido', val: fmt(litresUsed) + ' L' },
              { label: 'Coste por 100 km', val: fmt(costPer100km) + ' €' },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{r.label}</span><span>{r.val}</span>
              </div>
            ))}
            <div className="border-t border-indigo-200 dark:border-indigo-700 pt-3 mt-2">
              <div className="flex justify-between font-bold text-lg text-indigo-700 dark:text-indigo-300">
                <span>💰 Coste total</span><span>{fmt(totalCost)} €</span>
              </div>
              {pax > 1 && (
                <div className="flex justify-between font-semibold text-base text-green-600 dark:text-green-400 mt-1">
                  <span>👤 Por persona ({pax})</span><span>{fmt(costPerPerson)} €</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
