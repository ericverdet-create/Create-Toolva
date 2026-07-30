export function calcDiscount(original: number, pct: number) {
  const saving = original * pct / 100
  const final = original - saving
  return { saving, final, pct }
}
export function fmt(n: number) {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
