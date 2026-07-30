export type TempUnit = 'C' | 'F' | 'K'
export function convert(value: number, from: TempUnit): Record<TempUnit, number> {
  let c: number
  if (from === 'C') c = value
  else if (from === 'F') c = (value - 32) * 5 / 9
  else c = value - 273.15
  return { C: c, F: c * 9 / 5 + 32, K: c + 273.15 }
}
export function fmt(n: number): string {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(n)
}
