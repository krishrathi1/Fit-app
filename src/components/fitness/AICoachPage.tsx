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
  Dumbbell, Apple, Moon, Droplets
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
  }, [store.chatMessages]);

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
      const errorMessage: ChatMessage = {
        id: `msg_${Date.now()}_err`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment. In the meantime, remember to stay hydrated and keep pushing! 💪",
        timestamp: Date.now(),
      };
      store.addChatMessage(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

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
            <div className="flex items-center gap-1">
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

      {/* Coach Overview */}
      {store.chatMessages.length === 0 && (
        <Card className="p-4 border-border bg-gradient-to-r from-emerald/10 to-cyan/10 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-emerald" />
            <span className="font-semibold text-sm">Your Personal Coach</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            I know your goals and can help with nutrition, workouts, recovery, and motivation. Ask me anything!
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Dumbbell, label: 'Workouts', color: 'text-emerald' },
              { icon: Apple, label: 'Nutrition', color: 'text-orange-400' },
              { icon: Moon, label: 'Recovery', color: 'text-violet-400' },
              { icon: Droplets, label: 'Hydration', color: 'text-cyan-400' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 p-2 rounded-lg bg-card/50">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Prompts */}
      {store.chatMessages.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1.5 rounded-full bg-card border border-border text-xs hover:border-emerald/30 hover:bg-emerald/5 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1" ref={scrollRef}>
        <div className="space-y-3 pb-4">
          {store.chatMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user' ? 'bg-cyan/20' : 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                }`}>
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-cyan" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-cyan/10 rounded-tr-sm'
                    : 'bg-card border border-border rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isSending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-card border border-border rounded-tl-sm">
                <Loader2 className="w-4 h-4 animate-spin text-emerald" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="pt-3 border-t border-border">
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your coach..."
            className="rounded-xl bg-card border-border"
            disabled={isSending}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isSending}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 hover:from-emerald-600 hover:to-cyan-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
