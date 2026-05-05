'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, type ChatMessage } from '@/lib/store';
import { QUICK_PROMPTS } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send, Sparkles, Bot, User, Trash2, Loader2,
  Dumbbell, Apple, Moon, Droplets, Zap
} from 'lucide-react';

export function AICoachPage() {
  const store = useAppStore();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [store.chatMessages, isSending]);

  const handleSend = async (message?: string) => {
    const msg = message || input.trim();
    if (!msg || isSending) return;

    setInput('');
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: msg,
      timestamp: Date.now(),
    };
    store.addChatMessage(userMessage);
    setIsSending(true);

    try {
      const response = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          history: store.chatMessages.slice(-10),
          profile: {
            goal: store.goal,
            weight: store.weight,
            height: store.height,
            age: store.age,
            activityLevel: store.activityLevel,
            diet: store.diet,
            targetCalories: store.targetCalories,
          },
        }),
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_ai`,
        role: 'assistant',
        content: data.response || "I'm here to help you reach your fitness goals! What would you like to know?",
        timestamp: Date.now(),
      };
      store.addChatMessage(assistantMessage);
    } catch {
      const fallbackMessage: ChatMessage = {
        id: `msg_${Date.now()}_err`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment. In the meantime, remember to stay hydrated and keep pushing! 💪",
        timestamp: Date.now(),
      };
      store.addChatMessage(fallbackMessage);
    } finally {
      setIsSending(false);
    }
  };

  const isEmpty = store.chatMessages.length === 0;

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Coach</h2>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={store.clearChat}
          className="rounded-xl hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      {/* Empty State - Coach Overview */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="glass-card p-5 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-sm">Your Personal AI Coach</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  I know your goals and can help with nutrition, workouts, recovery, and motivation. Ask me anything!
                </p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { icon: Dumbbell, label: 'Workouts', color: 'text-emerald', bg: 'bg-emerald/10' },
                { icon: Apple, label: 'Nutrition', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                { icon: Moon, label: 'Recovery', color: 'text-violet-400', bg: 'bg-violet-400/10' },
                { icon: Droplets, label: 'Hydration', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card/50 hover-lift cursor-default"
                >
                  <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Prompts */}
      {isEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {QUICK_PROMPTS.map((prompt, i) => (
            <motion.button
              key={prompt}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.05 }}
              onClick={() => handleSend(prompt)}
              className="px-3.5 py-1.5 rounded-full glass-card text-xs font-medium hover:border-emerald/30 hover:bg-emerald/5 transition-all press-effect"
            >
              {prompt}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="space-y-3 pb-4">
          {store.chatMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i === store.chatMessages.length - 1 ? 0.05 : 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-cyan/20' : 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-cyan" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div className={`p-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan/10 rounded-2xl rounded-tr-sm'
                    : 'glass-card rounded-2xl rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isSending && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-center gap-2 p-3 glass-card rounded-2xl rounded-tl-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Bar */}
      <div className="pt-3 border-t border-border">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach anything..."
            className="rounded-xl bg-card border-border"
            disabled={isSending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isSending}
            className="btn-gradient rounded-xl flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
