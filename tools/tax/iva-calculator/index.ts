export type IvaMode = 'base' | 'total';

export interface IvaResult {
  base: number;
  iva: number;
  total: number;
  rate: number;
}

export function calcIva(amount: number, rate: number, mode: IvaMode): IvaResult {
  if (mode === 'base') {
    const iva = amount * (rate / 100);
    return { base: amount, iva, total: amount + iva, rate };
  } else {
    const base = amount / (1 + rate / 100);
    const iva = amount - base;
    return { base, iva, total: amount, rate };
  }
}
