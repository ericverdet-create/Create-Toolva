import { ToolDefinition } from '@/lib/tools/registry';

export const calorieCalculatorTool: ToolDefinition = {
  id: 'calorie-calculator',
  slug: 'calculadora-calorias',
  name: 'Calculadora de Calorías',
  description: 'Calcula tus calorías diarias necesarias (TDEE) según tu edad, peso, altura y nivel de actividad física.',
  icon: '🔥',
  category: 'health',
  keywords: ['calorías', 'TDEE', 'metabolismo', 'dieta', 'adelgazar', 'peso', 'actividad física', 'kcal diarias'],
  tags: ['salud', 'calorías', 'dieta'],
  faq: [
    { question: '¿Cuántas calorías necesito al día para mantener mi peso?', answer: 'Depende de tu edad, sexo, peso, altura y actividad física. Una mujer adulta de 65 kg con actividad moderada necesita unas 2.000 kcal/día. Un hombre de 80 kg con actividad moderada, unas 2.500 kcal/día. Esta calculadora usa la fórmula Mifflin-St Jeor para darte tu dato exacto.' },
    { question: '¿Cuántas calorías debo comer para adelgazar?', answer: 'Para perder peso de forma saludable, necesitas un déficit calórico de 300-500 kcal/día respecto a tu gasto total (TDEE). Esto equivale a perder aproximadamente 0,3-0,5 kg por semana. No se recomienda bajar de 1.200 kcal/día en mujeres ni de 1.500 en hombres.' },
    { question: '¿Qué es el TDEE?', answer: 'El TDEE (Total Daily Energy Expenditure o Gasto Energético Total Diario) es el total de calorías que quemas en un día, incluyendo el metabolismo basal y la actividad física. Es el número de calorías que debes consumir para mantener tu peso actual.' },
    { question: '¿Las calorías son lo único importante para perder peso?', answer: 'El balance calórico es el factor principal, pero la calidad de los alimentos, la distribución de macronutrientes, el sueño y el estrés también influyen. Un déficit calórico con alimentos nutritivos es más sostenible y saludable que simplemente comer menos.' },
  ],
  component: () => import('./component').then(m => ({ default: m.default })),
};
