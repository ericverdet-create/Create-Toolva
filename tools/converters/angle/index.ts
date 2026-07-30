export const UNITS: Record<string, { label: string; toDeg: number }> = {
  deg:    { label: 'Grados (deg)', toDeg: 1 },
  rad:    { label: 'Radianes (rad)', toDeg: 180 / Math.PI },
  grad:   { label: 'Gradianes (gon)', toDeg: 0.9 },
  turn:   { label: 'Vueltas', toDeg: 360 },
  arcmin: { label: 'Minutos de arco', toDeg: 1/60 },
  arcsec: { label: 'Segundos de arco', toDeg: 1/3600 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toDeg / UNITS[to].toDeg }
export function fmt(n: number) {
  if (Math.abs(n) < 0.00001 && n !== 0) return n.toExponential(4)
  return parseFloat(n.toPrecision(8)).toString()
}
