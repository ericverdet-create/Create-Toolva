'use client';
import { useState } from 'react';

const TABLAS = {
  'Longitud': [
    ['1 kilómetro (km)', '=', '1,000 metros · 0.621 millas · 1,094 yardas'],
    ['1 metro (m)', '=', '100 cm · 3.281 pies · 39.37 pulgadas'],
    ['1 centímetro (cm)', '=', '10 mm · 0.394 pulgadas'],
    ['1 milla (mi)', '=', '1.609 km · 1,760 yardas · 5,280 pies'],
    ['1 pie (ft)', '=', '30.48 cm · 12 pulgadas'],
    ['1 pulgada (in)', '=', '2.54 cm · 25.4 mm'],
    ['1 milla náutica', '=', '1.852 km · 1.151 millas'],
    ['1 año luz', '=', '9.461 × 10¹² km'],
  ],
  'Peso/Masa': [
    ['1 tonelada (t)', '=', '1,000 kg · 2,205 libras'],
    ['1 kilogramo (kg)', '=', '1,000 g · 2.205 libras · 35.27 onzas'],
    ['1 gramo (g)', '=', '1,000 mg · 0.035 onzas'],
    ['1 libra (lb)', '=', '453.6 g · 16 onzas'],
    ['1 onza (oz)', '=', '28.35 g'],
    ['1 piedra (st)', '=', '6.35 kg · 14 libras'],
    ['1 quilate', '=', '0.2 g · 200 mg'],
  ],
  'Temperatura': [
    ['0°C (agua congela)', '=', '32°F · 273.15 K'],
    ['100°C (agua hierve)', '=', '212°F · 373.15 K'],
    ['37°C (cuerpo humano)', '=', '98.6°F · 310.15 K'],
    ['Fórmula °C→°F', '=', '°C × 9/5 + 32'],
    ['Fórmula °F→°C', '=', '(°F − 32) × 5/9'],
    ['Fórmula °C→K', '=', '°C + 273.15'],
    ['-40°C = -40°F', '=', 'Único punto de coincidencia'],
  ],
  'Área': [
    ['1 km²', '=', '100 hectáreas · 0.386 mi² · 1,000,000 m²'],
    ['1 hectárea (ha)', '=', '10,000 m² · 2.471 acres'],
    ['1 metro² (m²)', '=', '10,000 cm² · 10.764 ft²'],
    ['1 acre', '=', '4,047 m² · 0.405 ha'],
    ['1 pie² (ft²)', '=', '929 cm² · 0.0929 m²'],
    ['1 milla²', '=', '2.59 km² · 640 acres'],
    ['Campo de fútbol', '≈', '7,140 m² (68×105 m)'],
  ],
  'Volumen': [
    ['1 metro³ (m³)', '=', '1,000 litros · 264.2 galones'],
    ['1 litro (L)', '=', '1,000 ml · 0.264 galones · 1.057 cuartos'],
    ['1 mililitro (ml)', '=', '1 cm³ · 0.034 fl oz'],
    ['1 galón EE.UU.', '=', '3.785 L · 4 cuartos'],
    ['1 galón UK', '=', '4.546 L'],
    ['1 fl oz EE.UU.', '=', '29.57 ml'],
    ['1 cucharada (tbsp)', '=', '15 ml · 3 cucharaditas'],
    ['1 taza (cup EE.UU.)', '=', '240 ml · 16 cucharadas'],
  ],
  'Velocidad': [
    ['1 km/h', '=', '0.278 m/s · 0.621 mph · 0.540 nudos'],
    ['1 m/s', '=', '3.6 km/h · 2.237 mph'],
    ['1 mph', '=', '1.609 km/h · 0.447 m/s'],
    ['1 nudo (kt)', '=', '1.852 km/h · 1.151 mph'],
    ['Velocidad sonido', '≈', '343 m/s · 1,235 km/h (20°C, nivel del mar)'],
    ['Velocidad luz', '=', '299,792 km/s · ~300,000 km/s'],
    ['Mach 1', '≈', '1,235 km/h (a nivel del mar)'],
  ],
  'Tiempo': [
    ['1 año', '=', '365.25 días · 8,766 h · 525,960 min'],
    ['1 mes', '≈', '30.44 días · 730 horas'],
    ['1 semana', '=', '7 días · 168 horas · 10,080 min'],
    ['1 día', '=', '24 horas · 1,440 min · 86,400 seg'],
    ['1 hora', '=', '60 minutos · 3,600 segundos'],
    ['1 minuto', '=', '60 segundos'],
    ['1 milisegundo', '=', '0.001 segundos · 1,000 microsegundos'],
  ],
  'Energía': [
    ['1 kilovatio-hora (kWh)', '=', '3,600,000 J · 3,412 BTU · 860 kcal'],
    ['1 kilocaloría (kcal)', '=', '4,184 J · 1 Caloría alimentaria'],
    ['1 julio (J)', '=', '0.239 cal · 0.000278 Wh'],
    ['1 BTU', '=', '1,055 J · 252 cal'],
    ['1 electronvoltio (eV)', '=', '1.602 × 10⁻¹⁹ J'],
    ['1 caballo de vapor (CV)', '=', '736 W · 2,545 BTU/h'],
  ],
};

type CatKey = keyof typeof TABLAS;

export default function TablaUnitaria() {
  const [cat, setCat] = useState<CatKey>('Longitud');
  const [busqueda, setBusqueda] = useState('');

  const filas = TABLAS[cat].filter(f => !busqueda || f.some(c => c.toLowerCase().includes(busqueda.toLowerCase())));

  return (
    <div className="space-y-3">
      <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="🔍 Buscar unidad..."
        className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" />

      <div className="flex gap-1 flex-wrap">
        {(Object.keys(TABLAS) as CatKey[]).map(k => (
          <button key={k} onClick={() => { setCat(k); setBusqueda(''); }}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${cat === k && !busqueda ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30'}`}>
            {k}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        {(busqueda ? (Object.values(TABLAS).flat() as string[][]).filter(f => f.some(c => c.toLowerCase().includes(busqueda.toLowerCase()))) : filas).map((fila, i) => (
          <div key={i} className={`flex items-start gap-2 px-3 py-2.5 text-xs ${i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'}`}>
            <span className="font-medium text-gray-700 dark:text-gray-300 min-w-[140px]">{fila[0]}</span>
            <span className="text-indigo-500 dark:text-indigo-400 font-bold">{fila[1]}</span>
            <span className="text-gray-500 dark:text-gray-400 flex-1">{fila[2]}</span>
          </div>
        ))}
        {filas.length === 0 && <div className="text-center text-gray-400 py-4 text-xs">Sin resultados para "{busqueda}"</div>}
      </div>

      <div className="text-xs text-gray-400 text-center">
        Fuente: Sistema Internacional de Unidades (SI) · NIST
      </div>
    </div>
  );
}
