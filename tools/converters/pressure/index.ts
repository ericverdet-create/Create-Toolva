export const UNITS: Record<string, { label: string; toPa: number }> = {
  pa:   { label: 'Pascal (Pa)',   toPa: 1 },
  hpa:  { label: 'hPa',          toPa: 100 },
  kpa:  { label: 'kPa',          toPa: 1000 },
  bar:  { label: 'Bar',          toPa: 100000 },
  mbar: { label: 'mbar',         toPa: 100 },
  atm:  { label: 'Atmosfera (atm)', toPa: 101325 },
  psi:  { label: 'PSI',          toPa: 6894.76 },
  mmhg: { label: 'mmHg (torr)',   toPa: 133.322 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toPa / UNITS[to].toPa }
export function fmt(n: number) {
  if (Math.abs(n) >= 1e7 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4)
  return parseFloat(n.toPrecision(7)).toString()
}
