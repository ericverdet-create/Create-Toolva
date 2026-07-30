export function calcFinalPrice(original: number, discounts: number[]): {
  prices: number[]; totalDiscount: number; savings: number
} {
  const prices: number[] = [original]
  let current = original
  for (const d of discounts) {
    current = current * (1 - d / 100)
    prices.push(current)
  }
  const totalDiscount = ((original - current) / original) * 100
  return { prices, totalDiscount, savings: original - current }
}
