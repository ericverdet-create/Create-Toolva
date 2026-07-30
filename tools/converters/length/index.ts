export const UNITS: Record<string, { label: string; toMeter: number }> = {
  mm:  { label: 'Milímetros (mm)',  toMeter: 0.001 },
  cm:  { label: 'Centímetros (cm)', toMeter: 0.01 },
  m:   { label: 'Metros (m)',       toMeter: 1 },
  km:  { label: 'Kilómetros (km)',  toMeter: 1000 },
  in:  { label: 'Pulgadas (in)',    toMeter: 0.0254 },
  ft:  { label: 'Pies (ft)',        toMeter: 0.3048 },
  yd:  { label: 'Yardas (yd)',      toMeter: 0.9144 },
  mi:  { label: 'Millas (mi)',      toMeter: 1609.344 },
  nmi: { label: 'Millas náuticas',  toMeter: 1852 },
}

export function convert(value: number, from: string, to: string): number {
  const meters = value * UNITS[from].toMeter
  return meters / UNITS[to].toMeter
}

export function fmt(n: number): string {
  if (Math.abs(n) >= 1000000) return n.toExponential(4)
  if (Math.abs(n) < 0.001 && n !== 0) return n.toExponential(4)
  return n.toPrecision(6).replace(/\.?0+$/, '')
}
