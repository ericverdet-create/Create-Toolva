export interface DateDiffResult {
  days: number; weeks: number; months: number; years: number; workdays: number; weekends: number
}
export function dateDiff(from: Date, to: Date): DateDiffResult {
  const a = new Date(from); a.setHours(0,0,0,0)
  const b = new Date(to);   b.setHours(0,0,0,0)
  const sign = b >= a ? 1 : -1
  const start = sign === 1 ? a : b
  const end   = sign === 1 ? b : a
  const days = Math.round((end.getTime() - start.getTime()) / 86400000)
  let workdays = 0, weekends = 0
  const cur = new Date(start)
  while (cur <= end) {
    const d = cur.getDay()
    if (d === 0 || d === 6) weekends++; else workdays++
    cur.setDate(cur.getDate() + 1)
  }
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  const years  = end.getFullYear() - start.getFullYear()
  return { days: days * sign, weeks: Math.floor(days / 7) * sign, months: months * sign, years, workdays, weekends }
}
