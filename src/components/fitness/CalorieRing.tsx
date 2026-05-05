'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Plus } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   AnimatedCounter – counts up from 0 to target
   ═══════════════════════════════════════════════════════ */
interface AnimatedCounterProps {
  target?: number;
  value?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({ target: targetProp, value: valueProp, duration = 1.5, className = '', suffix = '', prefix = '' }: AnimatedCounterProps) {
  const target = targetProp ?? valueProp ?? 0;
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>(0);
  const prevTargetRef = useRef(0);

  useEffect(() => {
    const startValue = prevTargetRef.current;
    prevTargetRef.current = target;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(startValue + (target - startValue) * eased);
      setDisplayValue(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return <span className={className}>{prefix}{displayValue.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════
   CalorieRing – Animated SVG ring with gradient, glow,
   particle dots, and live counter
   ═══════════════════════════════════════════════════════ */
interface CalorieRingProps {
  consumed: number;
  target: number;
  size?: number;
}

const PARTICLE_COUNT = 12;

export function CalorieRing({ consumed, target, size = 200 }: CalorieRingProps) {
  const strokeWidth = Math.max(size * 0.07, 10);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(consumed / target, 1);
  const offset = circumference - percentage * circumference;
  const remaining = Math.max(target - consumed, 0);
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="oklch(0.2 0.02 160)"
          strokeWidth={strokeWidth}
        />

        {/* Glow ring (behind progress) */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#calorieGradient)"
          strokeWidth={strokeWidth + 8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          opacity={0.15}
          filter="url(#ringGlow)"
          style={{ pointerEvents: 'none' }}
        />

        {/* Progress ring */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#calorieGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />

        {/* Particle dots around the ring */}
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
          const angle = (2 * Math.PI * i) / PARTICLE_COUNT;
          const dotR = radius + strokeWidth / 2 + 6;
          const cx = center + dotR * Math.cos(angle);
          const cy = center + dotR * Math.sin(angle);
          const dotAngleDeg = (i / PARTICLE_COUNT) * 360;
          const isLit = dotAngleDeg <= percentage * 360;

          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r={isLit ? 2.5 : 1.5}
              fill={isLit ? '#06b6d4' : 'oklch(0.25 0.02 160)'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isLit ? [0.5, 1, 0.5] : 0.3,
                scale: isLit ? [1, 1.4, 1] : 1,
              }}
              transition={
                isLit
                  ? { duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }
                  : { duration: 0.4, delay: i * 0.03 }
              }
            />
          );
        })}
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter
          target={consumed}
          duration={1.5}
          className="text-3xl font-bold text-foreground"
        />
        <span className="text-xs text-muted-foreground mt-0.5">of {target} kcal</span>
        <span className="text-xs text-emerald mt-1 font-medium">{remaining} left</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MacroBar – Enhanced progress bar with shimmer + gradient
   ═══════════════════════════════════════════════════════ */
interface MacroBarProps {
  label: string;
  current: number;
  target: number;
  color: string;
  unit?: string;
}

const MACRO_GRADIENTS: Record<string, string> = {
  '#f97316': 'from-orange-500 to-amber-400',
  '#10b981': 'from-emerald-500 to-teal-400',
  '#8b5cf6': 'from-violet-500 to-purple-400',
};

export function MacroBar({ label, current, target, color, unit = 'g' }: MacroBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const gradientClass = MACRO_GRADIENTS[color] ?? '';

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-foreground">
            {Math.round(current)}{unit}
          </span>
          <span className="text-xs text-muted-foreground">/ {target}{unit}</span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-secondary text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full progress-shimmer ${
            gradientClass
              ? `bg-gradient-to-r ${gradientClass}`
              : ''
          }`}
          style={!gradientClass ? { backgroundColor: color } : undefined}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   WaterTracker – Animated wave, glass indicators,
   quick-add with press animation
   ═══════════════════════════════════════════════════════ */
interface WaterTrackerProps {
  current: number;
  target: number;
  onAdd: (ml: number) => void;
}

export function WaterTracker({ current, target, onAdd }: WaterTrackerProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const glasses = Math.ceil(target / 250);
  const filledGlasses = Math.floor(current / 250);
  const [ripple, setRipple] = useState<number | null>(null);

  const handleAdd = useCallback((ml: number) => {
    setRipple(ml);
    onAdd(ml);
    setTimeout(() => setRipple(null), 400);
  }, [onAdd]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-cyan" />
          <span className="text-sm font-medium">Water Intake</span>
        </div>
        <span className="text-sm font-semibold">
          {(current / 1000).toFixed(1)}L / {(target / 1000).toFixed(1)}L
        </span>
      </div>

      {/* Water bottle / wave container */}
      <div className="relative h-14 rounded-2xl bg-secondary overflow-hidden water-wave">
        {/* Water level fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan/40 to-cyan/10"
          initial={{ height: 0 }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Animated wave top */}
          <div
            className="absolute top-0 left-0 w-[200%] h-3"
            style={{
              background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 120\'%3E%3Cpath d=\'M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,0 L0,0 Z\' fill=\'%2306b6d4\' fill-opacity=\'0.3\'/%3E%3C/svg%3E") repeat-x',
              backgroundSize: '600px 12px',
              animation: 'wave 3s linear infinite',
            }}
          />
        </motion.div>

        {/* Percentage overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-sm font-bold text-foreground drop-shadow-sm">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      {/* Quick-add buttons */}
      <div className="flex gap-2">
        {[250, 500].map((ml) => (
          <motion.button
            key={ml}
            onClick={() => handleAdd(ml)}
            whileTap={{ scale: 0.92 }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 transition-colors press-effect ${
              ripple === ml
                ? 'bg-cyan/20 text-cyan'
                : 'bg-secondary hover:bg-accent text-foreground'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{ml}ml</span>
          </motion.button>
        ))}
      </div>

      {/* Glass indicators */}
      <div className="flex gap-1">
        {Array.from({ length: Math.min(glasses, 16) }).map((_, i) => (
          <motion.div
            key={i}
            className="h-2 flex-1 rounded-full"
            initial={false}
            animate={{
              backgroundColor: i < filledGlasses ? '#06b6d4' : 'oklch(0.18 0.02 260)',
              scale: i < filledGlasses ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
          />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   StreakBadge – Fire streak with flicker + glow
   ═══════════════════════════════════════════════════════ */
interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  if (streak <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/20"
    >
      <span className="animate-fire text-base" role="img" aria-label="fire">
        🔥
      </span>
      <span className="text-sm font-bold streak-fire text-orange-400">
        {streak}
      </span>
      <span className="text-[11px] text-muted-foreground">day streak</span>
    </motion.div>
  );
}
