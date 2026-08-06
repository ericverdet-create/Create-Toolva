'use client';
import { useState, useMemo } from 'react';

const fmt0 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const fmt2 = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });

export default function AlquilerVsCompra() {
  const [precioVivienda, setPrecioVivienda] = useState('250000');
  const [entrada, setEntrada] = useState('20');
  const [tipoHipoteca, setTipoHipoteca] = useState('3.5');
  const [plazoHipoteca, setPlazoHipoteca] = useState('30');
  const [alquilerMensual, setAlquilerMensual] = useState('900');
  const [subidaAlquiler, setSubidaAlquiler] = useState('3');
  const [revalorizacion, setRevalorizacion] = useState('2');
  const [gastosCompra, setGastosCompra] = useState('10');

  const precio = parseFloat(precioVivienda) || 0;
  const entradaPct = parseFloat(entrada) || 20;
  const tin = parseFloat(tipoHipoteca) || 0;
  const plazo = parseInt(plazoHipoteca) || 30;
  const alquiler = parseFloat(alquilerMensual) || 0;
  const subAlq = parseFloat(subidaAlquiler) / 100 || 0;
  const revalPct = parseFloat(revalorizacion) / 100 || 0;
  const gastosPct = parseFloat(gastosCompra) / 100 || 0.10;

  const entradaEuros = precio * (entradaPct / 100);
  const capitalHipoteca = precio - entradaEuros;
  const gastosIniciales = precio * gastosPct;
  const desembolsoInicial = entradaEuros + gastosIniciales;

  const r = tin / 100 / 12;
  const n = plazo * 12;
  const cuotaHipoteca = r > 0 ? capitalHipoteca * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : capitalHipoteca / n;

  const { años, puntoEquilibrio } = useMemo(() => {
    const años: { año: number; costoCompra: number; costoAlquiler: number }[] = [];
    let costoCompraAcum = desembolsoInicial;
    let costoAlquilerAcum = 0;
    let alquilerActual = alquiler;
    let puntoEquilibrio = -1;

    for (let y = 1; y <= 30; y++) {
      for (let m = 0; m < 12; m++) {
        costoCompraAcum += cuotaHipoteca;
        costoAlquilerAcum += alquilerActual;
      }
      // Valor de la vivienda al vender
      const valorVivienda = precio * Math.pow(1 + revalPct, y);
      const costoCompraReal = costoCompraAcum - (valorVivienda - precio);
      años.push({ año: y, costoCompra: costoCompraReal, costoAlquiler: costoAlquilerAcum });
      if (puntoEquilibrio === -1 && costoCompraReal < costoAlquilerAcum) {
        puntoEquilibrio = y;
      }
      alquilerActual *= (1 + subAlq);
    }
    return { años, puntoEquilibrio };
  }, [precio, desembolsoInicial, cuotaHipoteca, alquiler, subAlq, revalPct]);

  const INPUT = 'w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Precio vivienda (€)', val: precioVivienda, set: setPrecioVivienda },
          { label: 'Entrada (%)', val: entrada, set: setEntrada },
          { label: 'Tipo hipoteca TIN (%)', val: tipoHipoteca, set: setTipoHipoteca },
          { label: 'Plazo hipoteca (años)', val: plazoHipoteca, set: setPlazoHipoteca },
          { label: 'Alquiler mensual (€)', val: alquilerMensual, set: setAlquilerMensual },
          { label: 'Subida alquiler anual (%)', val: subidaAlquiler, set: setSubidaAlquiler },
          { label: 'Revalorización vivienda/año (%)', val: revalorizacion, set: setRevalorizacion },
          { label: 'Gastos compra (ITP+notaría, %)', val: gastosCompra, set: setGastosCompra },
        ].map(f => (
          <div key={f.label}>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">{f.label}</label>
            <input type="number" step="0.1" value={f.val} onChange={e => f.set(e.target.value)} className={INPUT} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
          <div className="text-xs text-blue-500 mb-1">Cuota hipoteca</div>
          <div className="text-xl font-bold text-blue-700 dark:text-blue-300">{fmt2(cuotaHipoteca)}/mes</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3 text-center">
          <div className="text-xs text-orange-500 mb-1">Desembolso inicial</div>
          <div className="text-xl font-bold text-orange-700 dark:text-orange-300">{fmt0(desembolsoInicial)}</div>
        </div>
      </div>

      {puntoEquilibrio > 0 ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-center">
          <div className="text-sm text-green-600 dark:text-green-400">Punto de equilibrio</div>
          <div className="text-3xl font-bold text-green-700 dark:text-green-300">Año {puntoEquilibrio}</div>
          <div className="text-xs text-gray-500 mt-1">A partir del año {puntoEquilibrio}, comprar sale más barato que alquilar</div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 text-sm text-amber-700 dark:text-amber-300 text-center">
          Con estos parámetros, alquilar es más económico a 30 años
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-3 py-2 text-left text-gray-500">Año</th>
              <th className="px-3 py-2 text-right text-blue-600">Costo comprar</th>
              <th className="px-3 py-2 text-right text-orange-600">Costo alquilar</th>
              <th className="px-3 py-2 text-right text-gray-500">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {años.filter(a => [1, 3, 5, 7, 10, 15, 20, 25, 30].includes(a.año)).map(a => {
              const diff = a.costoAlquiler - a.costoCompra;
              return (
                <tr key={a.año} className={`border-t border-gray-100 dark:border-gray-700 ${diff > 0 ? 'bg-green-50/50 dark:bg-green-900/10' : ''}`}>
                  <td className="px-3 py-1.5 font-medium">{a.año}</td>
                  <td className="px-3 py-1.5 text-right text-blue-700 dark:text-blue-300">{fmt0(a.costoCompra)}</td>
                  <td className="px-3 py-1.5 text-right text-orange-700 dark:text-orange-300">{fmt0(a.costoAlquiler)}</td>
                  <td className={`px-3 py-1.5 text-right font-medium ${diff > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {diff > 0 ? '+' : ''}{fmt0(diff)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400">* La diferencia positiva indica que comprar es más barato acumulado (incluyendo revalorización del inmueble).</p>
    </div>
  );
}
