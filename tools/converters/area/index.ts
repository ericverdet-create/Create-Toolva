export const UNITS: Record<string, { label: string; toM2: number }> = {
  mm2:  { label: 'Milímetros² (mm²)',  toM2: 0.000001 },
  cm2:  { label: 'Centímetros² (cm²)', toM2: 0.0001 },
  m2:   { label: 'Metros² (m²)',        toM2: 1 },
  km2:  { label: 'Kilómetros² (km²)',   toM2: 1000000 },
  ha:   { label: 'Hectáreas (ha)',       toM2: 10000 },
  ft2:  { label: 'Pies² (ft²)',          toM2: 0.092903 },
  yd2:  { label: 'Yardas² (yd²)',        toM2: 0.836127 },
  acre: { label: 'Acres',                toM2: 4046.86 },
  mi2:  { label: 'Millas² (mi²)',        toM2: 2589988.11 },
}
export function convert(v: number, from: string, to: string) { return v * UNITS[from].toM2 / UNITS[to].toM2 }
export function fmt(n: number) {
  if (Math.abs(n) >= 1e7 || (Math.abs(n) < 0.001 && n !== 0)) return n.toExponential(4)
  return parseFloat(n.toPrecision(6)).toString()
}
