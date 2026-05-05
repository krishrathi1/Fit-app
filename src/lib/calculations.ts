// Calorie and macro calculations using Mifflin-St Jeor equation

export type Goal = 'weight_loss' | 'muscle_gain' | 'energy' | 'endurance';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Gender = 'male' | 'female';
export type Diet = 'keto' | 'vegan' | 'vegetarian' | 'paleo' | 'mediterranean' | 'balanced';

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

const GOAL_ADJUSTMENTS: Record<Goal, number> = {
  weight_loss: -500,
  muscle_gain: 300,
  energy: 200,
  endurance: 250,
};

const DIET_MACROS: Record<Diet, { protein: number; carbs: number; fats: number }> = {
  keto: { protein: 0.30, carbs: 0.05, fats: 0.65 },
  vegan: { protein: 0.15, carbs: 0.55, fats: 0.30 },
  vegetarian: { protein: 0.20, carbs: 0.50, fats: 0.30 },
  paleo: { protein: 0.30, carbs: 0.25, fats: 0.45 },
  mediterranean: { protein: 0.20, carbs: 0.45, fats: 0.35 },
  balanced: { protein: 0.30, carbs: 0.40, fats: 0.30 },
};

export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

export function calculateTargetCalories(
  weight: number,
  height: number,
  age: number,
  gender: Gender,
  activityLevel: ActivityLevel,
  goal: Goal
): number {
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];
  return Math.round(tdee + GOAL_ADJUSTMENTS[goal]);
}

export function calculateMacros(
  calories: number,
  diet: Diet
): { protein: number; carbs: number; fats: number } {
  const ratios = DIET_MACROS[diet];
  return {
    protein: Math.round((calories * ratios.protein) / 4),
    carbs: Math.round((calories * ratios.carbs) / 4),
    fats: Math.round((calories * ratios.fats) / 9),
  };
}

export function calculateWaterIntake(weight: number, activityLevel: ActivityLevel): number {
  const base = weight * 35; // ml per kg
  const activityBonus = { sedentary: 0, light: 250, moderate: 500, active: 750, very_active: 1000 };
  return Math.round(base + activityBonus[activityLevel]);
}
