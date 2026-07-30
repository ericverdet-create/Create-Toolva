export interface PctResult { percentage: number; value: number; total: number }
export function valueToPercent(value: number, total: number): PctResult {
  return { percentage: (value / total) * 100, value, total }
}
export function percentToValue(percentage: number, total: number): PctResult {
  return { percentage, value: (percentage / 100) * total, total }
}
export function fmt(n: number): string {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 4 }).format(n)
}
