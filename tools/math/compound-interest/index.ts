export interface CompoundResult {
  finalAmount: number; totalInterest: number; initialCapital: number
  periods: number; timeline: { period: number; amount: number; interest: number }[]
}
export function calcCompound(
  principal: number, rate: number, periods: number,
  frequency: number, monthlyContribution: number
): CompoundResult {
  const r = rate / 100 / frequency
  let amount = principal
  const timeline: CompoundResult['timeline'] = []
  let totalContributions = principal
  for (let i = 1; i <= periods * frequency; i++) {
    amount = (amount + monthlyContribution) * (1 + r)
    totalContributions += monthlyContribution
    if (i % frequency === 0) {
      timeline.push({ period: i / frequency, amount, interest: amount - totalContributions })
    }
  }
  return { finalAmount: amount, totalInterest: amount - totalContributions, initialCapital: principal, periods }
}
