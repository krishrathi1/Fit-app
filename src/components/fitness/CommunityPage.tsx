'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LEADERBOARD, CHALLENGES, FEED_POSTS } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Trophy, Users, Flame, Heart, MessageCircle,
  Crown, Medal, Target, ChevronRight, Sparkles
} from 'lucide-react';

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'challenges' | 'feed'>('leaderboard');

  return (
    <div className="space-y-5 pb-4">
      <h2 className="text-xl font-bold">Community</h2>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-card rounded-xl border border-border">
        {[
          { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy },
          { id: 'challenges' as const, label: 'Challenges', icon: Target },
          { id: 'feed' as const, label: 'Feed', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-emerald/20 text-emerald'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 pt-4">
            {[
              { ...LEADERBOARD[1], podium: 2, height: 'h-20', color: 'from-gray-400 to-gray-500' },
              { ...LEADERBOARD[0], podium: 1, height: 'h-28', color: 'from-yellow-400 to-yellow-600' },
              { ...LEADERBOARD[2], podium: 3, height: 'h-16', color: 'from-amber-600 to-amber-800' },
            ].map((player, i) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <span className="text-2xl mb-1">{player.podium === 1 ? '👑' : player.avatar}</span>
                <div className="text-xs font-semibold mb-1">{player.name}</div>
                <div className={`w-20 ${player.height} rounded-t-xl bg-gradient-to-t ${player.color} flex flex-col items-center justify-end pb-2`}>
                  <span className="text-lg font-bold text-white">{player.points}</span>
                  <span className="text-xs text-white/80">pts</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Rankings */}
          {LEADERBOARD.slice(3).map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <Card className="p-3 border-border bg-card flex items-center gap-3">
                <span className="text-sm font-bold w-6 text-center text-muted-foreground">#{player.rank}</span>
                <span className="text-xl">{player.avatar}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{player.name}</div>
                  <div className="text-xs text-muted-foreground">🔥 {player.streak} day streak</div>
                </div>
                <span className="text-sm font-bold">{player.points}</span>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Challenges */}
      {activeTab === 'challenges' && (
        <div className="space-y-3">
          {CHALLENGES.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-4 border-border bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{challenge.title}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" /> {challenge.participants.toLocaleString()} participants
                      <span>·</span>
                      <span>{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 rounded-xl border-emerald/30 text-emerald hover:bg-emerald/10"
                >
                  Join Challenge
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-3">
          {FEED_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-4 border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{post.author}</div>
                    <div className="text-xs text-muted-foreground">{post.time}</div>
                  </div>
                </div>
                <p className="text-sm mb-3">{post.content}</p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-rose transition-colors">
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-rose text-rose' : ''}`} />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
