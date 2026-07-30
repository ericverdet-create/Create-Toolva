export const UNITS: Record<string, { label: string; toMs: number }> = {
  ms:   { label: 'm/s',                 toMs: 1 },
  kmh:  { label: 'km/h',                toMs: 1/3.6 },
  mph:  { label: 'mph',                 toMs: 0.44704 },
  kt:   { label: 'Nudos (kt)',           toMs: 0.514444 },
  fts:  { label: 'ft/s',                toMs: 0.3048 },
  mach: { label: 'Mach (nivel del mar)', toMs: 340.29 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toMs / UNITS[to].toMs }
export function fmt(n: number) {
  if (Math.abs(n) < 0.001 && n !== 0) return n.toExponential(4)
  return parseFloat(n.toPrecision(6)).toString()
}
