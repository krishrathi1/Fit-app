'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { calculateTargetCalories, calculateMacros, calculateWaterIntake } from '@/lib/calculations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, Dumbbell, Scale, Wind, 
  ChevronRight, ChevronLeft, 
  Flame, Apple, Wheat, Droplets,
  Sparkles, Heart
} from 'lucide-react';

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -300 : 300, opacity: 0 }),
};

const GOALS = [
  { id: 'weight_loss', icon: Flame, title: 'Lose Weight', desc: 'Burn fat and get lean', color: 'from-orange-500 to-red-500' },
  { id: 'muscle_gain', icon: Dumbbell, title: 'Build Muscle', desc: 'Gain strength and size', color: 'from-emerald-500 to-cyan-500' },
  { id: 'energy', icon: Zap, title: 'Boost Energy', desc: 'Feel more energized daily', color: 'from-yellow-500 to-orange-500' },
  { id: 'endurance', icon: Wind, title: 'Improve Endurance', desc: 'Go further, last longer', color: 'from-cyan-500 to-blue-500' },
];

const ACTIVITY_LEVELS = [
  { id: 'sedentary', title: 'Sedentary', desc: 'Office job, little exercise', icon: '🪑' },
  { id: 'light', title: 'Lightly Active', desc: '1-3 days/week exercise', icon: '🚶' },
  { id: 'moderate', title: 'Moderately Active', desc: '3-5 days/week exercise', icon: '🏃' },
  { id: 'active', title: 'Very Active', desc: '6-7 days/week exercise', icon: '💪' },
  { id: 'very_active', title: 'Athlete', desc: 'Intense daily training', icon: '🏅' },
];

const DIETS = [
  { id: 'balanced', title: 'Balanced', icon: '⚖️' },
  { id: 'keto', title: 'Keto', icon: '🥑' },
  { id: 'vegan', title: 'Vegan', icon: '🌱' },
  { id: 'vegetarian', title: 'Vegetarian', icon: '🥬' },
  { id: 'paleo', title: 'Paleo', icon: '🥩' },
  { id: 'mediterranean', title: 'Mediterranean', icon: '🫒' },
];

export function OnboardingFlow() {
  const store = useAppStore();
  
  const steps = ['welcome', 'goals', 'profile', 'activity', 'diet', 'result'] as const;
  const currentStepIndex = steps.indexOf(store.screen as typeof steps[number]);
  const direction = 1;

  const handleNext = () => {
    if (store.screen === 'result') {
      store.completeOnboarding();
      return;
    }
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      store.setScreen(steps[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      store.setScreen(steps[prevIndex]);
    }
  };

  const handleResultCalculate = () => {
    const calories = calculateTargetCalories(
      store.weight, store.height, store.age,
      store.gender as 'male' | 'female',
      store.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
      store.goal as 'weight_loss' | 'muscle_gain' | 'energy' | 'endurance'
    );
    const macros = calculateMacros(calories, store.diet as 'keto' | 'vegan' | 'vegetarian' | 'paleo' | 'mediterranean' | 'balanced');
    const water = calculateWaterIntake(
      store.weight,
      store.activityLevel as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
    );
    store.setOnboardingResults(calories, macros.protein, macros.carbs, macros.fats, water);
  };

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar */}
      {store.screen !== 'welcome' && (
        <div className="px-6 pt-4">
          <div className="flex items-center gap-4">
            <button onClick={handleBack} className="p-1 rounded-lg hover:bg-secondary transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <Progress value={progress} className="h-1.5" />
            </div>
            <span className="text-xs text-muted-foreground">{currentStepIndex + 1}/{steps.length}</span>
          </div>
        </div>
      )}

      {/* Screen content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {store.screen === 'welcome' && (
            <motion.div key="welcome" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md text-center space-y-8">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.2 }} className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              <div className="space-y-3">
                <h1 className="text-4xl font-bold">
                  Welcome to <span className="gradient-text">FitOS</span>
                </h1>
                <p className="text-muted-foreground text-lg">Your AI-powered fitness companion for a healthier, stronger you.</p>
              </div>
              <div className="grid grid-cols-3 gap-3 py-4">
                {[
                  { icon: Flame, label: 'Track', color: 'text-orange-400' },
                  { icon: Dumbbell, label: 'Train', color: 'text-emerald-400' },
                  { icon: Sparkles, label: 'AI Coach', color: 'text-violet-400' },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </motion.div>
                ))}
              </div>
              <Button onClick={handleNext} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Get Started <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </motion.div>
          )}

          {store.screen === 'goals' && (
            <motion.div key="goals" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">What&apos;s Your Goal?</h2>
                <p className="text-muted-foreground">Choose the goal that matters most to you</p>
              </div>
              <div className="space-y-3">
                {GOALS.map((goal, i) => (
                  <motion.button
                    key={goal.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => store.setGoal(goal.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                      store.goal === goal.id
                        ? 'border-emerald bg-emerald/10 shadow-lg shadow-emerald/10'
                        : 'border-border bg-card hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center`}>
                      <goal.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">{goal.title}</div>
                      <div className="text-sm text-muted-foreground">{goal.desc}</div>
                    </div>
                    {store.goal === goal.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-emerald flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <Button onClick={handleNext} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </motion.div>
          )}

          {store.screen === 'profile' && (
            <motion.div key="profile" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Tell Us About You</h2>
                <p className="text-muted-foreground">We&apos;ll personalize your plan based on this info</p>
              </div>
              
              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      onClick={() => store.setGender(g)}
                      className={`py-3 px-4 rounded-xl border-2 font-medium transition-all ${
                        store.gender === g
                          ? 'border-emerald bg-emerald/10 text-emerald'
                          : 'border-border bg-card hover:border-muted-foreground/30'
                      }`}
                    >
                      {g === 'male' ? '👨 Male' : '👩 Female'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <span className="text-lg font-bold text-emerald">{store.age}</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={80}
                  value={store.age}
                  onChange={(e) => store.setAge(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>15</span><span>80</span>
                </div>
              </div>

              {/* Weight */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Weight (kg)</label>
                  <span className="text-lg font-bold text-emerald">{store.weight}</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={200}
                  value={store.weight}
                  onChange={(e) => store.setWeight(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>30 kg</span><span>200 kg</span>
                </div>
              </div>

              {/* Height */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-muted-foreground">Height (cm)</label>
                  <span className="text-lg font-bold text-emerald">{store.height}</span>
                </div>
                <input
                  type="range"
                  min={120}
                  max={220}
                  value={store.height}
                  onChange={(e) => store.setHeight(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>120 cm</span><span>220 cm</span>
                </div>
              </div>

              <Button onClick={handleNext} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </motion.div>
          )}

          {store.screen === 'activity' && (
            <motion.div key="activity" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Activity Level</h2>
                <p className="text-muted-foreground">How active are you on a typical week?</p>
              </div>
              <div className="space-y-3">
                {ACTIVITY_LEVELS.map((level, i) => (
                  <motion.button
                    key={level.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => store.setActivityLevel(level.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                      store.activityLevel === level.id
                        ? 'border-emerald bg-emerald/10'
                        : 'border-border bg-card hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-2xl">{level.icon}</span>
                    <div className="text-left flex-1">
                      <div className="font-semibold">{level.title}</div>
                      <div className="text-sm text-muted-foreground">{level.desc}</div>
                    </div>
                    {store.activityLevel === level.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-6 h-6 rounded-full bg-emerald flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <Button onClick={handleNext} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Continue <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </motion.div>
          )}

          {store.screen === 'diet' && (
            <motion.div key="diet" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Diet Preference</h2>
                <p className="text-muted-foreground">We&apos;ll optimize your macros accordingly</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {DIETS.map((diet, i) => (
                  <motion.button
                    key={diet.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => store.setDiet(diet.id)}
                    className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                      store.diet === diet.id
                        ? 'border-emerald bg-emerald/10'
                        : 'border-border bg-card hover:border-muted-foreground/30'
                    }`}
                  >
                    <span className="text-3xl">{diet.icon}</span>
                    <span className="font-semibold text-sm">{diet.title}</span>
                    {store.diet === diet.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-5 h-5 rounded-full bg-emerald flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <Button onClick={() => { handleResultCalculate(); handleNext(); }} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Calculate My Plan <Sparkles className="w-5 h-5 ml-1" />
              </Button>
            </motion.div>
          )}

          {store.screen === 'result' && (
            <motion.div key="result" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4 }} className="w-full max-w-md space-y-6 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{store.targetCalories}</div>
                  <div className="text-xs text-white/80">kcal/day</div>
                </div>
              </motion.div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Your Personalized Plan</h2>
                <p className="text-muted-foreground">Tailored to help you reach your goals</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Protein', value: store.targetProtein, unit: 'g', color: 'from-orange-500 to-red-500' },
                  { label: 'Carbs', value: store.targetCarbs, unit: 'g', color: 'from-emerald-500 to-cyan-500' },
                  { label: 'Fats', value: store.targetFats, unit: 'g', color: 'from-violet-500 to-purple-500' },
                ].map((macro, i) => (
                  <motion.div key={macro.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="p-4 rounded-2xl bg-card border border-border">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${macro.color} bg-clip-text text-transparent`}>
                      {macro.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{macro.label} ({macro.unit})</div>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                <Droplets className="w-6 h-6 text-cyan" />
                <div className="text-left flex-1">
                  <div className="text-sm font-medium">Daily Water Target</div>
                  <div className="text-lg font-bold">{(store.targetWater / 1000).toFixed(1)}L</div>
                </div>
              </div>
              <Button onClick={handleNext} size="lg" className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Start My Journey 🚀
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
