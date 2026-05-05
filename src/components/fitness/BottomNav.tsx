'use client';

import { motion } from 'framer-motion';
import { useAppStore, type DashboardTab } from '@/lib/store';
import {
  Home, Apple, Dumbbell, BarChart3, Bot, Users, User
} from 'lucide-react';

const NAV_ITEMS: { id: DashboardTab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'coach', label: 'Coach', icon: Bot },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const store = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-lg mx-auto px-2 py-1.5">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const isActive = store.dashboardTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => store.setDashboardTab(item.id)}
                className="flex flex-col items-center gap-0.5 py-1.5 px-1 relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -top-1.5 w-8 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-emerald' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                />
                <span className={`text-[10px] transition-colors ${
                  isActive ? 'text-emerald font-medium' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
