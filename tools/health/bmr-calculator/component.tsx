'use client';
import { useState } from 'react';
import { calcBmr, ACTIVITY_LABELS, Sex, Formula, ActivityLevel, BmrResult } from './index';

export default function BmrCalculatorComponent() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<Sex>('male');
  const [formula, setFormula] = useState<Formula>('mifflin');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [result, setResult] = useState<BmrResult | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    const w = parseFloat(weight), h = parseFloat(height), a = parseInt(age);
    if (isNaN(w) || w < 1 || w > 500) { setError('Introduce un peso válido (kg)'); return; }
    if (isNaN(h) || h < 50 || h > 300) { setError('Introduce una altura válida (cm)'); return; }
    if (isNaN(a) || a < 1 || a > 120) { setError('Introduce una edad válida'); return; }
    setError('');
    setResult(calcBmr(w, h, a, sex, formula, activity));
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sexo biológico</label>
        <div className="flex gap-2">
          {[['male', '♂ Hombre'], ['female', '♀ Mujer']].map(([v, l]) => (
            <button key={v} onClick={() => setSex(v as Sex)}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors ${sex === v ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          ['Peso (kg)', weight, setWeight, '70'],
          ['Altura (cm)', height, setHeight, '175'],
          ['Edad', age, setAge, '30'],
        ].map(([label, val, setter, ph]) => (
          <div key={label as string}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label as string}</label>
            <input type="number" value={val as string} onChange={e => (setter as Function)(e.target.value)}
              placeholder={ph as string}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent text-center" />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel de actividad</label>
        <select value={activity} onChange={e => setActivity(e.target.value as ActivityLevel)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white">
          {(Object.keys(ACTIVITY_LABELS) as ActivityLevel[]).map(k => (
            <option key={k} value={k}>{ACTIVITY_LABELS[k]}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fórmula</label>
        <div className="flex gap-2">
          {[['mifflin', 'Mifflin-St Jeor (recomendada)'], ['harris', 'Harris-Benedict (clásica)']].map(([v, l]) => (
            <button key={v} onClick={() => setFormula(v as Formula)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${formula === v ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <button onClick={calculate}
        className="w-full py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium transition-colors text-lg">
        Calcular
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">BMR (metabolismo basal)</p>
              <p className="text-3xl font-bold text-brand-700">{result.bmr.toLocaleString('es-ES')}</p>
              <p className="text-sm text-gray-500">kcal/día en reposo</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">TDEE (gasto total)</p>
              <p className="text-3xl font-bold text-orange-600">{result.tdee.toLocaleString('es-ES')}</p>
              <p className="text-sm text-gray-500">kcal/día con actividad</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">🔻 Para perder peso (~0,5 kg/sem)</span>
              <span className="font-semibold text-red-600">{result.weightLoss.toLocaleString('es-ES')} kcal/día</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">⚖️ Para mantener peso</span>
              <span className="font-semibold text-gray-900">{result.tdee.toLocaleString('es-ES')} kcal/día</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">🔺 Para ganar peso</span>
              <span className="font-semibold text-green-600">{result.weightGain.toLocaleString('es-ES')} kcal/día</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
