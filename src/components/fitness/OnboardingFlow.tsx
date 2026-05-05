'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { calculateTargetCalories, calculateMacros, calculateWaterIntake } from '@/lib/calculations';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Zap, Dumbbell, Scale, Wind,
  ChevronRight, ChevronLeft,
  Flame, Sparkles, Heart, Droplets, Trophy, Target,
} from 'lucide-react';

/* ─── Animation Variants ──────────────────────────────── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

/* ─── Data ────────────────────────────────────────────── */

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

const FEATURE_CARDS = [
  { icon: Flame, label: 'Track', color: 'text-orange-400' },
  { icon: Dumbbell, label: 'Train', color: 'text-emerald-400' },
  { icon: Sparkles, label: 'AI Coach', color: 'text-violet-400' },
];

const STEPS = ['welcome', 'goals', 'profile', 'activity', 'diet', 'result'] as const;
type StepId = (typeof STEPS)[number];

/* ─── Animated Counter Hook ───────────────────────────── */

function useAnimatedCounter(target: number, duration = 1200, startDelay = 0) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const startTime = performance.now();

      function tick(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        setCount(current);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [target, duration, startDelay]);

  return count;
}

/* ─── Check Mark ──────────────────────────────────────── */

function CheckMark() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 90 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className="w-6 h-6 rounded-full bg-emerald flex items-center justify-center flex-shrink-0"
    >
      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>
  );
}

/* ─── Mini Check (for diet pills) ─────────────────────── */

function MiniCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className="w-5 h-5 rounded-full bg-emerald flex items-center justify-center"
    >
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </motion.div>
  );
}

/* ─── Welcome Screen ──────────────────────────────────── */

function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      key="welcome"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md text-center space-y-8"
    >
      {/* Animated gradient orb */}
      <div className="relative flex items-center justify-center py-6">
        {/* Outer glow */}
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 blur-2xl animate-pulse-glow" />
        {/* Orb */}
        <motion.div
          className="animate-float animate-glow-pulse relative w-32 h-32 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald/30"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
        >
          <Heart className="w-14 h-14 text-white animate-heartbeat" />
        </motion.div>
      </div>

      {/* Title */}
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight">
          Welcome to <span className="gradient-text">FitOS</span>
        </h1>
        <p className="text-muted-foreground text-lg">Your AI-powered fitness companion</p>
      </motion.div>

      {/* Feature cards */}
      <motion.div
        className="grid grid-cols-3 gap-3 py-2"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {FEATURE_CARDS.map((item) => (
          <motion.div
            key={item.label}
            variants={staggerItem}
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl glass-card hover-lift cursor-default"
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <span className="text-xs font-semibold">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={onNext}
          size="lg"
          className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25"
        >
          Get Started <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Goals Screen ────────────────────────────────────── */

function GoalsScreen({ onNext }: { onNext: () => void }) {
  const { goal, setGoal } = useAppStore();

  return (
    <motion.div
      key="goals"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md space-y-6"
    >
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-emerald mb-2">
          <Target className="w-3.5 h-3.5" /> Step 1 of 5
        </div>
        <h2 className="text-2xl font-bold">What&apos;s Your Goal?</h2>
        <p className="text-muted-foreground">Choose the goal that matters most to you</p>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {GOALS.map((g) => (
          <motion.button
            key={g.id}
            variants={staggerItem}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setGoal(g.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-colors duration-200 ${
              goal === g.id
                ? 'border-emerald bg-emerald/10 shadow-lg shadow-emerald/10'
                : 'border-border bg-card hover:border-muted-foreground/30'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
              <g.icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">{g.title}</div>
              <div className="text-sm text-muted-foreground">{g.desc}</div>
            </div>
            <AnimatePresence>
              {goal === g.id && <CheckMark />}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Button onClick={onNext} size="lg" className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25">
          Continue <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Profile Screen ──────────────────────────────────── */

function ProfileScreen({ onNext }: { onNext: () => void }) {
  const { gender, setGender, age, setAge, weight, setWeight, height, setHeight } = useAppStore();

  return (
    <motion.div
      key="profile"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md space-y-5"
    >
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-emerald mb-2">
          <Scale className="w-3.5 h-3.5" /> Step 2 of 5
        </div>
        <h2 className="text-2xl font-bold">Tell Us About You</h2>
        <p className="text-muted-foreground">We&apos;ll personalize your plan based on this info</p>
      </motion.div>

      {/* Gender */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="text-sm font-medium text-muted-foreground">Gender</label>
        <div className="grid grid-cols-2 gap-3">
          {(['male', 'female'] as const).map((g) => (
            <motion.button
              key={g}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setGender(g)}
              className={`py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 ${
                gender === g
                  ? 'border-emerald bg-emerald/10 text-emerald'
                  : 'border-border bg-card hover:border-muted-foreground/30'
              }`}
            >
              {g === 'male' ? '👨 Male' : '👩 Female'}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Age */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Age</label>
          <span className="text-lg font-bold gradient-text">{age}</span>
        </div>
        <input
          type="range"
          min={15}
          max={80}
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>15</span><span>80</span>
        </div>
      </motion.div>

      {/* Weight */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Weight (kg)</label>
          <span className="text-lg font-bold gradient-text">{weight}</span>
        </div>
        <input
          type="range"
          min={30}
          max={200}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>30 kg</span><span>200 kg</span>
        </div>
      </motion.div>

      {/* Height */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-muted-foreground">Height (cm)</label>
          <span className="text-lg font-bold gradient-text">{height}</span>
        </div>
        <input
          type="range"
          min={120}
          max={220}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none bg-secondary accent-emerald cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>120 cm</span><span>220 cm</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button onClick={onNext} size="lg" className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25">
          Continue <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Activity Screen ─────────────────────────────────── */

function ActivityScreen({ onNext }: { onNext: () => void }) {
  const { activityLevel, setActivityLevel } = useAppStore();

  return (
    <motion.div
      key="activity"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md space-y-6"
    >
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-emerald mb-2">
          <Zap className="w-3.5 h-3.5" /> Step 3 of 5
        </div>
        <h2 className="text-2xl font-bold">Activity Level</h2>
        <p className="text-muted-foreground">How active are you on a typical week?</p>
      </motion.div>

      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {ACTIVITY_LEVELS.map((level) => (
          <motion.button
            key={level.id}
            variants={staggerItem}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivityLevel(level.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-colors duration-200 ${
              activityLevel === level.id
                ? 'border-emerald bg-emerald/10 shadow-lg shadow-emerald/10'
                : 'border-border bg-card hover:border-muted-foreground/30'
            }`}
          >
            <span className="text-2xl">{level.icon}</span>
            <div className="text-left flex-1">
              <div className="font-semibold">{level.title}</div>
              <div className="text-sm text-muted-foreground">{level.desc}</div>
            </div>
            <AnimatePresence>
              {activityLevel === level.id && <CheckMark />}
            </AnimatePresence>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Button onClick={onNext} size="lg" className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25">
          Continue <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Diet Screen ─────────────────────────────────────── */

function DietScreen({ onNext }: { onNext: () => void }) {
  const { diet, setDiet } = useAppStore();

  return (
    <motion.div
      key="diet"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md space-y-6"
    >
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-emerald mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Step 4 of 5
        </div>
        <h2 className="text-2xl font-bold">Diet Preference</h2>
        <p className="text-muted-foreground">We&apos;ll optimize your macros accordingly</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {DIETS.map((d) => (
          <motion.button
            key={d.id}
            variants={staggerItem}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setDiet(d.id)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-colors duration-200 relative ${
              diet === d.id
                ? 'border-emerald bg-emerald/10 shadow-lg shadow-emerald/10'
                : 'border-border bg-card hover:border-muted-foreground/30'
            }`}
          >
            <span className="text-3xl">{d.icon}</span>
            <span className="font-semibold text-sm">{d.title}</span>
            <div className="absolute top-2 right-2">
              <AnimatePresence>
                {diet === d.id && <MiniCheck />}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button onClick={onNext} size="lg" className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25">
          Calculate My Plan <Sparkles className="w-5 h-5 ml-1" />
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Result Screen ───────────────────────────────────── */

function ResultScreen({ onComplete }: { onComplete: () => void }) {
  const { targetCalories, targetProtein, targetCarbs, targetFats, targetWater } = useAppStore();

  const animatedCalories = useAnimatedCounter(targetCalories, 1400, 200);
  const animatedProtein = useAnimatedCounter(targetProtein, 1000, 500);
  const animatedCarbs = useAnimatedCounter(targetCarbs, 1000, 650);
  const animatedFats = useAnimatedCounter(targetFats, 1000, 800);
  const animatedWater = useAnimatedCounter(targetWater, 1200, 950);

  const macros = [
    { label: 'Protein', value: animatedProtein, unit: 'g', color: 'from-orange-500 to-red-500', icon: '🥩' },
    { label: 'Carbs', value: animatedCarbs, unit: 'g', color: 'from-emerald-500 to-cyan-500', icon: '🌾' },
    { label: 'Fats', value: animatedFats, unit: 'g', color: 'from-violet-500 to-purple-500', icon: '🥑' },
  ];

  return (
    <motion.div
      key="result"
      custom={1}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-md space-y-6 text-center"
    >
      {/* Animated calorie circle */}
      <div className="relative flex items-center justify-center py-4">
        {/* Outer glow rings */}
        <motion.div
          className="absolute w-44 h-44 rounded-full border border-emerald/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        <motion.div
          className="absolute w-52 h-52 rounded-full border border-emerald/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        />
        {/* Main circle */}
        <motion.div
          className="animate-bounce-in relative w-36 h-36 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald/30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">{animatedCalories}</div>
            <div className="text-xs text-white/80 font-medium">kcal / day</div>
          </div>
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full animate-pulse-glow bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" />
        </motion.div>
      </div>

      {/* Heading */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold">Your Personalized Plan</h2>
        <p className="text-muted-foreground">Tailored to help you reach your goals</p>
      </motion.div>

      {/* Macro cards */}
      <motion.div
        className="grid grid-cols-3 gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {macros.map((macro) => (
          <motion.div
            key={macro.label}
            variants={staggerItem}
            whileHover={{ y: -3, scale: 1.04 }}
            className="p-4 rounded-2xl glass-card text-center"
          >
            <div className="text-xl mb-1">{macro.icon}</div>
            <div className={`text-2xl font-extrabold bg-gradient-to-r ${macro.color} bg-clip-text text-transparent`}>
              {macro.value}
            </div>
            <div className="text-xs text-muted-foreground font-medium">{macro.label} ({macro.unit})</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Water target card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-4 p-4 rounded-2xl glass-card"
      >
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg flex-shrink-0">
          <Droplets className="w-6 h-6 text-white" />
        </div>
        <div className="text-left flex-1">
          <div className="text-sm font-medium text-muted-foreground">Daily Water Target</div>
          <div className="text-xl font-bold gradient-text">{(animatedWater / 1000).toFixed(1)}L</div>
        </div>
        <div className="text-2xl">💧</div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={onComplete}
          size="lg"
          className="w-full h-14 text-base font-bold rounded-2xl btn-gradient shadow-lg shadow-emerald/25"
        >
          Start My Journey 🚀
        </Button>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Onboarding Flow ────────────────────────────── */

export function OnboardingFlow() {
  const store = useAppStore();
  const [direction, setDirection] = useState(1);

  const currentStepIndex = STEPS.indexOf(store.screen as StepId);

  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleNext = useCallback(() => {
    if (store.screen === 'result') {
      store.completeOnboarding();
      return;
    }
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setDirection(1);
      store.setScreen(STEPS[nextIndex]);
    }
  }, [store, currentStepIndex]);

  const handleBack = useCallback(() => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setDirection(-1);
      store.setScreen(STEPS[prevIndex]);
    }
  }, [store, currentStepIndex]);

  const handleResultCalculate = useCallback(() => {
    const calories = calculateTargetCalories(
      store.weight,
      store.height,
      store.age,
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
  }, [store]);

  const handleDietNext = useCallback(() => {
    handleResultCalculate();
    handleNext();
  }, [handleResultCalculate, handleNext]);

  const handleResultComplete = useCallback(() => {
    store.completeOnboarding();
  }, [store]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Progress bar — skip on welcome */}
      {store.screen !== 'welcome' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-4"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBack}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex-1">
              <Progress value={progress} className="h-1.5 progress-shimmer" />
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {currentStepIndex + 1}/{STEPS.length}
            </span>
          </div>
        </motion.div>
      )}

      {/* Screen content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          {store.screen === 'welcome' && (
            <WelcomeScreen onNext={handleNext} />
          )}
          {store.screen === 'goals' && (
            <GoalsScreen onNext={handleNext} />
          )}
          {store.screen === 'profile' && (
            <ProfileScreen onNext={handleNext} />
          )}
          {store.screen === 'activity' && (
            <ActivityScreen onNext={handleNext} />
          )}
          {store.screen === 'diet' && (
            <DietScreen onNext={handleDietNext} />
          )}
          {store.screen === 'result' && (
            <ResultScreen onComplete={handleResultComplete} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
