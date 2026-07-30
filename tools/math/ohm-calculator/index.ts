export interface OhmResult { V?: number; I?: number; R?: number; P?: number }
export function solveOhm(V: number|null, I: number|null, R: number|null, P: number|null): OhmResult {
  const res: OhmResult = {}
  if (V !== null && I !== null) { res.R = V / I; res.P = V * I; res.V = V; res.I = I }
  else if (V !== null && R !== null) { res.I = V / R; res.P = (V * V) / R; res.V = V; res.R = R }
  else if (V !== null && P !== null) { res.I = P / V; res.R = (V * V) / P; res.V = V; res.P = P }
  else if (I !== null && R !== null) { res.V = I * R; res.P = I * I * R; res.I = I; res.R = R }
  else if (I !== null && P !== null) { res.V = P / I; res.R = P / (I * I); res.I = I; res.P = P }
  else if (R !== null && P !== null) { res.V = Math.sqrt(P * R); res.I = Math.sqrt(P / R); res.R = R; res.P = P }
  return res
}
export function fmt(n: number): string {
  if (Math.abs(n) >= 1000) return n.toLocaleString('es-ES', { maximumFractionDigits: 2 })
  return parseFloat(n.toPrecision(5)).toString()
}
