export interface MortgageResult {
  monthlyPayment: number
  totalPaid: number
  totalInterest: number
  schedule: { month: number; principal: number; interest: number; balance: number }[]
}

export function calcMortgage(principal: number, annualRate: number, years: number): MortgageResult {
  const n = years * 12
  if (annualRate === 0) {
    const mp = principal / n
    return {
      monthlyPayment: mp,
      totalPaid: principal,
      totalInterest: 0,
      schedule: Array.from({ length: n }, (_, i) => ({
        month: i + 1, principal: mp, interest: 0, balance: principal - mp * (i + 1)
      }))
    }
  }
  const r = annualRate / 100 / 12
  const mp = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1)
  let balance = principal
  const schedule = []
  for (let i = 0; i < n; i++) {
    const interest = balance * r
    const princ = mp - interest
    balance -= princ
    schedule.push({ month: i + 1, principal: princ, interest, balance: Math.max(0, balance) })
  }
  const totalPaid = mp * n
  return { monthlyPayment: mp, totalPaid, totalInterest: totalPaid - principal, schedule }
}

export function fmt(n: number) {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
