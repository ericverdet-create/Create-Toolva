export function solveProportion(a: number|null, b: number|null, c: number|null, d: number|null) {
  if (a === null && b && c && d) return (b * c) / d
  if (b === null && a && c && d) return (a * d) / c
  if (c === null && a && b && d) return (a * d) / b
  if (d === null && a && b && c) return (b * c) / a
  return null
}
