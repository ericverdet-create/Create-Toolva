'use client';
import { useState } from 'react';

export default function AhorroJubilacion() {
  const [edadActual, setEdadActual] = useState('35');
  const [edadJubilacion, setEdadJubilacion] = useState('67');
  const [ahorroActual, setAhorroActual] = useState('10000');
  const [aporteMensual, setAporteMensual] = useState('300');
  const [rentabilidad, setRentabilidad] = useState('5');
  const [inflacion, setInflacion] = useState('2');
  const [pensionDeseada, setPensionDeseada] = useState('1500');
  const [modo, setModo] = useState<'simular' | 'cuanto'>('simular');

  const eAct = parseInt(edadActual) || 35;
  const eJub = parseInt(edadJubilacion) || 67;
  const anos = Math.max(0, eJub - eAct);
  const meses = anos * 12;
  const capitalInicial = parseFloat(ahorroActual) || 0;
  const aporte = parseFloat(aporteMensual) || 0;
  const r = (parseFloat(rentabilidad) || 0) / 100 / 12; // mensual
  const inf = (parseFloat(inflacion) || 0) / 100;
  const pensionMes = parseFloat(pensionDeseada) || 0;

  // Valor futuro con interés compuesto
  const capitalInvFuturo = capitalInicial * Math.pow(1 + r, meses);
  const aporteFuturo = r > 0 ? aporte * (Math.pow(1 + r, meses) - 1) / r : aporte * meses;
  const capitalTotal = capitalInvFuturo + aporteFuturo;

  // Ajuste inflación
  const capitalRealHoy = capitalTotal / Math.pow(1 + inf, anos);

  // ¿Cuántos años dura el capital? (retiro mensual)
  const retiradaMensual = pensionMes;
  const mesesDura = capitalTotal > 0 && retiradaMensual > 0 && r > 0
    ? Math.log(retiradaMensual / (retiradaMensual - capitalTotal * r)) / Math.log(1 + r)
    : capitalTotal / retiradaMensual;
  const anosDura = Math.floor(mesesDura / 12);

  // Modo inverso: ¿cuánto tengo que ahorrar?
  // Capital necesario para pensión vitalicia (25 años de vida tras jubilación)
  const anosRetiro = 25;
  const mesesRetiro = anosRetiro * 12;
  const capitalNecesario = r > 0
    ? pensionMes * (1 - Math.pow(1 + r, -mesesRetiro)) / r
    : pensionMes * mesesRetiro;
  const faltaCapital = Math.max(0, capitalNecesario - capitalInvFuturo);
  const aporteMensualNecesario = r > 0 && meses > 0
    ? faltaCapital / ((Math.pow(1 + r, meses) - 1) / r)
    : faltaCapital / meses;

  const fmt = (n: number) => Math.round(n).toLocaleString('es-ES') + ' €';
  const fmtK = (n: number) => n >= 1000 ? (n / 1000).toFixed(1) + 'k €' : Math.round(n) + ' €';

  // Proyección por décadas
  const proyeccion: { edad: number; capital: number }[] = [];
  for (let a = 5; a <= anos; a += 5) {
    const m = a * 12;
    const ci = capitalInicial * Math.pow(1 + r, m);
    const ca = r > 0 ? aporte * (Math.pow(1 + r, m) - 1) / r : aporte * m;
    proyeccion.push({ edad: eAct + a, capital: ci + ca });
  }
  if (anos > 0 && (anos % 5 !== 0)) proyeccion.push({ edad: eJub, capital: capitalTotal });

  const maxCapital = Math.max(...proyeccion.map(p => p.capital), 1);

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5">
        {[['simular', '📈 Simular ahorro'], ['cuanto', '🎯 ¿Cuánto necesito?']].map(([v, l]) => (
          <button key={v} onClick={() => setModo(v as 'simular' | 'cuanto')}
            className={`flex-1 py-2 rounded-xl text-xs font-medium ${modo === v ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{l}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad actual</label>
          <input type="number" value={edadActual} onChange={e => setEdadActual(e.target.value)} min="18" max="65"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Edad de jubilación</label>
          <input type="number" value={edadJubilacion} onChange={e => setEdadJubilacion(e.target.value)} min="50" max="80"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Ahorro actual</label>
          <div className="relative">
            <input type="number" value={ahorroActual} onChange={e => setAhorroActual(e.target.value)} min="0" step="1000"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Aporte mensual</label>
          <div className="relative">
            <input type="number" value={aporteMensual} onChange={e => setAporteMensual(e.target.value)} min="0" step="50"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Rentabilidad anual (%)</label>
          <div className="flex gap-1">
            {[3, 5, 7, 10].map(v => (
              <button key={v} onClick={() => setRentabilidad(String(v))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${rentabilidad === String(v) ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{v}%</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Pensión deseada / mes</label>
          <div className="relative">
            <input type="number" value={pensionDeseada} onChange={e => setPensionDeseada(e.target.value)} min="0" step="100"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-3 py-2 pr-7 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">€</span>
          </div>
        </div>
      </div>

      {anos > 0 && (
        <div className="space-y-3">
          {modo === 'simular' ? (
            <>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-indigo-600 dark:text-indigo-400">Capital acumulado a los {eJub} años</div>
                <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">{fmtK(capitalTotal)}</div>
                <div className="text-xs text-indigo-500 dark:text-indigo-400">En euros de hoy (ajustado inflación {inflacion}%): {fmtK(capitalRealHoy)}</div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                {[
                  { label: 'Capital inicial', val: fmt(capitalInicial) },
                  { label: `Aportado (${anos}a)`, val: fmt(aporte * meses) },
                  { label: 'Intereses generados', val: fmt(capitalTotal - capitalInicial - aporte * meses) },
                ].map(r => (
                  <div key={r.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-2">
                    <div className="text-gray-400">{r.label}</div>
                    <div className="font-bold text-gray-900 dark:text-white">{r.val}</div>
                  </div>
                ))}
              </div>
              {pensionMes > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 text-center text-xs">
                  <div className="text-green-600 dark:text-green-400">Retirando {fmt(pensionMes)}/mes, el capital dura:</div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-300">{isFinite(anosDura) && anosDura > 0 ? `${Math.min(999, anosDura)} años` : '∞ (¡renta vitalicia!)'}</div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl p-4 text-center">
                <div className="text-xs text-green-600 dark:text-green-400">Capital necesario para {fmt(pensionMes)}/mes durante 25 años</div>
                <div className="text-3xl font-bold text-green-700 dark:text-green-300">{fmtK(capitalNecesario)}</div>
              </div>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-3 text-center">
                <div className="text-xs text-indigo-600 dark:text-indigo-400">Aporte mensual necesario (con {rentabilidad}% rentabilidad)</div>
                <div className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{fmt(aporteMensualNecesario)}/mes</div>
              </div>
            </>
          )}

          {/* Gráfico de proyección */}
          {proyeccion.length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Proyección de capital</div>
              {proyeccion.map(p => (
                <div key={p.edad} className="flex items-center gap-2 text-xs">
                  <span className="w-14 text-gray-500 dark:text-gray-400">Edad {p.edad}</span>
                  <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full transition-all"
                      style={{ width: `${(p.capital / maxCapital) * 100}%` }}></div>
                  </div>
                  <span className="w-16 text-right font-medium text-gray-900 dark:text-white">{fmtK(p.capital)}</span>
                </div>
              ))}
            </div>
          )}
          <div className="text-xs text-gray-400 dark:text-gray-500">Estimación con rentabilidad constante. La rentabilidad real varía. No es asesoramiento financiero.</div>
        </div>
      )}

      {/* CTA Afiliado — Planes de pensiones / inversión */}
      <div className="mt-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 bg-indigo-50 dark:bg-indigo-900/10 p-4">
        <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 mb-2 uppercase tracking-wide">Empieza a invertir para tu jubilación</p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">Planes de pensiones y fondos de inversión con las mejores rentabilidades. Compara y elige el que mejor se adapta a tu perfil.</p>
        <div className="flex flex-wrap gap-2">
          <a href="https://www.finanbest.com" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors">
            Ver planes de inversión →
          </a>
          <a href="https://www.myinvestor.es/planes-de-pensiones" target="_blank" rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-lg transition-colors">
            MyInvestor →
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-2">* Enlace patrocinado. Sin coste para ti.</p>
      </div>
    </div>
  );
}
