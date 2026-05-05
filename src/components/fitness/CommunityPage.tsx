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
  Crown, Target, ChevronRight, Zap
} from 'lucide-react';

type Tab = 'leaderboard' | 'challenges' | 'feed';

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>('leaderboard');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(FEED_POSTS.filter(p => p.liked).map(p => p.id))
  );
  const [joinedChallenges, setJoinedChallenges] = useState<Set<string>>(new Set());

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const toggleJoin = (challengeId: string) => {
    setJoinedChallenges(prev => {
      const next = new Set(prev);
      if (next.has(challengeId)) next.delete(challengeId);
      else next.add(challengeId);
      return next;
    });
  };

  return (
    <div className="space-y-5 pb-4">
      <h2 className="text-xl font-bold">Community</h2>

      {/* Custom Tab Bar */}
      <div className="flex gap-1 p-1 glass-card">
        {[
          { id: 'leaderboard' as Tab, label: 'Leaderboard', icon: Trophy },
          { id: 'challenges' as Tab, label: 'Challenges', icon: Target },
          { id: 'feed' as Tab, label: 'Feed', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-sm font-medium transition-all ${
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

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {/* Podium */}
          <div className="flex items-end justify-center gap-3 pt-6 pb-2">
            {[
              { ...LEADERBOARD[1], podium: 2, height: 'h-24', color: 'from-gray-300 to-gray-500' },
              { ...LEADERBOARD[0], podium: 1, height: 'h-32', color: 'from-yellow-400 to-yellow-600' },
              { ...LEADERBOARD[2], podium: 3, height: 'h-20', color: 'from-amber-600 to-amber-800' },
            ].map((player, i) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                className="flex flex-col items-center"
              >
                {/* Avatar + Crown */}
                <div className="relative mb-1">
                  {player.podium === 1 && (
                    <Crown className="w-5 h-5 text-yellow-400 absolute -top-4 left-1/2 -translate-x-1/2" />
                  )}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-xl ${
                    player.podium === 1 ? 'ring-2 ring-yellow-400/50 ring-offset-2 ring-offset-background' : ''
                  }`}>
                    {player.avatar}
                  </div>
                </div>
                <div className="text-xs font-semibold mb-1.5">{player.name}</div>
                <div className={`w-20 ${player.height} rounded-t-xl bg-gradient-to-t ${player.color} flex flex-col items-center justify-end pb-3`}>
                  <span className="text-lg font-bold text-white">{player.points}</span>
                  <span className="text-[10px] text-white/80">pts</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Remaining Rankings */}
          {LEADERBOARD.slice(3).map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <Card className="p-3 border-border bg-card flex items-center gap-3 hover-lift">
                <span className="text-sm font-bold w-6 text-center text-muted-foreground">#{player.rank}</span>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-card to-muted flex items-center justify-center text-base">
                  {player.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{player.name}</div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {player.streak} day streak
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{player.points}</div>
                  <div className="text-[10px] text-muted-foreground">pts</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div className="space-y-3">
          {CHALLENGES.map((challenge, i) => {
            const isJoined = joinedChallenges.has(challenge.id);
            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-4 border-border bg-card hover-lift overflow-hidden relative">
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${challenge.color}`} />
                  <div className="flex items-center gap-3 mb-3 pt-1">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${challenge.color} flex items-center justify-center text-lg`}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{challenge.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" />
                        {challenge.participants.toLocaleString()} participants
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
                    <div className="relative">
                      <Progress value={challenge.progress} className="h-2.5 progress-shimmer" />
                    </div>
                  </div>
                  <Button
                    variant={isJoined ? 'default' : 'outline'}
                    size="sm"
                    className={`w-full mt-3 rounded-xl transition-all ${
                      isJoined
                        ? 'bg-emerald/20 text-emerald border-emerald/30 hover:bg-emerald/30'
                        : 'border-emerald/30 text-emerald hover:bg-emerald/10'
                    }`}
                    onClick={() => toggleJoin(challenge.id)}
                  >
                    {isJoined ? (
                      <>
                        <Zap className="w-3.5 h-3.5 mr-1" /> Joined!
                      </>
                    ) : (
                      'Join Challenge'
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="space-y-3">
          {FEED_POSTS.map((post, i) => {
            const isLiked = likedPosts.has(post.id);
            const likeCount = post.likes + (isLiked && !post.liked ? 1 : 0) - (!isLiked && post.liked ? 1 : 0);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="p-4 border-border bg-card hover-lift">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold">{post.author}</div>
                      <div className="text-xs text-muted-foreground">{post.time}</div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-xs transition-all press-effect ${
                        isLiked ? 'text-rose' : 'text-muted-foreground hover:text-rose'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose' : ''}`} />
                      {likeCount}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
