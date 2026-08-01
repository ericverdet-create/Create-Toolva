'use client';
import { useState } from 'react';

const APARATOS = [
  { nombre: 'Nevera/Frigorífico A++', w: 150, hdia: 24, cat: 'Cocina' },
  { nombre: 'Nevera/Frigorífico A+', w: 250, hdia: 24, cat: 'Cocina' },
  { nombre: 'Lavadora (60°C)', w: 2000, hdia: 1, cat: 'Electrodomésticos' },
  { nombre: 'Lavadora (30°C)', w: 600, hdia: 1, cat: 'Electrodomésticos' },
  { nombre: 'Lavavajillas', w: 1800, hdia: 1, cat: 'Cocina' },
  { nombre: 'Horno eléctrico', w: 2000, hdia: 1, cat: 'Cocina' },
  { nombre: 'Microondas', w: 1000, hdia: 0.2, cat: 'Cocina' },
  { nombre: 'Vitrocerámica (2 fuegos)', w: 3000, hdia: 0.5, cat: 'Cocina' },
  { nombre: 'TV LED 40"', w: 60, hdia: 4, cat: 'Entretenimiento' },
  { nombre: 'TV LED 55"', w: 100, hdia: 4, cat: 'Entretenimiento' },
  { nombre: 'Ordenador portátil', w: 50, hdia: 6, cat: 'Electrónica' },
  { nombre: 'Ordenador de sobremesa', w: 300, hdia: 6, cat: 'Electrónica' },
  { nombre: 'Aire acondicionado (frío)', w: 1500, hdia: 6, cat: 'Climatización' },
  { nombre: 'Aire acondicionado (calor)', w: 2000, hdia: 6, cat: 'Climatización' },
  { nombre: 'Calefactor eléctrico', w: 2000, hdia: 4, cat: 'Climatización' },
  { nombre: 'Secadora', w: 3000, hdia: 1, cat: 'Electrodomésticos' },
  { nombre: 'Aspiradora', w: 1500, hdia: 0.5, cat: 'Hogar' },
  { nombre: 'Bombilla LED', w: 10, hdia: 5, cat: 'Iluminación' },
  { nombre: 'Bombilla halógena', w: 50, hdia: 5, cat: 'Iluminación' },
  { nombre: 'Router WiFi', w: 10, hdia: 24, cat: 'Electrónica' },
  { nombre: 'Cargador móvil', w: 15, hdia: 2, cat: 'Electrónica' },
  { nombre: 'Plancha de ropa', w: 2400, hdia: 0.5, cat: 'Hogar' },
  { nombre: 'Termo eléctrico (80L)', w: 2000, hdia: 2, cat: 'Agua caliente' },
  { nombre: 'Jacuzzi / bañera hidromasaje', w: 3000, hdia: 1, cat: 'Agua caliente' },
];

interface Seleccion { aparatoNombre: string; watios: number; horas: number; cantidad: number; }

export default function ConsumoElectrico() {
  const [seleccion, setSeleccion] = useState<Seleccion[]>([]);
  const [precioKwh, setPrecioKwh] = useState('0.18');
  const [customNombre, setCustomNombre] = useState('');
  const [customW, setCustomW] = useState('');
  const [customH, setCustomH] = useState('');

  const precio = parseFloat(precioKwh) || 0.18;

  const addAparato = (ap: typeof APARATOS[0]) => {
    const existe = seleccion.find(s => s.aparatoNombre === ap.nombre);
    if (existe) {
      setSeleccion(s => s.map(x => x.aparatoNombre === ap.nombre ? { ...x, cantidad: x.cantidad + 1 } : x));
    } else {
      setSeleccion(s => [...s, { aparatoNombre: ap.nombre, watios: ap.w, horas: ap.hdia, cantidad: 1 }]);
    }
  };

  const removeAparato = (nombre: string) => setSeleccion(s => s.filter(x => x.aparatoNombre !== nombre));
  const updateHoras = (nombre: string, h: number) => setSeleccion(s => s.map(x => x.aparatoNombre === nombre ? { ...x, horas: Math.max(0, h) } : x));

  const totalKwhDia = seleccion.reduce((acc, s) => acc + (s.watios * s.horas * s.cantidad) / 1000, 0);
  const costeDia = totalKwhDia * precio;
  const costeMes = costeDia * 30;
  const costeAnio = costeDia * 365;

  const fmt = (n: number) => n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

  const addCustom = () => {
    if (!customW) return;
    const nombre = customNombre || `Aparato (${customW}W)`;
    setSeleccion(s => [...s, { aparatoNombre: nombre, watios: parseFloat(customW), horas: parseFloat(customH) || 1, cantidad: 1 }]);
    setCustomNombre(''); setCustomW(''); setCustomH('');
  };

  const CATS = [...new Set(APARATOS.map(a => a.cat))];
  const [catFiltro, setCatFiltro] = useState('');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Precio electricidad (€/kWh)</label>
        <div className="flex gap-1.5">
          {['0.15', '0.18', '0.22', '0.25'].map(p => (
            <button key={p} onClick={() => setPrecioKwh(p)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${precioKwh === p ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{p}€</button>
          ))}
          <input type="number" value={precioKwh} onChange={e => setPrecioKwh(e.target.value)} step="0.01"
            className="w-16 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-xs text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none" />
        </div>
      </div>

      <div className="flex gap-1 flex-wrap">
        <button onClick={() => setCatFiltro('')} className={`px-2 py-0.5 rounded-full text-xs ${!catFiltro ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>Todos</button>
        {CATS.map(c => <button key={c} onClick={() => setCatFiltro(c)} className={`px-2 py-0.5 rounded-full text-xs ${catFiltro === c ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>{c}</button>)}
      </div>

      <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto">
        {APARATOS.filter(a => !catFiltro || a.cat === catFiltro).map(ap => (
          <button key={ap.nombre} onClick={() => addAparato(ap)}
            className="text-left px-2.5 py-2 rounded-xl text-xs bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700 transition-colors">
            <div className="font-medium text-gray-700 dark:text-gray-300">{ap.nombre}</div>
            <div className="text-gray-400">{ap.w}W · {ap.hdia}h/día</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <input value={customNombre} onChange={e => setCustomNombre(e.target.value)} placeholder="Mi aparato"
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none" />
        <input type="number" value={customW} onChange={e => setCustomW(e.target.value)} placeholder="Watios"
          className="border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1.5 text-xs bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none text-center" />
        <button onClick={addCustom} className="py-1.5 rounded-lg text-xs bg-indigo-600 text-white font-medium">+ Añadir</button>
      </div>

      {seleccion.length > 0 && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            {seleccion.map(s => {
              const kwh = (s.watios * s.horas * s.cantidad) / 1000;
              const coste = kwh * precio;
              return (
                <div key={s.aparatoNombre} className="flex items-center gap-2 text-xs bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-700 dark:text-gray-300 truncate">{s.aparatoNombre}</div>
                    <div className="text-gray-400">{s.watios}W × {s.cantidad}ud</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <input type="number" value={s.horas} onChange={e => updateHoras(s.aparatoNombre, parseFloat(e.target.value))} min="0" max="24" step="0.5"
                      className="w-12 border border-gray-200 dark:border-gray-600 rounded-lg px-1 py-0.5 text-xs text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none" />
                    <span className="text-gray-400">h/d</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900 dark:text-white">{kwh.toFixed(3)} kWh</div>
                    <div className="text-gray-500">{(coste * 30).toFixed(2)}€/mes</div>
                  </div>
                  <button onClick={() => removeAparato(s.aparatoNombre)} className="text-gray-400 hover:text-red-500">×</button>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            {[
              { label: '📅 Coste diario', val: fmt(costeDia) },
              { label: '📆 Coste mensual', val: fmt(costeMes) },
              { label: '📈 Coste anual', val: fmt(costeAnio) },
            ].map(r => (
              <div key={r.label} className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-2">
                <div className="text-indigo-500 dark:text-indigo-400">{r.label}</div>
                <div className="font-bold text-indigo-700 dark:text-indigo-300">{r.val}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
            Total: {totalKwhDia.toFixed(3)} kWh/día · {(totalKwhDia * 30).toFixed(1)} kWh/mes
          </div>
        </div>
      )}
    </div>
  );
}
