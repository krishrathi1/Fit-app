'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { PROTEIN_TREND_DATA, SLEEP_CALORIES_DATA, CALORIE_HISTORY_30 } from '@/lib/data';
import { Card } from '@/components/ui/card';
import {
  TrendingUp, TrendingDown, Brain, Moon, Flame,
  Activity, Target, Calendar, Trophy
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function InsightsPage() {
  const store = useAppStore();

  // Workout calendar: generate current month days
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  // Simulate some workout days
  const workoutDays = new Set([2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26]);

  return (
    <motion.div
      className="space-y-5 pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants} className="text-xl font-bold">Insights</motion.h2>

      {/* Key Metrics Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
        {[
          { label: 'Avg Protein', value: '142g', change: '+8%', trend: 'up' as const, icon: Target, color: 'text-orange-400', iconBg: 'bg-orange-400/10' },
          { label: 'Sleep Score', value: '7.2h', change: '+0.5h', trend: 'up' as const, icon: Moon, color: 'text-violet-400', iconBg: 'bg-violet-400/10' },
          { label: 'Calorie Adherence', value: '85%', change: '-3%', trend: 'down' as const, icon: Flame, color: 'text-emerald-400', iconBg: 'bg-emerald-400/10' },
          { label: 'Workout Volume', value: '12.5t', change: '+15%', trend: 'up' as const, icon: Activity, color: 'text-cyan-400', iconBg: 'bg-cyan-400/10' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 border-border bg-card hover-lift">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-8 h-8 rounded-lg ${metric.iconBg} flex items-center justify-center`}>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <span className={`text-xs font-medium flex items-center gap-0.5 ${
                  metric.trend === 'up' ? 'text-emerald' : 'text-rose'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change}
                </span>
              </div>
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Protein Trend Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-400/10 flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="text-sm font-semibold">Protein Trend</span>
            </div>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="h-44">
            <svg className="w-full h-full" viewBox="0 0 320 140">
              {/* Target dashed line */}
              <line x1="10" y1="30" x2="310" y2="30" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
              <text x="300" y="25" fill="#10b981" fontSize="8" opacity="0.7">150g</text>

              {/* Area gradient */}
              <defs>
                <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {(() => {
                const maxVal = 180;
                const minVal = 100;
                const range = maxVal - minVal;
                const points = PROTEIN_TREND_DATA.map((d, i) => {
                  const x = (i / (PROTEIN_TREND_DATA.length - 1)) * 290 + 15;
                  const y = 110 - ((d.protein - minVal) / range) * 90;
                  return { x, y };
                });
                const linePoints = points.map(p => `${p.x},${p.y}`).join(' ');
                const areaPoints = [...points.map(p => `${p.x},${p.y}`), `${points[points.length - 1].x},110`, `${points[0].x},110`].join(' ');

                return (
                  <>
                    <polygon points={areaPoints} fill="url(#proteinGrad)" />
                    <polyline points={linePoints} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r="5" fill="#f97316" opacity="0.2" />
                        <circle cx={p.x} cy={p.y} r="3.5" fill="#f97316" />
                        <circle cx={p.x} cy={p.y} r="1.5" fill="var(--background)" />
                      </g>
                    ))}
                  </>
                );
              })()}

              {/* Day labels */}
              {PROTEIN_TREND_DATA.map((d, i) => {
                const x = (i / (PROTEIN_TREND_DATA.length - 1)) * 290 + 15;
                return <text key={i} x={x} y="130" fill="oklch(0.6 0.02 260)" fontSize="9" textAnchor="middle">{d.day}</text>;
              })}
            </svg>
          </div>
        </Card>
      </motion.div>

      {/* Sleep vs Calories Chart */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-violet-400/10 flex items-center justify-center">
                <Brain className="w-3.5 h-3.5 text-violet-400" />
              </div>
              <span className="text-sm font-semibold">Sleep vs Calories</span>
            </div>
            <span className="text-xs text-muted-foreground">2 week trend</span>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-violet-500" />
              <span className="text-[10px] text-muted-foreground">Sleep (hrs)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground">Calories</span>
            </div>
          </div>
          <div className="h-44">
            <svg className="w-full h-full" viewBox="0 0 320 140">
              {SLEEP_CALORIES_DATA.slice(0, 7).map((d, i) => {
                const barWidth = 28;
                const gap = 42;
                const x = i * gap + 10;
                const sleepHeight = (d.sleep / 10) * 100;
                const calHeight = (d.calories / 2800) * 100;

                return (
                  <g key={i}>
                    {/* Sleep bar */}
                    <rect x={x} y={110 - sleepHeight} width={barWidth / 2 - 2} height={sleepHeight} rx="3" fill="#8b5cf6" opacity="0.7">
                      <animate attributeName="height" from="0" to={sleepHeight} dur="0.6s" fill="freeze" />
                      <animate attributeName="y" from={110} to={110 - sleepHeight} dur="0.6s" fill="freeze" />
                    </rect>
                    {/* Calories bar */}
                    <rect x={x + barWidth / 2 + 2} y={110 - calHeight} width={barWidth / 2 - 2} height={calHeight} rx="3" fill="#10b981" opacity="0.7">
                      <animate attributeName="height" from="0" to={calHeight} dur="0.6s" fill="freeze" />
                      <animate attributeName="y" from={110} to={110 - calHeight} dur="0.6s" fill="freeze" />
                    </rect>
                    {/* Label */}
                    <text x={x + barWidth / 2} y="128" fill="oklch(0.6 0.02 260)" fontSize="8" textAnchor="middle">{d.day}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Card>
      </motion.div>

      {/* 30-Day Calorie Heatmap */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-400/10 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-sm font-semibold">30-Day Calorie Heatmap</span>
            </div>
            <span className="text-xs text-muted-foreground">vs target {store.targetCalories}kcal</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CALORIE_HISTORY_30.map((d, i) => {
              const diff = d.calories - d.target;
              const ratio = Math.abs(diff) / 500;
              let bgColor: string;
              if (Math.abs(diff) <= 50) {
                bgColor = 'bg-emerald-400';
              } else if (diff > 0) {
                bgColor = ratio > 0.6 ? 'bg-orange-500' : ratio > 0.3 ? 'bg-orange-400' : 'bg-orange-300';
              } else {
                bgColor = ratio > 0.6 ? 'bg-emerald-600' : ratio > 0.3 ? 'bg-emerald-500' : 'bg-emerald-400';
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className={`w-7 h-7 rounded-md ${bgColor} flex items-center justify-center`}
                  title={`Day ${d.day}: ${d.calories}kcal`}
                >
                  <span className="text-[7px] font-medium text-white/90">{d.day}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[10px] text-muted-foreground">Under</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-emerald-600" />
              <div className="w-3 h-3 rounded-sm bg-emerald-500" />
              <div className="w-3 h-3 rounded-sm bg-emerald-400" />
              <div className="w-3 h-3 rounded-sm bg-orange-300" />
              <div className="w-3 h-3 rounded-sm bg-orange-400" />
              <div className="w-3 h-3 rounded-sm bg-orange-500" />
            </div>
            <span className="text-[10px] text-muted-foreground">Over</span>
          </div>
        </Card>
      </motion.div>

      {/* Workout Calendar */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-sm font-semibold">Workout Calendar</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {today.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
          </div>
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[10px] text-muted-foreground font-medium py-1">{day}</div>
            ))}
          </div>
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOfWeek }, (_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isWorkout = workoutDays.has(day);
              const isToday = day === today.getDate();
              return (
                <div
                  key={day}
                  className={`h-8 rounded-lg flex items-center justify-center text-xs relative ${
                    isToday
                      ? 'bg-emerald/20 text-emerald font-bold border border-emerald/30'
                      : isWorkout
                        ? 'bg-emerald/10 text-foreground'
                        : 'text-muted-foreground'
                  }`}
                >
                  {day}
                  {isWorkout && (
                    <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-emerald" />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* AI Insight Card */}
      <motion.div variants={itemVariants}>
        <Card className="p-5 border-border bg-gradient-to-r from-violet/10 to-cyan/10 hover-lift">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-semibold mb-1">AI Insight</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your protein intake correlates strongly with your workout performance. On days you hit 150g+ protein,
                your workout volume increases by an average of 12%. Consider prioritizing protein-rich breakfasts to
                ensure consistent intake throughout the day. Your sleep quality also improves on high-protein days —
                a double win for recovery and growth.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
