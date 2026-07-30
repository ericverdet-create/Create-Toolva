export const CURRENCIES: Record<string, { label: string; symbol: string; toEur: number }> = {
  EUR: { label: 'Euro (EUR)', symbol: '€', toEur: 1 },
  USD: { label: 'Dolar americano (USD)', symbol: '$', toEur: 0.922 },
  GBP: { label: 'Libra esterlina (GBP)', symbol: 'GBP', toEur: 1.175 },
  JPY: { label: 'Yen japones (JPY)', symbol: 'JPY', toEur: 0.0062 },
  CHF: { label: 'Franco suizo (CHF)', symbol: 'Fr', toEur: 1.035 },
  CAD: { label: 'Dolar canadiense (CAD)', symbol: 'CAD', toEur: 0.685 },
  AUD: { label: 'Dolar australiano (AUD)', symbol: 'AUD', toEur: 0.602 },
  CNY: { label: 'Yuan chino (CNY)', symbol: 'CNY', toEur: 0.128 },
  MXN: { label: 'Peso mexicano (MXN)', symbol: 'MXN', toEur: 0.048 },
  BRL: { label: 'Real brasileno (BRL)', symbol: 'BRL', toEur: 0.170 },
  INR: { label: 'Rupia india (INR)', symbol: 'INR', toEur: 0.011 },
  KRW: { label: 'Won surcoreano (KRW)', symbol: 'KRW', toEur: 0.00067 },
  NOK: { label: 'Corona noruega (NOK)', symbol: 'kr', toEur: 0.087 },
  SEK: { label: 'Corona sueca (SEK)', symbol: 'kr', toEur: 0.088 },
  DKK: { label: 'Corona danesa (DKK)', symbol: 'kr', toEur: 0.134 },
  PLN: { label: 'Zloty polaco (PLN)', symbol: 'PLN', toEur: 0.235 },
  TRY: { label: 'Lira turca (TRY)', symbol: 'TRY', toEur: 0.027 },
}
export function convert(v: number, from: string, to: string): number {
  return v * CURRENCIES[from].toEur / CURRENCIES[to].toEur
}
export function fmt(n: number): string {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
}
