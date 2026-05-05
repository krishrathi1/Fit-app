'use client';

import { motion } from 'framer-motion';
import { useAppStore, type MealEntry } from '@/lib/store';
import { CalorieRing, MacroBar, WaterTracker } from './CalorieRing';
import { COACHING_TIPS } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Utensils, Camera, Dumbbell, Droplets,
  Flame, TrendingUp, Clock, ChevronRight,
  Sparkles, Apple
} from 'lucide-react';

export function HomeDashboard() {
  const store = useAppStore();

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMeals = store.meals.filter(m => m.loggedAt === todayStr);
  
  const consumedCalories = todayMeals.reduce((sum, m) => sum + m.food.calories, 0);
  const consumedProtein = todayMeals.reduce((sum, m) => sum + m.food.protein, 0);
  const consumedCarbs = todayMeals.reduce((sum, m) => sum + m.food.carbs, 0);
  const consumedFats = todayMeals.reduce((sum, m) => sum + m.food.fats, 0);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const randomTip = COACHING_TIPS[Math.floor(Date.now() / 86400000) % COACHING_TIPS.length];

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{greeting()} 👋</h1>
          <p className="text-sm text-muted-foreground">Let&apos;s crush your goals today</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
          {String(store.weight).charAt(0)}
        </div>
      </div>

      {/* Calorie Ring & Macros */}
      <Card className="p-6 border-border bg-card">
        <div className="flex flex-col items-center gap-6">
          <CalorieRing consumed={consumedCalories} target={store.targetCalories} size={180} />
          <div className="w-full space-y-3">
            <MacroBar label="Protein" current={consumedProtein} target={store.targetProtein} color="#f97316" />
            <MacroBar label="Carbs" current={consumedCarbs} target={store.targetCarbs} color="#10b981" />
            <MacroBar label="Fats" current={consumedFats} target={store.targetFats} color="#8b5cf6" />
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Utensils, label: 'Log Meal', color: 'from-orange-500 to-red-500', action: () => { store.setSelectedMealType('lunch'); store.setNutritionSubScreen('add-food'); store.setDashboardTab('nutrition'); } },
          { icon: Camera, label: 'Scan Food', color: 'from-cyan-500 to-blue-500', action: () => { store.setNutritionSubScreen('barcode'); store.setDashboardTab('nutrition'); } },
          { icon: Dumbbell, label: 'Workout', color: 'from-emerald-500 to-cyan-500', action: () => store.setDashboardTab('fitness') },
          { icon: Droplets, label: 'Add Water', color: 'from-violet-500 to-purple-500', action: () => store.addWater(250) },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            onClick={action.action}
            className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:border-emerald/30 transition-all group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-sm">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Water Tracker */}
      <Card className="p-4 border-border bg-card">
        <WaterTracker current={store.waterIntake} target={store.targetWater} onAdd={(ml) => store.addWater(ml)} />
      </Card>

      {/* AI Coach Tip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4 border-border bg-gradient-to-r from-emerald/10 to-cyan/10 border-emerald/20 cursor-pointer" onClick={() => store.setDashboardTab('coach')}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold">AI Coach says</span>
                <span className="text-lg">{randomTip.icon}</span>
              </div>
              <p className="text-sm text-muted-foreground">{randomTip.text}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
          </div>
        </Card>
      </motion.div>

      {/* Today's Meals */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Today&apos;s Meals</h3>
          <button onClick={() => store.setDashboardTab('nutrition')} className="text-xs text-emerald font-medium hover:underline">
            View All →
          </button>
        </div>
        {todayMeals.length === 0 ? (
          <Card className="p-6 border-border bg-card text-center">
            <Apple className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No meals logged yet</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10"
              onClick={() => { store.setSelectedMealType('breakfast'); store.setNutritionSubScreen('add-food'); store.setDashboardTab('nutrition'); }}
            >
              Log Your First Meal
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {todayMeals.slice(0, 4).map((meal, i) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm ${
                  meal.mealType === 'breakfast' ? 'bg-orange-500/20 text-orange-400' :
                  meal.mealType === 'lunch' ? 'bg-emerald-500/20 text-emerald-400' :
                  meal.mealType === 'dinner' ? 'bg-violet-500/20 text-violet-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {meal.mealType === 'breakfast' ? '🌅' : meal.mealType === 'lunch' ? '☀️' : meal.mealType === 'dinner' ? '🌙' : '🍪'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{meal.food.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {meal.food.protein}g P · {meal.food.carbs}g C · {meal.food.fats}g F
                  </div>
                </div>
                <span className="text-sm font-semibold">{meal.food.calories}</span>
                <span className="text-xs text-muted-foreground">kcal</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Movement Strip */}
      <Card className="p-4 border-border bg-card">
        <h3 className="text-sm font-semibold mb-3">Daily Movement</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: '👣', value: '8,234', label: 'Steps' },
            { icon: '🔥', value: '412', label: 'Burned' },
            { icon: '⏱️', value: '42m', label: 'Active' },
            { icon: '❤️', value: '72', label: 'BPM' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-lg">{stat.icon}</span>
              <div className="text-sm font-bold mt-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
