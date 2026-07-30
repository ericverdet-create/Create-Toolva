export const UNITS: Record<string, { label: string; toSec: number }> = {
  ms:  { label: 'Milisegundos (ms)', toSec: 0.001 },
  s:   { label: 'Segundos (s)',       toSec: 1 },
  min: { label: 'Minutos (min)',      toSec: 60 },
  h:   { label: 'Horas (h)',          toSec: 3600 },
  d:   { label: 'Días (d)',           toSec: 86400 },
  w:   { label: 'Semanas (sem)',      toSec: 604800 },
  mo:  { label: 'Meses (30 días)',    toSec: 2592000 },
  yr:  { label: 'Años (365 días)',    toSec: 31536000 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toSec / UNITS[to].toSec }
export function fmt(n: number) {
  if (Math.abs(n) >= 1e9 || (Math.abs(n) < 0.001 && n !== 0)) return n.toExponential(4)
  return parseFloat(n.toPrecision(8)).toString()
}
