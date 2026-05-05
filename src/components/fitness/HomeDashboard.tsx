'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, type MealEntry } from '@/lib/store';
import { COACHING_TIPS, MOTIVATIONAL_QUOTES } from '@/lib/data';
import { CalorieRing, MacroBar, WaterTracker, AnimatedCounter, StreakBadge } from './CalorieRing';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Utensils, Camera, Dumbbell, Droplets,
  Flame, Clock, ChevronRight,
  Sparkles, Apple, Heart, Footprints, Timer, Trash2
} from 'lucide-react';

// ─── Animation variants ──────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Meal type config ────────────────────────────────────────────
const mealConfig: Record<string, { emoji: string; colorClass: string; bgClass: string; borderClass: string }> = {
  breakfast: { emoji: '🌅', colorClass: 'text-orange-400', bgClass: 'bg-orange-500/15', borderClass: 'border-orange-500/20' },
  lunch:    { emoji: '☀️', colorClass: 'text-emerald-400', bgClass: 'bg-emerald-500/15', borderClass: 'border-emerald-500/20' },
  dinner:   { emoji: '🌙', colorClass: 'text-violet-400', bgClass: 'bg-violet-500/15', borderClass: 'border-violet-500/20' },
  snack:    { emoji: '🍪', colorClass: 'text-cyan-400', bgClass: 'bg-cyan-500/15', borderClass: 'border-cyan-500/20' },
};

// ─── Main Component ──────────────────────────────────────────────
export function HomeDashboard() {
  const store = useAppStore();
  const [hoveredMeal, setHoveredMeal] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMeals = store.meals.filter(m => m.loggedAt === todayStr);

  const consumedCalories = todayMeals.reduce((sum, m) => sum + m.food.calories, 0);
  const consumedProtein = todayMeals.reduce((sum, m) => sum + m.food.protein, 0);
  const consumedCarbs = todayMeals.reduce((sum, m) => sum + m.food.carbs, 0);
  const consumedFats = todayMeals.reduce((sum, m) => sum + m.food.fats, 0);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  const dayIndex = Math.floor(Date.now() / 86400000);
  const tipIndex = dayIndex % COACHING_TIPS.length;
  const quoteIndex = dayIndex % MOTIVATIONAL_QUOTES.length;
  const currentTip = COACHING_TIPS[tipIndex];
  const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex];

  const xpInLevel = store.xp % 200;
  const xpPercent = Math.round((xpInLevel / 200) * 100);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-5 pb-4"
    >
      {/* ── 1. Header Row ─────────────────────────────────────── */}
      <motion.div variants={slideUp} className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold tracking-tight">
            {greeting} <span className="inline-block animate-float">👋</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Let&apos;s crush your goals today</p>
        </div>
        <div className="flex items-center gap-2.5">
          <StreakBadge streak={store.streak} />
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald/20">
            {store.level}
          </div>
        </div>
      </motion.div>

      {/* ── XP Bar ────────────────────────────────────────────── */}
      <motion.div variants={slideUp} className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Level {store.level}</span>
          <span className="text-xs text-muted-foreground">{xpInLevel} / 200 XP</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden progress-shimmer">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald to-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* ── 2. Hero Calorie Card ──────────────────────────────── */}
      <motion.div variants={slideUp}>
        <Card className="glass-card p-6">
          <div className="flex flex-col items-center gap-5">
            <CalorieRing consumed={consumedCalories} target={store.targetCalories} size={190} />

            {/* Mini macro cards */}
            <div className="grid grid-cols-3 gap-2.5 w-full">
              {[
                { label: 'Protein', value: consumedProtein, target: store.targetProtein, color: '#f97316', unit: 'g' },
                { label: 'Carbs', value: consumedCarbs, target: store.targetCarbs, color: '#10b981', unit: 'g' },
                { label: 'Fats', value: consumedFats, target: store.targetFats, color: '#8b5cf6', unit: 'g' },
              ].map((macro) => (
                <div
                  key={macro.label}
                  className="flex flex-col items-center p-3 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">{macro.label}</span>
                  <AnimatedCounter
                    value={Math.round(macro.value)}
                    className="text-lg font-bold"
                    suffix={macro.unit}
                  />
                  <span className="text-[10px] text-muted-foreground mt-0.5">/ {macro.target}{macro.unit}</span>
                  <div className="w-full h-1 rounded-full bg-secondary mt-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: macro.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((macro.value / macro.target) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* ── 3. Quick Actions Grid ─────────────────────────────── */}
      <motion.div variants={slideUp} className="grid grid-cols-2 gap-3">
        {[
          {
            icon: Utensils, label: 'Log Meal', gradient: 'from-orange-500 to-red-500',
            action: () => { store.setSelectedMealType('lunch'); store.setNutritionSubScreen('add-food'); store.setDashboardTab('nutrition'); },
          },
          {
            icon: Camera, label: 'Scan Food', gradient: 'from-cyan-500 to-teal-500',
            action: () => { store.setNutritionSubScreen('barcode'); store.setDashboardTab('nutrition'); },
          },
          {
            icon: Dumbbell, label: 'Start Workout', gradient: 'from-emerald-500 to-cyan-500',
            action: () => store.setDashboardTab('fitness'),
          },
          {
            icon: Droplets, label: 'Add Water', gradient: 'from-violet-500 to-purple-500',
            action: () => store.addWater(250),
          },
        ].map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
            onClick={item.action}
            className="flex items-center gap-3 p-4 rounded-2xl glass-card hover-lift press-effect group"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-sm">{item.label}</span>
          </motion.button>
        ))}
      </motion.div>

      {/* ── 4. Water Tracker Card ─────────────────────────────── */}
      <motion.div variants={slideUp}>
        <Card className="glass-card p-5">
          <WaterTracker current={store.waterIntake} target={store.targetWater} onAdd={(ml) => store.addWater(ml)} />
        </Card>
      </motion.div>

      {/* ── 5. Daily Movement Strip ───────────────────────────── */}
      <motion.div variants={slideUp}>
        <Card className="glass-card p-4">
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: '👣', value: 8234, label: 'Steps', suffix: '' },
              { icon: '🔥', value: 412, label: 'Burned', suffix: ' kcal' },
              { icon: '⏱️', value: 42, label: 'Active', suffix: 'm' },
              { icon: '❤️', value: 72, label: 'Heart', suffix: ' BPM' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center py-1">
                <span className="text-xl mb-1">{stat.icon}</span>
                <AnimatedCounter
                  value={stat.value}
                  className="text-sm font-bold"
                  suffix={stat.suffix}
                />
                <span className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* ── 6. AI Coach Tip Card ──────────────────────────────── */}
      <motion.div variants={slideUp}>
        <Card
          className="glass-card p-4 neon-emerald cursor-pointer hover-lift overflow-hidden relative group"
          onClick={() => store.setDashboardTab('coach')}
        >
          {/* Gradient border accent */}
          <div className="absolute inset-0 rounded-[1.25rem] p-[1px] bg-gradient-to-r from-emerald-500/40 via-cyan-500/20 to-emerald-500/40 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

          <div className="relative flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold gradient-text">AI Coach</span>
                <span className="text-base">{currentTip.icon}</span>
                <span className="text-xs text-muted-foreground font-medium">{currentTip.title}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{currentTip.text}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2 group-hover:text-emerald transition-colors" />
          </div>
        </Card>
      </motion.div>

      {/* ── 7. Today's Meals ──────────────────────────────────── */}
      <motion.div variants={slideUp} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">Today&apos;s Meals</h3>
          <button
            onClick={() => store.setDashboardTab('nutrition')}
            className="text-xs font-medium gradient-text hover:underline underline-offset-2"
          >
            View All →
          </button>
        </div>

        {todayMeals.length === 0 ? (
          <Card className="glass-card p-8 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/50 flex items-center justify-center mb-3">
              <Apple className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground font-medium">No meals logged yet</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Start tracking your nutrition to see insights</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10 btn-gradient"
              onClick={() => {
                store.setSelectedMealType('breakfast');
                store.setNutritionSubScreen('add-food');
                store.setDashboardTab('nutrition');
              }}
            >
              <Utensils className="w-4 h-4 mr-1.5" /> Log Your First Meal
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {todayMeals.slice(0, 5).map((meal, i) => {
              const config = mealConfig[meal.mealType] || mealConfig.snack;
              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  onMouseEnter={() => setHoveredMeal(meal.id)}
                  onMouseLeave={() => setHoveredMeal(null)}
                  className={`flex items-center gap-3 p-3 rounded-xl glass-card hover-lift group relative transition-all ${config.borderClass}`}
                >
                  {/* Meal type icon */}
                  <div className={`w-10 h-10 rounded-xl ${config.bgClass} flex items-center justify-center text-base flex-shrink-0`}>
                    {meal.food.emoji || config.emoji}
                  </div>

                  {/* Meal info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{meal.food.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[10px] font-semibold ${config.colorClass}`}>{meal.mealType}</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">{meal.food.protein}g P</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">{meal.food.carbs}g C</span>
                      <span className="text-[10px] text-muted-foreground">·</span>
                      <span className="text-[10px] text-muted-foreground">{meal.food.fats}g F</span>
                    </div>
                  </div>

                  {/* Calories */}
                  <div className="text-right flex-shrink-0">
                    <AnimatedCounter value={meal.food.calories} className="text-sm font-bold" />
                    <span className="text-[10px] text-muted-foreground ml-0.5">kcal</span>
                  </div>

                  {/* Delete button on hover */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: hoveredMeal === meal.id ? 1 : 0,
                      scale: hoveredMeal === meal.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.15 }}
                    onClick={(e) => { e.stopPropagation(); store.removeMeal(meal.id); }}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-destructive/90 flex items-center justify-center shadow-lg hover:bg-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3 text-white" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* ── 8. Motivational Quote ─────────────────────────────── */}
      <motion.div variants={slideUp}>
        <Card className="glass-card p-5 overflow-hidden relative">
          {/* Subtle gradient border */}
          <div className="absolute inset-0 rounded-[1.25rem] p-[1px] bg-gradient-to-r from-emerald-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

          <div className="relative">
            <span className="gradient-text text-3xl leading-none font-serif">&ldquo;</span>
            <p className="text-sm italic text-foreground/80 leading-relaxed -mt-1 pl-1">
              {currentQuote.text}
            </p>
            <span className="gradient-text text-3xl leading-none font-serif float-right -mt-2">&rdquo;</span>
            <div className="clear-both" />
            <p className="text-xs text-muted-foreground text-right mt-2 font-medium">
              — {currentQuote.author}
            </p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
