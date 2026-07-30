export interface AgeResult {
  years: number
  months: number
  days: number
  totalDays: number
  daysUntilBirthday: number
  isBirthdayToday: boolean
}

export function calcAge(birthDate: Date): AgeResult {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const bd = new Date(birthDate)
  bd.setHours(0, 0, 0, 0)

  let years = today.getFullYear() - bd.getFullYear()
  let months = today.getMonth() - bd.getMonth()
  let days = today.getDate() - bd.getDate()

  if (days < 0) {
    months--
    const prev = new Date(today.getFullYear(), today.getMonth(), 0)
    days += prev.getDate()
  }
  if (months < 0) { years--; months += 12 }

  const totalDays = Math.floor((today.getTime() - bd.getTime()) / 86400000)

  const nextBd = new Date(today.getFullYear(), bd.getMonth(), bd.getDate())
  if (nextBd < today) nextBd.setFullYear(today.getFullYear() + 1)
  const isBirthdayToday = nextBd.getTime() === today.getTime() ||
    (bd.getMonth() === today.getMonth() && bd.getDate() === today.getDate())
  const daysUntilBirthday = isBirthdayToday ? 0 : Math.floor((nextBd.getTime() - today.getTime()) / 86400000)

  return { years, months, days, totalDays, daysUntilBirthday, isBirthdayToday }
}
