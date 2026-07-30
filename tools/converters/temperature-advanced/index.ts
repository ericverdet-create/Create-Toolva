export type TempUnit = 'C' | 'F' | 'K' | 'R' | 'Re';

export const TEMP_UNITS: Record<TempUnit, string> = {
  C: 'Celsius (°C)',
  F: 'Fahrenheit (°F)',
  K: 'Kelvin (K)',
  R: 'Rankine (°R)',
  Re: 'Réaumur (°Ré)',
};

function toCelsius(v: number, from: TempUnit): number {
  switch (from) {
    case 'C': return v;
    case 'F': return (v - 32) * 5 / 9;
    case 'K': return v - 273.15;
    case 'R': return (v - 491.67) * 5 / 9;
    case 'Re': return v * 5 / 4;
  }
}

function fromCelsius(c: number, to: TempUnit): number {
  switch (to) {
    case 'C': return c;
    case 'F': return c * 9 / 5 + 32;
    case 'K': return c + 273.15;
    case 'R': return (c + 273.15) * 9 / 5;
    case 'Re': return c * 4 / 5;
  }
}

export function convertTemp(value: number, from: TempUnit): Record<TempUnit, number> {
  const c = toCelsius(value, from);
  return {
    C: from === 'C' ? value : fromCelsius(c, 'C'),
    F: from === 'F' ? value : fromCelsius(c, 'F'),
    K: from === 'K' ? value : fromCelsius(c, 'K'),
    R: from === 'R' ? value : fromCelsius(c, 'R'),
    Re: from === 'Re' ? value : fromCelsius(c, 'Re'),
  };
}

export const TEMP_SYMBOLS: Record<TempUnit, string> = {
  C: '°C', F: '°F', K: 'K', R: '°R', Re: '°Ré',
};
