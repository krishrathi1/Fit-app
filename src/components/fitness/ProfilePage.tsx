'use client';

import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  User, Settings, Bell, Shield, Palette, HelpCircle,
  LogOut, ChevronRight, Flame, Target, Scale,
  Ruler, Calendar, Dumbbell, Apple, RotateCcw
} from 'lucide-react';

export function ProfilePage() {
  const store = useAppStore();

  const handleResetOnboarding = () => {
    if (confirm('This will reset all your data and restart the onboarding. Continue?')) {
      // Reset state by clearing localStorage and reloading
      localStorage.removeItem('fitapp-storage');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-5 pb-4">
      {/* Profile Card */}
      <Card className="p-6 border-border bg-gradient-to-r from-emerald/10 to-cyan/10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
            {store.goal === 'muscle_gain' ? '💪' : store.goal === 'weight_loss' ? '🔥' : store.goal === 'energy' ? '⚡' : '🏃'}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">Fitness Explorer</h2>
            <p className="text-sm text-muted-foreground capitalize">{store.goal.replace('_', ' ')} · {store.diet}</p>
            <Badge className="mt-1 bg-emerald/20 text-emerald border-0">Active Member</Badge>
          </div>
        </div>
      </Card>

      {/* Daily Goals */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Daily Goals</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Flame, label: 'Calories', value: store.targetCalories, unit: 'kcal', color: 'text-orange-400' },
            { icon: Target, label: 'Protein', value: store.targetProtein, unit: 'g', color: 'text-rose' },
            { icon: Apple, label: 'Carbs', value: store.targetCarbs, unit: 'g', color: 'text-emerald' },
            { icon: Scale, label: 'Fats', value: store.targetFats, unit: 'g', color: 'text-violet-400' },
          ].map((goal, i) => (
            <motion.div
              key={goal.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-3 border-border bg-card flex items-center gap-3">
                <goal.icon className={`w-5 h-5 ${goal.color}`} />
                <div>
                  <div className="text-sm font-bold">{goal.value}{goal.unit}</div>
                  <div className="text-xs text-muted-foreground">{goal.label}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Body Stats */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Body Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Scale, label: 'Weight', value: `${store.weight}kg` },
            { icon: Ruler, label: 'Height', value: `${store.height}cm` },
            { icon: Calendar, label: 'Age', value: `${store.age}y` },
          ].map((stat) => (
            <Card key={stat.label} className="p-3 border-border bg-card text-center">
              <stat.icon className="w-4 h-4 mx-auto text-muted-foreground mb-1" />
              <div className="text-sm font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings Menu */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Settings</h3>
        {[
          { icon: Bell, label: 'Notifications', desc: 'Reminders & alerts' },
          { icon: Shield, label: 'Privacy', desc: 'Data & permissions' },
          { icon: Palette, label: 'Appearance', desc: 'Theme & display' },
          { icon: HelpCircle, label: 'Help & Support', desc: 'FAQ & contact' },
        ].map((item) => (
          <Card key={item.label} className="p-3 border-border bg-card flex items-center gap-3 cursor-pointer hover:border-emerald/20 transition-all">
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10"
          onClick={handleResetOnboarding}
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Reset Onboarding
        </Button>
      </div>
    </div>
  );
}
