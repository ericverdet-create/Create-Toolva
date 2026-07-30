const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS   = '0123456789'
const SYMBOLS   = '!@#$%^&*()_+-=[]{}|;:,.<>?'

export interface Options {
  length: number
  lowercase: boolean
  uppercase: boolean
  numbers: boolean
  symbols: boolean
}

export function generate(opts: Options): string {
  let chars = ''
  if (opts.lowercase) chars += LOWERCASE
  if (opts.uppercase) chars += UPPERCASE
  if (opts.numbers)   chars += NUMBERS
  if (opts.symbols)   chars += SYMBOLS
  if (!chars) return ''

  const arr = new Uint32Array(opts.length)
  crypto.getRandomValues(arr)
  return Array.from(arr).map(n => chars[n % chars.length]).join('')
}

export function strength(pwd: string): { label: string; color: string; pct: number } {
  let score = 0
  if (pwd.length >= 8)  score++
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[a-z]/.test(pwd)) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++
  if (score <= 2) return { label: 'Débil', color: 'bg-red-500', pct: 25 }
  if (score <= 4) return { label: 'Media', color: 'bg-yellow-500', pct: 50 }
  if (score <= 5) return { label: 'Fuerte', color: 'bg-blue-500', pct: 75 }
  return { label: 'Muy fuerte', color: 'bg-green-500', pct: 100 }
}
