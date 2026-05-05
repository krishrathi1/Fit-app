import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Screen = 
  | 'welcome' | 'goals' | 'profile' | 'activity' | 'diet' | 'result'
  | 'dashboard';

export type DashboardTab = 'home' | 'nutrition' | 'fitness' | 'insights' | 'coach' | 'community' | 'profile';

export type NutritionSubScreen = 'main' | 'add-food' | 'food-detail' | 'barcode' | 'recognition' | 'weekly-report';
export type FitnessSubScreen = 'main' | 'workout-detail' | 'exercise-swap';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: number;
  servingUnit: string;
  category?: string;
  emoji?: string;
}

export interface MealEntry {
  id: string;
  food: FoodItem;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  loggedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ExerciseSet {
  weight: number;
  reps: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  restSeconds: number;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  name: string;
  type: string;
  exercises: Exercise[];
  estimatedDuration: number;
  caloriesBurned: number;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface AppState {
  // Navigation
  screen: Screen;
  dashboardTab: DashboardTab;
  nutritionSubScreen: NutritionSubScreen;
  fitnessSubScreen: FitnessSubScreen;
  
  // Onboarding
  goal: string;
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: string;
  diet: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  targetWater: number;
  onboarded: boolean;
  
  // Dashboard data
  meals: MealEntry[];
  waterIntake: number;
  currentWorkout: Workout | null;
  workoutTimer: number;
  isWorkoutActive: boolean;
  
  // Streaks & Gamification
  streak: number;
  longestStreak: number;
  xp: number;
  level: number;
  achievements: Achievement[];
  completedWorkouts: number;
  totalCaloriesBurned: number;
  
  // AI Coach
  chatMessages: ChatMessage[];
  isChatLoading: boolean;
  
  // Selected food for detail view
  selectedFood: FoodItem | null;
  selectedMealType: string;

  // Actions
  setScreen: (screen: Screen) => void;
  setDashboardTab: (tab: DashboardTab) => void;
  setNutritionSubScreen: (screen: NutritionSubScreen) => void;
  setFitnessSubScreen: (screen: FitnessSubScreen) => void;
  
  setGoal: (goal: string) => void;
  setGender: (gender: string) => void;
  setAge: (age: number) => void;
  setWeight: (weight: number) => void;
  setHeight: (height: number) => void;
  setActivityLevel: (level: string) => void;
  setDiet: (diet: string) => void;
  setOnboardingResults: (calories: number, protein: number, carbs: number, fats: number, water: number) => void;
  completeOnboarding: () => void;
  
  addMeal: (meal: MealEntry) => void;
  removeMeal: (id: string) => void;
  addWater: (ml: number) => void;
  resetWater: () => void;
  
  setCurrentWorkout: (workout: Workout | null) => void;
  setWorkoutTimer: (seconds: number) => void;
  setIsWorkoutActive: (active: boolean) => void;
  toggleSetComplete: (exerciseId: string, setIndex: number) => void;
  updateSetWeight: (exerciseId: string, setIndex: number, weight: number) => void;
  updateSetReps: (exerciseId: string, setIndex: number, reps: number) => void;
  completeWorkout: (caloriesBurned: number) => void;
  
  addXp: (amount: number) => void;
  unlockAchievement: (id: string) => void;
  
  addChatMessage: (message: ChatMessage) => void;
  setIsChatLoading: (loading: boolean) => void;
  clearChat: () => void;
  
  setSelectedFood: (food: FoodItem | null) => void;
  setSelectedMealType: (mealType: string) => void;
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_meal', title: 'First Bite', desc: 'Log your first meal', icon: '🍽️', unlocked: false },
  { id: 'first_workout', title: 'First Rep', desc: 'Complete your first workout', icon: '🏋️', unlocked: false },
  { id: 'streak_3', title: 'On Fire', desc: '3-day streak', icon: '🔥', unlocked: false },
  { id: 'streak_7', title: 'Unstoppable', desc: '7-day streak', icon: '⚡', unlocked: false },
  { id: 'streak_30', title: 'Machine', desc: '30-day streak', icon: '🤖', unlocked: false },
  { id: 'protein_hit', title: 'Protein Pro', desc: 'Hit protein target 5 days', icon: '🥩', unlocked: false },
  { id: 'water_goal', title: 'Hydration Hero', desc: 'Hit water goal 3 days', icon: '💧', unlocked: false },
  { id: 'calories_5', title: 'Calorie King', desc: 'Hit calorie target 5 days', icon: '👑', unlocked: false },
  { id: 'workout_10', title: 'Iron Will', desc: 'Complete 10 workouts', icon: '💪', unlocked: false },
  { id: 'coach_chat', title: 'Coach Buddy', desc: 'Chat with AI Coach', icon: '🤖', unlocked: false },
  { id: 'level_5', title: 'Rising Star', desc: 'Reach Level 5', icon: '⭐', unlocked: false },
  { id: 'level_10', title: 'Fitness Legend', desc: 'Reach Level 10', icon: '🌟', unlocked: false },
];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      screen: 'welcome',
      dashboardTab: 'home',
      nutritionSubScreen: 'main',
      fitnessSubScreen: 'main',
      
      // Onboarding defaults
      goal: 'weight_loss',
      gender: 'male',
      age: 25,
      weight: 70,
      height: 170,
      activityLevel: 'moderate',
      diet: 'balanced',
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 200,
      targetFats: 65,
      targetWater: 2800,
      onboarded: false,
      
      // Dashboard data
      meals: [],
      waterIntake: 0,
      currentWorkout: null,
      workoutTimer: 0,
      isWorkoutActive: false,
      
      // Streaks & Gamification
      streak: 0,
      longestStreak: 0,
      xp: 0,
      level: 1,
      achievements: DEFAULT_ACHIEVEMENTS,
      completedWorkouts: 0,
      totalCaloriesBurned: 0,
      
      // AI Coach
      chatMessages: [],
      isChatLoading: false,
      
      // Selected
      selectedFood: null,
      selectedMealType: 'breakfast',
      
      // Navigation actions
      setScreen: (screen) => set({ screen }),
      setDashboardTab: (tab) => set({ dashboardTab: tab }),
      setNutritionSubScreen: (screen) => set({ nutritionSubScreen: screen }),
      setFitnessSubScreen: (screen) => set({ fitnessSubScreen: screen }),
      
      // Onboarding actions
      setGoal: (goal) => set({ goal }),
      setGender: (gender) => set({ gender }),
      setAge: (age) => set({ age }),
      setWeight: (weight) => set({ weight }),
      setHeight: (height) => set({ height }),
      setActivityLevel: (level) => set({ activityLevel: level }),
      setDiet: (diet) => set({ diet }),
      setOnboardingResults: (calories, protein, carbs, fats, water) => set({
        targetCalories: calories,
        targetProtein: protein,
        targetCarbs: carbs,
        targetFats: fats,
        targetWater: water,
      }),
      completeOnboarding: () => set({ onboarded: true, screen: 'dashboard', streak: 1 }),
      
      // Meal actions
      addMeal: (meal) => set((state) => {
        const newMeals = [...state.meals, meal];
        const unlocked = [...state.achievements];
        if (state.meals.length === 0) {
          const idx = unlocked.findIndex(a => a.id === 'first_meal');
          if (idx >= 0 && !unlocked[idx].unlocked) unlocked[idx] = { ...unlocked[idx], unlocked: true, unlockedAt: Date.now() };
        }
        return { meals: newMeals, achievements: unlocked, xp: state.xp + 10 };
      }),
      removeMeal: (id) => set((state) => ({ meals: state.meals.filter(m => m.id !== id) })),
      addWater: (ml) => set((state) => ({ waterIntake: state.waterIntake + ml, xp: state.xp + 5 })),
      resetWater: () => set({ waterIntake: 0 }),
      
      // Workout actions
      setCurrentWorkout: (workout) => set({ currentWorkout: workout }),
      setWorkoutTimer: (seconds) => set({ workoutTimer: seconds }),
      setIsWorkoutActive: (active) => set({ isWorkoutActive: active }),
      toggleSetComplete: (exerciseId, setIndex) => set((state) => {
        if (!state.currentWorkout) return state;
        const updatedExercises = state.currentWorkout.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          const updatedSets = ex.sets.map((s, i) =>
            i === setIndex ? { ...s, completed: !s.completed } : s
          );
          return { ...ex, sets: updatedSets };
        });
        return { currentWorkout: { ...state.currentWorkout, exercises: updatedExercises } };
      }),
      updateSetWeight: (exerciseId, setIndex, weight) => set((state) => {
        if (!state.currentWorkout) return state;
        const updatedExercises = state.currentWorkout.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          const updatedSets = ex.sets.map((s, i) =>
            i === setIndex ? { ...s, weight } : s
          );
          return { ...ex, sets: updatedSets };
        });
        return { currentWorkout: { ...state.currentWorkout, exercises: updatedExercises } };
      }),
      updateSetReps: (exerciseId, setIndex, reps) => set((state) => {
        if (!state.currentWorkout) return state;
        const updatedExercises = state.currentWorkout.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          const updatedSets = ex.sets.map((s, i) =>
            i === setIndex ? { ...s, reps } : s
          );
          return { ...ex, sets: updatedSets };
        });
        return { currentWorkout: { ...state.currentWorkout, exercises: updatedExercises } };
      }),
      completeWorkout: (caloriesBurned) => set((state) => {
        const newCompleted = state.completedWorkouts + 1;
        const newTotal = state.totalCaloriesBurned + caloriesBurned;
        const unlocked = [...state.achievements];
        if (newCompleted === 1) {
          const idx = unlocked.findIndex(a => a.id === 'first_workout');
          if (idx >= 0 && !unlocked[idx].unlocked) unlocked[idx] = { ...unlocked[idx], unlocked: true, unlockedAt: Date.now() };
        }
        if (newCompleted >= 10) {
          const idx = unlocked.findIndex(a => a.id === 'workout_10');
          if (idx >= 0 && !unlocked[idx].unlocked) unlocked[idx] = { ...unlocked[idx], unlocked: true, unlockedAt: Date.now() };
        }
        const newXp = state.xp + 50;
        const newLevel = Math.floor(newXp / 200) + 1;
        if (newLevel >= 5) {
          const idx = unlocked.findIndex(a => a.id === 'level_5');
          if (idx >= 0 && !unlocked[idx].unlocked) unlocked[idx] = { ...unlocked[idx], unlocked: true, unlockedAt: Date.now() };
        }
        return { 
          completedWorkouts: newCompleted, 
          totalCaloriesBurned: newTotal, 
          xp: newXp, 
          level: newLevel,
          achievements: unlocked,
          currentWorkout: null 
        };
      }),
      
      // Gamification
      addXp: (amount) => set((state) => {
        const newXp = state.xp + amount;
        const newLevel = Math.floor(newXp / 200) + 1;
        return { xp: newXp, level: newLevel };
      }),
      unlockAchievement: (id) => set((state) => {
        const unlocked = state.achievements.map(a => 
          a.id === id && !a.unlocked ? { ...a, unlocked: true, unlockedAt: Date.now() } : a
        );
        return { achievements: unlocked };
      }),
      
      // Chat actions
      addChatMessage: (message) => set((state) => {
        const unlocked = [...state.achievements];
        if (state.chatMessages.length === 0) {
          const idx = unlocked.findIndex(a => a.id === 'coach_chat');
          if (idx >= 0 && !unlocked[idx].unlocked) unlocked[idx] = { ...unlocked[idx], unlocked: true, unlockedAt: Date.now() };
        }
        return { chatMessages: [...state.chatMessages, message], achievements: unlocked };
      }),
      setIsChatLoading: (loading) => set({ isChatLoading: loading }),
      clearChat: () => set({ chatMessages: [] }),
      
      // Selected food
      setSelectedFood: (food) => set({ selectedFood: food }),
      setSelectedMealType: (mealType) => set({ selectedMealType: mealType }),
    }),
    {
      name: 'fitapp-storage',
      partialize: (state) => ({
        screen: state.screen,
        goal: state.goal,
        gender: state.gender,
        age: state.age,
        weight: state.weight,
        height: state.height,
        activityLevel: state.activityLevel,
        diet: state.diet,
        targetCalories: state.targetCalories,
        targetProtein: state.targetProtein,
        targetCarbs: state.targetCarbs,
        targetFats: state.targetFats,
        targetWater: state.targetWater,
        onboarded: state.onboarded,
        meals: state.meals,
        waterIntake: state.waterIntake,
        chatMessages: state.chatMessages,
        streak: state.streak,
        longestStreak: state.longestStreak,
        xp: state.xp,
        level: state.level,
        achievements: state.achievements,
        completedWorkouts: state.completedWorkouts,
        totalCaloriesBurned: state.totalCaloriesBurned,
      }),
    }
  )
);
