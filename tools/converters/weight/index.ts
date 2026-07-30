export const UNITS: Record<string, { label: string; toKg: number }> = {
  mg:  { label: 'Miligramos (mg)',  toKg: 0.000001 },
  g:   { label: 'Gramos (g)',       toKg: 0.001 },
  kg:  { label: 'Kilogramos (kg)',  toKg: 1 },
  t:   { label: 'Toneladas (t)',    toKg: 1000 },
  oz:  { label: 'Onzas (oz)',       toKg: 0.0283495 },
  lb:  { label: 'Libras (lb)',      toKg: 0.453592 },
  st:  { label: 'Stones (st)',      toKg: 6.35029 },
}

export function convert(value: number, from: string, to: string): number {
  return value * UNITS[from].toKg / UNITS[to].toKg
}

export function fmt(n: number): string {
  if (Math.abs(n) >= 1000000) return n.toExponential(4)
  if (Math.abs(n) < 0.0001 && n !== 0) return n.toExponential(4)
  return n.toPrecision(6).replace(/\.?0+$/, '')
}
