import type { FoodItem, Workout } from './store';

// ─── Food Library ────────────────────────────────────────────────────
export const FOOD_LIBRARY: FoodItem[] = [
  // Breakfast
  { id: 'f1', name: 'Oatmeal with Berries', calories: 280, protein: 10, carbs: 48, fats: 6, servingSize: 1, servingUnit: 'bowl', category: 'breakfast' },
  { id: 'f2', name: 'Greek Yogurt Parfait', calories: 220, protein: 18, carbs: 28, fats: 5, servingSize: 1, servingUnit: 'cup', category: 'breakfast' },
  { id: 'f3', name: 'Scrambled Eggs (3)', calories: 240, protein: 20, carbs: 2, fats: 16, servingSize: 1, servingUnit: 'serving', category: 'breakfast' },
  { id: 'f4', name: 'Avocado Toast', calories: 310, protein: 8, carbs: 28, fats: 20, servingSize: 1, servingUnit: 'slice', category: 'breakfast' },
  { id: 'f5', name: 'Protein Smoothie', calories: 320, protein: 30, carbs: 38, fats: 4, servingSize: 1, servingUnit: 'glass', category: 'breakfast' },
  { id: 'f6', name: 'Banana Pancakes', calories: 350, protein: 12, carbs: 52, fats: 10, servingSize: 1, servingUnit: 'stack', category: 'breakfast' },
  
  // Lunch
  { id: 'f7', name: 'Grilled Chicken Salad', calories: 380, protein: 35, carbs: 18, fats: 18, servingSize: 1, servingUnit: 'bowl', category: 'lunch' },
  { id: 'f8', name: 'Quinoa Bowl', calories: 420, protein: 16, carbs: 58, fats: 14, servingSize: 1, servingUnit: 'bowl', category: 'lunch' },
  { id: 'f9', name: 'Turkey Wrap', calories: 340, protein: 28, carbs: 32, fats: 12, servingSize: 1, servingUnit: 'wrap', category: 'lunch' },
  { id: 'f10', name: 'Lentil Soup', calories: 280, protein: 18, carbs: 42, fats: 4, servingSize: 1, servingUnit: 'bowl', category: 'lunch' },
  { id: 'f11', name: 'Salmon Poke Bowl', calories: 480, protein: 32, carbs: 44, fats: 18, servingSize: 1, servingUnit: 'bowl', category: 'lunch' },
  
  // Dinner
  { id: 'f12', name: 'Grilled Salmon', calories: 420, protein: 38, carbs: 8, fats: 26, servingSize: 1, servingUnit: 'fillet', category: 'dinner' },
  { id: 'f13', name: 'Chicken Breast & Rice', calories: 450, protein: 40, carbs: 48, fats: 8, servingSize: 1, servingUnit: 'plate', category: 'dinner' },
  { id: 'f14', name: 'Beef Stir Fry', calories: 380, protein: 32, carbs: 24, fats: 16, servingSize: 1, servingUnit: 'bowl', category: 'dinner' },
  { id: 'f15', name: 'Pasta Primavera', calories: 400, protein: 14, carbs: 58, fats: 12, servingSize: 1, servingUnit: 'plate', category: 'dinner' },
  { id: 'f16', name: 'Shrimp Tacos', calories: 360, protein: 26, carbs: 34, fats: 14, servingSize: 1, servingUnit: 'serving', category: 'dinner' },
  
  // Snacks
  { id: 'f17', name: 'Protein Bar', calories: 210, protein: 20, carbs: 22, fats: 8, servingSize: 1, servingUnit: 'bar', category: 'snack' },
  { id: 'f18', name: 'Mixed Nuts', calories: 170, protein: 6, carbs: 6, fats: 14, servingSize: 1, servingUnit: 'handful', category: 'snack' },
  { id: 'f19', name: 'Apple with PB', calories: 200, protein: 6, carbs: 28, fats: 10, servingSize: 1, servingUnit: 'serving', category: 'snack' },
  { id: 'f20', name: 'Rice Cakes', calories: 120, protein: 2, carbs: 24, fats: 1, servingSize: 2, servingUnit: 'cakes', category: 'snack' },
  { id: 'f21', name: 'Cottage Cheese', calories: 160, protein: 22, carbs: 8, fats: 4, servingSize: 1, servingUnit: 'cup', category: 'snack' },
  { id: 'f22', name: 'Dark Chocolate', calories: 170, protein: 2, carbs: 14, fats: 12, servingSize: 1, servingUnit: 'square', category: 'snack' },
  
  // Fruits
  { id: 'f23', name: 'Banana', calories: 105, protein: 1, carbs: 27, fats: 0, servingSize: 1, servingUnit: 'medium', category: 'fruit' },
  { id: 'f24', name: 'Blueberries', calories: 85, protein: 1, carbs: 21, fats: 0, servingSize: 1, servingUnit: 'cup', category: 'fruit' },
  { id: 'f25', name: 'Orange', calories: 62, protein: 1, carbs: 15, fats: 0, servingSize: 1, servingUnit: 'medium', category: 'fruit' },
];

// ─── Workouts ────────────────────────────────────────────────────────
export const WORKOUTS: Workout[] = [
  {
    id: 'w1',
    name: 'Heavy Legs',
    type: 'strength',
    estimatedDuration: 55,
    caloriesBurned: 420,
    exercises: [
      { id: 'e1', name: 'Barbell Squats', muscleGroup: 'Quads', restSeconds: 120, sets: [{ weight: 80, reps: 8, completed: false }, { weight: 90, reps: 6, completed: false }, { weight: 95, reps: 5, completed: false }, { weight: 100, reps: 4, completed: false }] },
      { id: 'e2', name: 'Romanian Deadlifts', muscleGroup: 'Hamstrings', restSeconds: 90, sets: [{ weight: 70, reps: 10, completed: false }, { weight: 75, reps: 8, completed: false }, { weight: 80, reps: 8, completed: false }] },
      { id: 'e3', name: 'Leg Press', muscleGroup: 'Quads', restSeconds: 90, sets: [{ weight: 120, reps: 12, completed: false }, { weight: 140, reps: 10, completed: false }, { weight: 160, reps: 8, completed: false }] },
      { id: 'e4', name: 'Calf Raises', muscleGroup: 'Calves', restSeconds: 60, sets: [{ weight: 60, reps: 15, completed: false }, { weight: 70, reps: 12, completed: false }, { weight: 80, reps: 10, completed: false }] },
    ],
  },
  {
    id: 'w2',
    name: 'Upper Body Power',
    type: 'strength',
    estimatedDuration: 50,
    caloriesBurned: 350,
    exercises: [
      { id: 'e5', name: 'Bench Press', muscleGroup: 'Chest', restSeconds: 120, sets: [{ weight: 70, reps: 8, completed: false }, { weight: 75, reps: 6, completed: false }, { weight: 80, reps: 5, completed: false }] },
      { id: 'e6', name: 'Overhead Press', muscleGroup: 'Shoulders', restSeconds: 90, sets: [{ weight: 45, reps: 10, completed: false }, { weight: 50, reps: 8, completed: false }, { weight: 50, reps: 8, completed: false }] },
      { id: 'e7', name: 'Barbell Rows', muscleGroup: 'Back', restSeconds: 90, sets: [{ weight: 60, reps: 10, completed: false }, { weight: 65, reps: 8, completed: false }, { weight: 70, reps: 6, completed: false }] },
      { id: 'e8', name: 'Pull-ups', muscleGroup: 'Back', restSeconds: 90, sets: [{ weight: 0, reps: 8, completed: false }, { weight: 0, reps: 6, completed: false }, { weight: 0, reps: 5, completed: false }] },
    ],
  },
  {
    id: 'w3',
    name: 'HIIT Burn',
    type: 'cardio',
    estimatedDuration: 30,
    caloriesBurned: 380,
    exercises: [
      { id: 'e9', name: 'Burpees', muscleGroup: 'Full Body', restSeconds: 30, sets: [{ weight: 0, reps: 15, completed: false }, { weight: 0, reps: 12, completed: false }, { weight: 0, reps: 10, completed: false }] },
      { id: 'e10', name: 'Mountain Climbers', muscleGroup: 'Core', restSeconds: 20, sets: [{ weight: 0, reps: 30, completed: false }, { weight: 0, reps: 25, completed: false }, { weight: 0, reps: 20, completed: false }] },
      { id: 'e11', name: 'Jump Squats', muscleGroup: 'Legs', restSeconds: 30, sets: [{ weight: 0, reps: 20, completed: false }, { weight: 0, reps: 15, completed: false }, { weight: 0, reps: 12, completed: false }] },
      { id: 'e12', name: 'Kettlebell Swings', muscleGroup: 'Full Body', restSeconds: 30, sets: [{ weight: 16, reps: 20, completed: false }, { weight: 16, reps: 15, completed: false }, { weight: 16, reps: 12, completed: false }] },
    ],
  },
  {
    id: 'w4',
    name: 'Core & Flexibility',
    type: 'recovery',
    estimatedDuration: 35,
    caloriesBurned: 180,
    exercises: [
      { id: 'e13', name: 'Plank Hold', muscleGroup: 'Core', restSeconds: 45, sets: [{ weight: 0, reps: 60, completed: false }, { weight: 0, reps: 45, completed: false }, { weight: 0, reps: 30, completed: false }] },
      { id: 'e14', name: 'Russian Twists', muscleGroup: 'Core', restSeconds: 30, sets: [{ weight: 8, reps: 20, completed: false }, { weight: 8, reps: 18, completed: false }, { weight: 8, reps: 15, completed: false }] },
      { id: 'e15', name: 'Leg Raises', muscleGroup: 'Core', restSeconds: 30, sets: [{ weight: 0, reps: 15, completed: false }, { weight: 0, reps: 12, completed: false }, { weight: 0, reps: 10, completed: false }] },
    ],
  },
];

// ─── Alternative Exercises ───────────────────────────────────────────
export const ALTERNATIVE_EXERCISES: Record<string, { id: string; name: string; reason: string }[]> = {
  'e1': [
    { id: 'alt1', name: 'Goblet Squats', reason: 'Less spinal load' },
    { id: 'alt2', name: 'Leg Extensions', reason: 'Knee-friendly isolation' },
    { id: 'alt3', name: 'Hack Squats', reason: 'Different quad emphasis' },
  ],
  'e2': [
    { id: 'alt4', name: 'Leg Curls', reason: 'Hamstring isolation' },
    { id: 'alt5', name: 'Glute Bridges', reason: 'Lower back friendly' },
  ],
  'e5': [
    { id: 'alt6', name: 'Dumbbell Press', reason: 'Shoulder-friendly' },
    { id: 'alt7', name: 'Cable Flyes', reason: 'Chest isolation' },
  ],
};

// ─── Insight Data ────────────────────────────────────────────────────
export const PROTEIN_TREND_DATA = [
  { day: 'Mon', protein: 142, target: 150 },
  { day: 'Tue', protein: 128, target: 150 },
  { day: 'Wed', protein: 165, target: 150 },
  { day: 'Thu', protein: 138, target: 150 },
  { day: 'Fri', protein: 155, target: 150 },
  { day: 'Sat', protein: 120, target: 150 },
  { day: 'Sun', protein: 148, target: 150 },
];

export const SLEEP_CALORIES_DATA = [
  { day: 'W1', sleep: 7.2, calories: 2100 },
  { day: 'W2', sleep: 6.5, calories: 1850 },
  { day: 'W3', sleep: 8.0, calories: 2300 },
  { day: 'W4', sleep: 7.0, calories: 2000 },
  { day: 'W5', sleep: 6.8, calories: 1920 },
  { day: 'W6', sleep: 7.5, calories: 2150 },
  { day: 'W7', sleep: 8.2, calories: 2400 },
  { day: 'W8', sleep: 6.2, calories: 1780 },
  { day: 'W9', sleep: 7.8, calories: 2250 },
  { day: 'W10', sleep: 7.0, calories: 2050 },
  { day: 'W11', sleep: 8.5, calories: 2500 },
  { day: 'W12', sleep: 6.0, calories: 1700 },
  { day: 'W13', sleep: 7.3, calories: 2100 },
  { day: 'W14', sleep: 7.6, calories: 2200 },
];

export const WEEKLY_CALORIES_DATA = [
  { day: 'Mon', calories: 2100, target: 2000 },
  { day: 'Tue', calories: 1850, target: 2000 },
  { day: 'Wed', calories: 2300, target: 2000 },
  { day: 'Thu', calories: 1920, target: 2000 },
  { day: 'Fri', calories: 2150, target: 2000 },
  { day: 'Sat', calories: 1780, target: 2000 },
  { day: 'Sun', calories: 2050, target: 2000 },
];

// ─── Community Data ──────────────────────────────────────────────────
export const LEADERBOARD = [
  { rank: 1, name: 'Sarah M.', points: 2450, avatar: '🥇', streak: 28 },
  { rank: 2, name: 'Alex K.', points: 2380, avatar: '🥈', streak: 21 },
  { rank: 3, name: 'Jordan P.', points: 2200, avatar: '🥉', streak: 19 },
  { rank: 4, name: 'Taylor R.', points: 2050, avatar: '💪', streak: 15 },
  { rank: 5, name: 'Morgan L.', points: 1890, avatar: '🔥', streak: 12 },
];

export const CHALLENGES = [
  { id: 'c1', title: '10K Steps Daily', participants: 1243, daysLeft: 5, progress: 72, icon: '🚶' },
  { id: 'c2', title: 'Protein First', participants: 876, daysLeft: 12, progress: 45, icon: '🥩' },
  { id: 'c3', title: 'No Sugar Week', participants: 2100, daysLeft: 3, progress: 85, icon: '🚫' },
  { id: 'c4', title: 'Morning Workout', participants: 654, daysLeft: 20, progress: 30, icon: '🌅' },
];

export const FEED_POSTS = [
  { id: 'p1', author: 'Sarah M.', time: '2h ago', content: 'Hit a new PR on squats today! 🎉 100kg for 5 reps. Consistency is key!', likes: 42, comments: 8, liked: false },
  { id: 'p2', author: 'Alex K.', time: '4h ago', content: 'Week 4 of the program and the progress is real. Down 3kg while getting stronger 💪', likes: 38, comments: 12, liked: true },
  { id: 'p3', author: 'Jordan P.', time: '6h ago', content: 'Tried the new HIIT workout - absolutely destroyed but feeling amazing! Who else is doing the challenge?', likes: 27, comments: 5, liked: false },
  { id: 'p4', author: 'Taylor R.', time: '1d ago', content: 'Meal prep Sunday 🥗 Whole week of nutrition locked in. Consistency > perfection.', likes: 55, comments: 15, liked: true },
];

// ─── Coaching Tips ───────────────────────────────────────────────────
export const COACHING_TIPS = [
  { icon: '💡', title: 'Protein Timing', text: 'Try spacing protein intake across 4 meals for better absorption.' },
  { icon: '🔥', title: 'Metabolic Boost', text: 'Your metabolic rate peaks between 2-4 PM. Schedule intense workouts then.' },
  { icon: '💧', title: 'Hydration Check', text: 'You\'re 400ml short of your water goal. Drink a glass now!' },
  { icon: '😴', title: 'Recovery Night', text: '7+ hours of sleep tonight will boost your gains by 30%.' },
];

// ─── Quick Prompts for AI Coach ──────────────────────────────────────
export const QUICK_PROMPTS = [
  'What should I eat for lunch?',
  'How can I improve my sleep?',
  'Best exercises for core?',
  'Help me with meal prep',
  'How to break a plateau?',
  'Recovery tips after workout',
];
