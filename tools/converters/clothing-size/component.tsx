'use client';
import { useState } from 'react';

type Category = 'tops' | 'bottoms' | 'shoes_m' | 'shoes_f';

const TABLES: Record<Category, { headers: string[]; rows: string[][] }> = {
  tops: {
    headers: ['ES/EU', 'UK', 'USA', 'INT'],
    rows: [
      ['32', '4', 'XS', 'XS'],
      ['34', '6', 'XS', 'XS'],
      ['36', '8', 'S', 'S'],
      ['38', '10', 'S', 'S'],
      ['40', '12', 'M', 'M'],
      ['42', '14', 'M', 'M'],
      ['44', '16', 'L', 'L'],
      ['46', '18', 'XL', 'XL'],
      ['48', '20', 'XXL', 'XXL'],
      ['50', '22', '3XL', '3XL'],
      ['52', '24', '4XL', '4XL'],
    ],
  },
  bottoms: {
    headers: ['ES/EU', 'UK', 'USA', 'Cintura (cm)'],
    rows: [
      ['34', '6', '0', '64-67'],
      ['36', '8', '2', '68-71'],
      ['38', '10', '4', '72-75'],
      ['40', '12', '6', '76-79'],
      ['42', '14', '8', '80-83'],
      ['44', '16', '10', '84-87'],
      ['46', '18', '12', '88-92'],
      ['48', '20', '14', '93-97'],
      ['50', '22', '16', '98-103'],
    ],
  },
  shoes_m: {
    headers: ['ES/EU', 'UK', 'USA', 'cm'],
    rows: [
      ['39', '6', '7', '24.5'],
      ['40', '6.5', '7.5', '25.0'],
      ['41', '7', '8', '25.5'],
      ['42', '8', '9', '26.5'],
      ['43', '9', '10', '27.0'],
      ['44', '9.5', '10.5', '27.5'],
      ['45', '10.5', '11.5', '28.5'],
      ['46', '11', '12', '29.0'],
      ['47', '12', '13', '29.5'],
    ],
  },
  shoes_f: {
    headers: ['ES/EU', 'UK', 'USA', 'cm'],
    rows: [
      ['35', '2.5', '5', '22.5'],
      ['36', '3', '5.5', '23.0'],
      ['37', '4', '6.5', '23.5'],
      ['38', '5', '7.5', '24.0'],
      ['39', '6', '8.5', '25.0'],
      ['40', '6.5', '9', '25.5'],
      ['41', '7.5', '10', '26.0'],
      ['42', '8', '10.5', '26.5'],
    ],
  },
};

const CATS: { key: Category; label: string }[] = [
  { key: 'tops', label: 'Camisetas / Tops' },
  { key: 'bottoms', label: 'Pantalones' },
  { key: 'shoes_m', label: 'Zapatos Hombre' },
  { key: 'shoes_f', label: 'Zapatos Mujer' },
];

export default function ClothingSize() {
  const [cat, setCat] = useState<Category>('tops');
  const [selected, setSelected] = useState<number | null>(null);
  const table = TABLES[cat];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {CATS.map(c => (
          <button key={c.key} onClick={() => { setCat(c.key); setSelected(null); }}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${cat === c.key ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-indigo-400'}`}>
            {c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400">Haz clic en una fila para resaltarla</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              {table.headers.map(h => (
                <th key={h} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-2 text-center font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} onClick={() => setSelected(selected === i ? null : i)}
                className={`cursor-pointer transition-colors ${selected === i ? 'bg-indigo-200 dark:bg-indigo-800 font-bold' : i % 2 === 0 ? 'bg-white dark:bg-gray-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30' : 'bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}>
                {row.map((cell, j) => (
                  <td key={j} className={`px-3 py-2 text-center ${selected === i ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-700 dark:text-gray-300'}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected !== null && (
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-3">
          <div className="flex flex-wrap gap-4 justify-center">
            {table.headers.map((h, i) => (
              <div key={h} className="text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400">{h}</div>
                <div className="text-xl font-bold text-indigo-700 dark:text-indigo-300">{table.rows[selected][i]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
