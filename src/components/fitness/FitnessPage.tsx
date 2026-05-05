'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type Workout, type Exercise } from '@/lib/store';
import { WORKOUTS, ALTERNATIVE_EXERCISES } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dumbbell, Play, Pause, ChevronRight,
  ArrowLeft, Zap, Clock, Flame,
  ArrowRightLeft, Check, Trophy, Heart,
  Activity, Moon, Timer, RotateCcw,
  AlertCircle
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Type color mapping for workout types
   ═══════════════════════════════════════════════════════ */
const TYPE_COLORS: Record<string, { bg: string; text: string; gradient: string }> = {
  strength: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', gradient: 'from-emerald-500 to-teal-500' },
  cardio: { bg: 'bg-orange-500/15', text: 'text-orange-400', gradient: 'from-orange-500 to-amber-500' },
  recovery: { bg: 'bg-violet-500/15', text: 'text-violet-400', gradient: 'from-violet-500 to-purple-500' },
};

/* ═══════════════════════════════════════════════════════
   Page transition variants
   ═══════════════════════════════════════════════════════ */
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const pageTransition = { duration: 0.25, ease: 'easeOut' };

/* ═══════════════════════════════════════════════════════
   Helper: format seconds as MM:SS
   ═══════════════════════════════════════════════════════ */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/* ═══════════════════════════════════════════════════════
   FitnessPage – Main Router
   ═══════════════════════════════════════════════════════ */
export function FitnessPage() {
  const { fitnessSubScreen, currentWorkout } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={fitnessSubScreen}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
      >
        {fitnessSubScreen === 'workout-detail' && currentWorkout && <WorkoutDetailScreen />}
        {fitnessSubScreen === 'exercise-swap' && <ExerciseSwapScreen />}
        {(fitnessSubScreen === 'main' || (!currentWorkout && fitnessSubScreen !== 'exercise-swap')) && <FitnessMain />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   FitnessMain – Recovery gauge, today's workout,
   available workouts, weekly stats
   ═══════════════════════════════════════════════════════ */
function FitnessMain() {
  const store = useAppStore();

  const startWorkout = (workout: Workout) => {
    // Deep clone so store mutations don't alter WORKOUTS
    const cloned: Workout = JSON.parse(JSON.stringify(workout));
    store.setCurrentWorkout(cloned);
    store.setWorkoutTimer(0);
    store.setIsWorkoutActive(false);
    store.setFitnessSubScreen('workout-detail');
  };

  const recoveryPct = 90;
  const recoveryRadius = 32;
  const recoveryCircumference = 2 * Math.PI * recoveryRadius;
  const recoveryOffset = recoveryCircumference * (1 - recoveryPct / 100);

  return (
    <div className="space-y-5 pb-4">
      <h2 className="text-xl font-bold">Fitness</h2>

      {/* Recovery Gauge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-5 glass-card hover-lift">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald" />
              <span className="font-semibold text-sm">Recovery Score</span>
            </div>
            <Badge className="bg-emerald/20 text-emerald border-0 font-semibold">Excellent</Badge>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-20 h-20 -rotate-90">
                <circle cx="40" cy="40" r={recoveryRadius} fill="none" stroke="oklch(0.2 0.02 160)" strokeWidth="8" />
                <motion.circle
                  cx="40" cy="40" r={recoveryRadius} fill="none" stroke="#10b981" strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={recoveryCircumference}
                  initial={{ strokeDashoffset: recoveryCircumference }}
                  animate={{ strokeDashoffset: recoveryOffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{recoveryPct}%</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <Moon className="w-3 h-3 text-violet-400" />
                  <span className="text-muted-foreground">Sleep</span>
                </div>
                <span className="text-emerald font-semibold">7.5h</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-orange-400" />
                  <span className="text-muted-foreground">HRV</span>
                </div>
                <span className="text-emerald font-semibold">68ms</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-rose-400" />
                  <span className="text-muted-foreground">Resting HR</span>
                </div>
                <span className="text-emerald font-semibold">62bpm</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Today's Workout */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <Card className="p-5 glass-card hover-lift relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald/8 to-cyan/8 pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold">Today&apos;s Workout</span>
              <Badge className="bg-emerald/20 text-emerald border-0 font-semibold">Ready</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald/20">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">{WORKOUTS[0].name}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {WORKOUTS[0].estimatedDuration} min</span>
                  <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {WORKOUTS[0].caloriesBurned} kcal</span>
                  <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3" /> {WORKOUTS[0].exercises.length} exercises</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-4 h-12 rounded-xl btn-gradient font-semibold press-effect"
              onClick={() => startWorkout(WORKOUTS[0])}
            >
              <Play className="w-5 h-5 mr-2" /> Start Workout
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Available Workouts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Available Workouts</h3>
        {WORKOUTS.slice(1).map((workout, i) => {
          const colors = TYPE_COLORS[workout.type] || TYPE_COLORS.strength;
          return (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07, duration: 0.35 }}
            >
              <Card
                className="p-4 glass-card hover-lift cursor-pointer group"
                onClick={() => startWorkout(workout)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg}`}>
                    <Dumbbell className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm group-hover:text-emerald transition-colors">{workout.name}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {workout.estimatedDuration} min</span>
                      <span>{workout.caloriesBurned} kcal</span>
                      <span>{workout.exercises.length} exercises</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald transition-colors" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Stats */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
      >
        <Card className="p-4 glass-card hover-lift">
          <h3 className="text-sm font-semibold mb-3">This Week</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Workouts', value: String(store.completedWorkouts || 4), icon: '🏋️' },
              { label: 'Calories', value: store.totalCaloriesBurned > 0 ? store.totalCaloriesBurned.toLocaleString() : '1,680', icon: '🔥' },
              { label: 'Volume', value: '12.5t', icon: '💪' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-2 rounded-xl bg-secondary/30">
                <span className="text-lg">{stat.icon}</span>
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-[11px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WorkoutDetailScreen – Active workout with timer,
   exercise tracking, set completion
   ═══════════════════════════════════════════════════════ */
function WorkoutDetailScreen() {
  const store = useAppStore();
  const workout = store.currentWorkout;
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [swappingExerciseId, setSwappingExerciseId] = useState<string | null>(null);

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const toggleTimer = useCallback(() => {
    setTimerRunning(prev => !prev);
  }, []);

  if (!workout) return null;

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const completedSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0);
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  const handleSwap = (exerciseId: string) => {
    setSwappingExerciseId(exerciseId);
    store.setFitnessSubScreen('exercise-swap');
  };

  const handleFinish = () => {
    store.completeWorkout(workout.caloriesBurned);
    store.setFitnessSubScreen('main');
  };

  const handleBack = () => {
    store.setFitnessSubScreen('main');
    store.setCurrentWorkout(null);
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Header with Timer */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <motion.div
            key={elapsedTime}
            className="text-2xl font-bold font-mono"
          >
            {formatTime(elapsedTime)}
          </motion.div>
          <div className="text-xs text-muted-foreground">{workout.name}</div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTimer}
          className={`rounded-xl press-effect ${timerRunning ? 'text-orange-400' : 'text-emerald'}`}
        >
          {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-1.5"
      >
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground font-medium">{completedSets}/{totalSets} sets</span>
          <span className="text-emerald font-semibold">{Math.round(progress)}% complete</span>
        </div>
        <div className="relative h-2.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 progress-shimmer"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </motion.div>

      {/* Exercise Cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {workout.exercises.map((exercise, exIndex) => {
            const allSetsComplete = exercise.sets.every(s => s.completed);

            return (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: exIndex * 0.05 }}
              >
                <Card className={`p-4 glass-card hover-lift transition-all ${
                  allSetsComplete ? 'border-emerald/30 shadow-sm shadow-emerald/10' : ''
                }`}>
                  {/* Exercise Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        allSetsComplete
                          ? 'bg-emerald/20 text-emerald'
                          : 'bg-secondary text-muted-foreground'
                      }`}>
                        {allSetsComplete ? <Check className="w-4 h-4" /> : exIndex + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{exercise.name}</div>
                        <div className="text-xs text-muted-foreground">{exercise.muscleGroup}</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-muted-foreground hover:text-emerald press-effect"
                      onClick={() => handleSwap(exercise.id)}
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 mr-1" />
                      Swap
                    </Button>
                  </div>

                  {/* Sets */}
                  <div className="space-y-2">
                    {exercise.sets.map((set, setIndex) => (
                      <motion.div
                        key={setIndex}
                        className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                          set.completed
                            ? 'bg-emerald/10 border border-emerald/20'
                            : 'bg-secondary/40'
                        }`}
                        layout
                      >
                        {/* Checkbox */}
                        <motion.button
                          onClick={() => store.toggleSetComplete(exercise.id, setIndex)}
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all press-effect ${
                            set.completed
                              ? 'bg-emerald border-emerald'
                              : 'border-muted-foreground/30 hover:border-emerald/50'
                          }`}
                          whileTap={{ scale: 0.85 }}
                        >
                          <AnimatePresence>
                            {set.completed && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                              >
                                <Check className="w-3.5 h-3.5 text-white" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        <span className="text-xs font-medium w-8 text-muted-foreground">Set {setIndex + 1}</span>

                        <div className="flex items-center gap-1.5 flex-1">
                          <input
                            type="number"
                            value={set.weight}
                            onChange={(e) => store.updateSetWeight(exercise.id, setIndex, Number(e.target.value))}
                            className="w-14 h-7 rounded-lg bg-secondary text-center text-xs font-medium border-0 focus:ring-1 focus:ring-emerald/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[11px] text-muted-foreground">kg ×</span>
                          <input
                            type="number"
                            value={set.reps}
                            onChange={(e) => store.updateSetReps(exercise.id, setIndex, Number(e.target.value))}
                            className="w-12 h-7 rounded-lg bg-secondary text-center text-xs font-medium border-0 focus:ring-1 focus:ring-emerald/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="text-[11px] text-muted-foreground">reps</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Finish Workout Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          className="w-full h-14 rounded-2xl btn-gradient font-semibold text-base press-effect"
          onClick={handleFinish}
        >
          <Trophy className="w-5 h-5 mr-2" />
          Finish Workout
        </Button>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ExerciseSwapScreen – Swap current exercise for
   an alternative
   ═══════════════════════════════════════════════════════ */
function ExerciseSwapScreen() {
  const store = useAppStore();
  const workout = store.currentWorkout;

  if (!workout || workout.exercises.length === 0) return null;

  const currentExercise = workout.exercises[0];
  const alternatives = ALTERNATIVE_EXERCISES[currentExercise?.id] || [];

  const handleSwap = (alt: { id: string; name: string; reason: string }) => {
    // Replace the exercise in the store with the alternative
    const updatedExercises = workout.exercises.map((ex, i) => {
      if (i === 0) {
        return {
          ...ex,
          id: alt.id,
          name: alt.name,
          muscleGroup: alt.reason,
          sets: ex.sets.map(s => ({ ...s, completed: false })),
        };
      }
      return ex;
    });
    store.setCurrentWorkout({ ...workout, exercises: updatedExercises });
    store.setFitnessSubScreen('workout-detail');
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.setFitnessSubScreen('workout-detail')}
          className="rounded-xl press-effect"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Swap Exercise</h2>
      </div>

      {/* Current Exercise Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-4 glass-card border-emerald/20">
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1.5">Current Exercise</div>
          <div className="font-semibold text-base">{currentExercise.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-[11px]">{currentExercise.muscleGroup}</Badge>
            <span className="text-xs text-muted-foreground">{currentExercise.sets.length} sets</span>
          </div>
        </Card>
      </motion.div>

      {/* Alternatives */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Alternatives</h3>
        <AnimatePresence>
          {alternatives.length > 0 ? (
            alternatives.map((alt, i) => (
              <motion.div
                key={alt.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="p-4 glass-card hover-lift group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm group-hover:text-emerald transition-colors">{alt.name}</div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Zap className="w-3 h-3 text-amber" />
                        <span className="text-xs text-muted-foreground">{alt.reason}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg border-emerald/30 text-emerald hover:bg-emerald/10 press-effect font-semibold"
                      onClick={() => handleSwap(alt)}
                    >
                      Swap
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="p-8 glass-card text-center">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground font-medium">No alternatives available</p>
                <p className="text-xs text-muted-foreground/60 mt-1">This exercise has no registered substitutes</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
