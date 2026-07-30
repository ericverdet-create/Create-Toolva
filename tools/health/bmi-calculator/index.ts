export interface BMIResult {
  bmi: number
  category: string
  color: string
  bgColor: string
  description: string
  idealMin: number
  idealMax: number
}

export function calcBMI(weightKg: number, heightCm: number): BMIResult {
  const h = heightCm / 100
  const bmi = weightKg / (h * h)
  const idealMin = Math.round(18.5 * h * h * 10) / 10
  const idealMax = Math.round(24.9 * h * h * 10) / 10

  if (bmi < 18.5) return { bmi, category: 'Bajo peso', color: 'text-blue-600', bgColor: 'bg-blue-50 border-blue-100', description: 'Tu peso está por debajo del rango saludable.', idealMin, idealMax }
  if (bmi < 25)   return { bmi, category: 'Peso normal', color: 'text-green-600', bgColor: 'bg-green-50 border-green-100', description: 'Tu peso está dentro del rango saludable. ¡Bien!', idealMin, idealMax }
  if (bmi < 30)   return { bmi, category: 'Sobrepeso', color: 'text-yellow-600', bgColor: 'bg-yellow-50 border-yellow-100', description: 'Tu peso está ligeramente por encima del rango saludable.', idealMin, idealMax }
  return { bmi, category: 'Obesidad', color: 'text-red-600', bgColor: 'bg-red-50 border-red-100', description: 'Tu peso está significativamente por encima del rango saludable.', idealMin, idealMax }
}
