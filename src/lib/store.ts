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
  
  addChatMessage: (message: ChatMessage) => void;
  setIsChatLoading: (loading: boolean) => void;
  clearChat: () => void;
  
  setSelectedFood: (food: FoodItem | null) => void;
  setSelectedMealType: (mealType: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
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
      completeOnboarding: () => set({ onboarded: true, screen: 'dashboard' }),
      
      // Meal actions
      addMeal: (meal) => set((state) => ({ meals: [...state.meals, meal] })),
      removeMeal: (id) => set((state) => ({ meals: state.meals.filter(m => m.id !== id) })),
      addWater: (ml) => set((state) => ({ waterIntake: state.waterIntake + ml })),
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
      
      // Chat actions
      addChatMessage: (message) => set((state) => ({ chatMessages: [...state.chatMessages, message] })),
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
      }),
    }
  )
);
