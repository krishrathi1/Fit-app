'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  User, Bell, Shield, Palette, HelpCircle,
  ChevronRight, Flame, Target, Scale,
  Ruler, Calendar, Apple, RotateCcw, Lock,
  Trophy, Zap, Star
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export function ProfilePage() {
  const store = useAppStore();

  const goalEmoji = store.goal === 'muscle_gain' ? '💪' : store.goal === 'weight_loss' ? '🔥' : store.goal === 'energy' ? '⚡' : '🏃';

  const xpForCurrentLevel = (store.level - 1) * 200;
  const xpForNextLevel = store.level * 200;
  const xpProgress = ((store.xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  const handleResetOnboarding = () => {
    if (confirm('This will reset all your data and restart the onboarding. Continue?')) {
      localStorage.removeItem('fitapp-storage');
      window.location.reload();
    }
  };

  return (
    <motion.div
      className="space-y-5 pb-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Hero Card */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 border-border bg-gradient-to-br from-emerald/15 via-cyan/10 to-violet/5 hover-lift relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald/10 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-2xl font-bold neon-emerald">
              {goalEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold">Fitness Explorer</h2>
              <p className="text-sm text-muted-foreground capitalize">{store.goal.replace('_', ' ')} · {store.diet}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge className="bg-emerald/20 text-emerald border-0 hover:bg-emerald/30">
                  <Trophy className="w-3 h-3 mr-1" /> Level {store.level}
                </Badge>
                <Badge className="bg-amber/20 text-amber border-0 hover:bg-amber/30">
                  <Zap className="w-3 h-3 mr-1" /> {store.streak} day streak
                </Badge>
              </div>
            </div>
          </div>
          {/* XP Bar */}
          <div className="mt-4 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="font-medium">{store.xp} / {xpForNextLevel} XP</span>
            </div>
            <div className="h-2.5 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(xpProgress, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 progress-shimmer"
              />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Daily Goals Grid */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-semibold mb-3">Daily Goals</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Flame, label: 'Calories', value: store.targetCalories, unit: 'kcal', color: 'text-orange-400', bg: 'bg-orange-400/10' },
            { icon: Target, label: 'Protein', value: store.targetProtein, unit: 'g', color: 'text-rose', bg: 'bg-rose/10' },
            { icon: Apple, label: 'Carbs', value: store.targetCarbs, unit: 'g', color: 'text-emerald', bg: 'bg-emerald/10' },
            { icon: Scale, label: 'Fats', value: store.targetFats, unit: 'g', color: 'text-violet-400', bg: 'bg-violet-400/10' },
          ].map((goal, i) => (
            <motion.div
              key={goal.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Card className="p-4 border-border bg-card flex items-center gap-3 hover-lift">
                <div className={`w-9 h-9 rounded-lg ${goal.bg} flex items-center justify-center`}>
                  <goal.icon className={`w-4.5 h-4.5 ${goal.color}`} />
                </div>
                <div>
                  <div className="text-sm font-bold">{goal.value}{goal.unit}</div>
                  <div className="text-xs text-muted-foreground">{goal.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Body Stats Row */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-semibold mb-3">Body Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Scale, label: 'Weight', value: `${store.weight}kg`, color: 'text-emerald', bg: 'bg-emerald/10' },
            { icon: Ruler, label: 'Height', value: `${store.height}cm`, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
            { icon: Calendar, label: 'Age', value: `${store.age}y`, color: 'text-violet-400', bg: 'bg-violet-400/10' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.05 }}
            >
              <Card className="p-3 border-border bg-card text-center hover-lift">
                <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="text-sm font-bold">{stat.value}</div>
                <div className="text-[11px] text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-semibold mb-3">Achievements</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {store.achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.04, type: 'spring', stiffness: 200 }}
            >
              <Card className={`p-3 border-border text-center hover-lift relative overflow-hidden ${
                achievement.unlocked ? 'bg-card' : 'bg-card opacity-40 grayscale'
              }`}>
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-cyan/5" />
                )}
                <div className="relative">
                  <div className="text-2xl mb-1">
                    {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6 mx-auto text-muted-foreground" />}
                  </div>
                  <div className="text-[11px] font-semibold truncate">{achievement.title}</div>
                  <div className="text-[9px] text-muted-foreground truncate">{achievement.desc}</div>
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald animate-glow-pulse" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings Menu */}
      <motion.div variants={itemVariants}>
        <h3 className="text-sm font-semibold mb-3">Settings</h3>
        <div className="space-y-2">
          {[
            { icon: Bell, label: 'Notifications', desc: 'Reminders & alerts', color: 'text-amber-400', bg: 'bg-amber-400/10' },
            { icon: Shield, label: 'Privacy', desc: 'Data & permissions', color: 'text-emerald', bg: 'bg-emerald/10' },
            { icon: Palette, label: 'Appearance', desc: 'Theme & display', color: 'text-violet-400', bg: 'bg-violet-400/10' },
            { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ & contact', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <Card className="p-3 border-border bg-card flex items-center gap-3 cursor-pointer hover:border-emerald/20 hover-lift">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reset Onboarding */}
      <motion.div variants={itemVariants}>
        <Button
          variant="outline"
          className="w-full rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10"
          onClick={handleResetOnboarding}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Reset Onboarding
        </Button>
      </motion.div>
    </motion.div>
  );
}
