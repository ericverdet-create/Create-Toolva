const VALS: [string, number][] = [
  ['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],
  ['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]
]
export function toRoman(n: number): string {
  if (n < 1 || n > 3999) return ''
  let result = '', num = n
  for (const [s, v] of VALS) { while (num >= v) { result += s; num -= v } }
  return result
}
export function fromRoman(s: string): number {
  const map: Record<string, number> = { I:1, V:5, X:10, L:50, C:100, D:500, M:1000 }
  const str = s.toUpperCase().trim()
  let result = 0
  for (let i = 0; i < str.length; i++) {
    const cur = map[str[i]] ?? 0
    const next = map[str[i+1]] ?? 0
    if (next > cur) { result -= cur } else { result += cur }
  }
  return result
}
export function isValidRoman(s: string): boolean {
  return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i.test(s.trim())
}
