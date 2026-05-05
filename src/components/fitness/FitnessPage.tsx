'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, type Workout, type Exercise } from '@/lib/store';
import { WORKOUTS, ALTERNATIVE_EXERCISES } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dumbbell, Play, Pause, RotateCcw, ChevronLeft,
  ChevronRight, ArrowLeft, Zap, Clock, Flame,
  ArrowRightLeft, Check, Timer, Trophy
} from 'lucide-react';

export function FitnessPage() {
  const store = useAppStore();

  if (store.fitnessSubScreen === 'workout-detail' && store.currentWorkout) {
    return <WorkoutDetailScreen />;
  }
  if (store.fitnessSubScreen === 'exercise-swap') {
    return <ExerciseSwapScreen />;
  }

  return <FitnessMain />;
}

function FitnessMain() {
  const store = useAppStore();

  const startWorkout = (workout: Workout) => {
    store.setCurrentWorkout(workout);
    store.setWorkoutTimer(0);
    store.setIsWorkoutActive(false);
    store.setFitnessSubScreen('workout-detail');
  };

  return (
    <div className="space-y-5 pb-4">
      <h2 className="text-xl font-bold">Fitness</h2>

      {/* Recovery Gauge */}
      <Card className="p-5 border-border bg-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald" />
            <span className="font-semibold text-sm">Recovery Score</span>
          </div>
          <Badge className="bg-emerald/20 text-emerald border-0">Excellent</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="oklch(0.2 0.02 160)" strokeWidth="8" />
              <motion.circle
                cx="40" cy="40" r="32" fill="none" stroke="#10b981" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 32}
                initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 32 * (1 - 0.9) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">90%</span>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Sleep</span>
              <span className="text-emerald font-medium">7.5h</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">HRV</span>
              <span className="text-emerald font-medium">68ms</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Resting HR</span>
              <span className="text-emerald font-medium">62bpm</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Workout */}
      <Card className="p-5 border-border bg-gradient-to-r from-emerald/10 to-cyan/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">Today&apos;s Workout</span>
          <Badge variant="secondary" className="bg-emerald/20 text-emerald border-0">Ready</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Dumbbell className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Heavy Legs</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 55 min</span>
              <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> 420 kcal</span>
              <span className="flex items-center gap-1"><Dumbbell className="w-3 h-3" /> 4 exercises</span>
            </div>
          </div>
        </div>
        <Button
          className="w-full mt-4 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 font-semibold"
          onClick={() => startWorkout(WORKOUTS[0])}
        >
          <Play className="w-5 h-5 mr-2" /> Start Workout
        </Button>
      </Card>

      {/* Available Workouts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Available Workouts</h3>
        {WORKOUTS.slice(1).map((workout, i) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 border-border bg-card hover:border-emerald/20 transition-all cursor-pointer" onClick={() => startWorkout(workout)}>
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  workout.type === 'strength' ? 'bg-emerald-500/20' :
                  workout.type === 'cardio' ? 'bg-orange-500/20' :
                  'bg-violet-500/20'
                }`}>
                  <Dumbbell className={`w-5 h-5 ${
                    workout.type === 'strength' ? 'text-emerald-400' :
                    workout.type === 'cardio' ? 'text-orange-400' :
                    'text-violet-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{workout.name}</div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{workout.estimatedDuration} min</span>
                    <span>{workout.caloriesBurned} kcal</span>
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Fitness Stats */}
      <Card className="p-4 border-border bg-card">
        <h3 className="text-sm font-semibold mb-3">This Week</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Workouts', value: '4', icon: '🏋️' },
            { label: 'Calories', value: '1,680', icon: '🔥' },
            { label: 'Volume', value: '12.5t', icon: '💪' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-2">
              <span className="text-lg">{stat.icon}</span>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WorkoutDetailScreen() {
  const store = useAppStore();
  const workout = store.currentWorkout;
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!workout) return null;

  const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
  const completedSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0);
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0;

  return (
    <div className="space-y-5 pb-4">
      {/* Header with Timer */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => { store.setFitnessSubScreen('main'); store.setCurrentWorkout(null); }} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <div className="text-2xl font-bold font-mono">{formatTime(elapsedTime)}</div>
          <div className="text-xs text-muted-foreground">{workout.name}</div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTimerRunning(!timerRunning)}
          className="rounded-xl"
        >
          {timerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{completedSets}/{totalSets} sets</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Exercise List */}
      <div className="space-y-3">
        {workout.exercises.map((exercise, exIndex) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: exIndex * 0.06 }}
          >
            <Card className={`p-4 border-border ${activeExerciseIndex === exIndex ? 'border-emerald/40 bg-emerald/5' : 'bg-card'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald/20 flex items-center justify-center text-xs font-bold text-emerald">
                    {exIndex + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{exercise.name}</div>
                    <div className="text-xs text-muted-foreground">{exercise.muscleGroup}</div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-emerald"
                  onClick={() => {
                    setActiveExerciseIndex(exIndex);
                    store.setFitnessSubScreen('exercise-swap');
                  }}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 mr-1" /> Swap
                </Button>
              </div>

              {/* Sets */}
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                      set.completed ? 'bg-emerald/10' : 'bg-secondary/50'
                    }`}
                  >
                    <button
                      onClick={() => store.toggleSetComplete(exercise.id, setIndex)}
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                        set.completed ? 'bg-emerald border-emerald' : 'border-muted-foreground/30'
                      }`}
                    >
                      {set.completed && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <span className="text-xs font-medium w-8">Set {setIndex + 1}</span>
                    <div className="flex items-center gap-1.5 flex-1">
                      <input
                        type="number"
                        value={set.weight}
                        onChange={(e) => store.updateSetWeight(exercise.id, setIndex, Number(e.target.value))}
                        className="w-14 h-7 rounded-md bg-secondary text-center text-xs font-medium border-0 focus:ring-1 focus:ring-emerald"
                      />
                      <span className="text-xs text-muted-foreground">kg ×</span>
                      <input
                        type="number"
                        value={set.reps}
                        onChange={(e) => store.updateSetReps(exercise.id, setIndex, Number(e.target.value))}
                        className="w-10 h-7 rounded-md bg-secondary text-center text-xs font-medium border-0 focus:ring-1 focus:ring-emerald"
                      />
                      <span className="text-xs text-muted-foreground">reps</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Finish Workout */}
      <Button
        className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 font-semibold"
        onClick={() => {
          store.setFitnessSubScreen('main');
          store.setCurrentWorkout(null);
        }}
      >
        <Trophy className="w-5 h-5 mr-2" />
        Finish Workout
      </Button>
    </div>
  );
}

function ExerciseSwapScreen() {
  const store = useAppStore();
  const workout = store.currentWorkout;

  if (!workout) return null;

  const currentExercise = workout.exercises[0];
  const alternatives = ALTERNATIVE_EXERCISES[currentExercise?.id] || [];

  return (
    <div className="space-y-5 pb-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => store.setFitnessSubScreen('workout-detail')} className="rounded-xl">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-bold">Swap Exercise</h2>
      </div>

      <Card className="p-4 border-border bg-card">
        <div className="text-xs text-muted-foreground mb-1">Current Exercise</div>
        <div className="font-semibold">{currentExercise?.name}</div>
        <div className="text-xs text-muted-foreground">{currentExercise?.muscleGroup}</div>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Alternatives</h3>
        {alternatives.length > 0 ? alternatives.map((alt) => (
          <Card key={alt.id} className="p-4 border-border bg-card hover:border-emerald/30 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm">{alt.name}</div>
                <div className="text-xs text-muted-foreground">{alt.reason}</div>
              </div>
              <Button variant="outline" size="sm" className="rounded-lg border-emerald/30 text-emerald hover:bg-emerald/10">
                Swap
              </Button>
            </div>
          </Card>
        )) : (
          <Card className="p-6 border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">No alternatives available for this exercise</p>
          </Card>
        )}
      </div>
    </div>
  );
}
