'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type MealEntry, type FoodItem } from '@/lib/store';
import { FOOD_LIBRARY, WEEKLY_CALORIES_DATA } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MacroBar } from './CalorieRing';
import {
  Search, Plus, ChevronLeft, ChevronRight, X,
  ScanBarcode, Utensils, Apple, Coffee, Moon, Cookie,
  Check, ArrowLeft, Camera
} from 'lucide-react';

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast', icon: Coffee, color: 'text-orange-400' },
  { id: 'lunch', label: 'Lunch', icon: Utensils, color: 'text-emerald-400' },
  { id: 'dinner', label: 'Dinner', icon: Moon, color: 'text-violet-400' },
  { id: 'snack', label: 'Snack', icon: Cookie, color: 'text-cyan-400' },
];

export function NutritionPage() {
  const store = useAppStore();

  if (store.nutritionSubScreen === 'add-food') {
    return <AddFoodScreen />;
  }
  if (store.nutritionSubScreen === 'food-detail') {
    return <FoodDetailScreen />;
  }
  if (store.nutritionSubScreen === 'barcode') {
    return <BarcodeScannerScreen />;
  }
  if (store.nutritionSubScreen === 'weekly-report') {
    return <WeeklyReportScreen />;
  }

  return <NutritionMain />;
}

function NutritionMain() {
  const store = useAppStore();
  const todayStr = new Date().toISOString().split('T')[0];
  const todayMeals = store.meals.filter(m => m.loggedAt === todayStr);

  const consumedCalories = todayMeals.reduce((sum, m) => sum + m.food.calories, 0);
  const consumedProtein = todayMeals.reduce((sum, m) => sum + m.food.protein, 0);
  const consumedCarbs = todayMeals.reduce((sum, m) => sum + m.food.carbs, 0);
  const consumedFats = todayMeals.reduce((sum, m) => sum + m.food.fats, 0);

  const mealsByType = MEAL_TYPES.map(type => ({
    ...type,
    meals: todayMeals.filter(m => m.mealType === type.id),
    totalCalories: todayMeals.filter(m => m.mealType === type.id).reduce((sum, m) => sum + m.food.calories, 0),
  }));

  // Week strip
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const adjustedToday = today === 0 ? 6 : today - 1;

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nutrition</h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-emerald/30 text-emerald"
          onClick={() => store.setNutritionSubScreen('weekly-report')}
        >
          Weekly Report
        </Button>
      </div>

      {/* Week Strip */}
      <div className="flex gap-1.5 justify-between">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`flex flex-col items-center gap-1 py-2 px-2.5 rounded-xl transition-all ${
              i === adjustedToday ? 'bg-emerald/20 border border-emerald/30' : ''
            }`}
          >
            <span className="text-xs text-muted-foreground">{day}</span>
            <span className={`text-sm font-semibold ${i === adjustedToday ? 'text-emerald' : ''}`}>{new Date(Date.now() - (adjustedToday - i) * 86400000).getDate()}</span>
            {i === adjustedToday && <div className="w-1 h-1 rounded-full bg-emerald" />}
          </div>
        ))}
      </div>

      {/* Macro Summary */}
      <Card className="p-4 border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">Daily Progress</span>
          <span className="text-sm text-muted-foreground">{consumedCalories} / {store.targetCalories} kcal</span>
        </div>
        <div className="space-y-2.5">
          <MacroBar label="Protein" current={consumedProtein} target={store.targetProtein} color="#f97316" />
          <MacroBar label="Carbs" current={consumedCarbs} target={store.targetCarbs} color="#10b981" />
          <MacroBar label="Fats" current={consumedFats} target={store.targetFats} color="#8b5cf6" />
        </div>
      </Card>

      {/* Meal Sections */}
      <div className="space-y-3">
        {mealsByType.map((mealType) => (
          <Card key={mealType.id} className="p-4 border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <mealType.icon className={`w-5 h-5 ${mealType.color}`} />
                <span className="font-semibold text-sm">{mealType.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{mealType.totalCalories} kcal</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-7 h-7 rounded-lg hover:bg-emerald/10"
                  onClick={() => {
                    store.setSelectedMealType(mealType.id);
                    store.setNutritionSubScreen('add-food');
                  }}
                >
                  <Plus className="w-4 h-4 text-emerald" />
                </Button>
              </div>
            </div>
            {mealType.meals.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">No meals logged</p>
            ) : (
              <div className="space-y-2">
                {mealType.meals.map((meal) => (
                  <div key={meal.id} className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 group">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{meal.food.name}</div>
                      <div className="text-xs text-muted-foreground">
                        P: {meal.food.protein}g · C: {meal.food.carbs}g · F: {meal.food.fats}g
                      </div>
                    </div>
                    <span className="text-sm font-medium">{meal.food.calories}</span>
                    <button
                      onClick={() => store.removeMeal(meal.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-destructive/20"
                    >
                      <X className="w-3 h-3 text-destructive" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Scan Button */}
      <Button
        variant="outline"
        className="w-full h-14 rounded-2xl border-dashed border-emerald/30 text-emerald hover:bg-emerald/10"
        onClick={() => store.setNutritionSubScreen('barcode')}
      >
        <Camera className="w-5 h-5 mr-2" />
        Scan Food Barcode
      </Button>
    </div>
  );
}

function AddFoodScreen() {
  const store = useAppStore();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredFoods = FOOD_LIBRARY.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === 'all' || food.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleAddFood = (food: FoodItem) => {
    const meal: MealEntry = {
      id: `meal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      food,
      mealType: store.selectedMealType as MealEntry['mealType'],
      loggedAt: new Date().toISOString().split('T')[0],
    };
    store.addMeal(meal);
    store.setNutritionSubScreen('main');
  };

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => store.setNutritionSubScreen('main')} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Add Food</h2>
        <Badge variant="secondary" className="ml-auto capitalize">{store.selectedMealType}</Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-card border-border"
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-card border border-border rounded-xl h-auto p-1">
          <TabsTrigger value="all" className="rounded-lg text-xs flex-1">All</TabsTrigger>
          <TabsTrigger value="breakfast" className="rounded-lg text-xs flex-1">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch" className="rounded-lg text-xs flex-1">Lunch</TabsTrigger>
          <TabsTrigger value="dinner" className="rounded-lg text-xs flex-1">Dinner</TabsTrigger>
          <TabsTrigger value="snack" className="rounded-lg text-xs flex-1">Snack</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Food List */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-2">
          {filteredFoods.map((food, i) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-emerald/20 transition-all group"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{food.name}</div>
                <div className="text-xs text-muted-foreground">
                  {food.servingSize} {food.servingUnit} · P: {food.protein}g · C: {food.carbs}g · F: {food.fats}g
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <div>
                  <span className="text-sm font-bold">{food.calories}</span>
                  <span className="text-xs text-muted-foreground ml-0.5">kcal</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg hover:bg-emerald/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleAddFood(food)}
                >
                  <Plus className="w-4 h-4 text-emerald" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filteredFoods.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Apple className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No foods found</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function FoodDetailScreen() {
  const store = useAppStore();
  const food = store.selectedFood;
  const [servings, setServings] = useState(1);

  if (!food) return null;

  const scaledFood = {
    ...food,
    calories: Math.round(food.calories * servings),
    protein: Math.round(food.protein * servings),
    carbs: Math.round(food.carbs * servings),
    fats: Math.round(food.fats * servings),
  };

  const totalMacros = scaledFood.protein * 4 + scaledFood.carbs * 4 + scaledFood.fats * 9;
  const proteinPct = Math.round((scaledFood.protein * 4 / totalMacros) * 100);
  const carbsPct = Math.round((scaledFood.carbs * 4 / totalMacros) * 100);
  const fatsPct = 100 - proteinPct - carbsPct;

  const handleLog = () => {
    const meal: MealEntry = {
      id: `meal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      food: scaledFood,
      mealType: store.selectedMealType as MealEntry['mealType'],
      loggedAt: new Date().toISOString().split('T')[0],
    };
    store.addMeal(meal);
    store.setNutritionSubScreen('main');
  };

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => store.setNutritionSubScreen('add-food')} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">{food.name}</h2>
      </div>

      {/* Food Hero */}
      <Card className="p-6 border-border bg-gradient-to-br from-emerald/10 to-cyan/10 text-center">
        <span className="text-5xl mb-3 block">🍽️</span>
        <h3 className="text-2xl font-bold">{scaledFood.calories}</h3>
        <span className="text-sm text-muted-foreground">calories per serving</span>
      </Card>

      {/* Serving Size */}
      <Card className="p-4 border-border bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Servings</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setServings(Math.max(0.5, servings - 0.5))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent">
              -
            </button>
            <span className="text-lg font-bold w-8 text-center">{servings}</span>
            <button onClick={() => setServings(Math.min(5, servings + 0.5))} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent">
              +
            </button>
          </div>
        </div>
      </Card>

      {/* Macro Donut (Simplified as bars) */}
      <Card className="p-4 border-border bg-card space-y-3">
        <span className="text-sm font-semibold">Macro Breakdown</span>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-xl bg-orange-500/10">
            <div className="text-lg font-bold text-orange-400">{scaledFood.protein}g</div>
            <div className="text-xs text-muted-foreground">Protein</div>
            <div className="text-xs text-orange-400">{proteinPct}%</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-emerald-500/10">
            <div className="text-lg font-bold text-emerald-400">{scaledFood.carbs}g</div>
            <div className="text-xs text-muted-foreground">Carbs</div>
            <div className="text-xs text-emerald-400">{carbsPct}%</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-violet-500/10">
            <div className="text-lg font-bold text-violet-400">{scaledFood.fats}g</div>
            <div className="text-xs text-muted-foreground">Fats</div>
            <div className="text-xs text-violet-400">{fatsPct}%</div>
          </div>
        </div>
      </Card>

      <Button onClick={handleLog} className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 font-semibold">
        <Check className="w-5 h-5 mr-2" />
        Log {food.name}
      </Button>
    </div>
  );
}

function BarcodeScannerScreen() {
  const store = useAppStore();
  const [scanning, setScanning] = useState(true);
  const [found, setFound] = useState(false);

  // Simulate barcode scanning
  const handleScan = () => {
    setScanning(true);
    setFound(false);
    setTimeout(() => {
      setScanning(false);
      setFound(true);
    }, 2000);
  };

  const handleUseFound = () => {
    const randomFood = FOOD_LIBRARY[Math.floor(Math.random() * FOOD_LIBRARY.length)];
    store.setSelectedFood(randomFood);
    store.setNutritionSubScreen('food-detail');
  };

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => store.setNutritionSubScreen('main')} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Scan Barcode</h2>
      </div>

      {/* Scanner Area */}
      <Card className="p-8 border-border bg-card flex flex-col items-center justify-center min-h-[300px]">
        {scanning ? (
          <motion.div className="text-center space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute inset-0 border-2 border-emerald/40 rounded-2xl" />
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-emerald"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <ScanBarcode className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-emerald/50" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">Scanning...</p>
          </motion.div>
        ) : found ? (
          <motion.div className="text-center space-y-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald" />
            </div>
            <h3 className="text-lg font-bold">Product Found!</h3>
            <Button onClick={handleUseFound} className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
              View Details
            </Button>
          </motion.div>
        ) : (
          <div className="text-center space-y-4">
            <ScanBarcode className="w-16 h-16 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Point your camera at a barcode</p>
            <Button onClick={handleScan} className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0">
              Start Scan
            </Button>
          </div>
        )}
      </Card>

      <p className="text-xs text-center text-muted-foreground">
        Or manually search for food
      </p>
      <Button variant="outline" className="w-full rounded-xl" onClick={() => store.setNutritionSubScreen('add-food')}>
        <Search className="w-4 h-4 mr-2" /> Search Food Manually
      </Button>
    </div>
  );
}

function WeeklyReportScreen() {
  const store = useAppStore();

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => store.setNutritionSubScreen('main')} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Weekly Report</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Avg Calories', value: '2,014', sub: 'kcal/day' },
          { label: 'Protein Hit', value: '5/7', sub: 'days on target' },
          { label: 'Best Day', value: 'Wed', sub: '2,300 kcal' },
          { label: 'Consistency', value: '85%', sub: 'weekly score' },
        ].map((stat) => (
          <Card key={stat.label} className="p-4 border-border bg-card">
            <div className="text-xs text-muted-foreground">{stat.label}</div>
            <div className="text-xl font-bold mt-1">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.sub}</div>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="p-4 border-border bg-card">
        <h3 className="text-sm font-semibold mb-4">Daily Calories</h3>
        <div className="flex items-end gap-2 h-32">
          {WEEKLY_CALORIES_DATA.map((d: { day: string; calories: number; target: number }, i: number) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: '100px' }}>
                <div
                  className="absolute bottom-0 w-full rounded-t-md bg-emerald/30"
                  style={{ height: `${(d.target / 2500) * 100}%` }}
                />
                <motion.div
                  className="absolute bottom-0 w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-cyan-500"
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.calories / 2500) * 100}%` }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Consistency Streak */}
      <Card className="p-4 border-border bg-gradient-to-r from-emerald/10 to-cyan/10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔥</span>
          <div>
            <div className="text-lg font-bold">5 Day Streak</div>
            <div className="text-sm text-muted-foreground">Keep hitting your protein goal!</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
