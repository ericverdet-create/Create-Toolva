export interface SciResult {
  scientific: string;
  decimal: string;
  coefficient: number;
  exponent: number;
}

export function toScientific(num: number): SciResult {
  if (num === 0) return { scientific: '0', decimal: '0', coefficient: 0, exponent: 0 };
  const exp = Math.floor(Math.log10(Math.abs(num)));
  const coef = num / Math.pow(10, exp);
  const coefRounded = Math.round(coef * 1e10) / 1e10;
  return {
    scientific: `${coefRounded} × 10^${exp}`,
    decimal: num.toLocaleString('es-ES', { maximumSignificantDigits: 15 }),
    coefficient: coefRounded,
    exponent: exp,
  };
}

export function fromScientific(coefficient: number, exponent: number): SciResult {
  const num = coefficient * Math.pow(10, exponent);
  return toScientific(num);
}

export function parseDecimal(s: string): number | null {
  const n = parseFloat(s.replace(',', '.').replace(/s/g, ''));
  return isNaN(n) ? null : n;
}
