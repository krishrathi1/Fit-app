'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type MealEntry, type FoodItem } from '@/lib/store';
import { FOOD_LIBRARY, WEEKLY_CALORIES_DATA } from '@/lib/data';
import { MacroBar, AnimatedCounter } from './CalorieRing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Search, Plus, X, ScanBarcode, Utensils, Apple,
  Coffee, Moon, Cookie, Check, ArrowLeft, Camera, BarChart3,
  TrendingUp, Award, Target, Flame, ChevronRight
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Meal Types Configuration
   ═══════════════════════════════════════════════════════ */
const MEAL_TYPES = [
  { id: 'breakfast' as const, label: 'Breakfast', icon: Coffee, color: 'text-orange-400' },
  { id: 'lunch' as const, label: 'Lunch', icon: Utensils, color: 'text-emerald-400' },
  { id: 'dinner' as const, label: 'Dinner', icon: Moon, color: 'text-violet-400' },
  { id: 'snack' as const, label: 'Snack', icon: Cookie, color: 'text-cyan-400' },
];

/* ═══════════════════════════════════════════════════════
   Page Transition Variants
   ═══════════════════════════════════════════════════════ */
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.25, ease: 'easeOut' };

/* ═══════════════════════════════════════════════════════
   NutritionPage – Main Router
   ═══════════════════════════════════════════════════════ */
export function NutritionPage() {
  const { nutritionSubScreen } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={nutritionSubScreen}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {nutritionSubScreen === 'add-food' && <AddFoodScreen />}
        {nutritionSubScreen === 'food-detail' && <FoodDetailScreen />}
        {nutritionSubScreen === 'barcode' && <BarcodeScannerScreen />}
        {nutritionSubScreen === 'weekly-report' && <WeeklyReportScreen />}
        {(nutritionSubScreen === 'main' || nutritionSubScreen === 'recognition') && <NutritionMain />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   NutritionMain – Dashboard with macros, meals, actions
   ═══════════════════════════════════════════════════════ */
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Nutrition</h2>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10 press-effect"
          onClick={() => store.setNutritionSubScreen('weekly-report')}
        >
          <BarChart3 className="w-4 h-4 mr-1.5" />
          Weekly Report
        </Button>
      </div>

      {/* Week Day Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex gap-1.5 justify-between"
      >
        {weekDays.map((day, i) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex flex-col items-center gap-1 py-2 px-2.5 rounded-xl transition-all ${
              i === adjustedToday
                ? 'bg-emerald/20 border border-emerald/30 shadow-sm shadow-emerald/10'
                : ''
            }`}
          >
            <span className={`text-[11px] ${i === adjustedToday ? 'text-emerald font-semibold' : 'text-muted-foreground'}`}>
              {day}
            </span>
            <span className={`text-sm font-semibold ${i === adjustedToday ? 'text-emerald' : ''}`}>
              {new Date(Date.now() - (adjustedToday - i) * 86400000).getDate()}
            </span>
            {i === adjustedToday && (
              <motion.div
                layoutId="dayIndicator"
                className="w-1 h-1 rounded-full bg-emerald"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Macro Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <Card className="p-5 glass-card hover-lift">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold">Daily Progress</span>
            <div className="flex items-center gap-1.5">
              <AnimatedCounter target={consumedCalories} className="text-sm font-bold text-foreground" />
              <span className="text-xs text-muted-foreground">/ {store.targetCalories} kcal</span>
            </div>
          </div>
          <div className="space-y-3">
            <MacroBar label="Protein" current={consumedProtein} target={store.targetProtein} color="#f97316" />
            <MacroBar label="Carbs" current={consumedCarbs} target={store.targetCarbs} color="#10b981" />
            <MacroBar label="Fats" current={consumedFats} target={store.targetFats} color="#8b5cf6" />
          </div>
        </Card>
      </motion.div>

      {/* Meal Sections */}
      <div className="space-y-3">
        {mealsByType.map((mealType, idx) => (
          <motion.div
            key={mealType.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.07, duration: 0.35 }}
          >
            <Card className="p-4 glass-card hover-lift">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    mealType.id === 'breakfast' ? 'bg-orange-500/15' :
                    mealType.id === 'lunch' ? 'bg-emerald-500/15' :
                    mealType.id === 'dinner' ? 'bg-violet-500/15' :
                    'bg-cyan-500/15'
                  }`}>
                    <mealType.icon className={`w-4 h-4 ${mealType.color}`} />
                  </div>
                  <span className="font-semibold text-sm">{mealType.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    <AnimatedCounter target={mealType.totalCalories} className="text-xs" /> kcal
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 rounded-lg hover:bg-emerald/10 press-effect"
                    onClick={() => {
                      store.setSelectedMealType(mealType.id);
                      store.setNutritionSubScreen('add-food');
                    }}
                  >
                    <Plus className="w-4 h-4 text-emerald" />
                  </Button>
                </div>
              </div>

              <AnimatePresence>
                {mealType.meals.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted-foreground/60 py-3 text-center italic"
                  >
                    No meals logged
                  </motion.p>
                ) : (
                  <div className="space-y-2">
                    {mealType.meals.map((meal, mealIdx) => (
                      <motion.div
                        key={meal.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, height: 0 }}
                        transition={{ delay: mealIdx * 0.05 }}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-secondary/40 group hover:bg-secondary/60 transition-colors"
                      >
                        <span className="text-lg flex-shrink-0" role="img" aria-label={meal.food.name}>
                          {meal.food.emoji || '🍽️'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{meal.food.name}</div>
                          <div className="text-[11px] text-muted-foreground">
                            P: {meal.food.protein}g · C: {meal.food.carbs}g · F: {meal.food.fats}g
                          </div>
                        </div>
                        <div className="text-right flex items-center gap-1.5">
                          <AnimatedCounter target={meal.food.calories} className="text-sm font-semibold" />
                          <span className="text-[10px] text-muted-foreground">kcal</span>
                        </div>
                        <button
                          onClick={() => store.removeMeal(meal.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-destructive/20 press-effect"
                          aria-label="Remove meal"
                        >
                          <X className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Scan Food Barcode */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="outline"
          className="w-full h-14 rounded-2xl border-dashed border-emerald/30 text-emerald hover:bg-emerald/10 press-effect"
          onClick={() => store.setNutritionSubScreen('barcode')}
        >
          <Camera className="w-5 h-5 mr-2" />
          Scan Food Barcode
        </Button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AddFoodScreen – Search & browse food library
   ═══════════════════════════════════════════════════════ */
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

  const handleViewDetail = (food: FoodItem) => {
    store.setSelectedFood(food);
    store.setNutritionSubScreen('food-detail');
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.setNutritionSubScreen('main')}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Add Food</h2>
        <Badge variant="secondary" className="ml-auto capitalize bg-emerald/15 text-emerald border-emerald/20">
          {store.selectedMealType}
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search foods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 rounded-xl bg-card border-border focus:ring-emerald/40"
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full bg-card border border-border rounded-xl h-auto p-1">
          <TabsTrigger value="all" className="rounded-lg text-xs flex-1 data-[state=active]:bg-emerald/15 data-[state=active]:text-emerald">All</TabsTrigger>
          <TabsTrigger value="breakfast" className="rounded-lg text-xs flex-1 data-[state=active]:bg-emerald/15 data-[state=active]:text-emerald">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch" className="rounded-lg text-xs flex-1 data-[state=active]:bg-emerald/15 data-[state=active]:text-emerald">Lunch</TabsTrigger>
          <TabsTrigger value="dinner" className="rounded-lg text-xs flex-1 data-[state=active]:bg-emerald/15 data-[state=active]:text-emerald">Dinner</TabsTrigger>
          <TabsTrigger value="snack" className="rounded-lg text-xs flex-1 data-[state=active]:bg-emerald/15 data-[state=active]:text-emerald">Snack</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Food List */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-2 pr-1">
          <AnimatePresence>
            {filteredFoods.map((food, i) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-emerald/20 transition-all group cursor-pointer hover-lift"
                onClick={() => handleViewDetail(food)}
              >
                <span className="text-xl flex-shrink-0" role="img" aria-label={food.name}>
                  {food.emoji || '🍽️'}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{food.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {food.servingSize} {food.servingUnit} · P: {food.protein}g · C: {food.carbs}g · F: {food.fats}g
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div>
                    <span className="text-sm font-bold">{food.calories}</span>
                    <span className="text-[10px] text-muted-foreground ml-0.5">kcal</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-lg hover:bg-emerald/10 press-effect flex-shrink-0"
                    onClick={(e) => { e.stopPropagation(); handleAddFood(food); }}
                  >
                    <Plus className="w-4 h-4 text-emerald" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredFoods.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-muted-foreground"
            >
              <Apple className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No foods found</p>
              <p className="text-xs mt-1 opacity-60">Try a different search term</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FoodDetailScreen – Food info with serving adjuster
   ═══════════════════════════════════════════════════════ */
function FoodDetailScreen() {
  const store = useAppStore();
  const food = store.selectedFood;
  const [servings, setServings] = useState(1);

  if (!food) return null;

  const scaledFood: FoodItem = {
    ...food,
    calories: Math.round(food.calories * servings),
    protein: Math.round(food.protein * servings),
    carbs: Math.round(food.carbs * servings),
    fats: Math.round(food.fats * servings),
    servingSize: Math.round(food.servingSize * servings * 10) / 10,
  };

  const totalMacroCal = scaledFood.protein * 4 + scaledFood.carbs * 4 + scaledFood.fats * 9;
  const proteinPct = totalMacroCal > 0 ? Math.round((scaledFood.protein * 4 / totalMacroCal) * 100) : 0;
  const carbsPct = totalMacroCal > 0 ? Math.round((scaledFood.carbs * 4 / totalMacroCal) * 100) : 0;
  const fatsPct = totalMacroCal > 0 ? Math.max(0, 100 - proteinPct - carbsPct) : 0;

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
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.setNutritionSubScreen('add-food')}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold truncate">{food.name}</h2>
      </div>

      {/* Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 glass-card text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald/8 via-transparent to-cyan/8 pointer-events-none" />
          <div className="relative z-10">
            <span className="text-5xl mb-3 block" role="img" aria-label={food.name}>
              {food.emoji || '🍽️'}
            </span>
            <AnimatedCounter
              target={scaledFood.calories}
              className="text-3xl font-bold gradient-text"
            />
            <span className="text-sm text-muted-foreground block mt-1">calories per serving</span>
          </div>
        </Card>
      </motion.div>

      {/* Serving Size Adjuster */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 glass-card hover-lift">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium">Serving Size</span>
              <span className="text-xs text-muted-foreground block">
                {scaledFood.servingSize} {food.servingUnit}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent text-lg font-bold transition-colors press-effect"
              >
                −
              </motion.button>
              <motion.span
                key={servings}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-lg font-bold w-10 text-center"
              >
                {servings}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setServings(Math.min(5, servings + 0.5))}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent text-lg font-bold transition-colors press-effect"
              >
                +
              </motion.button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Macro Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 glass-card">
          <span className="text-sm font-semibold mb-3 block">Macro Breakdown</span>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: scaledFood.protein, pct: proteinPct, bg: 'bg-orange-500/10', textColor: 'text-orange-400', pctColor: 'text-orange-400' },
              { label: 'Carbs', value: scaledFood.carbs, pct: carbsPct, bg: 'bg-emerald-500/10', textColor: 'text-emerald-400', pctColor: 'text-emerald-400' },
              { label: 'Fats', value: scaledFood.fats, pct: fatsPct, bg: 'bg-violet-500/10', textColor: 'text-violet-400', pctColor: 'text-violet-400' },
            ].map((macro) => (
              <div key={macro.label} className={`text-center p-3 rounded-xl ${macro.bg}`}>
                <div className={`text-lg font-bold ${macro.textColor}`}>
                  <AnimatedCounter target={macro.value} className={`text-lg font-bold ${macro.textColor}`} />g
                </div>
                <div className="text-xs text-muted-foreground">{macro.label}</div>
                <div className={`text-xs font-semibold ${macro.pctColor}`}>{macro.pct}%</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Log Food Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={handleLog}
          className="w-full h-14 rounded-2xl btn-gradient font-semibold text-base press-effect"
        >
          <Check className="w-5 h-5 mr-2" />
          Log {food.name}
        </Button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   BarcodeScannerScreen – Simulated barcode scanning
   ═══════════════════════════════════════════════════════ */
function BarcodeScannerScreen() {
  const store = useAppStore();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'found'>('idle');

  const handleStartScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('found');
    }, 2000);
  };

  const handleViewDetails = () => {
    const randomFood = FOOD_LIBRARY[Math.floor(Math.random() * FOOD_LIBRARY.length)];
    store.setSelectedFood(randomFood);
    store.setNutritionSubScreen('food-detail');
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.setNutritionSubScreen('main')}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Scan Barcode</h2>
      </div>

      {/* Scanner Area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 glass-card flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            {scanState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-5"
              >
                <div className="w-20 h-20 rounded-2xl bg-emerald/10 flex items-center justify-center mx-auto">
                  <ScanBarcode className="w-10 h-10 text-emerald/60" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Point your camera at a barcode</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">We&apos;ll identify the product instantly</p>
                </div>
                <Button
                  onClick={handleStartScan}
                  className="rounded-xl btn-gradient press-effect font-semibold"
                >
                  <ScanBarcode className="w-4 h-4 mr-2" />
                  Start Scan
                </Button>
              </motion.div>
            )}

            {scanState === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4 w-full"
              >
                <div className="relative w-48 h-48 mx-auto">
                  <div className="absolute inset-0 border-2 border-emerald/30 rounded-2xl" />
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald rounded-br-lg" />
                  {/* Animated scanning line */}
                  <motion.div
                    className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald to-transparent"
                    animate={{ top: ['8%', '92%', '8%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <ScanBarcode className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-emerald/30" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-emerald"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <p className="text-sm text-muted-foreground">Scanning...</p>
                </div>
              </motion.div>
            )}

            {scanState === 'found' && (
              <motion.div
                key="found"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  className="w-16 h-16 mx-auto rounded-full bg-emerald/20 flex items-center justify-center"
                >
                  <Check className="w-8 h-8 text-emerald" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold"
                >
                  Product Found!
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-muted-foreground"
                >
                  Barcode successfully identified
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    onClick={handleViewDetails}
                    className="rounded-xl btn-gradient press-effect font-semibold"
                  >
                    View Details
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>

      {/* Search Manually */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="outline"
          className="w-full rounded-xl press-effect"
          onClick={() => store.setNutritionSubScreen('add-food')}
        >
          <Search className="w-4 h-4 mr-2" />
          Search Food Manually
        </Button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WeeklyReportScreen – Weekly nutrition analytics
   ═══════════════════════════════════════════════════════ */
function WeeklyReportScreen() {
  const store = useAppStore();

  const avgCalories = Math.round(
    WEEKLY_CALORIES_DATA.reduce((sum, d) => sum + d.calories, 0) / WEEKLY_CALORIES_DATA.length
  );
  const daysOnTarget = WEEKLY_CALORIES_DATA.filter(d => d.calories >= d.target * 0.9 && d.calories <= d.target * 1.1).length;
  const bestDay = WEEKLY_CALORIES_DATA.reduce((best, d) => d.calories > best.calories ? d : best, WEEKLY_CALORIES_DATA[0]);
  const consistency = Math.round((daysOnTarget / 7) * 100);

  const stats = [
    { label: 'Avg Calories', value: avgCalories.toLocaleString(), sub: 'kcal/day', icon: TrendingUp, color: 'text-emerald' },
    { label: 'Protein Hit', value: `${daysOnTarget}/7`, sub: 'days on target', icon: Target, color: 'text-orange-400' },
    { label: 'Best Day', value: bestDay.day, sub: `${bestDay.calories} kcal`, icon: Award, color: 'text-amber' },
    { label: 'Consistency', value: `${consistency}%`, sub: 'weekly score', icon: Flame, color: 'text-violet-400' },
  ];

  const maxCalories = Math.max(...WEEKLY_CALORIES_DATA.map(d => d.calories), 2500);

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.setNutritionSubScreen('main')}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Weekly Report</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <Card className="p-4 glass-card hover-lift">
              <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground">{stat.sub}</div>
              <div className="text-[10px] text-muted-foreground/60 mt-0.5">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-5 glass-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Daily Calories</h3>
            <span className="text-xs text-muted-foreground">Target: {store.targetCalories} kcal</span>
          </div>
          <div className="flex items-end gap-2 h-36">
            {WEEKLY_CALORIES_DATA.map((d: { day: string; calories: number; target: number }, i: number) => {
              const barHeight = (d.calories / maxCalories) * 100;
              const targetHeight = (d.target / maxCalories) * 100;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full relative" style={{ height: '120px' }}>
                    {/* Target line */}
                    <div
                      className="absolute left-0 right-0 border-t border-dashed border-emerald/30 z-10"
                      style={{ bottom: `${targetHeight}%` }}
                    />
                    {/* Bar */}
                    <motion.div
                      className="absolute bottom-0 w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-emerald-400/80"
                      initial={{ height: 0 }}
                      animate={{ height: `${barHeight}%` }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-[11px] text-muted-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Streak Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-5 glass-card hover-lift">
          <div className="flex items-center gap-4">
            <motion.div
              className="text-4xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              🔥
            </motion.div>
            <div className="flex-1">
              <div className="text-lg font-bold gradient-text-warm">
                {store.streak > 0 ? store.streak : 5} Day Streak
              </div>
              <div className="text-sm text-muted-foreground">
                Keep hitting your protein goal!
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
