export const UNITS: Record<string, { label: string; toW: number }> = {
  w:   { label: 'Vatio (W)',         toW: 1 },
  kw:  { label: 'Kilovatio (kW)',    toW: 1000 },
  mw:  { label: 'Megavatio (MW)',    toW: 1e6 },
  hp:  { label: 'Caballo de vapor (HP)', toW: 745.7 },
  kcalh: { label: 'kcal/h',         toW: 1.163 },
  btu:   { label: 'BTU/h',          toW: 0.29307 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toW / UNITS[to].toW }
export function fmt(n: number) {
  if (Math.abs(n) >= 1e6 || (Math.abs(n) < 0.0001 && n !== 0)) return n.toExponential(4)
  return parseFloat(n.toPrecision(7)).toString()
}
