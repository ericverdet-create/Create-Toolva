export function calcFuel(distance: number, consumption: number): number {
  // consumption in L/100km, distance in km → liters needed
  return (distance * consumption) / 100
}
export function calcConsumption(liters: number, distance: number): number {
  if (distance === 0) return 0
  return (liters / distance) * 100
}
export function calcDistance(liters: number, consumption: number): number {
  if (consumption === 0) return 0
  return (liters / consumption) * 100
}
export function calcCost(liters: number, pricePerLiter: number): number {
  return liters * pricePerLiter
}
