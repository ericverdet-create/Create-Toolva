export interface TipResult {
  tipAmount: number; totalAmount: number; perPerson: number; tipPerPerson: number
}
export function calcTip(bill: number, tipPct: number, people: number): TipResult {
  const tipAmount = bill * tipPct / 100
  const totalAmount = bill + tipAmount
  const perPerson = totalAmount / (people || 1)
  const tipPerPerson = tipAmount / (people || 1)
  return { tipAmount, totalAmount, perPerson, tipPerPerson }
}
