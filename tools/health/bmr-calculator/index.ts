export type Sex = 'male' | 'female';
export type Formula = 'mifflin' | 'harris';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export const ACTIVITY_FACTORS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: 'Sedentario (poco o ningún ejercicio)',
  light: 'Ligero (1-3 días/semana)',
  moderate: 'Moderado (3-5 días/semana)',
  active: 'Activo (6-7 días/semana)',
  very_active: 'Muy activo (ejercicio intenso diario)',
};

export interface BmrResult {
  bmr: number;
  tdee: number;
  formula: Formula;
  weightLoss: number;
  weightGain: number;
}

export function calcBmr(
  weight: number, height: number, age: number,
  sex: Sex, formula: Formula, activity: ActivityLevel
): BmrResult {
  let bmr: number;
  if (formula === 'mifflin') {
    bmr = sex === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = sex === 'male'
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
  }
  const tdee = bmr * ACTIVITY_FACTORS[activity];
  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    formula,
    weightLoss: Math.round(tdee - 500),
    weightGain: Math.round(tdee + 300),
  };
}
