export interface StatsResult {
  count: number; sum: number; mean: number; median: number
  mode: number[]; min: number; max: number; range: number
  variance: number; stddev: number
}
export function calcStats(nums: number[]): StatsResult | null {
  if (nums.length === 0) return null
  const sorted = [...nums].sort((a, b) => a - b)
  const count = nums.length
  const sum = nums.reduce((a, b) => a + b, 0)
  const mean = sum / count
  const median = count % 2 === 0
    ? (sorted[count/2 - 1] + sorted[count/2]) / 2
    : sorted[Math.floor(count/2)]
  const freq: Record<number, number> = {}
  nums.forEach(n => { freq[n] = (freq[n] || 0) + 1 })
  const maxFreq = Math.max(...Object.values(freq))
  const mode = maxFreq > 1 ? Object.keys(freq).filter(k => freq[+k] === maxFreq).map(Number) : []
  const variance = nums.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / count
  const stddev = Math.sqrt(variance)
  return { count, sum, mean, median, mode, min: sorted[0], max: sorted[count-1], range: sorted[count-1] - sorted[0], variance, stddev }
}
export function parseNumbers(input: string): number[] {
  return input.split(/[,;\s]+/).map(s => parseFloat(s.replace(',', '.'))).filter(n => !isNaN(n))
}
