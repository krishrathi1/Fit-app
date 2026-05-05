'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { OnboardingFlow } from '@/components/fitness/OnboardingFlow';
import { HomeDashboard } from '@/components/fitness/HomeDashboard';
import { NutritionPage } from '@/components/fitness/NutritionPage';
import { FitnessPage } from '@/components/fitness/FitnessPage';
import { AICoachPage } from '@/components/fitness/AICoachPage';
import { InsightsPage } from '@/components/fitness/InsightsPage';
import { CommunityPage } from '@/components/fitness/CommunityPage';
import { ProfilePage } from '@/components/fitness/ProfilePage';
import { BottomNav } from '@/components/fitness/BottomNav';
import { useSyncExternalStore } from 'react';

function DashboardContent() {
  const { dashboardTab } = useAppStore();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dashboardTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {dashboardTab === 'home' && <HomeDashboard />}
        {dashboardTab === 'nutrition' && <NutritionPage />}
        {dashboardTab === 'fitness' && <FitnessPage />}
        {dashboardTab === 'insights' && <InsightsPage />}
        {dashboardTab === 'coach' && <AICoachPage />}
        {dashboardTab === 'community' && <CommunityPage />}
        {dashboardTab === 'profile' && <ProfilePage />}
      </motion.div>
    </AnimatePresence>
  );
}

const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

export default function Home() {
  const { screen, onboarded } = useAppStore();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    );
  }

  // If onboarding is complete, show dashboard
  if (onboarded || screen === 'dashboard') {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 pt-4 pb-24">
          <DashboardContent />
        </div>
        <BottomNav />
      </div>
    );
  }

  // Otherwise, show onboarding
  return <OnboardingFlow />;
}
