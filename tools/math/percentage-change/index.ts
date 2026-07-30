export function percentageChange(from: number, to: number): number {
  if (from === 0) return 0
  return ((to - from) / Math.abs(from)) * 100
}
export function applyChange(base: number, pct: number): number {
  return base * (1 + pct / 100)
}
