export const EU_RATES: Record<string, { country: string; std: number; red?: number }> = {
  ES: { country: 'España',      std: 21, red: 10 },
  DE: { country: 'Alemania',    std: 19, red: 7 },
  FR: { country: 'Francia',     std: 20, red: 5.5 },
  IT: { country: 'Italia',      std: 22, red: 10 },
  PT: { country: 'Portugal',    std: 23, red: 6 },
  NL: { country: 'Países Bajos',std: 21, red: 9 },
  BE: { country: 'Bélgica',     std: 21, red: 6 },
  PL: { country: 'Polonia',     std: 23, red: 8 },
  SE: { country: 'Suecia',      std: 25, red: 12 },
  DK: { country: 'Dinamarca',   std: 25 },
  AT: { country: 'Austria',     std: 20, red: 10 },
  IE: { country: 'Irlanda',     std: 23, red: 13.5 },
  RO: { country: 'Rumanía',     std: 19, red: 9 },
  HU: { country: 'Hungría',     std: 27, red: 18 },
  CZ: { country: 'Chequia',     std: 21, red: 12 },
  GR: { country: 'Grecia',      std: 24, red: 13 },
  FI: { country: 'Finlandia',   std: 24, red: 14 },
}

export function calcVat(base: number, rate: number) {
  const vat = base * rate / 100
  return { base, vat, total: base + vat, rate }
}

export function fmt(n: number) {
  return n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
