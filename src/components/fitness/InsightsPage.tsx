'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { PROTEIN_TREND_DATA, SLEEP_CALORIES_DATA } from '@/lib/data';
import { Card } from '@/components/ui/card';
import {
  TrendingUp, TrendingDown, Brain, Moon, Flame,
  Activity, Target
} from 'lucide-react';

export function InsightsPage() {
  return (
    <div className="space-y-5 pb-4">
      <h2 className="text-xl font-bold">Insights</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Avg Protein', value: '142g', change: '+8%', trend: 'up', icon: Target, color: 'text-orange-400' },
          { label: 'Sleep Score', value: '7.2h', change: '+0.5h', trend: 'up', icon: Moon, color: 'text-violet-400' },
          { label: 'Calorie Adherence', value: '85%', change: '-3%', trend: 'down', icon: Flame, color: 'text-emerald-400' },
          { label: 'Workout Volume', value: '12.5t', change: '+15%', trend: 'up', icon: Activity, color: 'text-cyan-400' },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 border-border bg-card">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
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
      </div>

      {/* Protein Trend Chart */}
      <Card className="p-4 border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold">Protein Trend</span>
          </div>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <div className="h-40">
          <svg className="w-full h-full" viewBox="0 0 300 120">
            {/* Target line */}
            <line x1="0" y1="30" x2="300" y2="30" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
            <text x="290" y="26" fill="#10b981" fontSize="8" opacity="0.6">150g</text>
            
            {/* Area fill */}
            <defs>
              <linearGradient id="proteinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Data line + area */}
            {(() => {
              const maxVal = 180;
              const minVal = 100;
              const range = maxVal - minVal;
              const points = PROTEIN_TREND_DATA.map((d, i) => {
                const x = (i / (PROTEIN_TREND_DATA.length - 1)) * 280 + 10;
                const y = 100 - ((d.protein - minVal) / range) * 90;
                return `${x},${y}`;
              });
              const areaPoints = [...points, `290,100`, `10,100`].join(' ');
              
              return (
                <>
                  <polygon points={areaPoints} fill="url(#proteinGrad)" />
                  <polyline points={points.join(' ')} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {PROTEIN_TREND_DATA.map((d, i) => {
                    const x = (i / (PROTEIN_TREND_DATA.length - 1)) * 280 + 10;
                    const y = 100 - ((d.protein - minVal) / range) * 90;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="4" fill="#f97316" />
                        <circle cx={x} cy={y} r="2" fill="var(--background)" />
                      </g>
                    );
                  })}
                </>
              );
            })()}

            {/* Day labels */}
            {PROTEIN_TREND_DATA.map((d, i) => {
              const x = (i / (PROTEIN_TREND_DATA.length - 1)) * 280 + 10;
              return <text key={i} x={x} y="115" fill="oklch(0.65 0.02 260)" fontSize="9" textAnchor="middle">{d.day}</text>;
            })}
          </svg>
        </div>
      </Card>

      {/* Sleep vs Calories Chart */}
      <Card className="p-4 border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold">Sleep vs Calories</span>
          </div>
          <span className="text-xs text-muted-foreground">2 week trend</span>
        </div>
        <div className="h-40">
          <svg className="w-full h-full" viewBox="0 0 300 120">
            {/* Sleep bars */}
            {SLEEP_CALORIES_DATA.slice(0, 7).map((d, i) => {
              const barWidth = 20;
              const x = i * 42 + 8;
              const sleepHeight = (d.sleep / 10) * 80;
              const calHeight = (d.calories / 2800) * 80;
              
              return (
                <g key={i}>
                  {/* Sleep bar */}
                  <rect x={x} y={90 - sleepHeight} width={barWidth / 2 - 1} height={sleepHeight} rx="3" fill="#8b5cf6" opacity="0.6" />
                  {/* Calories bar */}
                  <rect x={x + barWidth / 2 + 1} y={90 - calHeight} width={barWidth / 2 - 1} height={calHeight} rx="3" fill="#10b981" opacity="0.6" />
                  {/* Label */}
                  <text x={x + barWidth / 2} y="108" fill="oklch(0.65 0.02 260)" fontSize="8" textAnchor="middle">{d.day}</text>
                </g>
              );
            })}
            {/* Legend */}
            <rect x="200" y="4" width="8" height="8" rx="2" fill="#8b5cf6" opacity="0.6" />
            <text x="212" y="11" fill="oklch(0.65 0.02 260)" fontSize="8">Sleep</text>
            <rect x="248" y="4" width="8" height="8" rx="2" fill="#10b981" opacity="0.6" />
            <text x="260" y="11" fill="oklch(0.65 0.02 260)" fontSize="8">Calories</text>
          </svg>
        </div>
      </Card>

      {/* AI Insight Card */}
      <Card className="p-4 border-border bg-gradient-to-r from-violet/10 to-cyan/10">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold mb-1">AI Insight</div>
            <p className="text-xs text-muted-foreground">
              Your protein intake correlates strongly with your workout performance. On days you hit 150g+ protein, 
              your workout volume increases by an average of 12%. Consider prioritizing protein-rich breakfasts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
